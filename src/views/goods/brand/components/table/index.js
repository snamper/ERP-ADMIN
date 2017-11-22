export default {
    props: {
        list: Array
    },
    data() {
        return {
        }
    },
    methods: {
        edit(item, flag) {
            this.$emit('edit', item, flag)
        },
        selectChange(val) {
            this.$emit('select-change', val)
        }
    }
}