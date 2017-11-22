import PgTable from './components/table/index.vue'
import PgEdit from './components/edit/index.vue'
import PgLevel from './components/level/index.vue'
import GdEdit from './components/goods/index.vue'
import GdAddGoods from './components/goods/addgoods/index.vue'
import {customer as ajax} from 'services'
import {goods} from 'services'

export default {
    components: {
        PgTable,
        PgEdit,
        PgLevel,
        GdEdit,
        GdAddGoods
    },
	data () {
        return {
            isShowMoreQuery: false, // 搜索区是否显示更多
            // 搜索条件
            query: {
                code: '',
                name: '',
                editor: '',
                time:'',
                beginEditTime:'',
                endEditTime:'',
                status: '',
                editor:'',
            },
            //分页参数
            
                page: 1, // 当前页码
                pageSize: 15, // 每页条数
                total: 10, // 总条数


            selected: [],
            //编辑
            editTitle: '编辑', // 新增/修改标题
            editForm: {}, // 新增/修改数据
            isEdit: false, // 是否新增
            showEdit: false, // 是否显示新增弹出窗口
            isDetail:false,//查看
            uploadBtn:'上传',//新增/修改的按钮显示

            isShowGoods: false,//设置商品

            isShowLevel: false, //设置等级
            levelList:[],//团队级别集合

            isShowAdd: false,//添加商品
            newgoodList :[] ,//新添加的商品集合

            brankList:[],//品牌列表
            //状态值
            statusList: [
                {
                    text: '不限',
                    value: -1
                },
                {
                    text: '已启用',
                    value: 1
                },
                {
                    text: '已禁用',
                    value: 0
                }, 
            ],
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
            //list数据
            teamList: [
            ]
        }
    },
    computed: {
        // 搜索区默认显示
        defaultQuery: {
            get() {
                return [
                    {
                        type: 'input',
                        label: '编号',
                        model: 'code'
                    },
                    {
                        type: 'input',
                        label: '名称',
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
                        label: '修改人',
                        model: 'editor'
                    },
                    
                    {
                        type: 'timeRange',
                        label: '修改时间',
                        model: 'time'
                    },
                    {
                        type: 'select',
                        label: '状态',
                        text: 'text',
                        value: 'value',
                        model: 'status',
                        options: this.statusList
                    },
                    
                ]
            }
        },
    },
    methods:{
        // 搜索区显示更多
        toggleOpen(isShow) {
            this.isShowMoreQuery = isShow
        },
        // 搜索按钮
        search() {
            this.query.beginEditTime = this.query.time[0]
            this.query.endEditTime = this.query.time[1]
            this.getTeamList()
        },
        // 全选
        selectChange(selections) {
            this.selected=[];
            for(let i=0;i<selections.length;i++){
                this.selected.push(selections[i].distributorGroupID)
            }
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
            this.editTitle = '修改团队'
            this.editForm = item
            this.uploadBtn = '修改'
            this.isDetail = false
        },
        //查看
        detail(item) {
            this.showEdit = true
            this.isEdit = true
            this.editTitle = '团队详情'
            this.editForm = item
            this.isDetail = true
        },
        // 新增
        add() {
            this.showEdit = true
            this.isEdit = false
            this.editTitle = '新增团队'
            this.editForm = {}
            this.uploadBtn = '上传'
            this.isDetail = false
        },
        // 启用
        enable() {
            if(!this.selected.length>0){
                this.$message({
                            message:'请选择数据',
                            type:"warning"
                        });
                return
            }
            var status = 1
            ajax.changeSatus(this.selected, status)
                .then((result)=>{
                    this.$message({
                        message:"启用成功",
                        type:"success"
                    });
                    this.search()
                    
                })
                .catch((error)=>{
                    this.$message.error(error)
                });
        },
        // 禁用
        disable() {
            if(!this.selected.length>0){
                this.$message({
                            message:'请选择数据',
                            type:"warning"
                        });
                return
            }
            var status = 0;
            ajax.changeSatus(this.selected, status)
                .then((result)=>{
                    this.$message({
                        message:"禁用成功",
                        type:"success"
                    });
                    this.search()
                })
                .catch((error)=>{
                    this.$message.error(error)
                });
        },
        // 设置商品
        goods(item) {
            this.isShowGoods = true
            this.editForm = item
        },
        //增加商品
        showAddGood() {
            this.isShowAdd = true
        },
        // 设置等级
        level(item) {
            this.isShowLevel = true
            this.editForm = item
 
        },
        //更新商品列表
        updateForm(fromList) {
            this.newgoodList = []
            if(fromList&&fromList.length>0) {
                this.newgoodList = fromList
                
            }
            this.closeEdit(4)
        },
        // 删除
        del() {

        },
        //获取团队列表
        getTeamList() {
        
            ajax.queryTeamList(this.page, this.pageSize, this.query)
                .then((result)=>{
                    if(result) {
                        this.total = result.total
                        this.teamList = result.dataList
                    }
                });
        },
        //查询团队级别列表
        getTeamLevelList(distributorGroupID) {
            ajax.queryTeamLevelList(distributorGroupID)
                .then((result)=>{
                    this.levelList = result
                });
        },
         // 获取品牌列表
        selectListPage() {
            let query={
                propertyTypeID: '',
                merchantID: '',
                name: '',
                status:1,
                code: '',
                editor: '',
                time: '',
                startEditTime: '',
                endEditTime: '',
                note: ''
            }
            goods.selectListPage(this.query,1,100000).then((result) => {
                this.brankList = result.dataList
            })
        },

        // 关闭弹出窗口
        closeEdit(type) {
            if(type==1){
                this.showEdit = false
            } else if(type==2){
                this.isShowLevel = false
            } else if(type==3){
                this.isShowGoods = false
            }else if (type==4){
                this.isShowAdd = false
            }
            this.search()
        }
    },
    mounted() {
        this.getTeamList()
        this.selectListPage()
    },
    watch:{
        page(val){
            this.getTeamList()
        },
        pageSize(val){
            this.getTeamList()
        }
    }
}