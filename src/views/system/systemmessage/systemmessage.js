import PgTable from './components/table/index.vue'
import PgEdit from './components/edit/index.vue'

import {system as ajax} from 'services'
import {customer} from 'services'
import {goods} from 'services'

export default {
    components: {
        PgTable,
        PgEdit,
    },
	data () {
        return {

            teams:[],//团队下拉列表

            //文本类型
            textType:[
                {
                    text: '不限',
                    value: -1
                },
                {
                    text: '代理商合同协议',
                    value: 1
                },
                {
                    text: '团队等级权益',
                    value: 2
                },
                {
                    text: '自定义页面',
                    value: 99
                },  
            ],

            isShowMoreQuery: false, // 搜索区是否显示更多
            // 搜索条件
            // query: {
            //     textType: '-1',
            //     distributorGroupID:'',
            //     name: '',
            //     editor: '',
            //     time:'',
            //     beginEditTime:'',
            //     endEditTime:'',
            //     status: -1,
            // },
            query: {
                subject: '',
                distributorGroupID: '',
                editor: '',
                time: '',
                editTimeBegin: '',
                editTimeEnd: '',
                flag: -1 //不限-1
            },
            // query: {
            //     condition: {
            //         subject: '',
            //         distributorGroupID: '',
            //         editor: '',
            //         time: '',
            //         editTimeBegin: '',
            //         editTimeEnd: '',
            //         flag: -1 //不限-1
            //     },
            //     pageSize: 15,
            //     page: 1
            // },

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
            
            //状态值
            statusList: [
                {
                    text: '不限',
                    value: -1
                },
                {
                    text: '已发送',
                    value: 1
                },
                {
                    text: '未发送',
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
                    name: '发送',
                    action: 'enable',
                    type: 'primary'
                }
            ],
            //list数据
            list: [
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
                        label: '文本标题',
                        model: 'subject'
                    },
                    {
                        type: 'select',
                        label: '针对团队',
                        text: 'desc',
                        value: 'id',
                        model: 'distributorGroupID',
                        options: this.teams
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
                        label: '发送状态',
                        text: 'text',
                        value: 'value',
                        model: 'flag',
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
            this.queryMsgOutList()
        },
        //查询消息列表
        queryMsgOutList() {
            ajax.queryMsgOutPageList(this.query,this.page ,this.pageSize).then((result) => {
                this.total = result.total
                this.list = result.dataList

            })
        },
        // 全选
        selectChange(selections) {
            this.selected=[];
            for(let i=0;i<selections.length;i++){
                this.selected.push(selections[i].msgOutID)
            }
        },
        //发送消息
        enable() {
            ajax.sendMsg(this.selected).then((result) => {
                this.$message({
                    message: '发送成功',
                    type: 'success'
                });
                this.queryMsgOutList()
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
        // 编辑
        edit(item) {
            this.showEdit = true
            this.isEdit = true
            this.editTitle = '修改文本'
            this.editForm = item
            this.isDetail = false
        },
        //查看
        detail(item) {
            console.log(item)
            this.showEdit = true
            this.isEdit = true
            this.editTitle = '文本详情'
            this.editForm = item
            this.isDetail = true
        },
        // 新增
        add() {
            this.showEdit = true
            this.isEdit = false
            this.editTitle = '新增文本'
            this.editForm = {}
            this.isDetail = false
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
        },
        //获取团队下拉列表
        queryAllTeam(){
            customer.selectBasDistributorGroupAllList().then((result)=>{
                result.unshift({
                   id: "",
                    desc: "不限"                   
                })
                this.teams = result
            })
        },
    },
    mounted() {
        this.queryMsgOutList()
        this.queryAllTeam()
    },
    watch:{
        page(val){
            this.queryMsgOutList()
        },
        pageSize(val){
            this.queryMsgOutList()
        }
    }
}