import { mapGetters, mapActions } from 'vuex'
export default {
    props: {
        list: Array
    },
    computed: {
        ...mapGetters([
            'localLoading'
        ])
    },
    methods: {
        edit(item) {
            this.$emit('edit', item)
        },
        selectChange(val) {
            this.$emit('select-change', val)
        }
    }
}