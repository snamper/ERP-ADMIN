import PgTable from './components/table/index.vue'
import { result as ajax }  from '../../../services'

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
                    distributorGroupID: "",//分销团队ID ,
                    name: "",//分销商行名
                    parentName: "",//上级姓名
                    gradeName: "",//等级名
                    registerTimeRange: {//注册时间范围
                        editTimeBegin: "",
                        editTimeEnd: ""
                    },
                    statisticsTimeRange: {//统计时间范围
                        editTimeBegin: "",
                        editTimeEnd: ""
                    },
                    time1:[],
                    time2:[],
                },
                pageSize: 0,
                page: 0
            },
            //重置搜索条件
            resetForm: {
                condition: {
                    distributorGroupID: "",//分销团队ID ,
                    name: "",//分销商行名
                    parentName: "",//上级姓名
                    gradeName: "",//等级名
                    registerTimeRange: {//注册时间范围
                        editTimeBegin: "",
                        editTimeEnd: ""
                    },
                    statisticsTimeRange: {//统计时间范围
                        editTimeBegin: "",
                        editTimeEnd: ""
                    },
                    time1:[],
                    time2:[],
                },
                pageSize: 0,
                page: 0
            },
            page: 1, // 当前页码
            pageSize: 15, // 每页条数
            total: 40, // 总条数
            teamList:[],//团队下拉列表
            resultstatisticsList: [],//返回的列表数据
            // 操作区按钮
            operations: [
                {
                    name: '导出报表',
                    action: 'add',
                    type: 'primary',
                    isConfirm:true
                },
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
                        label: '团队名称',
                        model: 'distributorGroupID',
                        text: 'name',
                        value: 'distributorGroupID',
                        options:this.teamList,//团队数据
                    },
                    {
                        type: 'input',
                        label: '分销商姓名',
                        model: 'name'                            
                    },
                ]
            }
        },
        moreQuery: {
            get() {
                return [
                    {
                        type: 'input',
                        label: '上级姓名',
                        model: 'parentName'                            
                    },
                    {
                        type: 'input',
                        label: '等级',
                        model: 'gradeName',
                    },
                    {
                        type: 'timeRange',
                        label: '注册时间',
                        model: 'time1'                            
                    },
                    {
                        type: 'timeRange',
                        label: '统计时间段',
                        model: 'time2'                            
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
        //获取分销商注册申请
        getSelectPerformanceStatisticslistPage(){
            if(this.query.condition.time1.length != 0) {
                this.query.condition.registerTimeRange.editTimeBegin = this.util.formatTimeRange(this.query.condition.time1[0], true)//起始时间
                this.query.condition.registerTimeRange.editTimeEnd = this.util.formatTimeRange(this.query.condition.time1[1], true)//截止时间
            }

            if(this.query.condition.time2.length != 0) {
                this.query.condition.statisticsTimeRange.editTimeBegin = this.util.formatTimeRange(this.query.condition.time2[0], true)//起始时间
                this.query.condition.statisticsTimeRange.editTimeEnd = this.util.formatTimeRange(this.query.condition.time2[1], true)//截止时间
            }

            this.query.page = this.page//当前页面
            this.query.pageSize = this.pageSize//每页条数

            console.log(this.query)

            ajax.selectPerformanceStatisticslistPage(this.query).then((result)=>{
                console.log(result)
                this.resultstatisticsList = result.dataList
                console.log(this.resultstatisticsList)
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
            console.log(this.query)
            this.getSelectPerformanceStatisticslistPage()
        },
        // 分页-当前页数更新触发
        currentChange(current) {
            this.page = current
            this.getSelectPerformanceStatisticslistPage()
        },
        // 分页-每页条数更改时触发
        sizeChange(size) {
            this.pageSize = size
            this.getSelectPerformanceStatisticslistPage()
        },
        // 新增
        add() {
            console.log('导出报表')
        },
    }
}