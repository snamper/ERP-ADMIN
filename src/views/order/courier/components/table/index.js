export default {
    props: {
        list: Array,
    },
    data() {
        return {
        }
    },
    methods: {
        // 修改快递公司
        edit(item) {
            this.$emit('edit', item)
        },
        // 删除快递公司
        adddialogForm(item) {
            this.$emit('adddialogForm',item)
            console.log("1111")
        },
        // 全选
        selectChange(val) {
            this.$emit('select-change', val)
        },
    }
}