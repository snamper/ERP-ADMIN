import PgTable from './components/table/index.vue'
import PgEdit from './components/edit/index.vue'
import {customer} from 'services'
import {accredit as ajax} from 'services'

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
                name: '',//名称
                distributorGroupID : '',//授权对象
                time:'',//修改时间
                startEditTime :'',//开始时间
                endEditTime :'',//结束时间
                editor:'',//修改人
                status:'',//状态
            },
            page: 1, // 当前页码
            pageSize: 15, // 每页条数
            total: 40, // 总条数
            selected: [],
            editTitle: '授权新增', // 新增/修改标题
            editForm: {}, // 新增/修改数据
            isEdit: false, // 是否新增
            showEdit: false, // 是否显示新增弹出窗口
            groups:[],//已经启用的全部团队
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
            accreditList: [],//授权列表
            accreditStyleList:[]//授权样式列表
        }
    },
     mounted() {
        
        // 获取团队-下拉
        this.selectBasDistributorGroupAllList()
        //搜索授权列表
        this.search()
        //获取全部已经启用的授权样式
        this.queryEnableAccreditStyleList()
        
    },
    computed: {
        // 搜索区默认显示
        defaultQuery: {
            get() {
                return [
                    {
                        type: 'input',
                        label: '名称',
                        model: 'name'
                    },
                    {
                        type: 'select',
                        label: '授权对象',
                        text: 'desc',
                        value: 'id',
                        model: 'distributorGroupID',
                        options: this.groups                      
                    },
                ]
            }
        },
        moreQuery: {
            get() {
                return [
                    {
                        type: 'timeRange',
                        label: '修改时间',
                        model: 'time'                            
                    },
                    {
                        type: 'input',
                        label: '修改人',
                        model: 'editor'                            
                    },
                    {
                        type: 'select',
                        label: '状态',
                        model: 'status',
                        text: 'text',
                        value: 'value',
                        options: [
                            {
                                value: -1,
                                text: '不限'
                            },
                            {
                                value: 1,
                                text: '已启用'
                            },
                            {
                                value: 0,
                                text: '已禁用'
                            }
                        ]
                    },                                        
                ]
            }
        }
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
                this.query.startEditTime = this.query.time[0]
                this.query.endEditTime = this.query.time[1]
            }
            this.getAccreditList()
        },
        // 全选
        selectChange(selections) {
            this.selected = []
            if(selections.length>0){
                for(let i=0;i<selections.length;i++){
                    this.selected.push(selections[i].authorizationBookID);
                }
            }
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
            this.isEdit = true
            this.editTitle = '授权修改'
            this.editForm = item
        },
        // 新增
        add() {
            this.showEdit = true
            this.isEdit = false
            this.editTitle = '授权新增'
            this.editForm = {}
        },
        // 删除
        del() {
            console.log('删除')
        },
        // 启用
        enable() {
            this.updateAccreditStatus(1, '启用成功')
            console.log('启用')
        },
        // 禁用
        disable() {
            this.updateAccreditStatus(0, '禁用成功')
            console.log('禁用')
        },
        // 关闭弹出窗口
        closeEdit() {
            this.showEdit = false
            this.search()
        },
        //获取授权列表
        getAccreditList(){
            ajax.queryAccreditList(this.page, this.pageSize, this.query)
                .then((result)=>{
                    this.accreditList = result.dataList
                    this.total = result.total
                })
        },
         //获取授权样式列表
        queryEnableAccreditStyleList() {
            ajax.queryEnableAccreditStyleList()
                .then((result)=>{
                    console.log(result)
                    this.accreditStyleList = result
                })
        },
        //修改授权的状态
        updateAccreditStatus(status, messageTxt){
            if(this.selected.length<=0){
                this.$message({
                    message:'请选择数据',
                    type:'warning'
                })
                return 
            }
            ajax.updateAccreditStatus(this.selected,status)
                .then((result)=>{
                    this.$message({
                        message:messageTxt,
                        type:'success'
                    })
                    this.search()
                })
                .catch((error)=>{
                    this.$message.error(error)
                })
        },
    },
    watch:{
        page(val){
            this.page = val
            this.search()
        },
        pageSize(val){
            this.pageSize = val
            this.search()
        }
    }
}