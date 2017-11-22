import PgTable from './components/table/index.vue'
import PgEdit from './components/edit/index.vue'
import PgSkuedit from './components/skuEdit/index.vue'
export default {
    components: {
        PgTable,
        PgEdit,
        PgSkuedit
    },
    data() {
        return {
            isShowMoreQuery: false, // 搜索区是否显示更多
            // 搜索条件
            query: {
                orderNu: '',
                consignee: '',
                creatime: '',
                submitter: '',
                courier: '',
                note: '',
                mark: ''
            },
            page: 1, // 当前页码
            pageSize: 15, // 每页条数
            total: 40, // 总条数
            selected: [],
            editTitle: '编辑', // 新增/修改标题
            editForm: {}, // 新增/修改数据
            isEdit: 0, // 是否新增
            showEdit: false, // 是否显示新增弹出窗口
            showSkuEdit: false,
            // 操作区按钮
            operations: [  
                {
                    name: '代付款',
                    action: 'pay',
                    type: 'default'
                },
                {
                    name: '待发货',
                    action: 'delivery',
                    type: 'default'
                },
                {
                    name: '已发货',
                    action: 'ship',
                    type: 'default'
                },
                {
                    name: '已取消',
                    action: 'cancel',
                    type: 'default'
                },
                {
                    name: '已完成',
                    action: 'finish',
                    type: 'default'
                }
            ],
            orderList: [],
            markList: [
            	{
                    text: '已打印未扫描',
                    value: 0
                },
                {
                    text: '未打印未扫描',
                    value: 1
                },
                {
                    text: '未打印已扫描',
                    value: 2
                },
                {
                    text: '已打印已扫描',
                    value: 3
                }, 
            ],
            type: 1,
            activeName: 'second'
        }
    },
	computed: {
        // 搜索区默认显示
        defaultQuery: {
            get() {
                return [
                    {
                        type: 'input',
                        label: '订单好',
                        model: 'orderNu'
                    },
                    {
                        type: 'input',
                        label: '收货人',
                        model: 'consignee'
                    }
                ]
            }
        },
        moreQuery: {
            get() {
                return [
                	{
                        type: 'time',
                        label: '下单时间',
                        model: 'creatime',
                    },
                    {
                        type: 'input',
                        label: '提交人',
                        model: 'submitter',
                    },
                    {
                        type: 'timeRange',
                        label: '快递单号',
                        model: 'courier'                            
                    },
                    {
                        type: 'input',
                        label: '备注',
                        model: 'note',
                    },
                    {
                        type: 'select',
                        label: '标记',
                        text: 'text',
                        value: 'value',
                        model: 'mark',
                        options: this.markList
                    },
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
            this.isEdit = 1
            this.editTitle = '订单详情'
            this.editForm = item
        },
        // 扫码绑定
        scan(item,flag) {
            this.showSkuEdit = true      
            this.editTitle = '扫码捆绑'
            this.editForm = item
        },
        // // 待付款
        // pay() {
        //     console.log('待付款')
        //     this.type = 1
        // },
        // // 待发货
        // delivery() {
        // 	console.log('待发货')
        // 	this.type = 2
        // },
        // // 已发货
        // ship() {
        // 	console.log('已发货')
        // 	this.type = 3
        // },
        // // 已取消
        // cancel() {
        // 	console.log('已取消')
        // 	this.type = 4
        // },
        // // 已完成
        // finish() {
        // 	console.log('已完成')
        // 	this.type = 5
        // },
        addSku() {

        },
        // 关闭弹出窗口
        closeEdit() {
            this.showEdit = false
        },
        // 关闭sku弹出窗口
        closeSkuEdit() {
            this.showSkuEdit = false
        },
        handleClick(tab, event) {
        	this.type = parseInt(tab.index)
        }
    }
}