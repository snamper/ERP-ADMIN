export default {
    props: {
        list: Array,
        skuList: Array
    },
    data() {
        return {
        }
    },
    methods: {
        // 获取商品的sku详情
        getSku(row, expanded) {
            this.$emit('getSku', row, expanded)
        },
        // 编辑商品
        edit(item) {
            this.$emit('edit', item)
        },
        // 新增sku
        addSku(item) {
            this.$emit('addSku', item)
        },
        // 编辑sku
        editSku(item, flag) {
            this.$emit('editSku', item,flag)
        },
        // 全选
        selectChange(val) {
            this.$emit('select-change', val)
        },
        // 禁用sku
        disableSku(item) {
            this.$emit('disableSku',item)
        },
        // 启用sku
        ableSku(item) {
            this.$emit('ableSku',item)
        }
    }
}