import PgTable from './components/table/index.vue'
import {customer} from 'services'
import {finance as ajax,common} from 'services'

export default {
    components: {
        PgTable,

    },
    data() {
        return {
            isShowMoreQuery: false, // 搜索区是否显示更多
            // 搜索条件
            query: {
                distributorGroupID : '',//团队
                customerName : '',//收佣客户名称
                payCustomerName : '',//付佣客户名称
                sheetType :'',//佣金类型
                timeBegin :'',//开始时间
                timeEnd :'',//结束时间
                time:''
            },
            sheetTypeOption:[
                
            ],//佣金类型选项
            page: 1, // 当前页码
            pageSize: 15, // 每页条数
            total: 40, // 总条数
            selected: [],
            editForm: {}, // 新增/修改数据
            showEdit: false, // 是否显示新增弹出窗口

            isDetail:false,//是否查看流水
            // 操作区按钮
            operations: [
                {
                    name: '导出报表',
                    action: 'exportOrder',
                    type: 'primary'
                },
                
            ],
            reportList: [],//报表列表
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
                        label: '收佣客户名称',
                        model: 'customerName'                            
                    },
                ]
            }
        },
        moreQuery: {
            get() {
                return [
                    
                    {
                        type: 'input',
                        label: '付佣客户名称',
                        model: 'payCustomerName'                            
                    },
                    {
                        type: 'select',
                        label: '佣金类型',
                        model: 'sheetType',
                        text: 'text',
                        value: 'code',
                        options: this.sheetTypeOption                      
                    },
                    {
                        type: 'timeRange',
                        label: '时间',
                        model: 'time'                            
                    },                                        
                ]
            }
        }
    },
    mounted(){
        // 获取团队-下拉
        this.selectBasDistributorGroupAllList()
        this.querySheetType()

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
            console.log(this.query)
            if(this.query.time,length>0) {
                this.timeBegin = this.time[0]
                this.timeEnd = this.time[1]
            }
            this.getReportList()
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
        
        // 导出
        exportOrder() {
            common.exportExcel({
                type: 6,
                condition: this.query
            }).then((result) => {
                this.util.exportFile(result)
            }).catch((error) => {
                this.$message.error(error)
            })
        },
        //查询佣金列表
        getReportList() {
            ajax.queryReportList(this.page, this.pageSize, this.query)
                .then((result)=>{
                    this.reportList = result.dataList
                    this.total = 10
                })
        },
        //查询佣金类型
        querySheetType() {
            ajax.querySheetType()
                .then((result)=>{
                    //this.sheetTypeOption = result
                    let self = this 
                    self.sheetTypeOption.push({
                        code: -1,
                        text: '不限'
                    },)
                    if(result.length > 0) {
                        result.forEach(function(one,index){
                            self.sheetTypeOption.push(one)
                        })
                    }
                    self.query.sheetType = -1
                    this.search()
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