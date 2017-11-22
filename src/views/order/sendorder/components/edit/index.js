import { cloneDeep } from 'lodash'
import { order as ajax } from 'services'

export default {
    props: {
        title: String,
        show: Boolean,
        editForm: Object
    },
    data() {
        return {
            // 快递公司
            delivers: [],
            // 商品列表
            goodList: [],
            sheetList: [],//快递单单号
        }
    },
    watch: {
        editForm(editForm) {
            // 获取订单中的商品列表
            this.goodList = this.editForm.listOrderItemList
        }
    },
    mounted() {
        // 获取快递公司列表
        this.selectDeliveryList()
        
    },
    methods: {
        // 获取快递公司列表
        selectDeliveryList() {
            ajax.selectDeliveryList().then((result) => {
                this.delivers = result
            })
        },
        // 返回
        close() {
            this.$emit('close')
        },
        // 保存
        save() {
            ajax.updateDeliverSheetID({
                distributorOrderID: this.editForm.listOrderItemList[0].distributorOrderID,
                deliverySheetID: this.editForm.deliverySheetID,
                merchantDeliveryID: this.editForm.merchantDeliveryID
            }).then(() => {
                this.$message({
                    message: '保存成功!',
                    type: 'success'
                })
                this.close()
                // 刷新页面
                this.refresh()
            }).catch((error) => {
                this.$message.error(error)
            })
        },
        toPrintExpress(){

            this.sheetList.push(this.editForm.sheet)
            this.sheetList = JSON.stringify(this.sheetList)
            this.$router.push({
                path:"/printExpress",
                query:{
                    id:this.sheetList,
                    merchantDeliveryId:this.editForm.merchantDeliveryID
                }
            })
        },
        // 刷新页面
        refresh() {
            this.$emit('refresh')
        }
    }
}