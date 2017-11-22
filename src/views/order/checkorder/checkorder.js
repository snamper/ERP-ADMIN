import PgTable from './components/table/index.vue'
import PgEdit from './components/edit/index.vue'
import {order as ajax, common} from 'services'

export default {
    components: {
        PgTable,
        PgEdit,
    },
    data() {
        return {
            isShowMoreQuery: false, // 搜索区是否显示更多
            // 搜索条件
            query: {
                orderStatus: 0, //订单状态
                sheet: '',//订单号
                linkMan: '',//收货人
                time: '',//下单时间
                startOrderTime: '',//开始下单时间
                endOrderTime: '',//结束下单时间
                reqCustomerName: '',//提交人
                deliverySheetID: '',//快递单号
                note: '',//备注
            },
            page: 1, // 当前页码
            pageSize: 15, // 每页条数
            total: 0, // 总条数
            selected: [],
            editTitle: '编辑', // 新增/修改标题
            editForm: {}, // 新增/修改数据
            showEdit: false, // 是否显示新增弹出窗口
            // 操作区按钮
            operations: [  
                {
                    name: '导出订单信息',
                    action: 'exportOrder',
                    type: 'default'
                },
                {
                    name: '确认',
                    action: 'saveOrder',
                    type: 'default'
                },
                {
                    name: '取消',
                    action: 'cancelOrder',
                    type: 'default'
                },
            ],
            orderList: [],//订单列表
            goodList: [],//商品列表
        }
    },
	computed: {
        // 搜索区默认显示
        defaultQuery: {
            get() {
                return [
                    {
                        type: 'input',
                        label: '订单号',
                        model: 'sheet'
                    },
                    {
                        type: 'input',
                        label: '收货人',
                        model: 'linkMan'
                    }
                ]
            }
        },
        moreQuery: {
            get() {
                return [
                	{
                        type: 'timeRange',
                        label: '下单时间',
                        model: 'time',
                        start: 'startOrderTime',
                        end: 'endOrderTime'     
                    },
                    {
                        type: 'input',
                        label: '提交人',
                        model: 'reqCustomerName',
                    },
                    {
                        type: 'input',
                        label: '备注',
                        model: 'note',
                    },
                ]
            }
        }
    },
    mounted() {
        // 获取订单列表
        this.selectOrderListPage()
    },
    methods: {
        // 获取订单列表
        selectOrderListPage() {
            if (this.query.orderStatus ==="") {
                this.query.orderStatus = 0
            }
            ajax.selectOrderListPage(this.query, this.page, this.pageSize).then((result) => {
                this.orderList = result.dataList
                this.total = result.total
            })
        },
        // 获取订单中的商品详情
        getGood(row, expanded) {
            if (expanded) {
                ajax.getOrderDetail(row.distributorOrderID).then((result) => {
                    this.goodList = result.listOrderItemList
                })
            } 
        },
        // 搜索区显示更多
        toggleOpen(isShow) {
            this.isShowMoreQuery = isShow
        },
        // 搜索按钮
        search() {
            this.page = 1
            this.selectOrderListPage()
        },
        // 全选
        selectChange(selections) {
            this.selected = []
            selections.forEach((item) => {
                this.selected.push(item.distributorOrderID)
            })
        },
        // 分页-当前页数更新触发
        currentChange(current) {
            this.page = current
            this.selectOrderListPage()
        },
        // 分页-每页条数更改时触发
        sizeChange(size) {
            this.pageSize = size
            this.selectOrderListPage()
        },
        // 编辑
        edit(item) {
            this.showEdit = true
            this.editTitle = '订单详情'
            ajax.getOrderDetail(item.distributorOrderID).then((result) => {
                this.editForm = result
            })
        },
        // 导出订单信息
        exportOrder() {
            if (this.selected.length === 0) {
                this.$message({
                    message: '请先选择要导出的订单!',
                    type: 'warning'
                })
                return
            }
            common.exportExcel({
                type: 4,
                condition: this.query
            }).then((result) => {
                this.util.exportFile(result)
            }).catch((error) => {
                this.$message.error(error)
            })
        },
        // 确认订单
        saveOrder() {
            if (this.selected.length === 0) {
                this.$message({
                    message: '请先选择要确认的订单!',
                    type: 'warning'
                })
                return
            }
            this.$confirm('你确定要确认订单?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                ajax.confirmPay(this.selected).then(() => {
                    this.$message({
                        message: '确认付款成功',
                        type: 'success'
                    })
                    this.selectOrderListPage()
                }).catch((error) => {
                    this.$message.error(error)
                })
            })
        },
        // 取消订单
        cancelOrder() {
        	if (this.selected.length === 0) {
                this.$message({
                    message: '请先选择要取消的订单!',
                    type: 'warning'
                })
                return
            }
            this.$confirm('你确定要取消订单?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                ajax.cancelOrder(this.selected).then(() => {
                    this.$message({
                        message: '取消订单',
                        type: 'success'
                    })
                    this.selectOrderListPage()
                }).catch((error) => {
                    this.$message.error(error)
                })
            })   
        },
        // 关闭弹出窗口
        closeEdit() {
            this.showEdit = false
        },
    }
}