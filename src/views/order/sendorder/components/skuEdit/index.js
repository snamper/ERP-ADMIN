import { cloneDeep } from 'lodash'
import { order as ajax } from 'services'

export default {
    props: {
        title: String,
        show: Boolean,
        editForm: Array,
        editSkuForm: Object,
        btnType: Number
    },
    data() {
        return {
            // 商品列表
            orderDetail: {},
            deliver: '',//快递公司
            // 快递公司下拉框
            delivers: [],
            deliverOrder: '', //快递单号
            focus: true, //input是否获得焦点
            type: 1,//扫码类型
            isOpenFileUpload: false, // 是否打开导入框
        }
    },
    watch: {
        editForm: {
            handler: function (newVal) {
            },
            deep: true
        },
        editSkuForm() {
            if (this.btnType === 2) {
                // 获取订单详情
                this.getOrderDetail()
            }
        },
        type() {
            this.editForm.forEach((item) => {
                item.focus = false
            })
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
        // 获取订单详情
        getOrderDetail() {
            ajax.getOrderDetail(this.editSkuForm.distributorOrderID).then((result) => {
                result.listOrderItemList.forEach((items) => {
                    items.listQrCodeList = []
                    for(let i = 0;i < items.qty; i++) {
                        if (i < items.listQrCode.length) {
                            items.listQrCodeList.push({
                                isable: true,
                                qrCode: items.listQrCode[i]
                            })
                        }
                        else {
                            items.listQrCodeList.push({
                                isable: false,
                                qrCode: ''
                            })
                        }
                    }
                })
                this.orderDetail = result
            })
        },
        // 返回
        close() {
            this.$emit('closeSkuEdit')
        },
        // 保存
        save() {
            // 修改快递公司
            if (this.btnType === 0) {
                // 获取订单号
                const listDistributorOrderID = []
                this.editForm.forEach((item) => {
                    listDistributorOrderID.push(item.distributorOrderID)
                })
                if (listDistributorOrderID.length === 0) {
                    this.$message({
                        message: '请先选择要修改的订单',
                        type: 'warning'
                    })
                    return
                }
                ajax.updateOrderDeliver({
                    listDistributorOrderID: listDistributorOrderID,
                    merchantDeliveryID: this.deliver
                }).then(() => {
                    this.$message({
                        message: '修改快递公司成功!',
                        type:　'success'
                    })
                    this.close()
                    // 刷新页面
                    this.refresh()
                }).catch((error) => {
                    this.$message.error(error)
                })
            }
            // 修改快递单
            else if (this.btnType === 1) {
                if (this.editForm.length === 0) {
                    this.$message({
                        message: '请先选择要绑定的订单',
                        type: 'warning'
                    })
                    return
                }
                ajax.bindDeliverSheetID(this.editForm).then(() => {
                    this.$message({
                        message: '绑定快递单成功!',
                        type:　'success'
                    })
                    this.close()
                     // 刷新页面
                    this.refresh()
                }).catch((error) => {
                    this.$message.error(error)
                })
            }
            // 导入唯一码
            else if (this.btnType === 2) {
                let qrCodeList = {}
                qrCodeList.listScanItem = []
                // 把数据转化成后端需要保存的数据结构
                this.orderDetail.listOrderItemList.forEach((items) => {
                    qrCodeList.distributorOrderID = items.distributorOrderID
                    let listCode = []
                    items.listQrCodeList.forEach((item) => {
                        if (item.qrCode !== '') {
                            listCode.push(item.qrCode)
                        }
                    })
                    if (items.listQrCodeList.length !== 0) {
                        qrCodeList.listScanItem.push({
                            barCodeID: items.barcodeID,
                            listCode: listCode
                        })
                    }
                })
                ajax.saveBindQRcode(qrCodeList).then(() => {
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    })
                    this.close()
                    this.refresh()
                }).catch((error) => {
                    this.$message.error(error)
                })
            }
        },
        change(ind, editForm) {   
            if (this.type === 0) {
                editForm[ind].focus = true
            }
            else {
                editForm[ind].focus = false
                if (ind+1 < editForm.length) {
                    editForm[ind+1].focus = true
                } 
            }
        },
        // 重新扫码的按钮
        again() {
            this.editForm.forEach((item) => {
                item.deliverySheetID = ''
            })
        },
        // 导入唯一吗
        importDeliverySheet() {
            this.isOpenFileUpload = true
        },
        // 导入成功
        deliverySheetUploadSuccess() {
            // 更新绑定的唯一吗
            this.getOrderDetail()
            this.refresh()
        },
        refresh() {
            this.$emit('refresh')
        }
    }
}