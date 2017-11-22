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
                    oldParentName: "",//原上级姓名
                    parentName: "",//新上级姓名
                    oldGradeName: "",//原等级名
                    mobile: "",//手机号
                    wechat: "",//微信号
                    distributorGroupID: "",//团队id
                    gradeName: "",//申请等级名
                    applyTimeRange: {//申请时间范围
                        editTimeBegin: "",
                        editTimeEnd: ""
                    },
                    time:[],
                    flag: 1//审核状态,0:申请,1:上级通过,10:所有上级通过,95:申请人取消,97:上级决绝,99:公司拒绝,100:完成
                },
                pageSize: 15,
                page: 1
            },
            // 重置搜索条件
            resetForm: {
                condition: {
                    name: "",//客户姓名
                    oldParentName: "",//原上级姓名
                    parentName: "",//新上级姓名
                    oldGradeName: "",//原等级名
                    mobile: "",//手机号
                    wechat: "",//微信号
                    distributorGroupID: "",//团队id
                    gradeName: "",//申请等级名
                    applyTimeRange: {//申请时间范围
                        editTimeBegin: "",
                        editTimeEnd: ""
                    },
                    time:[],
                    flag: 1//审核状态,0:申请,1:上级通过,10:所有上级通过,95:申请人取消,97:上级决绝,99:公司拒绝,100:完成
                },
                pageSize: 15,
                page: 1
            },
            page: 1, // 当前页码
            pageSize: 15, // 每页条数
            total: 40, // 总条数
            selected: [],
            editTitle: '编辑', // 新增/修改标题
            editForm: {}, // 新增/修改数据
            isEdit: false, // 是否新增
            //showEdit: false, // 是否显示新增弹出窗口
            isShowGoods: false, // 是否显示商品列表弹出框
            teamList: [],//团队下拉列表数据
            auditupgradeList:[],//返回列表数据
            // 操作区按钮
            operations: [
                {
                    name: '待公司审核',
                    action: 'add',
                    type: 'default',
                    flag:1
                },
                {
                    name: '已完成',
                    action: 'leadIn',
                    type: 'default',
                    flag:100
                },
                {
                    name: '已拒绝',
                    action: 'educe',
                    type: 'default',
                    flag:99
                }
            ],
            //列表模拟数据
            customerList: [
                {
                    id: 1,
                    customer: '客户姓名',//客户姓名
                    teamname: '申请团队',//申请团队
                    oldGrade: '原来等级',//原来等级
                    applyGrade: '申请等级',//申请等级
                    applyTime: '2017-10-10 12:00',//申请时间
                    oldLeading: '原上级',//原上级
                    newLeading: '新上级',//新上级
                    weChat: 'dinwu',//微信号
                    phone: '13183015306',//手机号
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
                        type: 'input',
                        label: '客户姓名',
                        model: 'name'
                    },
                    {
                        type: 'input',
                        label: '原上级',
                        model: 'oldParentName',
                    }
                ]
            }
        },
        //搜索区显示更多
        moreQuery: {
            get() {
                return [
                    {
                        type: 'input',
                        label: '原来等级',
                        model: 'oldGradeName',
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
                        type: 'select',
                        label: '申请团队',
                        model: 'distributorGroupID',
                        text: 'name',
                        value: 'distributorGroupID',
                        options: this.teamList
                    },
                    {
                        type: 'input',
                        label: '申请等级',
                        model: 'gradeName'                            
                    },
                    {
                        type: 'timeRange',
                        label: '申请时间',
                        model: 'time'                            
                    },
                    {
                        type: 'input',
                        label: '新上级',
                        model: 'parentName'                            
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
        getSelectUpgradeListPage(){
            if(this.query.condition.time.length != 0) {
                this.query.condition.applyTimeRange.editTimeBegin = this.util.formatTimeRange(this.query.condition.time[0], true)//起始时间
                this.query.condition.applyTimeRange.editTimeEnd = this.util.formatTimeRange(this.query.condition.time[1], true)//截止时间
            }

            this.query.page = this.page//当前页面
            this.query.pageSize = this.pageSize//每页条数

            console.log(this.query)

            ajax.selectUpgradeListPage(this.query).then((result)=>{
                console.log(result)
                this.auditupgradeList = result.dataList
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
            this.getSelectUpgradeListPage()
        },
        // 全选
        selectChange(selections) {
            this.selected = selections
            console.log(selections)

        },
        // 分页-当前页数更新触发
        currentChange(current) {
            this.page = current
            this.getSelectUpgradeListPage()
        },
        // 分页-每页条数更改时触发
        sizeChange(size) {
            this.pageSize = size
            this.getSelectUpgradeListPage()
        },
        //展现那种列表
        handleClick(btn){
            console.log(btn)
            this.query.condition.flag = btn.flag
            this.getSelectUpgradeListPage()
        },
        refresh(){
            console.log('1111')
            this.getSelectRegisterListPage()
        },        
    }
}