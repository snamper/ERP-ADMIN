import PgTable from './components/table/index.vue'
import PgEdit from './components/edit/index.vue'
import PgAccount from './components/accountBill/index.vue'
import {customer} from 'services'
import {finance as ajax} from 'services'

export default {
    components: {
        PgTable,
        PgEdit,
        PgAccount
    },
    data() {
        return {
            isShowMoreQuery: false, // 搜索区是否显示更多
            // 搜索条件
            query: {
                distributorGroupID: '',//团队
                name: '',//真实名称
                customerGradeName : '',//等级
                time:'',//修改时间
                editTimeBegin :'',//开始时间
                editTimeEnd  :'',//结束时间
                editor :'',//操作人
            },
            page: 1, // 当前页码
            pageSize: 15, // 每页条数
            total: 40, // 总条数
            selected: [],
            editForm: {}, // 新增/修改数据
            showEdit: false, // 是否显示新增弹出窗口

            isDetail:false,//是否查看流水
            customerList: [
            ],//分销账户列表集合
            groups:[]//已经启用的团队列表
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
                        text: 'desc',
                        value: 'id',
                        options: this.groups                       
                    },
                    {
                        type: 'input',
                        label: '真实姓名',
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
                        label: '等级',
                        model: 'customerGradeName'                            
                    },
                    {
                        type: 'input',
                        label: '操作人',
                        model: 'editor'                            
                    },
                    {
                        type: 'timeRange',
                        label: '修改时间',
                        model: 'time'                            
                    },                                        
                ]
            }
        }
    },
    mounted() {
        // 获取团队-下拉
        this.selectBasDistributorGroupAllList()
        //获取分销账户列表
        this.search()
    },
    methods: {
        // 获取团队-下拉
        selectBasDistributorGroupAllList() {
            customer.selectBasDistributorGroupAllList().then((result) => {
                this.groups = result
            })
        },
        // 搜索区显示更多
        toggleOpen(isShow) {
            this.isShowMoreQuery = isShow
        },
        // 搜索按钮
        search() {
            if(this.query.time.length>0) {
                this.query.editTimeBegin = this.query.time[0]
                this.query.editTimeEnd = this.query.time[1]
            }
            this.getDistributorAccountList()
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
            this.editForm = item
        },
        //账户流水
        detail(item){
            this.isDetail = true
            this.editForm = item
        },
        // 新增
        add() {
            this.showEdit = true
            this.isEdit = false
            this.editTitle = '新增'
            this.editForm = {}
        },
        // 关闭弹出窗口
        closeEdit(type) {
            console.info(type)
            if(type == 1) {
                this.showEdit = false
            }else if (type == 2) {
                this.isDetail = false
            }
            this.search()
        },
        //获取分销账户列表
        getDistributorAccountList(){
            ajax.queryDistributorAccountList(this.page, this.pageSize, this.query)
                .then((result)=>{
                    this.customerList = result.dataList
                    this.total = result.total
                })
        }
    },
    watch:{
        page(val){
            this.search()
        },
        pageSize(val){
            this.search()
        }
    }
}