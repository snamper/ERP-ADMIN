export default {
    name: 'PgPagination',
    props: {
        currentPage: {
            type: Number,
            default: 1
        },
        pageSizes: {
            type: Array,
            default() {
                return [15, 30, 50, 100]
            }
        },
        pageSize: {
            type: Number,
            default: 15
        },
        layout: {
            type: String,
            default: 'sizes, prev, pager, next, total, jumper'
        },
        total: {
            type: Number,
            default() {
                return 0
            }
        }
    },
    methods: {
        sizeChange(size) {
            this.$emit('size-change', size)
        },
        currentChange(currentPage) {
            this.$emit('current-change', currentPage)
        }
    }
}