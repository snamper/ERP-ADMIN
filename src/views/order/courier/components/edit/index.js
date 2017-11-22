import { cloneDeep } from 'lodash'
import { order as ajax } from '../../../../../services'

export default {
    props: {
        title: String,
        show: Boolean,
        isEdit: Boolean,
        editForm: Object
    },
    data() {
        return {
            form: {
            },
            // 初始表单
            initForm: {
                deliveryID: "",//所属快递id
                code: "",//快递编码
                name: "",//快递名称
                deliveryType: "",//快递类型
                linkMan: "",//联系人
                linkTel: "",//联系电话
                note: "",//备注
                orderNo: "",//优先级
                status: 0,//状态 启用1 不启用0
                params: [],//默认的配置参数
            },
            rules: {
                deliveryID: [
                    {  required: true, message: '请选择所属快递', trigger: 'change' }
                ],
                deliveryType: [
                    {  required: true,type: 'number', message: '请选择快递类型', trigger: 'change' }
                ],
                code: [
                    { required: true, message: '请填写快递编码', trigger: 'blur' }
                ],
                linkMan: [
                    { required: true, message: '请填写联系人', trigger: 'blur' }
                ],
                linkTel: [
                    { required: true, message: '请填写联系电话', trigger: 'blur' }
                ],
                orderNo: [
                    { required: true, message: '请填写优先级', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请填写快递名称', trigger: 'blur' }
                ],
            },
            deliveryList: [],//快递单下拉数据
            deliveryTypeList: [],//快递类型下拉列表 
            disableList: [
                {
                    text: '启用',
                    val: 1
                },
                {
                    text: '禁用',
                    val: 0
                }
            ],
        }
    },
    watch: {
        editForm(editForm) {
            if (this.isEdit === false) {
                this.form = cloneDeep(this.editForm)
            }
            else {
                this.resetForm()
            }
        }
    },
    mounted() {
        this.getDelivery()
        this.getDeliveryType()

        if (this.isEdit === false) {
            this.resetForm()
        }
    },
    created() {
        this.setForm(this.editForm)
    },
    methods: {
        //获取快递单下拉列表
        getDelivery(){
            ajax.getBasDeliveryList().then((result)=>{
                this.deliveryList = result 
            })
        },
        //获取快递类型下拉列表 
        getDeliveryType(){
            ajax.queryDeliveryTypeList().then((result)=>{
                this.deliveryTypeList = result 
                console.log(result)
            })
        },
        resetForm() {
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


            //判断是否为菜鸟 为菜鸟则有默认参数
            if(this.form.deliveryType === 2 ) {
                this.form.params = [
                                {"name":"app_key","value":"","note":"店铺的app_key"},
                                {"name":"app_secret","value":"","note":"店铺的app_secret"},
                                {"name":"access_token","value":"","note":"店铺的access_token"},
                                {"name":"province","value":"","note":"菜鸟后台填写的仓库发货：省"},
                                {"name":"city","value":"","note":"菜鸟后台填写的仓库发货：市"},
                                {"name":"area","value":"","note":"菜鸟后台填写的仓库发货：区"},
                                {"name":"address","value":"","note":"菜鸟后台填写的仓库发货：详细地址"},
                                {"name":"consigneeName","value":"","note":"菜鸟后台填写的仓库发货：发货人"},
                                {"name":"phone","value":"","note":"菜鸟后台填写的仓库发货：发货人电话"},
                                {"name":"productType","value":"STANDARD_EXPRESS","note":"默认：STANDARD_EXPRESS"}
                            ]
            }else {
                this.form.params = []
            }

            this.form.params = JSON.stringify(this.form.params)

            ajax.saveMerchantDelivery(this.form).then((result)=>{
                console.log('保存')
                this.$message({
                    message: '保存成功',
                    type: 'success'
                })
                this.refresh() 
                this.resetForm()             
            }).catch((error) => {
                this.$message({
                    message: error,
                    type: 'error'
                })                
            })
            
        },
        // 刷新页面
        refresh() {
            this.$emit('refresh')
        }
    }
}