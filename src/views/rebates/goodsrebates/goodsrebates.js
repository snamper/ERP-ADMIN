import PgTable from './components/table/index.vue'
import PgEdit from './components/edit/index.vue'
import {rebates as ajax} from 'services'

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
                distributorGroupID: "",//分销团队ID
                configType: "",//参考指标
                payMothod: "",//发放方式
                editTimeRange: {
                    editTimeBegin: "",//开始时间
                    editTimeEnd:""//结束时间
                },
                time: "",//获取时间段
                editor: "",//修改人
                operType: "",//订单类型
                orderGradeID: "",//下单客户等级ID
            },
            //重置搜索条件
            resetForm: {
                distributorGroupID: "",//分销团队ID
                configType: "",//参考指标
                payMothod: "",//发放方式
                editTimeRange: {
                    editTimeBegin: "",//开始时间
                    editTimeEnd: ""//结束时间
                },
                time: [],//获取时间段
                editor: "",//修改人
                operType: "",//订单类型
                orderGradeID: "",//下单客户等级ID
            },
            page: 1, // 当前页码
            pageSize: 15, // 每页条数
            total: 0, // 总条数
            selected: [],//全选的id
            editTitle: '编辑', // 新增/修改标题
            editForm: {}, // 新增/修改数据
            isEdit: false, // 是否新增
            showEdit: false, // 是否显示新增弹出窗口
            isShowGoods: false, // 是否显示商品列表弹出框
            teamList: [],//团队下拉列表
            orderGrade: [],//下单人等级列表
            // 操作区按钮
            operations: [
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
                }
            ],
            //列表模拟数据
            customerList: [],
        }
    },
    computed: {
        // 搜索区默认显示
        defaultQuery: {
            get() {
                return [
                    {
                        type: 'select',
                        label: '团队',
                        model: 'distributorGroupID',
                        text: 'desc',
                        value: 'id',
                        options: this.teamList
                    },
                    {
                        type: 'select',
                        label: '参考指标',
                        model: 'configType',
                        text: 'text',
                        value: 'value',
                        options: [
                            {
                                text: '全部',
                                value: ""
                            },
                            {
                                text: '订单金额',
                                value: 1
                            },
                            {
                                text: '固定金额',
                                value: 2
                            },
                            {
                                text: '商品金额',
                                value: 3
                            }, 
                        ]
                    }
                ]
            }
        },
        //搜索区显示更多
        moreQuery: {
            get() {
                return [
                    {
                        type: 'select',
                        label: '发放方式',
                        model: 'payMothod',
                        text: 'text',
                        value: 'value',
                        options: [
                            {   
                                text: '全部',
                                value: ""
                            },
                            {   
                                text: '公司发放',
                                value: 1
                            },
                            {   
                                text: '上级发放',
                                value: 0
                            }
                        ]
                    },
                    {
                        type: 'timeRange',
                        label: '修改时间',
                        model: 'time',   
                        start: 'editTimeRange.editTimeBegin',
                        end: 'editTimeRange.editTimeEnd'                             
                    },
                    {
                        type: 'input',
                        label: '修改人',
                        model: 'editor'                            
                    },
                    {
                        type: 'select',
                        label: '订单类型',
                        model: 'operType',
                        text: 'text',
                        value: 'value',
                        options: [
                            {
                                text: '全部',
                                value: ""
                            }, 
                            {
                                text: '首批进货',
                                value: 2
                            }, 
                            {
                                text: '后期补货',
                                value: 1
                            },
                            // {
                            //     text: '一次性',
                            //     value: 4
                            // },
                        ]
                    },
                    {
                        type: 'input',
                        label: '下单人等级',
                        model: 'orderGradeID' ,
                    },
                ]
            }
        }
    },
    mounted() {
        //获取团队下拉列表
        this.getTeamList()
        //执行平级推荐返点设置-分页列表查询
        this.querySibIntroConfig()
    },
    methods: {
        //获取团队列表
        getTeamList(){
            ajax.getTeamList().then((result)=>{
                this.teamList = result
            })
        },
        //获取商品推荐返点设置-分页列表
        querySibIntroConfig() {
            ajax.selectGoodsConfig(this.query, this.page, this.pageSize).then((result) => {
                this.customerList = result.dataList
                this.total = result.total
            })
        },
        // 搜索区显示更多
        toggleOpen(isShow) {
            this.isShowMoreQuery = isShow
        },
        // 搜索按钮
        search() {   
            this.page = 1//当前页面
            this.pageSize = 15//每页条数
            this.querySibIntroConfig()
        },
        // 全选
        selectChange(selections) {
            this.selected = []
            selections.forEach((item) => {
                this.selected.push(item.distributorRebateConfigID)
            })
        },
        // 分页-当前页数更新触发
        currentChange(current) {
            this.page = current
            this.querySibIntroConfig()
        },
        // 分页-每页条数更改时触发
        sizeChange(size) {
            this.pageSize = size
            this.querySibIntroConfig()
        },
        // // 编辑
        edit(item) {
            this.showEdit = true
            this.isEdit = true
            this.editTitle = '编辑'
            ajax.getGoodsConfigDetail(item.distributorRebateConfigID).then((result) => {
                this.editForm = result
            }).catch((error) => {
                this.$message.error(error)
                this.editForm = item
            })
        },
        // 新增
        add() {
            this.showEdit = true
            this.isEdit = false
            this.editTitle = '新增'
            this.editForm = {}
        },
        // 启用
        enable() {
            if (this.selected.length === 0) {
                this.$message({
                    message: '请先选择要启用记录',
                    type: 'warning'
                })
                return
            }
            ajax.updateGoodsConfigStatus({
                listID: this.selected,
                status: 1
            }).then(() => {
                this.$message({
                    message: '启用成功',
                    type: 'success'
                })
                this.querySibIntroConfig()
            })
        },
        // 禁用
        disable() {
            if (this.selected.length === 0) {
                this.$message({
                    message: '请先选择要启用记录',
                    type: 'warning'
                })
                return
            }
            ajax.updateGoodsConfigStatus({
                listID: this.selected,
                status: 0
            }).then(() => {
                this.$message({
                    message: '禁用成功',
                    type: 'success'
                })
                this.querySibIntroConfig()
            })
        },
        // 关闭弹出窗口
        closeEdit() {
            this.isEdit = false
            this.showEdit = false
        },
        // 新增选择商品
        addGoods() {
            this.isShowGoods = true
        },
        // 选择的商品
        changeGoods(list) {
            // console.log(list)
        },
        // 关闭商品列表弹出框
        closeGoods() {
            this.isShowGoods = false
        },
        // 新增/编辑保存之后刷新页面
        refresh() {
            this.page = 1
            this.querySibIntroConfig()
        },
    }
}