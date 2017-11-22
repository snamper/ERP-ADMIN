import { cloneDeep } from 'lodash'
export default {
    props: {
        title: String,
        show: Boolean,
        isEdit: Boolean,
        editForm: Object
    },
    data() {
        return {
            form: {},
            // 初始表单
            initForm: {
                parentCode: '',//大码
                code: '',//小码
                time: '', //时间
                shipper: '',//发货人
                receiver: '',//收货人
                sheet: '',//关联订单
            },
            // 输入验证
            // rules: {
            //     batch: [
            //         { required: true, message: '请输入批次号前缀', trigger: 'blur' },
            //     ],
            //     boxs: [
            //         { required: true, message: '请输入箱数', trigger: 'blur' },
            //     ],
            //     Qty: [
            //         { required: true, message: '请输入每箱数量', trigger: 'blur' },
            //     ],
            // }
        }
    },
    watch: {
        editForm(editForm) {
            // 查看记录
            if (this.isEdit === false) {
                this.form = cloneDeep(this.editForm)
            }
            else {
                this.resetForm()
            }
        }
    },
    mounted() {
        // 新增
        if (this.isEdit === false) {
            this.resetForm()
        }
    },
    created() {
        this.setForm(this.editForm)
    },
    methods: {
        resetForm() {
            this.form = cloneDeep(this.initForm)
        },
        setForm(editForm) {
            // 查看记录
            if (this.isEdit === false) {
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
            // this.$refs.form.validate((valid) => {
            //     if (valid) {
            //         // 验证通过
            //     }
            // })
        }
    }
}