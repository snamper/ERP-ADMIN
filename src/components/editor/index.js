import WangEditor from 'wangeditor'
import cookie from 'js-cookie'
import {rootPath} from '../../services/fetch/config'
export default {
    name: 'PgEditor',
    props: ['initContent'],
    data() {
        return {
            content: '',
            zIndex: 100,
            editor: ''
        }
    },
    methods: {
        /**
         * 创建editor
         */
        createEditor() {
            const editor = new WangEditor(this.$el)
            editor.config.menus = ['source', '|', 'bold', 'underline', 'italic', 'strikethrough', 'eraser', 'forecolor', 'bgcolor', '|', 'quote', 'fontfamily', 'fontsize', 'head', 'unorderlist', 'orderlist', 'alignleft', 'aligncenter', 'alignright',
                '|', 'link', 'unlink', 'table', 'img', 'video', 'insertcode', '|', 'undo', 'redo', 'fullscreen'
            ]
            editor.config.menuFixed = false
            editor.config.printLog = false
            editor.config.uploadImgUrl = rootPath + '/Upload/UploadImg'
            editor.config.uploadHeaders = {
                'Authorization': 'Bearer ' + cookie.get('wxb_erp_authToken')
            }
            const that = this
            editor.config.uploadImgFns.onload = function(result, xhr) {
                const res = JSON.parse(result)
                this.command(null, 'insertHtml', '<img src="'+ that.util.hostUrl() + res.data +'" style="max-width: 100%;"/>')
            }
            editor.onchange = () => {
                this.formatContent(editor.$txt.html())
            }
            const editorNum = document.querySelectorAll('.wangEditor-container').length
            editor.$editorContainer.css('z-index', this.zIndex - editorNum)
            editor.create()
            this.editor = editor
        },
        /**
         * 获取content
         * @param content
         */
        formatContent(content) {
            this.content = content
            this.outputContent()
        },
        /**
         * 将content传递给父组件
         */
        outputContent() {
            this.$emit('input',this.content)
        },
        /**
         * 更新editor内容
         */
        updateEditor() {
            this.$nextTick(() => {
                if (this.initContent) {
                    this.editor.$txt.html(this.initContent)
                } else {
                    this.editor.$txt.html('')
                }
                this.formatContent()
            })
        },
    },
    watch: {
        /**
         * initContent有变动时,重新更新editor中的内容
         */
        initContent() {
            this.updateEditor()
        }
    },
    mounted() {
        this.createEditor()        
    }
}