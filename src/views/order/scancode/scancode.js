import { order as ajax } from 'services'
import { cloneDeep } from 'lodash'

export default {
    components: {
       
    },
    data() {
        return {
            list: [], //订单列表
            checked: false,//是否选择扫码完成自动发货
            deliverySheetID: '',//快递单号
            barCode: '',//商品条形码
            // barcodeID: '',//商品ID
            code: '',//关联唯一码
            notScan: [],//未扫的商品
            hasScan: [],//已扫的商品
            type: 1,//扫码类型
            sheet: '',//正在处理的订单
            flag: 0,//是否存在此订单
            deliveryFocus: true,//快递单号是否获得焦点
            goodNuFocus: false,//商品条形码是否获得焦点
            uniCodeFocus: false,//关联唯一码是否获得焦点
            index: 0,//记录扫描的商品的位置
            isKeyUp: false,//手动输入的时候，按钮enter才进行操作
            isGood: false,//是否存在该商品
        }
    },
	computed: {
       
    },
    watch: {
        // 监听已扫描商品列表的变化
        notScan: {
            handler: function(newVal) {

            },
            deep: true
        },
        // 监听已扫描商品列表的变化
        hasScan: {
            handler: function(newVal) {
                // this.hasScan = newVal
            },
            deep: true
        },
        // 监听扫码类型的变化
        type(newVal,oldVal) {
            this.type = newVal
        }
    },
    mounted() {
        // 获取订单列表
        this.list = this.$route.query.list
    },
    methods: {
        // 判断输入的快递号是否在订单中
        hasDeliverySheetID() {
            this.flag = 0
            this.sheet = ''
            if (this.list == null || this.list.length === 0) {
                this.$message.error('没有订单')
                return false
            }
            this.list.forEach((item) => {
                if (item.deliverySheetID === this.deliverySheetID) {
                    this.flag = 1
                    this.sheet = item
                }
            })
        },
        keyUp(type) {
            this.isKeyUp = true
            if (type === 1) {
                this.getOrderDetail()
            }
            else if (type === 2) {
                this.getGoodBarCode(this.isGood)
            }
            else {
                this.scan()
            }
            this.isKeyUp = false
        },
        // 获取商品条形码
        getGoodBarCode(flag) {
            // 按下enter
            if (this.isKeyUp) {
                // 如果存在此商品的时候
                if (flag === true) {
                    // 光标移到扫描唯一码
                    this.deliveryFocus = false
                    this.goodNuFocus = false
                    this.uniCodeFocus = true
                    this.$message({
                        message: '请输入关联唯一码',
                        type: 'success'
                    })
                }
                else {
                    this.$message({
                        message: '不存在该商品!请重新扫描!',
                        type: 'warning'
                    })
                    this.deliveryFocus = false
                    this.goodNuFocus = true
                    this.uniCodeFocus = false
                }
            }
        },
        change(state) {
            // 如果是快递单号变化的话
            if (state === 0) {
                // 自动扫描
                if (this.type === 1) {
                    this.getOrderDetail()
                }
                // 手动　
                else {
                    this.deliveryFocus = true
                    this.goodNuFocus = false
                    this.uniCodeFocus = false
                }
            }
            // 商品条形码输入框的光标变化
            else if (state === 1) {
                // 判断扫的商品条形码是否存在未扫商品中
                this.index = 0
                this.isGood = false
                if (this.barCode !== '') {
                    for( var pro of this.notScan) {
                        if (pro.customBC === this.barCode) {
                            this.isGood = true
                            break
                        }
                        else {
                            this.index++
                        }
                    }
                    // 自动
                    if (this.type === 1) {
                        if (this.isGood) {
                            // 光标移到扫描唯一码
                            this.deliveryFocus = false
                            this.goodNuFocus = false
                            this.uniCodeFocus = true
                        }
                        else {
                            this.$message({
                                message: '不存在该商品!请重新扫描!',
                                type: 'warning'
                            })
                            this.deliveryFocus = false
                            this.goodNuFocus = true
                            this.uniCodeFocus = false
                        }
                    }
                    // 手动
                    else {
                        this.deliveryFocus = false
                        this.goodNuFocus = true
                        this.uniCodeFocus = false
                    }
                }
            }
            // 唯一码的光标的变化
            else {
                // 处理已扫，未扫列表
                if (this.code !== '') {
                    if (this.barCode === '' || this.index >= this.notScan.length) {
                        this.$message({
                            message: '请先输入商品条形码!',
                            type: 'warning'
                        })  
                        this.code = ''
                        return
                    }
                    if (this.notScan.length !== 0) {
                        // 自动
                        if (this.type === 1) {
                            this.scan()
                        }
                        // 手动
                        else {
                            this.deliveryFocus = false
                            this.goodNuFocus = false
                            this.uniCodeFocus = true
                        }
                    }
                }
            } 
        },
        // 每扫描一次，请求一次接口
        scan() {
            const good = cloneDeep(this.notScan[this.index])
            // 请求接口
            ajax.scan({
                distributorOrderID: this.sheet.distributorOrderID,
                barCodeID: good.barcodeID,
                code: this.code
            }).then(() => {
                this.$message({
                    message: '扫码成功!',
                    type: 'success'
                })
                //操作成功之后，本地更新已扫描和未扫描商品
                --this.notScan[this.index].qty
                // 查询已扫的商品列表中是否已经存在该商品
                const len = this.hasScan.length
                // 扫描第一个商品的时候
                if (len === 0) {
                    // 直接添加进已扫描的商品列表
                    const scanGood = cloneDeep(this.notScan[this.index])
                    scanGood.hasScanedNum = 1
                    this.hasScan.push(scanGood)
                }
                else {
                    // 寻找已扫的商品中是否存在该商品
                    let flag = 0
                    for( var pro of this.hasScan) {
                        if (pro.barcodeID === good.barcodeID) {
                            flag = 1
                            pro.hasScanedNum ++
                            break
                        }
                    }
                    // 没有找到
                    if (flag === 0) {
                        const scanGood = cloneDeep(this.notScan[this.index])
                        scanGood.hasScanedNum = 1
                        this.hasScan.push(scanGood)
                    }
                }
                // 这个商品的数量为0的时候
                if (this.notScan[this.index].qty === 0) {
                    this.notScan.splice(this.index,1)
                    // 全部扫码完成之后
                    if (this.notScan.length === 0) {
                        ajax.finishScan({
                            distributorOrderID: this.sheet.distributorOrderID,
                            isNeedToSendGoodsAuto: this.checked
                        }).then(() => {
                            if (this.checked) {
                                this.$message({
                                    message: '全部扫描完成并已发货!',
                                    type: 'success'
                                })
                            }
                            else {
                                this.$message({
                                    message: '全部扫描完成!',
                                    type: 'success'
                                })
                            }
                            this.barCode = ''
                            this.code = ''
                            this.deliverySheetID = ''
                            this.deliveryFocus = true
                            this.goodNuFocus = false
                            this.uniCodeFocus = false
                        }).catch((error) => {
                            this.$message.error(error)
                        })
                    }
                }
                if (this.type === 1) {
                    this.deliveryFocus = false
                    this.goodNuFocus = true
                    this.uniCodeFocus = false
                }
                else {
                    this.deliveryFocus = false
                    this.goodNuFocus = false
                    this.uniCodeFocus = true
                }
            }).catch((error) => {
                this.$message.error(error)
            })              
        },
        // 重新扫码按钮
        again() {
            this.barCode = ''
            this.code = ''
            if(this.deliverySheetID ==='' || this.deliverySheetID === null) {
                this.$message({
                    message: '请先输入快递单号',
                    type: 'warning'
                })
                return
            }
            ajax.clearScan(this.sheet.distributorOrderID).then(() => {
                this.$message({
                    message: '操作成功!',
                    type: 'success'
                })
                // 获取订单中的商品详情
                this.getOrderDetail()
            }).catch((error) => {
                this.$emssage.error(error)
            })
        },
        // 获取订单中的商品详情
        getOrderDetail() {
            this.notScan = []
            this.hasScan = []
            if (this.deliverySheetID !=='' && this.deliverySheetID !== null) {
                // 判断订单列表中是否拥有此订单
                this.hasDeliverySheetID()
                if (this.flag === 1) {
                    // 获取此订单中的所有的商品
                    ajax.getOrderDetail(this.sheet.distributorOrderID).then((result) => {
                        // this.notScan = result.listOrderItemList
                        result.listOrderItemList.forEach((item) => {
                            // 此商品还没有扫
                            if (item.hasScanedNum === 0) {
                                this.notScan.push(item)
                            }
                            // 已扫了部分
                            else {
                                this.hasScan.push(item)
                                const good = cloneDeep(item)
                                let notScanedNum = good.qty-good.hasScanedNum
                                if (notScanedNum !== 0) {
                                    good.qty = notScanedNum
                                    this.notScan.push(good)
                                } 
                            }
                        })
                        this.$message({
                            message: '请先输入商品条形码和关联唯一码',
                            type: 'success'
                        })
                    })
                }
                else {
                    this.$message({
                        message: '你所选的订单中没有此快递单号!',
                        type: 'warning'
                    })
                }
                if (this.type === 1 && this.flag === 1) {
                    this.deliveryFocus = false
                    this.goodNuFocus = true
                    this.uniCodeFocus = false
                }
                else {
                    this.deliveryFocus = true
                    this.goodNuFocus = false
                    this.uniCodeFocus = false
                }
            }
        }
    }
}