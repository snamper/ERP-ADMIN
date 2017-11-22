import PgTable from './components/table/index.vue' //表格
import PgEdit from './components/edit/index.vue' //新增或者修改页面
import PgExpress from './components/express/index.vue' //新增API页面
import { order as ajax } from '../../../services'

export default {
    components: {
        PgTable,
        PgEdit,
        PgExpress
    },
    data() {
        return {
            isShowMoreQuery: false, // 搜索区是否显示更多
            // 搜索条件
            query: {
                condition: {
                    code: "",//编码 
                    name: "",//名称
                    status: -1,//状态
                    deliveryID: "" //快递id
                },
                pageSize: 15,
                page: 1
            },
            resetForm: {
                condition: {
                    code: "",//编码 
                    name: "",//名称
                    status: -1,//状态
                    deliveryID: "" //快递id
                },
                pageSize: 15,
                page: 1
            },
            //启用/禁用参数
            queryState: {
                listID: [], //merchantDeliveryID ListID
                status: 0 // 状态  1=启用，申请通过 0=禁用，申请拒绝
            },
            page: 1, // 当前页码
            pageSize: 15, // 每页条数
            total: 10, // 总条数
            selected: [],
            editTitle: '编辑', // 新增/修改标题
            expressTitle: '配置接口',//配置接口标题
            editForm: {}, // 新增/修改数据
            expressForm: {},
            isEdit: false, // 是否新增
            showEdit: false, // 是否显示新增弹出窗口
            deliveryList: [],//快递下拉列表数据
            merchantDeliveryPageList: [],//获取快递数据
            dialogFormVisible:false,//是否显示增加API页面
            isOpenFileUpload: false, // 是否打开导入框
            // 操作区按钮
            operations: [
                {
                    name: '新增',
                    action: 'add',
                    type: 'primary'
                },  
                // {
                //     name: '导入快递信息',
                //     action: 'leadCourier'
                // },                          
                {
                    name: '启用',
                    action: 'enable'
                },
                {
                    name: '禁用',
                    action: 'disable'
                },
            ],
            //状态下拉选框
            stateList: [
                {
                    name: "不限",
                    val: -1,
                },
                {
                    name: "启用",
                    val: 1,
                },
                {
                    name: "禁用",
                    val: 0,
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
                        label: '编码',
                        model: 'code'
                    },
                    {
                        type: 'input',
                        label: '名称',
                        model: 'name'
                    }
                ]
            }
        },
        moreQuery: {
            get() {
                return [
                	{
                        type: 'select',
                        label: '状态',
                        text: 'name',
                        model: 'status',
                        value: 'val',
                        options: this.stateList
                    },
                    {
                        type: 'select',
                        label: '所属快递',
                        model: 'deliveryID',
                        text: 'name',
                        value: 'deliveryID',
                        options: this.deliveryList
                    },
                ]
            }
        }
    },
    mounted(){
        this.getDelivery() //获取快递单下拉列表
        this.search()
    },
    methods: {
        //获取快递单下拉列表
        getDelivery(){
            ajax.getBasDeliveryList().then((result)=>{
                this.deliveryList = result 
            })
        },
        getDeliveryPageList(){

            this.query.page = this.page//当前页面
            this.query.pageSize = this.pageSize//每页条数            
            ajax.getSelectBasMerchantDeliveryPageList(this.query).then((result)=>{
                this.merchantDeliveryPageList = result.dataList 
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
            this.getDeliveryPageList()
        },
        // 全选
        selectChange(selections) {
            this.selected = selections

            this.queryState.listID = [] //现清空listID
            this.selected.forEach((obj)=>{
                this.queryState.listID.push(obj.merchantDeliveryID)
            })
        },
        // 分页-当前页数更新触发
        currentChange(current) {
            this.page = current
        },
        // 分页-每页条数更改时触发
        sizeChange(size) {
            this.pageSize = size
        },
        // 修改快递
        edit(item) {
            this.showEdit = true
            this.isEdit = false
            this.editTitle = '修改快递公司'
            this.editForm = item
        },
        // 新增快递
        add() {
            this.showEdit = true
            this.isEdit = true
            this.editTitle = '新增快递公司'
            this.editForm = {}
        },
        // 启用
        enable() {
            console.log('启用')
            if(this.queryState.listID.length == 0) {
                this.$message({
                    message: '请至少选择一条',
                    type: 'warning'
                }) 

                return
            } 
                      
            this.queryState.status = 1 //启用
            ajax.updateStatus(this.queryState).then((result)=>{
                this.$message({
                    message: '启用成功',
                    type: 'success'
                })
                this.getDeliveryPageList()
            })
        },
        // 禁用
        disable() {
            console.log('禁用')
            if(this.queryState.listID.length == 0) {
                this.$message({
                    message: '请至少选择一条',
                    type: 'warning'
                }) 

                return
            } 

            this.queryState.status = 0 //禁用
            ajax.updateStatus(this.queryState).then((result)=>{
                this.$message({
                    message: '禁用成功',
                    type: 'success'
                }) 

                this.getDeliveryPageList()
            })            
        },
        // // 导入快递信息
        // leadCourier() {
        //     this.isOpenFileUpload = true //显示导入框
        // },
        // // 导入成功
        // deliverySheetUploadSuccess() {
        //     this.refresh()  //重新加载数据
        // },
        // 关闭弹出窗口
        closeEdit() {
            this.showEdit = false
            this.dialogFormVisible = false
        },
        //弹出快递配置窗口
        adddialogForm(item){
            this.dialogFormVisible = true
            this.expressForm = item 
        },
        //刷新数据
        refresh(){
            this.page = 1
            this.getDeliveryPageList()  
        },
    }
}