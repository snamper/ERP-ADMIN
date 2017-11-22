import { cloneDeep } from 'lodash'
import PgTable from './components/table/index.vue'

export default {
    components: {
        PgTable
    },
    props: {
        show: Boolean
    },
    data() {
        return {
            isShowMoreQuery: false, // 搜索区是否显示更多
            // 搜索条件
            query: {
                pp: '',
                hh: '',
                name: '',
            },
            page: 1, // 当前页码
            pageSize: 15, // 每页条数
            total: 40, // 总条数
            selected: [],
            // 操作区按钮
            operations: [
                {
                    name: '添加',
                    action: 'add',
                    type: 'primary'
                }
            ],
            goodsList: [
                {
                    pp: '品牌一',
                    hh: '货号123456'
                },
                {
                    pp: '品牌一',
                    hh: '货号123456'
                },
                {
                    pp: '品牌一',
                    hh: '货号123456'
                }
            ]
        }
    },
    computed: {
        // 搜索区默认显示
        defaultQuery: {
            get() {
                return [
                    {
                        type: 'select',
                        label: '品牌',
                        model: 'pp'
                    },
                    {
                        type: 'input',
                        label: '货号',
                        model: 'hh'
                    }
                ]
            }
        },
        moreQuery: {
            get() {
                return [
                    {
                        type: 'input',
                        label: '名称',
                        model: 'name'
                    }
                ]
            }
        }
    },
    methods: {
        // 关闭
        close() {
            this.$emit('close')
        },
        // 搜索区显示更多
        toggleOpen(isShow) {
            this.isShowMoreQuery = isShow
        },
        // 搜索按钮
        search() {
            this.page = 1
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
        // 添加
        add() {
            this.close()
            this.$emit('changeGoods', this.selected)
        }
    }
}