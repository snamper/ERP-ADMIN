import PgTable from './components/table/index.vue'
import PgEdit from './components/edit/index.vue'
import { material as ajax } from 'services'
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
            // 操作按钮
            operations: [
                {
                    name: '新增',
                    action: 'add',
                    type: 'primary'
                }
            ],
            tagList: [],
            editTitle: '',
            showEdit: false
        }
    },
    mounted() {
        this.getMaterialTagPageList()
    },
    methods: {
        // 获取分页列表
        getMaterialTagPageList() {
            ajax.getMaterialTagPageList(this.page, this.pageSize).then((result) => {
                this.total = result.total
                this.tagList = result.dataList
            })
        },
        // 分页-当前页数更新触发
        currentChange(current) {
            this.page = current
            this.getMaterialTagPageList()
        },
        // 分页-每页条数更改时触发
        sizeChange(size) {
            this.pageSize = size
            this.getMaterialTagPageList()
        },
        // 新增
        add() {
            this.editTitle = '新增标签'
            this.showEdit = true
        },
        // 删除
        del(item) {
            this.$confirm('确定要删除该标签吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                ajax.delMaterialTag(item.materialTagID).then((result) => {
                    this.$message.success('删除成功')
                    this.getMaterialTagPageList()
                }).catch((error) => {
                    this.$message.error(error)
                })
            })
        },
        // 刷新页面
        refresh() {
            this.page = 1
            this.getMaterialTagPageList()
        },
        // 关闭弹出窗口
        closeEdit() {
            this.showEdit = false
        }
    }
}