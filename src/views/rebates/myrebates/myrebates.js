import PgTable from './components/table/index.vue'
import PgEdit from './components/edit/index.vue'
import { rebates as ajax } from '../../../services'

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
                editTimeRange: {//修改时间范围
                    editTimeBegin: "",//起始
                    editTimeEnd: ""//截止
                },
                time: "",//修改时间
                editor: "",//修改人
            },
            //重置搜索条件
            resetForm: {
                distributorGroupID: "",//分销团队ID
                configType: "",//参考指标
                payMothod: "",//发放方式
                editTimeRange: {//修改时间范围
                    editTimeBegin: "",//起始
                    editTimeEnd: ""//截止
                },
                time: "",//修改时间
                editor: "",//修改人
            },
            page: 1, // 当前页码
            pageSize: 15, // 每页条数
            total: 0, // 总条数
            selected: [],//全选数据
            editTitle: '编辑', // 新增/修改标题
            editForm: {}, // 新增/修改数据
            isEdit: false, // 是否新增
            showEdit: false, // 是否显示新增弹出窗口
            teamList: [],//团队列表，提供下拉框使用  
            myrebatesList: [],//请求过来的列表数据                      
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
        }
    },
    computed: {
        // 搜索区默认显示区域
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
                                text: '订单利润',
                                value: 3
                            },  
                        ]                        
                    },
                ]
            }
        },
        //搜索隐藏区域
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
                ]
            }
        }
    },
    mounted(){
        this.getTeamList()
        this.search()
    },
    methods: {
        //获取团队列表
        getTeamList(){
            ajax.getTeamList().then((result)=>{
                this.teamList = result
            })
        },
        //获取个人业绩列表
        selectPersonConfig(){
            ajax.selectPersonConfig(this.query, this.page, this.pageSize).then((result)=>{
                this.myrebatesList = result.dataList
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
            this.selectPersonConfig()
        },
        // 全选
        selectChange(selections) {
            this.selected = []
            selections.forEach((item) => {
                this.selected.push(item.distributorPersonConfigID)
            })
        },
        // 分页-当前页数更新触发
        currentChange(current) {
            this.page = current
            this.selectPersonConfig()
        },
        // 分页-每页条数更改时触发
        sizeChange(size) {
            this.pageSize = size
            this.selectPersonConfig()
        },
        // 编辑
        edit(item) {
            this.showEdit = true
            this.isEdit = true
            this.editTitle = '个人返点编辑'
            ajax.getPersonConfigDetail(item.distributorPersonConfigID).then((result) => {
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
            this.editTitle = '个人返点新增'
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
            ajax.updatePersonConfigStatus({
                listID: this.selected,
                status: 1
            }).then(() => {
                this.$message({
                    message: '启用成功',
                    type: 'success'
                })
                this.selectPersonConfig()
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
            ajax.updatePersonConfigStatus({
                listID: this.selected,
                status: 0
            }).then(() => {
                this.$message({
                    message: '禁用成功',
                    type: 'success'
                })
                this.selectPersonConfig()
            })
        },
        // 关闭弹出窗口
        closeEdit() {
            this.showEdit = false
        },
        // 刷新页面
        refresh() {
            this.page = 1
            this.selectPersonConfig()
        }
    }
}