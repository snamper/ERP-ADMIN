import { cloneDeep } from 'lodash'
import {goods as ajax} from 'services'

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
                code: '', //编码
                name: '', //名字
                note: '' //备注
            },
            // 输入验证
            rules: {
                code: [
                    { required: true, message: '请输入编号', trigger: 'blur' },
                ],
                name: [
                    { required: true, message: '请输入品牌名称', trigger: 'blur' },
                ],
            }
        }
    },
    watch: {
        // 初始化表单
        editForm(editForm) {
            // 不是新增
            if (this.isEdit !== 2) {
                this.form = cloneDeep(this.editForm)
            }
            else {
                this.resetForm()
            }
        }
    },
    mounted() {
        this.resetForm() //开始时表单为空
    },
    methods: {
        resetForm() {
            this.form = cloneDeep(this.initForm)
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
                    ajax.update(this.form).then(() => {
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        })
                        this.close()
                        this.refresh()
                    }).catch((error) => {
                        this.$message.error(error)
                    })
                }
            })
        },
        // 刷新页面
        refresh() {
            this.$emit('refresh')
        }
    }
}