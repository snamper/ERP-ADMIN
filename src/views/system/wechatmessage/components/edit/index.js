import { cloneDeep } from 'lodash'
import {system as ajax} from 'services'

export default {
    props: {
        title: String,
        show: Boolean,
        editForm: Object
    },
    methods: {
        // 返回
        close() {
            this.$emit('close')
        },
        // 保存
        save() {
            ajax.saveWechatTemplateFirstAndRemarkData(this.editForm).then(() => {
                this.$message({
                    message: '保存成功',
                    type: 'success'
                })
                this.close()
            })
        }
    }
} 