export default {
    props: {
        list: Array
    },
    data() {
        return {
        }
    },
    methods: {
        edit(item) {
            this.$emit('edit', item)
        },
    }
}