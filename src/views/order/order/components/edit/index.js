import { cloneDeep } from 'lodash'
export default {
    props: {
        title: String,
        show: Boolean,
        isEdit: Number,
        editForm: Object
    },
    data() {
        return {
            form: {},
            // 初始表单
            initForm: {
                bainhao: '',
                brand: '',
                name: '',
                price: '',
                spec1: '',
                spec2: '',
                unit: ''
            },
            // 输入验证
            rules: {
                bainhao: [
                    { required: true, message: '请输入商品货号', trigger: 'blur' },
                ],
                name: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                ],
                price: [
                    { required: true, message: '请输入统一售价', trigger: 'blur' },
                ],
                brand: [
                    { required: true, message: '请选择品牌名称', trigger: 'blur' },
                ],
            },
            goodList: [
                {
                    label: '读取已启用的品牌',
                    value: 0
                },
                {
                    label: '高端A货',
                    value: 1
                },
                {
                    label: '高端B货',
                    value: 1
                }
            ]
        }
    },
    watch: {
        editForm(editForm) {
            if (this.isEdit !==2) {
                this.form = cloneDeep(this.editForm)
            }
            else {
                this.resetForm()
            }
        }
    },
    mounted() {
        if (!this.isEdit) {
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
                    // 验证通过
                }
            })
        }
    }
}