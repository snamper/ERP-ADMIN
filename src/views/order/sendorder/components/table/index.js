export default {
    props: {
        list: Array,
        type: Number,
        goodList: Array
    },
    data() {
        return {
            // goodList: [],//订单中的商品列表
        }
    },
    methods: {
        // 订单详情
        edit(item) {
            this.$emit('edit', item)
        },
        // 导入唯一码
        scan(item) {
            this.$emit('scan', item)
        },
        // 取消
        cancel(item) {
            this.$emit('cancel',item)
        },
        // 全选
        selectChange(val) {
            this.$emit('select-change', val)
        },
        // 获取订单中的商品详情
        getGood(row, expanded) {
            this.$emit('getGood', row, expanded)
        },
    }
}