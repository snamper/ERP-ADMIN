import { cloneDeep } from 'lodash'
import {accredit as ajax} from 'services'

export default {

    props: {
        title: String,
        show: Boolean,
        isEdit: Boolean,
        editForm: Object,
        teamList: Array,
        accreditStyleList:Array,
    },
    data() {
        return {
            form: {
                name:'',//名称
                distributorGroupID:'',//团队ID
                authorizationCertificateID:'', //样式ID
            },
            // 初始表单
            initForm: {
                name:'',//名称
                distributorGroupID:'',//团队ID
                authorizationCertificateID:'', //样式ID
            },           
            // 输入验证
            rules: {
                name: [
                    { required: true, message: '请填写授权名称', trigger: 'blur' },
                ],
                distributorGroupID: [
                    { required: true, message: '请选择授权团队', trigger: 'blur' },
                ],
                authorizationCertificateID: [
                    { required: true, message: '请选择授权样式', trigger: 'blur' },
                ],

            }
        }
    },
    watch: {
        editForm(editForm) {
            this.setForm(editForm)
        }
    },
    methods: {
        //主页面修改
        resetForm() {
            this.form = cloneDeep(this.initForm)
        },
        //新增
        setForm(editForm) {
            if (this.isEdit) {
                this.form = cloneDeep(this.editForm)
            }
            else {
                this.resetForm()
            }
        },
        // 返回
        close() {
            this.$emit('close')
        },
        // 保存
        save() {
            this.$refs.form.validate((valid) => {
                console.log(this.form)
                if (valid) {
                    // 验证通过
                    let param = this.form
                    console.info(param)
                    ajax.saveNewAccredit(param)
                        .then((result)=>{
                            this.$message({
                                message:'保存成功',
                                type:'success'
                            })
                            this.close()
                        })
                        .catch((error)=>{
                            this.$message.error(error)
                        })
                }
            })
        },
        // 新增返点设置
        addGoodsType() {
            this.form.back.push(cloneDeep(this.barCode))
        },
        // 删除现货类型
        delGoodsType(index) {
            this.form.back.splice(index, 1)
        },
    }
}