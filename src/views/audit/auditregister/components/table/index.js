import { audit as ajax } from 'services'

export default {
    props: {
        list: Array
    },
    data(){
        return {
            query:{
                id: "", //分销商申请ID 
                auditState: true //审核状态,true:通过,false:拒绝      
            }
        }
    },
    methods: {
        //同意
        enable(item) {
            this.$confirm('确定同意吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.query.id = item.distributorApplyID //分销商申请ID
                this.upStates()
            }).catch(() => {

            })
            
        },
        //拒绝
        disable(item) {
            this.$confirm('确定拒绝吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.query.id = item.distributorApplyID //分销商申请ID
                this.upStates()
            }).catch(() => {

            })
            
        },
        //修改
        upStates(){
            console.log(this.query)
            ajax.companyAuditRegister(this.query).then((result)=>{
                this.$message({
                    message: '审核成功',
                    type: 'success'
                })
                this.refresh()
            }).catch((error) => {
                this.$message({
                    message: error,
                    type: 'error'
                })
            })
        },
        refresh() {
            this.$emit('refresh')
        }        
    },
}