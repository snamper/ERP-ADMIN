import { print as ajax } from 'services'
import { Drag } from './util.js'
import PgTextField from './components/textField/index.vue'
import PgToolBar from './components/toolBar/index.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
    components: {
        PgTextField,
        PgToolBar
    },
    data() {
        return {
            form: {
                printTemplate: '',
                imgUrl: '',
                printTemplateType: {
                    businessType: 5
                },
                flag: 0,
                distributorGroupID: ''
            },
            businessTypeList: [], // 打印业务类型
            fieldList: [], // 业务常量字段
            currentField: {},
            editFieldItem: {},
            isOpenUpload: false,
            printTemplate: {
                businessType: 5,
                type: 0,
                paper: {
                    style: {
                        width: '800px',
                        height: '800px',
                        imgUrl: ''
                    }
                },
                editField: [
                    {
                        style: {},
                        fields: [],
                        customImg: []
                    }
                ]
            },
            drag: null
        }
    },
    mounted() {
        this.getBusinessType()
        this.getPrintFields()
        this.getTeamList()
    },
    watch: {
        printTemplate: {
            handler() {
                this.$forceUpdate() // 强制刷新dom
            },
            deep: true
        },
        'form.distributorGroupID'() {
            this.getPrintTpl()
        }
    },
    computed: {
        ...mapGetters([
            'teamList'
        ]),
        editField: {
            get() {
                return this.printTemplate.editField[0] || {}
            }
        }
    },
    methods: {
        ...mapActions([
            'getTeamList'
        ]),
        // 获取打印模板类型
        getBusinessType() {
            ajax.getBusinessType().then((result) => {
                this.businessTypeList = result
            })
        },
        // 获取打印模板字段常量
        getPrintFields() {
            ajax.getPrintFields(this.form.printTemplateType.businessType).then((result) => {
                this.fieldList = result
            })
        },
        // 请求模板
        getPrintTpl() {
            ajax.getPrintTpl(this.form).then((result) => {
                this.printTemplate = JSON.parse(result.replace(/\\/ig, ''))
                this.form.imgUrl = this.printTemplate.paper.style.imgUrl
            }).catch((error) => {
                this.form.imgUrl = ''
                this.form.printTemplate = ''
                this.printTemplate = {
                    businessType: 5,
                    type: 0,
                    paper: {
                        style: {
                            width: '800px',
                            height: '800px',
                            imgUrl: ''
                        }
                    },
                    editField: [
                        {
                            style: {},
                            fields: [],
                            customImg: []
                        }
                    ]
                }
                this.$message.error(error)
            })
        },
        changeField(field) {
            this.printTemplate.editField[0].fields.push({
                style: {
                    width: '200px',
                    height: '24px',
                    left: '0px',
                    top: '0px',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    textAlign: 'left',
                    color: '#000000',
                    zIndex: '1'
                },
                ...field
            })
        },
        // 开始拖拽
        dragStart(event, field, options) {
            this.drag = new Drag(field, options)
            this.drag.dragStart(event)
            document.addEventListener('mouseup', this.dragEnd)
            document.addEventListener('mousemove', this.dragMove)
        },
        // 拖拽结束
        dragEnd() {
            this.drag.dragEnd()
            document.removeEventListener('mousemove', this.dragMove)
            document.removeEventListener('mouseup', this.dragEnd)
        },
        // 拖拽中
        dragMove(event) {
            this.drag.dragMove(event)
        },
        // 正在编辑的字段
        setEditField(field) {
            this.editFieldItem = field
        },
        // 当前的字段
        setCurrentField(field) {
            this.currentField = field
        },
        getContent(event, field) {
            field.content = field.code = event.srcElement.innerText
        },
        // 删除字段
        removeField(fields, field) {
            const index = fields.indexOf(field)
            fields.splice(index, 1)
        },
        // 上传图片
        handleIconClick() {
            this.isOpenUpload = true
        },
        uploadSuccess(url) {
            this.form.imgUrl = url
            this.printTemplate.paper.style.imgUrl = url
        },
        checkEmptyTemplate(template) {
            let isEmpty = true
            const editField = template.editField
            if (editField.length > 0) {
                isEmpty = !editField.some((item) => {
                    return item.fields.length > 0
                })
            }

            return isEmpty
        },
        getTemplateString() {
            return this.checkEmptyTemplate(this.printTemplate) ? '' : JSON.stringify(this.printTemplate)
        },
        // 保存
        saveTemplate() {
            this.form.printTemplate = this.getTemplateString()
            ajax.savePrintTpl(this.form).then(() => {
                this.$message.success('保存成功')
            }).catch((error) => {
                this.$message.error(error)
            })
        }
    }
}