import { cloneDeep } from 'lodash'
export default {
    props: {
        title: String,
        show: Boolean,
        editForm: Object
    },
    data() {
        return {
            form: {},
            // 初始表单
            initForm: {
                bainhao: '',
                pack: 0,
                sku: '',
                stQ: '',
                price: '',
                spec1: '',
                spec2: '',
                number: ''
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
            if (this.isEdit ===1) {
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
            this.$emit('closeSkuEdit')
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