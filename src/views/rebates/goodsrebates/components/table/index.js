export default {
    props: {
        list: Array
    },
    methods: {
        //编辑
        edit(item) {
            this.$emit('edit', item)
        },
        //选择
        selectChange(val) {
            this.$emit('select-change', val)
        }
    }
}