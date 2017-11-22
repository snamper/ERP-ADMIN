import {audit as ajax} from 'services'

export default {
    data(){
        return {
            query: {
                listID: [],
                status: 0,
            },
            imgUrl: '',
            show: false,
            title: '充值凭证',
            size: 'small'
        }
    },
    props: {
        list: Array
    },

    methods: {
        //同意
        enable(item) {
            console.log(item)
            this.$confirm('确定同意吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                
                this.query.listID.push(item.distributorPayApplyID)
                this.query.status = 1
                this.upStates()
            })
            
        },
        //拒绝
        disable(item) {
            console.log(item)
            this.$confirm('确定拒绝吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                 
                this.query.listID.push(item.distributorPayApplyID)
                this.query.status = 0                
                this.upStates()
            })
            
        },
        //修改
        upStates(){
            ajax.auditPayApply(this.query).then((result)=>{
                console.log('xiugaichenggong')
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
        // 点击查看付款截图
        cellclick(row, column, cell, event) {
            if (column.columnKey === 'img') {
                if (row.payUrl === '' || row.payUrl=== null) {
                    this.$message({
                        type: 'warning',
                        message: '充值凭证为空!'
                    })
                    return
                }
                this.show = true
                this.imgUrl = row.payUrl
            }
        },
        // 关闭弹出框
        close() {
            this.show = false
        },
        refresh() {
            this.$emit('refresh')
        }        
    }
}