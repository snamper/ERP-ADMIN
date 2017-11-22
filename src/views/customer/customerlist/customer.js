import PgTable from './components/table/index.vue'
import PgEdit from './components/edit/index.vue'
import editPlace from './components/edit/editPlace/index.vue'
import PgLevel from './components/levelDetail/index.vue'
import {customer as ajax} from 'services'

export default {
    components: {
        PgTable,
        PgEdit,
        PgLevel,
        editPlace,
    },
    data() {
        return {
            isShowMoreQuery: false, // 搜索区是否显示更多

            editPlaceShow:false,//是否显示设置地区弹框
            placeData:{},//edit页面的设置地址的参数

            // 搜索条件
            query: {
                distributorGroupID: '',
                customerName: '',
                introducer: '',
                status: '',
                weChat:''
            },
            editType:'',//访问详情类型（‘1‘=新增 ‘2‘=查看 ‘3‘=修改）

            page: 1, // 当前页码
            pageSize: 15, // 每页条数
            total: 10, // 总条数
            selected: [],//全选参数
            editTitle: '编辑', // 新增/修改标题
            editForm: {}, // 新增/修改数据
            isEdit: false, // 是否新增
            isDetail:false,//查看
            showEdit: false, // 是否显示新增弹出窗口
            isShowGoods: false, // 是否显示商品列表弹出框

            teamList:[],//团队列表，提供下拉框使用

            isShowLevel: false, //查看等级开关
            queryLevel:'',//查看上级或者下级

            //树形列表数据
            treeList: [],
            defaultProps: {
                children: 'childs',
                label: 'showText',
            },
            treeDistributorGroupID:'',//树形下拉搜索

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
                },
                {
                    name: '延长授权时间',
                    action: 'delayed'
                },
                {
                    name: '升级',
                    action: 'upgrade'
                },
                {
                    name: '降级',
                    action: 'Downgrade'
                },
                {
                    name: '导入',
                    action: 'ImportFile'
                },
                {
                    name: '导出',
                    action: 'exportFile'
                },
            ],
            //客户列表
            customerList: [],
        }
    },
    mounted () {
        this.getTeamList();
        this.search();
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
                        options:this.teamList
                    },
                    {
                        type: 'input',
                        label: '真实姓名',
                        model: 'customerName'
                    }
                ]
            }
        },
        moreQuery: {
            get() {
                return [
                    {
                        type: 'input',
                        label: '推荐人',
                        model: 'introducer'                            
                    },
                    {
                        type: 'select',
                        label: '状态',
                        text: 'text',
                        value: 'value',
                        model: 'status',
                        options: [
                            {
                                value: -1,
                                text: '不限'
                            },
                            {
                                value: 0,
                                text: '禁用'
                            },
                            {
                                value: 1,
                                text: '启用'
                            }
                        ]
                    },
                    {
                        type: 'input',
                        label: '微信号',
                        model: 'weChat'                            
                    },
                ]
            }
        }
    },
    methods: {
        // 搜索区显示更多
        toggleOpen(isShow) {
            this.isShowMoreQuery = isShow
        },
        // 搜索按钮
        search() {
            this.getCustomerList(this.query);
        },
        // 全选
        selectChange(selections) {
            this.selected=[];
            for(let i = 0;i<selections.length;i++){
                this.selected.push(selections[i].distributorLinkID)
            }
            //this.selected = selections
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
            this.editTitle = '修改客户'
            this.editForm = item
            this.isDetail = false
            this.editType ='3'
        },
        //查看
        detail(item) {
            this.showEdit = true
            this.isEdit = true
            this.editTitle = '查看详情'
            this.editForm = item 
            this.isDetail = true
            this.editType ='2'
        },
        // 新增
        add() {
            this.showEdit = true
            this.isEdit = false
            this.editTitle = '新增分销客户'
            this.editForm = {}
            this.isDetail = false
            this.editType ='1'
            
        },
        // 设置等级
        level(item, type) {
            this.isShowLevel = true
            this.editForm = item
            if(type === 1) {
            this.queryLevel = 'upper'
            } else{
                this.queryLevel = 'lower'
            }
            
        },
        // 启用
        enable() {
            console.log('启用')
            this.changeStatus(1)
        },
        // 禁用
        disable() {
            console.log('禁用')
            this.changeStatus(0)
        },
        //获取团队列表
        getTeamList() {
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
            ajax.queryTeamList(1,100,query)
                .then((result)=>{
                    if(result) {
                        this.teamList = result.dataList
                    }
                })
        },
        
        /**
         * 获取分销客户列表
         */
        getCustomerList(query) {
            let param={
                "condition": query,
                "pageSize": this.pageSize,
                "page": this.page
                }
            ajax.queryCustomerList(param)
                .then((result)=>{
                    if(result) {
                        var list = result.dataList
                        if(list.length>0) {
                            for(let i=0;i<list.length;i++) {
                                let beginTime =  new Date(list[i].beginTime)
                                let endTime = new Date(list[i].endTime)
                                let day = endTime - beginTime
                                let days = Math.floor(day/(24*3600*1000)) 
                                list[i].times = days
                            }
                        }
                        this.customerList = list//result.dataList
                        this.total=result.total
                    }
                });
        },
        //修改分销客户状态
        changeStatus(status) {
            if(!this.selected.length>0){
                this.$message({
                            message:'请选择数据',
                            type:"warning"
                        });
                return
            }
            let txt = status==1?'启用成功':'禁用成功';
            ajax.saveCustomerStatus(this.selected, status)
                .then((result)=>{
                    this.$message({
                            message:txt,
                            type:"success"
                        })
                    this.search()
                    
                })
                .catch((error)=>{
                    this.message.error(error)
                })
        },
        //树形列表数据处理
        treeDataUtil(list) {
            for(let i=0; i<list.length;i++) {
                //创建显示文本
                var oneData = list[i]
                var showText = oneData.customerName+'('
                             + oneData.code+','
                             + oneData.gradeName+','
                             + oneData.childCount+')'
                oneData.showText = showText

                if(oneData.childCount>0) {
                    oneData.childs = []
                    for(let j=0; j<oneData.childCount;j++) {
                        oneData.childs.push({})
                    }
                }
            }
            return list;
        },
        //获取递归数据
        getTree(distributorGroupID, needChild, parentId, customerID,value) {
            let self = this;
            ajax.SelectCustomerTree(distributorGroupID, needChild, parentId, customerID)
                .then((result)=>{
                    //this.search();ChildCount
                    if(result.length>0) {
                        let resultData = this.treeDataUtil(result)
                        if(self.treeList.length == 0) { 
                            self.treeList = resultData

                        } else {
                            value.childs=resultData
                        }
                        
                    }
                    
                })
                .catch((error)=>{
                    this.$message.error(error)
                });
        },
        //搜索直属上下级
        getListPageByLinkID(condition) {
            var self = this;
            ajax.treeClickSelectListPageByLinkID(condition, this.pageSize, this.page)
                .then((result)=>{
                    var list = result.dataList
                        if(list.length>0) {
                            for(let i=0;i<list.length;i++) {
                                let beginTime =  new Date(list[i].beginTime)
                                let endTime = new Date(list[i].endTime)
                                let day = endTime - beginTime
                                let days = Math.floor(day/(24*3600*1000))  
                                list[i].times = days
                            }
                        }
                        this.customerList = list//result.dataList
                        this.total=result.total
                })
                .catch((error)=>{
                    this.$message.error(error)
                });
        },

    /***
     * 提示框？
     * this.$confirm('确定'+ tip +'吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$emit(action)
                }).catch(() => {

                })
     */
        //延时
        delayed() {
            if(!this.selected.length>0){
                this.$message({
                            message:'请选择数据',
                            type:"warning"
                        });
                return
            }
            ajax.extendTime(this.selected)
                .then((result)=>{
                    this.$message({
                            message:'授权延时成功',
                            type:"success"
                        });
                    this.search();
                    
                })
                .catch((error)=>{
                    this.$message.error(error)
                });
            console.info("延时")
        },
        //升级
        upgrade() {
            if(!this.selected.length>0){
                this.$message({
                            message:'请选择数据',
                            type:"warning"
                        });
                return
            }
            ajax.customerLevelUp(this.selected)
                .then((result)=>{
                    this.$message({
                            message:'升级成功',
                            type:"success"
                        });
                    this.search();
                    
                })
                .catch((error)=>{
                    this.$message.error(error)
                });
            console.info("升级")
        },
        //降级
        Downgrade() {
            if(!this.selected.length>0){
                this.$message({
                            message:'请选择数据',
                            type:"warning"
                        });
                return
            }
            ajax.customerLevelDown(this.selected)
                .then((result)=>{
                    this.$message({
                            message:'降级成功',
                            type:"success"
                        });
                    this.search();
                    
                })
                .catch((error)=>{
                    this.$message.error(error)
                });
            console.info("降级")
        },
        //导入
        ImportFile() {
            console.info("导入")
        },
        //导出
        exportFile() {
            console.info("导出")
        },
        // 选择的商品
        changeGoods(list) {
            console.log(list)
        },
        // 关闭商品列表弹出框closeEdit
        closeEdit(type) {
            if(type == 1) {
                this.showEdit = false
            } else if(type == 2) {
                this.isShowLevel = false
            } else if(type == 3) {
                this.isShowGoods = false
            }
            this.search()
        },
        // 树形列表选择事件
        handleNodeClick(value) {
            //if (!value) return true
            console.info('树形列表选择事件value')
            console.info(value)
            let distributorLinkID = value.distributorLinkID
            this.getListPageByLinkID(distributorLinkID)
            // value.Childs = [{id: 11,
            // CustomerName: 'hahadfd'}]
            //this.treeList.
           //this.getTree(id, 0, null, null, null);
        },
        //树形列表展开事件
        nodeExpand(value) {
            if (!value) return true
            console.info('树形列表展开事件value')
            console.info(value)
            let id = value.distributorGroupID
            let parentId = value.customerID
           this.getTree(id, 0, parentId, null, value)
        },
        //设置显示地区
        setPlace(){
            this.editPlaceShow = true
        },
        //修改地区
        modifyPlace(data){
            console.log("data")
            console.log(data)
            this.placeData = data
            this.closePlace()
        },
        //closePlace
        closePlace(){
            this.editPlaceShow = false
        }
    },
    watch: {
      treeDistributorGroupID(val) {
          let query = {
                distributorGroupID: val,
                customerName: '',
                introducer: '',
                status: ''
            }
          this.treeList = [];
          this.getCustomerList(query)
          this.getTree(val, 0, null, null,null)
      },
        page(val){
            this.getCustomerList()
        },
        pageSize(val){
            this.getCustomerList()
        }
      
    },

}