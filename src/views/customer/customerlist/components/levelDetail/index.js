import { cloneDeep } from 'lodash'
import {customer as ajax} from 'services'

export default {
    props: {
        queryLevel: String, //查询登记
        show: Boolean, //是否显示
        editForm: Object, //当前查询form的内容对象
    },
    data() {
        return {
            //form表单
            form: {},
            //默认树形列表的字段
            defaultProps: {
                children: 'childs',
                label: 'customerName'
            },
            // 上级分销树
            upper:[],
             // 下级分销树
            lower:[],
            value:'',
            personList:[{
                value:'1',
                label:'张三',
            },
            {
                value:'2',
                label:'张2',
            },
            {
                value:'3',
                label:'张4',
            }],
            
        }
    },

    watch: {
        editForm(editForm) {
            this.resetForm();
            this.form = cloneDeep(this.editForm)
            if(this.queryLevel=='upper') {
                this.SelectCustomerTreeUp(this.form.distributorGroupID, this.form.customerID)
            } else if(this.queryLevel=='lower') {
                this.SelectCustomerTreeDown(this.form.distributorLinkID)
            }
        }
    },
    methods: {
        resetForm(){
            this.upper = []
             // 下级分销树
            this.lower = []
        },
        setForm(editForm) {
            this.form = cloneDeep(this.editForm)
        },
        // 返回
        close() {
            this.$emit('close')
        },
        // 保存
        save() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    // 验证通过
                }
            })
        },
        // 新增商品
        add() {
            this.$emit('addGoods')
        },
        /**
         * 获取上级分销树
         */
        SelectCustomerTreeUp(distributorGroupID, customerID) {
            let self = this
            ajax.SelectCustomerTreeUp(distributorGroupID, null, null, customerID)
                .then((result)=>{
                    if(result) {
                        console.log("获取上级分销树result")
                        console.log(result)
                        self.upper = result
                    }
                });
        },
        /**
         * 获取下级分销树
         */
        SelectCustomerTreeDown(id) {
            let self = this
            ajax.SelectCustomerTreeDown(id)
                .then((result)=>{
                    if(result) {
                        console.log("获取下级分销树result")
                        console.log(result)
                        self.lower = result
                    }
                });
        },
    }
}