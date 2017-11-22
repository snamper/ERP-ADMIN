export default {
    name: 'PgOperations',
    props: {
        btns: {
            type: Array,
            default() {
                return []
            }
        }
    },
    methods: {
        handleClick(btn) {
            if (btn.isConfirm) {
                this.$confirm('确定'+ btn.name +'吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$emit(btn.action)
                }).catch(() => {

                })
            }
            else {
                if (btn.action === 'del' || btn.action === 'enable' || btn.action === 'disable') {
                    this.$confirm('确定'+ btn.name +'吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$emit(btn.action)
                    }).catch(() => {

                    })
                }
                else {
                    this.$emit(btn.action)
                }
            }
        }
    }
}