import PgTable from './components/table/index.vue'
import PgEdit from './components/edit/index.vue'
import { material as ajax } from 'services'
import { mapActions, mapGetters } from 'vuex'
export default {
    components: {
        PgTable,
        PgEdit
    },
    data() {
        return {
            page: 1,
            pageSize: 15,
            total: 0,
            selected: [],
            isShowMoreQuery: false,
            query: {
                name: '',
                distributorGroupID: '',
                materialTagID: '',
                editor: '',
                editTimeBegin: '',
                editTimeEnd: '',
                status: -1
            },
            // 操作按钮
            operations: [
                {
                    name: '删除',
                    action: 'del',
                    isConfirm: true
                },
                {
                    name: '发布',
                    action: 'issue',
                    isConfirm: true,
                    type: 'primary'
                },
                {
                    name: '新增',
                    action: 'add',
                    type: 'primary'
                }
            ],
            libraryList: [],
            editTitle: '',
            showEdit: false,
            isEdit: false,
            editForm: {}
        }
    },
    computed: {
        ...mapGetters([
            'teamList',
            'tagList'
        ]),
        defaultQuery: {
            get() {
                return [
                    {
                        type: 'input',
                        label: '素材库名称',
                        model: 'name'
                    },
                    {
                        type: 'select',
                        label: '针对团队',
                        model: 'distributorGroupID',
                        text: 'name',
                        value: 'distributorGroupID',
                        options: this.teamList
                    }
                ]
            }
        },
        moreQuery: {
            get() {
                return [
                    {
                        type: 'select',
                        label: '标签',
                        model: 'materialTagID',
                        text: 'desc',
                        value: 'id',
                        options: this.tagList
                    },
                    {
                        type: 'timeRange',
                        label: '修改时间',
                        start: 'editTimeBegin',
                        end: 'editTimeEnd'
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
                                value: 0,
                                text: '已保存'
                            },
                            {
                                value: 1,
                                text: '已发布'
                            }
                        ]
                    }
                ]
            }
        }
    },
    mounted() {
        this.getMaterialStockPageList()
        this.getTeamList()
        this.getTagList()
    },
    methods: {
        ...mapActions([
            'getTeamList',
            'getTagList'
        ]),
        // 获取分页列表
        getMaterialStockPageList() {
            ajax.getMaterialStockPageList(this.page, this.pageSize, this.query).then((result) => {
                this.total = result.total
                this.libraryList = result.dataList
            })
        },
        // 分页-当前页数更新触发
        currentChange(current) {
            this.page = current
            this.getMaterialStockPageList()
        },
        // 分页-每页条数更改时触发
        sizeChange(size) {
            this.pageSize = size
            this.getMaterialStockPageList()
        },
        // 搜索区显示更多
        toggleOpen(isShow) {
            this.isShowMoreQuery = isShow
        },
        // 全选
        selectChange(selections) {
            this.selected = selections
        },
        // 搜索
        search() {
            this.page = 1
            this.getMaterialStockPageList()
        },
        // 新增
        add() {
            this.showEdit = true
            this.isEdit = false
            this.editTitle = '新增'
            this.editForm = {}
        },
        // 修改
        edit(item) {
            ajax.selectMaterialStock(item.materialStockID).then((result) => {
                this.showEdit = true
                this.isEdit = true
                this.editTitle = '编辑'
                this.editForm = result
            }).catch((error) => {
                this.$message.error(error)
            })
        },
        // 删除
        del() {
            const ids = []
            this.selected.forEach((item) => {
                ids.push(item.materialStockID)
            })
            ajax.delMaterialStock(ids).then(() => {
                this.$message.success('删除成功')
                this.getMaterialStockPageList()
            }).catch((error) => {
                this.$message.error(error)
            })
        },
        // 发布
        issue() {
            const ids = []
            this.selected.forEach((item) => {
                ids.push(item.materialStockID)
            })
            ajax.publishMaterialStock(ids).then(() => {
                this.$message.success('发布成功')
                this.getMaterialStockPageList()
            }).catch((error) => {
                this.$message.error(error)
            })
        },
        // 关闭弹出窗口
        closeEdit() {
            this.showEdit = false
        }
    }
}