import { cloneDeep } from 'lodash'
import { material as ajax } from 'services'
export default {
    props: {
        title: String,
        show: Boolean
    },
    data() {
        return {
            form: {
                name: ''
            },
            // 输入验证
            rules: {
                name: [
                    { required: true, message: '请输入标签名称', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        // 返回
        close() {
            this.$emit('close')
        },
        // 保存
        save() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    // 验证通过
                    ajax.saveMaterialTag(this.form.name).then((result) => {
                        this.$message.success('保存成功')
                        this.$emit('refresh')
                    }).catch((error) => {
                        this.$message.error(error)
                    })
                }
            })
        }
    }
}