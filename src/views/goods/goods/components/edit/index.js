import { cloneDeep } from 'lodash'
import {goods as ajax} from 'services'
export default {
    props: {
        title: String,
        show: Boolean,
        isEdit: Number,
        editForm: Object
    },
    data() {
        return {
            form: {},
            // 初始表单
            initForm: {
                customNo: '', //商品号
                name: '', //商品名
                basePrice: 0, //价格
                brandID: '', //品牌id
                barcodePropertyName1: '', //规格
                barcodePropertyName2: '', //颜色属性
                unit: '', //单位
                mainImageUrl: '', //主图
                subImageUrls: [], //附图
                goodsDetailContent: '',//商品详情
                goodsQualityReptContent: '' //商品质检报告
            },
            goodsDetailContent: '', // 编辑器初始商品详情
            goodsQualityReptContent: '',//编辑器初始质检内容
            mainFiles: [],//主图的初始值
            subFiles: [],//附图的初始值
            // 输入验证
            rules: {
                customNo: [
                    { required: true, message: '请输入商品货号', trigger: 'blur' },
                ],
                name: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                ],
                basePrice: [
                    { required: true, type: 'number', message: '请输入统一售价', trigger: 'blur' },
                ],
                brandID: [
                    { required: true, message: '请选择品牌名称', trigger: 'blur' },
                ],
            },
            brandList: [], //品牌列表
        }
    },
    watch: {
        // 监听表单的变化
        editForm(editForm) {
            if (this.isEdit !==2) {
                this.form = cloneDeep(this.editForm)
                this.$nextTick(() => {
                    if (this.form.mainImageUrl && this.form.mainImageUrl != '') {
                        this.mainFiles = []
                        this.mainFiles.push(this.form.mainImageUrl)
                    }
                    if (this.form.subImageUrls.length > 0) {
                        this.subFiles = this.form.subImageUrls
                    }
                })
            }
            else {
                this.resetForm()
            }
            this.setInitContent()
        }
    },
    mounted() {
        //初始化
        this.setInitContent()
        // 下拉框-品牌列表
        this.getAllBrand()
    },
    created() {
        this.setForm(this.editForm) // 初始化表单
    },
    methods: {
        // 获取品牌
        getAllBrand() {
            ajax.getAllBrand().then((result) => {
                this.brandList = result
            })
        },
        // 初始化表单
        resetForm() {
            this.form = cloneDeep(this.initForm)
            this.content = ''
            this.mainFiles = []
            this.subFiles = []
        },
        // 初始化编辑器的内容
        setInitContent() {
            if (this.form.goodsDetailContent) {
                this.goodsDetailContent = this.form.goodsDetailContent
            }
            else {
                this.goodsDetailContent = ''
            }
            if (this.form.goodsQualityReptContent) {
                this.goodsQualityReptContent = this.form.goodsQualityReptContent
            }
            else {
                this.goodsQualityReptContent = ''
            }
            
            this.$nextTick(() => {
                if (this.$refs.contentEditor) {
                    this.$refs.contentEditor.updateEditor()
                }
                if (this.$refs.contentEditor2) {
                    this.$refs.contentEditor2.updateEditor()
                }
            })
        },
        // 初始化表单
        setForm(editForm) {
            if (this.isEdit) {
                this.form = cloneDeep(this.editForm)
                this.goodsDetailContent = this.form.goodsDetailContent // 初始化编辑器商品详情内容
                this.goodsQualityReptContent = this.form.goodsQualityReptContent // 初始化编辑器质检内容
                this.$nextTick(() => {
                    if (this.form.mainImageUrl && this.form.mainImageUrl != '') {
                        this.mainFiles = []
                        this.mainFiles.push(this.form.mainImageUrl)
                    }
                    if (this.form.subImageUrls.length > 0) {
                        this.subFiles = this.form.subImageUrls
                    }
                })
                this.setInitContent()
            }
            else {
                this.resetForm()
            }
            this.$nextTick(() => {
                if (this.$refs.contentEditor) {
                    this.$refs.contentEditor.updateEditor()
                }
                if (this.$refs.contentEditor2) {
                    this.$refs.contentEditor2.updateEditor()
                }
            })
        },
        // 返回
        close() {
            this.$emit('close')
        },
        // 保存
        save() {
            // 判断编辑器内容是否修改
            if (this.form.goodsDetailContent == undefined) {
                this.form.goodsDetailContent = this.goodsDetailContent
            }
            if (this.form.goodsQualityReptContent == undefined) {
                this.form.goodsQualityReptContent = this.goodsQualityReptContent
            }
            this.$refs.form.validate((valid) => {
                if (valid) {
                    // 验证通过
                    ajax.saveBasGoods(this.form).then(() => {
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
            })
        },
        // 单图
        uploadSuccess(file) {
            this.form.mainImageUrl = file
        },
        // 多图
        multipleUploadSuccess(filelist) {
            this.form.subImageUrls = filelist

            return
        },
        // 刷新视图
        refresh() {
            this.$emit('refresh')
        }
    }
}