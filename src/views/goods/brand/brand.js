import PgTable from './components/table/index.vue'
import PgEdit from './components/edit/index.vue'
import {goods as ajax} from 'services'

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
                propertyTypeID: '',//品牌ID
                merchantID: '',//商家id
                name: '',//品牌名
                status: -1,//状态
                code: '',//品牌码
                editor: '',//修改人
                time: '',//时间范围
                startEditTime: '',//开始时间
                endEditTime: '',//结束时间
                note: ''//备注
            },
            page: 1, // 当前页码
            pageSize: 15, // 每页条数
            total: 40, // 总条数
            listID: [], //全选
            editTitle: '编辑', // 新增/修改标题
            editForm: {}, // 新增/修改数据
            isEdit: 0, // 是否新增
            showEdit: false, // 是否显示新增弹出窗口
            // 操作区按钮
            operations: [  
                {
                    name: '新增',
                    action: 'add',
                    type: 'primary'
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
                }
            ],
            brankList: [],//品牌列表
            // 状态
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
            ]
        }
    },
    mounted() {
        // 获取品牌列表
        this.selectListPage()
    },
	computed: {
        // 搜索区默认显示
        defaultQuery: {
            get() {
                return [
                    {
                        type: 'input',
                        label: '编号',
                        model: 'code'
                    },
                    {
                        type: 'input',
                        label: '品牌名',
                        model: 'name'
                    }
                ]
            }
        },
        // 展开的搜索区
        moreQuery: {
            get() {
                return [
                    {
                        type: 'input',
                        label: '修改人',
                        model: 'editor',
                    },
                    {
                        type: 'timeRange',
                        label: '修改时间',
                        model: 'time',
                        start: 'startEditTime',
                        end: 'endEditTime'
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
                        label: '备注',
                        model: 'note'
                    }
                ]
            }
        }
    },
    methods: {
        // 获取品牌列表
        selectListPage() {
            ajax.selectListPage(this.query, this.page, this.pageSize).then((result) => {
                this.brankList = result.dataList
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
            // 把时间范围转化成单个时间
            this.selectListPage()
        },
        // 全选
        selectChange(selections) {
            this.listID = []
            selections.forEach((item) => {
                this.listID.push(item.propertyID)
            })
        },
        // 分页-当前页数更新触发
        currentChange(current) {
            this.page = current
            this.selectListPage()
        },
        // 分页-每页条数更改时触发
        sizeChange(size) {
            this.pageSize = size
            this.selectListPage()
        },
        // 编辑
        edit(item,flag) {
            this.showEdit = true
            this.isEdit = flag
            if (flag ===0) {
            	this.editTitle = '详情'
            }
            else {
            	this.editTitle = '编辑'
            }
            ajax.selectBasProperty(item.propertyID).then((result) => {
                this.editForm = result
            })
        },
        // 新增
        add() {
            this.showEdit = true
            this.isEdit = 2
            this.editTitle = '新增'
            this.editForm = {}
        },
        // 启用
        enable() {
            if (this.listID.length === 0) {
                this.$message({
                    message: '请先选择要启用的品牌',
                    type: 'warning'
                })
                return
            }
            ajax.updateStatus({
                listID: this.listID,
                status: 1
            }).then(() => {
                this.$message({
                    message: '启用成功',
                    type: 'success'
                })
                this.selectListPage()
            })
        },
        // 禁用
        disable() {
            if (this.listID.length === 0) {
                this.$message({
                    message: '请先选择要禁用的品牌',
                    type: 'warning'
                })
                return
            }
            ajax.updateStatus({
                listID: this.listID,
                status: 0
            }).then(() => {
                this.$message({
                    message: '禁用成功',
                    type: 'success'
                })
                this.selectListPage()
            })
        },
        // 导入
        leadIn() {
        	console.log('导入')
        },
        // 导出
        educe() {
        	console.log('导出')
        },
        // 关闭弹出窗口
        closeEdit() {
            this.showEdit = false
        },
        // 新增/编辑保存之后刷新页面
        refresh() {
            this.page = 1
            this.selectListPage()
        }
    }
}