import { rootPath } from '../../services/fetch/config'
import { mapGetters } from 'vuex'
import { common as ajax } from 'services'
import cookie from 'js-cookie'

export default {
    name: 'PgDragImgUpload',
    props: {
        value: Boolean,
        // 标题
        title: {
            type: String,
            default() {
                return '上传'
            }
        },
        // 上传路径
        action: {
            type: String,
            default() {
                return rootPath + '/Upload/UploadImg'
            }
        },
        // ImportType 收款二维码=21,商品图片=11,团队=41,付款截图=51,充值=71,公司信息图片（Logo，轮播图）=111
        importType: {
            type: Number,
            required: true
        },
        appendToBody: {
            type: Boolean,
            default() {
                return true
            }
        },
        // 是否支持多文件上传
        multiple: {
            type: Boolean,
            default() {
                return false
            }
        },
        // 支持上传的文件类型
        accept: {
            type: null,
            default() {
                return '.jpg, .png'
            }
        },
        // 下载模板地址
        downLoadUrl: String
    },
    computed: {
        isOpen: {
            get() {
                return this.value
            },
            set(isOpen) {
                this.$emit('input', isOpen)
            }
        },
        bringData: {
            get() {
                return {
                    FolderType: this.importType
                }
            }
        },
        headers: {
            get() {
                return {
                    Authorization: 'Bearer ' + cookie.get('wxb_erp_authToken')
                }
            }
        }
    },
    methods: {
        // 上传成功
        handleSuccess(response) {
            if (response.resultCode !== 1) {
                this.$message.error(response.errorMessage)
                this.$refs.upload.clearFiles()
                return
            }
            this.$message.success('上传成功')
            this.$emit('success', response.data)
            this.closeDialog()
        },
        // 上传失败
        handleError() {
            this.$message.error('上传失败')
            this.$refs.upload.clearFiles()
        },
        // 关闭窗口
        closeDialog() {
            this.$refs.upload.clearFiles()
            this.isOpen = false
        }
    }
}