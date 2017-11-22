export default {
    name: 'PgBox',
    props: {
        isShowBox: Boolean
    },
    data() {
        return {
            isShowContainer: false
        }
    },
    watch: {
        isShowBox() {
            this.isShowContainer = this.isShowBox
        }
    },
    methods: {
        close() {
            this.$emit('close')
        }
    }
}