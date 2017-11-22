import PgTable from './components/table/index.vue'
import PgEdit from './components/edit/index.vue'
import PgSkuedit from './components/skuEdit/index.vue'
import {goods as ajax} from 'services'

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
                customNo: '', //商品号
                name: '', //商品名
                editor: '', //修改人
                time: '', //时间范围
                editTimeRange: {//时间范围
                    editTimeBegin: '',
                    editTimeEnd: ''
                },
                status: -1, //状态
                brandID: '', //品牌id
            },
            // 重置表单
            resetForm: {
                customNo: '',//商品号
                name: '',//商品名
                editor: '', //修改人
                time: '',//时间范围
                editTimeRange: {//时间范围
                    editTimeBegin: '',
                    editTimeEnd: ''
                },
                status: -1,//状态
                brandID: '',//品牌id
            },
            page: 1, // 当前页码
            pageSize: 15, // 每页条数
            total: 0, // 总条数
            selected: [], //全选
            editTitle: '编辑', // 新增/修改标题
            editForm: {}, // 新增/修改数据
            editSkuForm: {},// 新增/修改数据
            isEdit: 0, // 是否新增
            showEdit: false, // 是否显示新增弹出窗口
            isSkuEdit: 0, //sku弹出框的操作类型
            showSkuEdit: false, //显示sku弹出框
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
            goodList: [], //商品列表
            brankList: [], //品牌列表
            statusList: [  //状态列表
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
            skuList: [] //sku列表
        }
    },
	computed: {
        // 搜索区默认显示
        defaultQuery: {
            get() {
                return [
                    {
                        type: 'input',
                        label: '货号',
                        model: 'customNo'
                    },
                    {
                        type: 'input',
                        label: '商品名称',
                        model: 'name'
                    }
                ]
            }
        },
        // 搜索区展开
        moreQuery: {
            get() {
                return [
                	{
                        type: 'select',
                        label: '品牌',
                        text: 'name',
                        value: 'brandID',
                        model: 'brandID',
                        options: this.brankList
                    },
                    {
                        type: 'input',
                        label: '修改人',
                        model: 'editor',
                    },
                    {
                        type: 'timeRange',
                        label: '修改时间',
                        model: 'time',
                        start: 'editTimeRange.editTimeBegin',
                        end: 'editTimeRange.editTimeEnd'                            
                    },
                    {
                        type: 'select',
                        label: '状态',
                        text: 'text',
                        value: 'value',
                        model: 'status',
                        options: this.statusList
                    },
                    
                ]
            }
        }
    },
    mounted() {
        // 获取商品列表
        this.selectGoodsListPage()
        this.getAllBrand() //下拉框-品牌列表
    },
    methods: {
        // 查询商品列表
        selectGoodsListPage() {
            if (this.query.status === '') {
                this.query.status = -1
            }
            ajax.selectGoodsListPage(this.query, this.page, this.pageSize).then((result) => {
                this.goodList = result.dataList
                this.total = result.total
            })
        },
        // 获取商品的sku
        getSku(row, expanded) {
            if (expanded) {
                ajax.selectBarcodesByGoodsID(row.goodsID).then((result) => {
                    this.skuList = result
                }) 
            } 
        },
        // 下拉框-品牌列表
        getAllBrand() {
            ajax.getAllBrand().then((result) => {
                this.brankList = result
            })
        },
        // 搜索区显示更多
        toggleOpen(isShow) {
            this.isShowMoreQuery = isShow
        },
        // 搜索按钮
        search() {
            this.page = 1
            this.selectGoodsListPage()
        },
        // 全选
        selectChange(selections) {
            this.selected = []
            selections.forEach((item) => {
                this.selected.push(item.goodsID)
            })
        },
        // 分页-当前页数更新触发
        currentChange(current) {
            this.page = current
            this.selectGoodsListPage()
        },
        // 分页-每页条数更改时触发
        sizeChange(size) {
            this.pageSize = size
            this.selectGoodsListPage()
        },
        // 编辑
        edit(item) {
            this.showEdit = true
            this.isEdit = 1
            this.editTitle = '编辑商品'
            ajax.selectBasGoodsDetail(item.goodsID).then((result) => {
                this.editForm = result
            })
        },
        // 编辑sku
        editSku(item,flag) {
            this.showSkuEdit = true
            this.isSkuEdit = flag
            if (flag ===1) {
                this.editTitle = '编辑SKU'
                // 这里要请求详情
                // this.editSkuForm = item
                ajax.selectBarcodeDetail(item.barcodeID).then((result) => {
                    this.editSkuForm = result
                })
            }
            else {
                this.editTitle = '调整库存'
                // 要传id过去
                this.editSkuForm = item
                // this.editSkuForm = {}
            }
            
        },
        // 新增
        add() {
            this.showEdit = true
            this.isEdit = 2
            this.editTitle = '新增商品'
            this.editForm = {}
        },
        // 新增sku
        addSku(item) {
            this.showSkuEdit = true
            this.isSkuEdit = 0
            this.editTitle = '添加SKU'
            this.editSkuForm = item
        },
        // 启用商品
        enable() {
            if (this.selected.length === 0) {
                this.$message({
                    message: '请先选择要启用的商品',
                    type: 'warning'
                })
                return
            }
            ajax.updateBasGoodsStatus({
                listID: this.selected,
                status: 1
            }).then(() => {
                this.$message({
                    message: '启用成功',
                    type: 'success'
                })
                this.selectGoodsListPage()
            })
        },
        // 禁用商品
        disable() {
            if (this.selected.length === 0) {
                this.$message({
                    message: '请先选择要禁用的商品',
                    type: 'warning'
                })
                return
            }
        	ajax.updateBasGoodsStatus({
                listID: this.selected,
                status: 0
            }).then(() => {
                this.$message({
                    message: '禁用成功',
                    type: 'success'
                })
                this.selectGoodsListPage()
            })
        },
        // 禁用Sku
        disableSku(item) {
            this.$confirm('你确定禁用此sku?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                ajax.updateBasBarCodeStatus({
                    id: item.barcodeID,
                    status: 0
                }).then(() => {
                    this.$message({
                        message: '禁用成功',
                        type: 'success'
                    })
                    this.refershSku(item.goodsID)
                })
            })
        },
        // 启用Sku
        ableSku(item) {
            this.$confirm('你确定启用此sku?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                ajax.updateBasBarCodeStatus({
                    id: item.barcodeID,
                    status: 1
                }).then(() => {
                    this.$message({
                        message: '启用成功',
                        type: 'success'
                    })
                    this.refershSku(item.goodsID)
                })
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
        // 关闭sku弹出窗口
        closeSkuEdit() {
            this.showSkuEdit = false
        },
        // 刷新页面
        refresh() {
            this.page = 1 
            this.selectGoodsListPage()
        },
        // 刷新sku列表
        refershSku(goodsID) {
            this.page = 1
            const row = {}
            row.goodsID = goodsID
            this.getSku(row,true)
        },
    }
}