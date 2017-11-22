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
                condition: {
                    distributorGroupID: "",//分销团队ID
                    configType: "",//参考指标
                    payMothod: "",//发放方式
                    editTimeRange: {
                      editTimeBegin: "",//开始时间
                      editTimeEnd:""//结束时间
                    },
                    time: [],//获取时间段
                    editor: "",//修改人
                    operType: "",//订单类型
                    orderGradeID: "",//下单客户等级ID
                },
                page: 1, // 当前页码
                pageSize: 15, // 每页条数
            },
            //重置搜索条件
            resetForm: {
                condition: {
                    distributorGroupID: "",//分销团队ID
                    configType: "",//参考指标
                    payMothod: "",//发放方式
                    editTimeRange: {
                      editTimeBegin: "",//开始时间
                      editTimeEnd:""//结束时间
                    },
                    time: [],//获取时间段
                    editor: "",//修改人
                    operType: "",//订单类型
                    orderGradeID: "",//下单客户等级ID
                },
                page: 1, // 当前页码
                pageSize: 15, // 每页条数
            },
            page: 1, // 当前页码
            pageSize: 15, // 每页条数
            total: 0, // 总条数
            selected: [],//全选的id
            editTitle: '编辑', // 新增/修改标题
            editForm: {}, // 新增/修改数据
            isEdit: false, // 是否新增
            showEdit: false, // 是否显示新增弹出窗口
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
            customerList: [
                // {
                //     distributorIntroConfigID: "",
                //     eeamName: "",//团队
                //     orderGradeName: "",//下单人等级
                //     operType: "",//
                //     operTypeDesc: "",//订单类型
                //     configType: "",//
                //     configTypeDesc: "",//参考指标
                //     payMothod: "",//
                //     payMothodDesc: "",//发放方式
                //     editTime: "",//修改时间
                //     editor: "",//修改人
                //     note: "",//备注
                //     status: "",//
                //     satusDesc: ""//状态
                // }, 
            ],
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
                                value: ''
                            },
                            {
                                text: '订单金额',
                                value: 1
                            },
                            {
                                text: '商品金额',
                                value: 2
                            },
                            {
                                text: '固定金额',
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
                                value: ''
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
                                value: ''
                            }, 
                            {
                                text: '首发',
                                value: 2
                            }, 
                            {
                                text: '补发',
                                value: 1
                            },
                            // {
                            //     text: '一次性',
                            //     value: 4
                            // },
                        ]
                    },
                    {
                        type: 'select',
                        label: '下单人等级',
                        model: 'orderGradeID' ,
                        text: 'name',
                        value: 'customerGradeID',
                        options: this.orderGrade
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
    watch: {
        'query.condition.distributorGroupID': function() {
            this.queryBasCustomerGradeList(this.query.condition.distributorGroupID)
        }   	
    },
    methods: {
        //获取团队列表
        getTeamList(){
            ajax.getTeamList().then((result)=>{
                this.teamList = result
                //desc id
            })
        },
        //根据选择的团队id获取团队等级列表
        queryBasCustomerGradeList(distributorGroupID) {
            ajax.getBasCustomerGradeList(distributorGroupID).then((result) => {
                this.orderGrade = result
            })
        },
        //获取平级推荐返点设置-分页列表
        querySibIntroConfig() {
            //console.log(this.query)
            ajax.selectSibIntroConfig(this.query)
                .then((result) => {
                    this.customerList = result.dataList
                    this.total = result.total
                })
        },
        // 搜索区显示更多
        toggleOpen(isShow) {
            this.isShowMoreQuery = isShow
            console.log(this.isShowMoreQuery)
        },
        // 搜索按钮
        search() {
            this.page = 1
            this.query.condition.editTimeRange.editTimeBegin = this.util.formatTimeRange(this.query.condition.time[0], true)//起始时间
            this.query.condition.editTimeRange.editTimeEnd = this.util.formatTimeRange(this.query.condition.time[1], true)//截止时间
            this.query.page = this.page//当前页面
            this.query.pageSize = this.pageSize//每页条数
            this.querySibIntroConfig()
        },
        // 全选
        selectChange(selections) {
            //this.selected = selections
            this.selected = []
            selections.forEach((item) => {
                this.selected.push(item.distributorIntroConfigID)
            })
            //console.log(selections)
        },
        // 分页-当前页数更新触发
        currentChange(current) {
            this.query.page = current
            this.querySibIntroConfig()
        },
        // 分页-每页条数更改时触发
        sizeChange(size) {
            this.query.pageSize = size
            this.querySibIntroConfig()
        },
        // // 编辑
        edit(item) {
            this.showEdit = true
            this.isEdit = true
            this.editTitle = '编辑'
            // ajax.getIntroConfigDetail(id).then((result) => {
            //     this.form = result
            //     // 用于记录初始值
            //     // this.form.distributorGroupID_old = this.form.distributorGroupID
            //     //console.log('this.form')

            // })
            this.editForm = item
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
            //console.log('启用')
            ajax.UpdateIntroConfigStatus({
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
            //console.log('禁用')
            ajax.UpdateIntroConfigStatus({
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
        // 新增/编辑保存之后刷新页面
        refresh() {
            this.page = 1
            this.querySibIntroConfig()
        }
    }
}