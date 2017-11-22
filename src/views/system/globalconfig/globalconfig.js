import PgTable from './components/table/index.vue'
import PgEdit from './components/edit/index.vue'
import {system as ajax} from 'services'

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
                name: '',//配置名称
                module : '',//模块
                editor : '',//修改人
                time: '',//时间
                startEditTime: '', //开始修改时间 ,
                endEditTime: '',//结束修改时间
                note: '',//备注
            },
            page: 1, // 当前页码
            pageSize: 15, // 每页条数
            total: 0, // 总条数
            editTitle: '',//弹出框标题
            editForm: {}, // 新增/修改数据
            showEdit: false, // 是否显示新增弹出窗口
            globalConfiList: [],
        }
    },
    computed: {
        // 搜索区默认显示
        defaultQuery: {
            get() {
                return [
                    {
                        type: 'input',
                        label: '模块',
                        model: 'module'
                    },
                    {
                        type: 'input',
                        label: '配置名称',
                        model: 'name',
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
                        start: 'startEditTime',
                        end: 'endEditTime'                            
                    },
                    {
                        type: 'input',
                        label: '备注',
                        model: 'note'
                    },
                ]
            }
        }
    },
    mounted() {
        // 获取全局配置列表
        this.selectSysGlobalConfigListPage()
    },
    methods: {
        // 获取全局配置列表
        selectSysGlobalConfigListPage() {
            if (this.query.status === '') {
                this.query.status = -1
            }
            ajax.selectSysGlobalConfigListPage(this.query, this.page, this.pageSize).then((result) => {
                this.globalConfiList = result.dataList
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
            this.selectSysGlobalConfigListPage()
        },
        // 分页-当前页数更新触发
        currentChange(current) {
            this.page = current
            this.selectSysGlobalConfigListPage()
        },
        // 分页-每页条数更改时触发
        sizeChange(size) {
            this.pageSize = size
            this.selectSysGlobalConfigListPage()
        },
        // 查询记录
        edit(item) {
            this.showEdit = true
            this.editTitle = '修改配置'
            this.editForm = item
        },
        // 关闭弹出窗口
        closeEdit() {
            this.showEdit = false
        },
        refresh() {
            this.page = 1
            this.selectSysGlobalConfigListPage()
        }
    }
}