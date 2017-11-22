import PgTable from './components/table/index.vue'
import PgEdit from './components/edit/index.vue'
import PgGoods from './components/addGoods/index.vue'
export default {
    components: {
        PgTable,
        PgEdit,
        PgGoods
    },
    data() {
        return {
            isShowMoreQuery: false, // 搜索区是否显示更多
            // 搜索条件
            query: {
                title: '',
                uname: '',
                checker: '',
                tuijianren: '',
                status: ''
            },
            page: 1, // 当前页码
            pageSize: 15, // 每页条数
            total: 40, // 总条数
            selected: [],
            editTitle: '编辑', // 新增/修改标题
            editForm: {}, // 新增/修改数据
            isEdit: false, // 是否新增
            showEdit: false, // 是否显示新增弹出窗口
            isShowGoods: false, // 是否显示商品列表弹出框
            // 操作区按钮
            operations: [
                {
                    name: '批量删除',
                    action: 'del',
                    isConfirm: true
                },
                {
                    name: '新增',
                    action: 'add',
                    type: 'primary'
                },
                {
                    name: '启用',
                    action: 'enable'
                },
                {
                    name: '禁用',
                    action: 'disable'
                },
                {
                    name: '打印',
                    action: 'print'
                }
            ],
            customerList: [
                {
                    id: 1,
                    teamname: '天之蓝',
                    name: '66666',
                    content: '内容一'
                },
                {
                    id: 2,
                    teamname: '地之蓝',
                    name: '66666',
                    content: '内容二'
                },
                {
                    id: 3,
                    teamname: '五粮液',
                    name: '66666',
                    content: '内容三'
                }
            ]
        }
    },
	computed: {
        // 搜索区默认显示
        defaultQuery: {
            get() {
                return [
                    {
                        type: 'select',
                        label: '团队名称',
                        model: 'teamname'
                    },
                    {
                        type: 'input',
                        label: '真实姓名',
                        model: 'uname'
                    }
                ]
            }
        },
        moreQuery: {
            get() {
                return [
                    {
                        type: 'input',
                        label: '上级',
                        model: 'checker',
                    },
                    {
                        type: 'input',
                        label: '推荐人',
                        model: 'tuijianren'                            
                    },
                    {
                        type: 'select',
                        label: '状态',
                        text: 'text',
                        value: 'value',
                        model: 'status',
                        options: [
                            {
                                value: 0,
                                text: '禁用'
                            },
                            {
                                value: 1,
                                text: '启用'
                            }
                        ]
                    }
                ]
            }
        }
    },
    methods: {
        // 搜索区显示更多
        toggleOpen(isShow) {
            this.isShowMoreQuery = isShow
        },
        // 搜索按钮
        search() {
            this.page = 1
            this.getDecorationEffects()
        },
        // 全选
        selectChange(selections) {
            this.selected = selections
            console.log(selections)
        },
        // 分页-当前页数更新触发
        currentChange(current) {
            this.page = current
        },
        // 分页-每页条数更改时触发
        sizeChange(size) {
            this.pageSize = size
        },
        // 编辑
        edit(item) {
            this.showEdit = true
            this.isEdit = true
            this.editTitle = '编辑'
            this.editForm = item
        },
        // 新增
        add() {
            this.showEdit = true
            this.isEdit = false
            this.editTitle = '新增'
            this.editForm = {}
        },
        // 删除
        del() {
            console.log('删除')
        },
        // 启用
        enable() {
            console.log('启用')
        },
        // 禁用
        disable() {
            console.log('禁用')
        },
        // 打印
        print() {
            console.log('打印')
            let myWindow = window.open('', 'PRINT')
            myWindow.document.write('<html><head><title>123</title>')
            myWindow.document.write('</head><body>')
            myWindow.document.write('<h1>名字</h1>')
            myWindow.document.write(document.getElementById('print_table').innerHTML)
            myWindow.document.write('</body></html>')
            myWindow.document.close()
            myWindow.focus()
            myWindow.print()
            myWindow.close()

            return true
        },
        // 关闭弹出窗口
        closeEdit() {
            this.showEdit = false
        },
        // 新增选择商品
        addGoods() {
            this.isShowGoods = true
        },
        // 选择的商品
        changeGoods(list) {
            console.log(list)
        },
        // 关闭商品列表弹出框
        closeGoods() {
            this.isShowGoods = false
        }
    }
}