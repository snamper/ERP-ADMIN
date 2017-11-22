import { cloneDeep } from 'lodash'
import {customer as ajax} from 'services'
export default {
    props: {
        title: String,
        show: Boolean,
        isEdit: Boolean,
        editForm: Object,
        groups: Array
    },
    data() {
        return {
            // form: [],
            // // 初始表单
            // initForm: {
            //     teamname: '',
            //     teamcode: '',
            //     note:'',
            // }
            query: {
                customNo: '',
                name: '',
            },
            priceType: 0,
            priceOption: [
                {
                    label: '固定金额',
                    value: 0
                },
                {
                    label: '百分比',
                    value: 1
                }
            ],
            priceBtnName: '锁定',
            selectDisable: false
        }
    },
    watch: {
        // editForm(editForm) {
        //     if (this.isEdit) {
        //         this.form = cloneDeep(this.editForm)
        //     }
        //     else {
        //         this.resetForm()
        //     }
        // }
    },
    mounted() {
        // if (!this.isEdit) {
        //     this.resetForm()
        // }
    },
    created() {
        // this.setForm(this.editForm)
    },
    computed: {
        // 搜索区默认显示
        defaultQuery: {
            get() {
                return [
                    {
                        type: 'input',
                        label: '货号',
                        model: 'customNo'
                    },
                    {
                        type: 'input',
                        label: '名称',
                        model: 'name',
                    },
                ]
            }
        },
    },
    methods: {
        // 返回
        close() {
            this.$emit('close')
        },
        // 搜索
        search() {
            this.$emit('searchPrice', this.query)
        },
        // 更爱选择框的类型
        closeType() {
            if (this.priceBtnName === '锁定') {
                this.priceBtnName = '解锁'
                this.selectDisable = true
            }
            else {
                this.priceBtnName = '锁定'
                this.selectDisable = false
            }
        },
        // 保存
        save() {
            ajax.saveGradePriceList(this.editForm).then(() => {
                this.$message({
                    message: '保存成功',
                    type: 'success'
                })
                this.close()
            })
        },
    }
}