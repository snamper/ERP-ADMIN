import PgTable from './components/table/index.vue'
import PgEdit from './components/edit/index.vue'
import PgSkuedit from './components/skuEdit/index.vue'
import { cloneDeep } from 'lodash'
import {order as ajax, common} from 'services'

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
                orderStatus: 10, //订单状态
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
            showSkuEdit: false,
            editSkuForm: [], // 新增/修改快递信息数据
            orderList: [],
            type: 0,// 订单状态
            btnType: 0, //0为修改快递公司，1为绑定快递单，2为导入唯一码
            activeName: 'first', //开始是默认的标签页
            goodList: [],//商品列表
            isOpenFileUpload: false, // 是否打开导入框
            myID: [],//订单号
            isContinue:true //判断是否为相同商家快递id
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
                        label: '修改时间',
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
                        label: '快递单号',
                        model: 'deliverySheetID'                            
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
            this.selected = selections
            console.log(selections)
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
        // 订单详情
        edit(item) {
            this.showEdit = true
            this.editTitle = '订单详情'
            ajax.getOrderDetail(item.distributorOrderID).then((result) => {
                this.editForm = result
            })
        },
        // 导入唯一码
        scan(item) {
            this.showSkuEdit = true     
            this.btnType = 2 
            this.editTitle = '导入唯一码'
            this.editForm = cloneDeep(item)
        },
        // 修改快递公司
        modifyCourier() {
            if (this.selected.length === 0) {
                this.$message({
                    message: '请先选择要转到待扫描的订单',
                    type: 'warning'
                })
                return
            }
            this.showSkuEdit = true  
            this.btnType = 0    
            this.editTitle = '修改快递'
            this.editSkuForm = this.selected
        },
        // 绑定快递单
        boundExpress() {
            if (this.selected.length === 0) {
                this.$message({
                    message: '请先选择要绑定快递单的订单',
                    type: 'warning'
                })
                return
            }
            this.showSkuEdit = true  
            this.btnType = 1    
            this.editTitle = '绑定快递单'
            this.editSkuForm = []
            this.selected.forEach((item) => {
                this.editSkuForm.push({
                    distributorOrderID: item.distributorOrderID,
                    sheet: item.sheet,
                    deliverySheetID: item.deliverySheetID,
                    focus: false
                })
            })
        },
        // 转到待扫描
        changeToWaitForScan() {
            const list = []
            let flag = 0
            this.selected.forEach((item) => {
                if (item.deliveryName === '' || item.deliveryName === null) {
                    flag = 1
                }
                else {
                    list.push(item.distributorOrderID)
                }
            })
            if (this.selected.length === 0) {
                this.$message({
                    message: '请先选择要转到待扫描的订单',
                    type: 'warning'
                })
                return
            }
            this.$confirm('你确定要转到待扫描?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                ajax.changeToWaitForScan(list).then(() => {
                    this.$message({
                        message: '转到待扫描成功!',
                        type: 'success'
                    })
                    // 刷新页面
                    this.selectOrderListPage()
                    // 如果有没有发货成功的订单
                    if (flag === 1) {
                        this.$message({
                            message: '部分订单转到失败,请确保已绑定快递公司!',
                            type: 'warning'
                        })
                    }
                }).catch((error) => {
                    this.$message.error(error)
                })
            })
        },
        // 公司发货
        sendGoodsFromMerchant() {
            const list = []
            let flag = 0//发货时，是否有没有绑定快递公司和快递单号的订单
            this.selected.forEach((item) => {
                // 先判断是否有快递公司和快递单号
                if ((item.deliveryName === '' || item.deliveryName === null) || (item.deliverySheetID === '' || item.deliverySheetID === null)) {
                    flag = 1
                }
                else {
                    list.push(item.distributorOrderID)
                }  
            })
            // 如果没有选择订单
            if (this.selected.length === 0) {
                this.$message({
                    message: '请先选择要发货的订单',
                    type: 'warning'
                })
                return
            }
            this.$confirm('你确定要发货?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                ajax.sendGoodsFromMerchant(list).then(() => {
                    this.$message({
                        message: '发货成功!',
                        type: 'success'
                    })
                    // 刷新页面
                    this.selectOrderListPage()
                    // 如果有没有发货成功的订单
                    if (flag === 1) {
                        this.$message({
                            message: '部分订单发货失败,请确保已绑定快递公司和快递单号!',
                            type: 'warning'
                        })
                    }
                }).catch((error) => {
                    this.$message.error(error)
                })
            })
        },
        // 取消
        cancel(item) {
            const list = []
            list.push(item.distributorOrderID)
            this.$confirm('你确定要取消订单?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                ajax.cancelOrder(list).then(() => {
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
        // 溯源扫码
        scanCode() {
            // 如果没有选择订单
            if (this.selected.length === 0) {
                this.$message({
                    message: '请先选择要扫码的订单',
                    type: 'warning'
                })
                return
            }
            // 过滤掉没有绑定快递公司和快递单号的订单
            let flag = 0
            this.selected.forEach((item,index) => {
                if (item.deliveryName === '' || item.deliveryName === null || item.deliverySheetID  === '' || item.deliverySheetID  === null) {
                    flag = 1
                    this.selected.splice(index,1)
                }
            })
            if (flag) {
                this.$message({
                    message: '你所选的订单中存在还没有绑定快递公司或快递单号的订单,\n',
                    type: 'warning'
                })
            }
            this.$router.push({
                path: '/scancode',
                query: {
                    list: this.selected
                }
            })
        },
        // 关闭弹出窗口
        closeEdit() {
            this.showEdit = false
        },
        // 关闭sku弹出窗口
        closeSkuEdit() {
            this.showSkuEdit = false
        },
        // 根据订单状态查询列表
        handleClick(tab, event) {
        	this.type = parseInt(tab.index)
            switch(this.type) {
                case 0: this.query.orderStatus = 10 
                        break
                case 1: this.query.orderStatus = 90
                        break
                case 2: this.query.orderStatus = 100
                        break
                case 3: this.query.orderStatus = 95
                        break
                case 4: this.query.orderStatus = 110
                        break
            }
            this.selectOrderListPage()
        },
        refresh() {
            this.page = 1
            this.selectOrderListPage()
        },
        // 打印订单
        printOrder() {
            if (this.selected.length === 0) {
                this.$message({
                    message: '请先选中要打印的订单',
                    type: 'warning'
                })
                return
            }

            this.$router.push('/printOrder?id=' + this.selected[0].distributorOrderID)
            console.log(this.selected[0].distributorOrderID)
        },
        //打印快递单
        printExpress() {
            if (this.selected.length === 0) {
                this.$message({
                    message: '请先选中要打印的订单',
                    type: 'warning'
                })
                return
            }

            this.myID = [] //先清空
            this.selected.forEach((obj)=>{

                this.myID.push(obj.sheet) //订单号

                if(obj.merchantDeliveryID != this.selected[0].merchantDeliveryID) {//判断快递是否相同
                    this.$message({
                        message: '请选择相同快递公司的订单',
                        type: 'warning'
                    })  
                    this.isContinue = false
                    return   false                
                }
                if(!obj.deliverySheetID) { //判断订单中有没有快递公司
                    this.$message({
                        message: '选中的订单中没有选择快递公司',
                        type: 'warning'
                    })
                    this.isContinue = false
                    return                     
                }  
                this.isContinue = true          
            })

            if(this.isContinue) {
                this.myID = JSON.stringify(this.myID)

                //this.$router.push('/printExpress?id=' + this.myID ) merchantDeliveryId
                this.$router.push({
                    path:"/printExpress",
                    query:{
                        id:this.myID,
                        merchantDeliveryId:this.selected[0].merchantDeliveryID
                    }
                })
            }

        },
        // 导入快递单号
        importDeliverySheet() {
            this.isOpenFileUpload = true
        },
        // 导入成功
        deliverySheetUploadSuccess() {
            this.refresh()
        },
        // 导出订单
        exportOrder() {
            common.exportExcel({
                type: 4,
                condition: this.query
            }).then((result) => {
                this.util.exportFile(result)
            }).catch((error) => {
                this.$message.error(error)
            })
        }
    }
}