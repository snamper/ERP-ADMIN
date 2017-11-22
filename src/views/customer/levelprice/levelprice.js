import PgTable from './components/table/index.vue'
import PgEdit from './components/edit/index.vue'
import le from './components/level/index.vue'
import {customer as ajax} from 'services'
export default {
    components: {
        PgTable,
        PgEdit,
        le,
    },
	data (){
        return {
            currentTrem:{}, // 当前操作的团队
            isShowMoreQuery: false, // 搜索区是否显示更多
            // 搜索条件
            query: {
                code: '',
                name: '',
                time: '',
                beginEditTime: '',
                endEditTime: '',
                status: '',
                editor: ''
            },
            //分页参数
            page: 1, // 当前页码
            pageSize: 15, // 每页条数
            total: 0, // 总条数

            selected: [],
            //编辑
            editTitle: '编辑', // 新增/修改标题
            editForm: {}, // 新增/修改数据
            isEdit: false, // 是否新增
            showEdit: false, // 是否显示新增弹出窗口
            see:false,//查看
            uploadBtn:'上传',//新增/修改的按钮显示

            isShowGoods: false,//设置商品

            isShowLevel: false, //设置等级
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
            //list数据
            teamList: [],
            groups: []
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
                        type: 'select',
                        label: '团队名称',
                        text: 'desc',
                        value: 'desc',
                        model: 'name',
                        options: this.groups
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
                        model: 'time',
                        start: 'beginEditTime',
                        end: 'endEditTime'
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
    mounted() {
        // 获取团队列表
        this.queryTeamList()
        // 获取团队-下拉
        this.selectBasDistributorGroupAllList()
    },
    methods:{
        // 获取团队-下拉
        selectBasDistributorGroupAllList() {
            ajax.selectBasDistributorGroupAllList().then((result) => {
                this.groups = result
            })
        },
        // 获取团队列表
        queryTeamList() {
            ajax.queryTeamList(this.page, this.pageSize, this.query).then((result) => {
                this.teamList = result.dataList
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
            this.queryTeamList()
        },
        // 全选
        selectChange(selections) {
            this.selected = []
            selections.forEach((item) => {
                this.selected.push(item.distributorGroupID )
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
            this.currentTrem = item
            this.showEdit = true
            this.isEdit = true
            this.editTitle = '基本信息'
            ajax.selectGradePriceList({
                distributorGroupID: item.distributorGroupID
            }).then((result) => {
                this.editForm = result
                console.log(this.editForm)
            })
            // 获取团队等级列表
            ajax.getBasCustomerGradeList(item.distributorGroupID).then((result) => {
                this.groups = result
            })
        },
        //查看
        detail(item){
            this.showEdit = true
            this.isEdit = true
            this.editTitle = '团队详情'
            this.editForm = item
            this.see=true
        },
        // 新增
        add() {
            this.showEdit = true
            this.isEdit = false
            this.editTitle = '新增团队'
            this.editForm = {}
            this.uploadBtn = '上传'
            this.see=false
        },
        // 设置商品
        goods() {
            this.isShowGoods = true
            this.editForm = {}
        },
        // 设置等级
        level(item) {
            this.isShowLevel = true
            // this.editForm = {}
            // ajax.selectGradePriceList({
            //     distributorGroupID: item.distributorGroupID
            // }).then((result) => {
            //     console.log(122121)
            //     console.log(result)
            //     return
            //     this.editForm = result
                
            //     console.log(this.editForm)
            // })
        },
        
        //搜索价格信息
        searchPrice(query, distributorGroupID) {
            query.distributorGroupID = this.currentTrem.distributorGroupID
            ajax.selectGradePriceList(query).then((result) => {
                this.editForm = result
            })
        },
        // 删除
        del() {

        },
        // 关闭弹出窗口
        closeEdit(type) {
            this.showEdit = false
        }
    },
    watch:{
        page(val){
            this.queryTeamList()
        },
        pageSize(val){
            this.queryTeamList()
        }
    }
}