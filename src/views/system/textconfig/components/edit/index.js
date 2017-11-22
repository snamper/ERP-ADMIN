import { cloneDeep } from 'lodash'
import {system as ajax} from 'services'

export default {
    props: {
        title: String,
        show: Boolean,
        isEdit: Boolean,
        editForm: Object,
        detail: Boolean,
        teams:Array,
    },
    data() {
        return {
            //提交数据的form
            //文本类型
            textType:[

                {
                    text: '代理商合同协议',
                    value: 1
                },
                {
                    text: '团队等级权益',
                    value: 2
                },
                {
                    text: '自定义页面',
                    value: 99
                },  
            ],
            form: {
                name: "",
                textType:1,
                distributorGroupID: "",
                url: "",
                content: "",
            },
            content:'',//内容
            // 初始表单
            initForm: {
                name: "",
                textType:1,
                distributorGroupID: "",
                url: "",
                content: "",
            },
            // 输入验证
            rules: {
                textType: [
                    { required: true, message: '请选择文本位置', trigger: 'change' },
                ],
                name: [
                    { required: true, message: '文本不为空', trigger: 'blur' },
                ],
                distributorGroupID: [
                    { required: true, message: '请选择团队', trigger: 'change' },
                ],

            }
        }
    },
    watch: {
        editForm(editForm) {
            if (this.isEdit) {
                this.form = cloneDeep(this.editForm)
                this.content = this.form.content
                console.log(this.imgFile)
            }
            else {
                this.resetForm()
            }
        }
    },
    methods: {
        resetForm() {
            this.content = ''
            this.form = cloneDeep(this.initForm)
        },
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
                if (valid) {
                    ajax.saveTextConfig(this.form)
                        .then((result)=>{
                            console.log(result)
                            this.$message({
                                    message: '保存成功',
                                    type: 'success'
                                });
                            this.close()
                        }) 
                        .catch((error) => {
                            this.$message.error(error)
                        });

                } else {
                    return false;
                }
            })
        },
    }
}