import { system as ajax } from 'services'

export default {
    props: {
        title: String,
        show: Boolean,
        editForm: Object
    },
    data() {
        return {
            form: {
                globalConfigID: '',
                value: "0"
            }
        }
    },
    watch: {
        editForm(editForm) {
            this.form.globalConfigID = this.editForm.globalConfigID
            this.form.value = this.editForm.value
        }
    },
    methods: {
        // 保存
        save() {
            ajax.updateSysGlobalConfig(this.form).then(() => {
                this.$message({
                    message: '保存成功',
                    type: 'success'
                })
                // 刷新页面
                this.refresh()
                this.close()
            }).catch((error) => {
                this.$message.error(error)
            })
        },
        // 关闭
        close() {
            this.$emit("close")
        },
        // 刷新页面
        refresh() {
            this.$emit('refresh')
        }
    }
}