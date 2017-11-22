export default {
    props: {
        list: Array,
        goodList: Array
    },
    data() {
        return {
            // goodList: [],//商品列表
            imgUrl: '',
            show: false,
            title: '付款截图',
            size: 'small'
        }
    },
    methods: {
        // 查看订单
        edit(item) {
            this.$emit('edit', item)
        },
        // 全选
        selectChange(val) {
            this.$emit('select-change', val)
        },
        // 获取订单中的商品详情
        getGood(row, expanded) {
            this.$emit('getGood', row, expanded)
        },
        // 点击查看付款截图
        cellclick(row, column, cell, event) {
            if (column.columnKey === 'img') {
                if (row.url === '' || row.url=== null) {
                    this.$message({
                        type: 'warning',
                        message: '付款截图为空!'
                    })
                    return
                }
                this.show = true
                this.imgUrl = row.url
            }
        },
        // 关闭弹出框
        close() {
            this.show = false
        }
    }
}