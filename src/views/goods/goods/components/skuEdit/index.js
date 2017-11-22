import { cloneDeep } from 'lodash'
import {goods as ajax} from 'services'
export default {
    props: {
        title: String,
        show: Boolean,
        isSkuEdit: Number,
        skuEditForm: Object
    },
    data() {
        return {
            form: {},
            // 初始表单
            initForm: {
                goodsID: '', //商品id
                barcodeID: null, //barcodeID
                customBC: '', //商品号
                hasSmallPack: 0, //小包装
                stockQty: 0, //库存
                property1: '',  //规格1
                property2: '', //规格2
                packQty: 0,//小包装数量
                merchantID: '', //商家id
                packBarcodeID: '', //小包装id
            },
            // 调整库存
            adjustQty: {
                action: 1, //调整的行为
                qty : 0, //调整的数量
                barcodeID: '',
                goodsID: '' //商品id
            },
            // 输入验证
            rules: {
                customBC: [
                    { 
                        required: true, 
                        message: '请输入SKU编号', 
                        trigger: 'blur' 
                    },
                ],
                hasSmallPack: [
                    { required: true, type: 'number',message: '请选择是否带小包装', trigger: 'blur' },
                ],
                packBarcodeID: [
                    { required: true, message: '请选择小包装SKU', trigger: 'change' },
                ],
                packQty: [
                    { required: true, type: 'number',message: '请输入包装数量', trigger: 'blur' },
                ],
            },
            // 是否带小包
            packList: [
                {
                    label: '否',
                    value: 0
                },
                {
                    label: '是',
                    value: 1
                },
            ],
            // sku列表
            packBarcode: [],
            // 行动类型
            actionList: [
                {
                    label: '增加',
                    value: 1
                },
                {
                    label: '减少',
                    value: -1
                }
            ],
            property1: [], //颜色的搜索选项
            property2: [], //属性的搜索选项
        }
    },
    watch: {
        // 监听表单的变化
        skuEditForm(skuEditForm) {
            // 如果是编辑sku
            if (this.isSkuEdit ===1) {
                this.form = cloneDeep(this.skuEditForm)
            }
            // 新增sku
            else if (this.isSkuEdit ===0) {
                this.initForm.goodsID = this.skuEditForm.goodsID
                this.resetForm()
            }
            // 调整库存
            else {
                // 清空之前的动作和数量，绑定新的数据
                this.adjustQty.action = 1
                this.adjustQty.qty  = this.skuEditForm.qty
                this.adjustQty.barcodeID = this.skuEditForm.barcodeID
                this.adjustQty.goodsID = this.skuEditForm.goodsID
            }
        }
    },
    mounted() {
        // this.restaurants = this.loadAll()
        // 获取颜色选择
        this.getAllColors()
        // 获取属性选择
        this.getAllSizes()
        // 获取小包装sku列表
        this.getAllBarcodes()
    },
    created() {
        this.setForm(this.skuEditForm)
    },
    methods: {
        // 获取小包装sku列表
        getAllBarcodes() {
            ajax.getAllBarcodes().then((result) => {
                this.packBarcode = result
            })
        },
        // 获取属性选择
        getAllSizes() {
           ajax.getAllSizes().then((result) => {
                result.forEach((item) => {
                    this.property2.push({
                        value: item
                    })
                })       
            }) 
        },
        // 获取颜色选择
        getAllColors() {
            ajax.getAllColors().then((result) => {
                result.forEach((item) => {
                    this.property1.push({
                        value: item
                    })
                })
            })
        },
        // 输入规格建议函数
        querySearchAsync1(queryString, getResult) {
            var restaurants = this.property1
            var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
            getResult(results)
        },
        // 输入颜色建议函数
        querySearchAsync2(queryString, getResult) {
            var restaurants = this.property2
            var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
            getResult(results)
        },
        // 输入建议的匹配函数
        createStateFilter(queryString) {
            return (state) => {
                return (state.value.indexOf(queryString) !== -1)
            }
        },
        resetForm() {
            this.form = cloneDeep(this.initForm)
        },
        // 初始化表单
        setForm(skuEditForm) {
            if (this.isSkuEdit) {
                this.form = cloneDeep(this.skuEditForm)
            }
            else {
                this.resetForm()
            }
        },
        // 关闭弹出框
        close() {
            this.$emit('closeSkuEdit')
        },
        // 保存
        save() {
            // 调整库存
            if (this.isSkuEdit ===2) {
                ajax.skuStockAdjust(this.adjustQty).then(() => {
                    this.$message({
                        message: '调整库存成功',
                        type: 'success'
                    })
                    // 关闭页面
                    this.close()
                    // 刷新sku列表
                    this.refershSku(this.adjustQty.goodsID)
                }).catch((error) => {
                    this.$message.error(error)
                })
            }
            // 新增/编辑sku
            else {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        // 验证通过
                        ajax.saveBasBarcode(this.form).then(() => {
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            })
                            // 关闭页面
                            this.close()
                            // 刷新sku列表
                            this.refershSku(this.form.goodsID)
                        }).catch((error) => {
                            this.$message.error(error)
                        })
                    }
                })
            }
        },
        // 刷新页面
        refershSku(goodsID) {
            this.$emit('refershSku',goodsID)
        }
    }
}