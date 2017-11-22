export default {
    name: 'PgTextField',
    props: {
        fieldText: String
    },
    methods: {
        handleEmit(action, event) {
            this.$emit(action, event)
        }
    }
}