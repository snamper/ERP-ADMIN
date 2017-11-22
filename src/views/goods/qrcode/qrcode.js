import PgTable from './components/table/index.vue'
import PgEdit from './components/edit/index.vue'
import {goods as ajax, common} from 'services'

export default {
    components: {
        PgTable,
        PgEdit
    },
    data() {
        return {
            isShowMoreQuery: false, // 搜索区是否显示更多
            // 搜索条件
            query: {
                detectCode: '',//防伪码
                parentCode: '',//大码
                code: '',//小码
                status: '', //状态
                customerName: '',//收货人
                detectCodeCheck:　0,//查询数次
                sheet: '',//关联订单
                customBC: '',//关联sku
                note: '',//备注
                merchantID: ''//商家id
            },
            page: 1, // 当前页码
            pageSize: 15, // 每页条数
            total: 0, // 总条数
            selected: [],
            editTitle: '编辑', // 新增/修改标题
            editForm: {}, // 新增/修改数据
            isEdit: false, // 是否新增
            showEdit: false, // 是否显示新增弹出窗口
            // 操作区按钮
            operations: [  
                // {
                //     name: '批量生成',
                //     action: 'add',
                //     type: 'primary'
                // },
                {
                    name: '清除记录',
                    action: 'del',
                    type: 'defalut'
                },
                {
                    name: '启用',
                    action: 'enable',
                    type: 'default'
                },
                {
                    name: '禁用',
                    action: 'disable',
                    type: 'default'
                },
                {
                    name: '导入',
                    action: 'leadIn',
                    type: 'default'
                },
                {
                    name: '导出',
                    action: 'educe',
                    type: 'default'
                },
                {
                    name: '打印二维码',
                    action: 'printQR',
                    type: 'default'
                }
            ],
            QRList: [],
            statusList: [
                {
                    text: '不限',
                    value: -1
                },
                {
                    text: '已启用',
                    value: 1
                },
                {
                    text: '已禁用',
                    value: 0
                }, 
            ],
            isOpenFileUpload: false, // 是否打开导入框
        }
    },
	computed: {
        // 搜索区默认显示
        defaultQuery: {
            get() {
                return [
                    {
                        type: 'input',
                        label: '防伪码',
                        model: 'detectCode'
                    },
                    {
                        type: 'input',
                        label: '大码',
                        model: 'parentCode',
                    },
                ]
            }
        },
        moreQuery: {
            get() {
                return [
                    {
                        type: 'input',
                        label: '小码',
                        model: 'code'                            
                    },
                    {
                        type: 'select',
                        label: '状态',
                        text: 'text',
                        value: 'value',
                        model: 'status',
                        options: this.statusList
                    },
                    {
                        type: 'input',
                        label: '收货人',
                        model: 'customerName'
                    },
                    {
                        type: 'input',
                        label: '查询数次',
                        model: 'detectCodeCheck'
                    },
                    {
                        type: 'input',
                        label: '关联订单',
                        model: 'sheet'
                    },
                    {
                        type: 'input',
                        label: '备注',
                        model: 'note'
                    },
                    {
                        type: 'input',
                        label: '关联sku',
                        model: 'customBC'
                    }
                ]
            }
        }
    },
    mounted() {
        // 获取二维码列表
        this.selectQRCodeListPage()
    },
    methods: {
        // 获取二维码列表
        selectQRCodeListPage() {
            if (this.query.status === '') {
                this.query.status = -1
            }
            ajax.selectQRCodeListPage(this.query, this.page, this.pageSize).then((result) => {
                this.QRList = result.dataList
                this.total = result.total
            })
        },
        // 搜索区显示更多
        toggleOpen(isShow) {
            this.isShowMoreQuery = isShow
        },
        // 搜索按钮
        search() {
            this.page = 1
            this.selectQRCodeListPage()
        },
        // 全选
        selectChange(selections) {
            this.selected = []
            selections.forEach((item) => {
                this.selected.push(item.qrCodeID)
            })
        },
        // 分页-当前页数更新触发
        currentChange(current) {
            this.page = current
            this.selectQRCodeListPage()
        },
        // 分页-每页条数更改时触发
        sizeChange(size) {
            this.pageSize = size
            this.selectQRCodeListPage()
        },
        // 查询记录
        edit(item) {
            this.showEdit = true
            this.isEdit = false
            this.editTitle = '查询记录'
            ajax.getQRCodeRecords(item.qrCodeID).then((result) => {
                this.editForm = result
            })
        },
        // 批量生成
        add() {
            this.showEdit = true
            this.isEdit = true
            this.editTitle = '批量生成'
            this.editForm = {}
        },
        // 清除记录
        del() {
            ajax.delQRCodeRecords(this.selected).then(() => {
                this.$message({
                    message: '清除成功',
                    type: 'success'
                })
                this.selectQRCodeListPage()
            }).catch(error => {
                this.$message.error(error)
            })
        },
        // 启用
        enable() {
        	if (this.selected.length === 0) {
                this.$message({
                    message: '请先选择要启用的二维码',
                    type: 'warning'
                })
                return
            }
            ajax.updateQRCodeStaus({
                listID: this.selected,
                status: 1
            }).then(() => {
                this.$message({
                    message: '启用成功',
                    type: 'success'
                })
                // 刷新页面
                this.selectQRCodeListPage()
            })
        },
        // 禁用
        disable() {
        	if (this.selected.length === 0) {
                this.$message({
                    message: '请先选择要禁用的二维码',
                    type: 'warning'
                })
                return
            }
            ajax.updateQRCodeStaus({
                listID: this.selected,
                status: 0
            }).then(() => {
                this.$message({
                    message: '禁用成功',
                    type: 'success'
                })
                // 刷新页面
                this.selectQRCodeListPage()
            })
        },
        // 导入
        leadIn() {
        	console.log('导入')
            this.isOpenFileUpload = true
        },
        // 导入成功
        deliverySheetUploadSuccess() {
            this.selectQRCodeListPage()
        },
        // 导出
        educe() {
            common.exportExcel({
                type: 5,
                condition: this.query
            }).then((result) => {
                this.util.exportFile(result)
            }).catch((error) => {
                this.$message.error(error)
            })
        },
        // 打印二维码
        printQR() {
            console.log('打印二维码')
        },
        // 关闭弹出窗口
        closeEdit() {
            this.showEdit = false
        }
    }
}