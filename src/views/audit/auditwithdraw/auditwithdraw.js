import PgTable from './components/table/index.vue'
import { audit as ajax } from '../../../services'

export default {
    components: {
        PgTable,
    },
    data() {
        return {
            isShowMoreQuery: false, // 搜索区是否显示更多
            // 搜索条件
            query: {
                condition: {
                    name: "",//客户姓名
                    parentName: "",//上级姓名
                    distributorGroupID: "",//团队id
                    mobile: "",//手机号
                    wechat: "",//微信号
                    applyTimeRange: {//申请时间范围
                        editTimeBegin: "",
                        editTimeEnd: ""
                    },
                    time:[],
                    gradeName: "",//等级名
                    IsCompany:1,
                    flag: 0//审核状态,0:申请,95:撤销,97:拒绝,100:完成,
                },
                pageSize: 15,
                page: 1
            },
            // 重置搜索条件
            resetForm: {
                condition: {
                    name: "",//客户姓名
                    parentName: "",//上级姓名
                    distributorGroupID: "",//团队id
                    mobile: "",//手机号
                    wechat: "",//微信号
                    applyTimeRange: {//申请时间范围
                        editTimeBegin: "",
                        editTimeEnd: ""
                    },
                    time:[],
                    gradeName: "",//等级名
                    flag: 0//审核状态,0:申请,95:撤销,97:拒绝,100:完成
                },
                pageSize: 15,
                page: 1
            },
            page: 1, // 当前页码
            pageSize: 15, // 每页条数
            total: 40, // 总条数
            selected: [],
            teamList: [],//团队下拉列表数据
            auditwithdrawList:[],//返回数据列表
            // 操作区按钮
            operations: [
                {
                    name: '待公司审核',
                    action: 'add',
                    type: 'default',
                    flag: 0
                },
                {
                    name: '已完成',
                    action: 'leadIn',
                    type: 'default',
                    flag: 100
                },
                {
                    name: '已拒绝',
                    action: 'educe',
                    type: 'default',
                    flag: 99
                }
            ],
        }
    },
    computed: {
        // 搜索区默认显示
        defaultQuery: {
            get() {
                return [
                    {
                        type: 'input',
                        label: '客户姓名',
                        model: 'name'
                    },
                    {
                        type: 'input',
                        label: '上级',
                        model: 'parentName',
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
                        label: '申请团队',
                        model: 'distributorGroupID',
                        text: 'name',
                        value: 'distributorGroupID',
                        options: this.teamList
                    },
                    {
                        type: 'input',
                        label: '手机号',
                        model: 'mobile'                            
                    },
                    {
                        type: 'input',
                        label: '微信号',
                        model: 'wechat'                            
                    },
                    {
                        type: 'timeRange',
                        label: '申请时间',
                        model: 'time'                            
                    },
                    {
                        type: 'input',
                        label: '等级',
                        model: 'gradeName'                            
                    },
                ]
            }
        }
    },
    mounted(){
        this.getTeamList()//加载获取团队下拉列表
        this.search()
    },
    methods: {
        //获取团队列表
        getTeamList(){
            let query=  {
                code: '',
                name: '',
                editor: '',
                time:'',
                beginEditTime:'',
                endEditTime:'',
                status: '1',
                note:'',
            };
            ajax.queryTeamList(1,100,query).
              then((result)=>{
                  if(result){
                      this.teamList = result.dataList;
                  }
            });
        },
        //获取分销商升级审核
        getSelectWithdrawCashListPage(){
            if(this.query.condition.time.length != 0) {
                this.query.condition.applyTimeRange.editTimeBegin = this.util.formatTimeRange(this.query.condition.time[0], true)//起始时间
                this.query.condition.applyTimeRange.editTimeEnd = this.util.formatTimeRange(this.query.condition.time[1], true)//截止时间
            }

            this.query.page = this.page//当前页面
            this.query.pageSize = this.pageSize//每页条数

            console.log(this.query)

            ajax.selectWithdrawCashListPage(this.query).then((result)=>{
                console.log(result)
                this.auditwithdrawList = result.dataList
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
            this.getSelectWithdrawCashListPage()
        },
        // 全选
        selectChange(selections) {
            this.selected = selections
            console.log(selections)

        },
        // 分页-当前页数更新触发
        currentChange(current) {
            this.page = current
            this.getSelectWithdrawCashListPage()

        },
        // 分页-每页条数更改时触发
        sizeChange(size) {
            this.pageSize = size
            this.getSelectWithdrawCashListPage()

        },
        //展现那种列表
        handleClick(btn){
            console.log(btn)
            this.query.condition.flag = btn.flag
            this.getSelectWithdrawCashListPage()
        },
        refresh(){
            this.getSelectRegisterListPage()
        },
    }
}