import { cloneDeep } from 'lodash'
import { rebates as ajax } from 'services'

export default {

    props: {
        title: String,
        show: Boolean,
        isEdit: Boolean,
        editForm: Object
    },
    data() {
        return {
            teamList:[],//团队下拉列表
            activeName: 'first',//当前面板
            orderGrade: [],//团队分销商等级
            isable: false,//添加按钮是否可以操作
            //所有默认下拉列表数据
            configTypeList:[//参考指标
                {
                    text: '订单金额',
                    value: 1
                },                    
                {
                    text: '固定金额',
                    value: 2
                },                    
                // {
                //     text: '商品金额',
                //     value: 3
                // },
            ],
            payMothodList:[//发放方式
                {
                    text: '上级发放',
                    value: 0
                },
                {
                    text: '公司发放',
                    value: 1
                },            
            ],
            //个人返点规则项
            barCode: {
                distributorPersonItemID: "",
                merchantID: "",
                distributorPersonConfigID: "",
                customerGradeID: "",
                beginValue: 0,
                endValue: 0,
                point: 0
            },
            personConfig: [],//个人返点设置项
            initPersonConfig: [],//初始的个人返点设置项
            form: {},
            // 初始表单
            initForm: {
                distributorPersonConfigID: '',//返点设置ID
                distributorGroupID: '',//所属团队
                configType: '',//参考指标
                payMothod:'',//发放方式
                note:'',//备注
            },       
            // 输入验证
            rules: {
                distributorGroupID: [
                    { required: true, message: '请选择所属团队', trigger: 'change' },
                ],
                configType: [
                    { required: true,type: "number", message: '请选择参考指标', trigger: 'change' },
                ],
                payMothod: [
                    { required: true,type: "number", message: '请选择发放方式', trigger: 'change' },
                ],
            }
        }
    },
    watch: {
        editForm(editForm) {
            if (this.isEdit) {
                this.form = cloneDeep(this.editForm)
                this.getPersonConfigItemList(this.form.distributorPersonConfigID)
                this.queryBasCustomerGradeList()
            }
            else {
               this.form = cloneDeep(this.initForm)
               this.personConfig = []
            }
        },
        personConfig:  {
            handler: function(newVal,oldVal) {
                if (newVal.length === this.orderGrade.length) {
                    this.isable = true
                }
                else {
                    this.isable = false
                }
            },
            deep: true
        },
        // 当用户管理设置发生变化的时候，清空返点设置的原始数据
        'form.distributorGroupID': function() {
            if (this.form.distributorGroupID !== this.editForm.distributorGroupID) {
                this.personConfig = []
            }
            else {
                this.personConfig = this.initPersonConfig
            }
        },
        'form.configType': function() {
            if (this.form.configType !== this.editForm.configType) {
                this.personConfig = []
            }
            else {
                this.personConfig = this.initPersonConfig
            }
        },
        'form.payMothod': function() {
            if (this.form.payMothod !== this.editForm.payMothod) {
                this.personConfig = []
            }
            else {
                this.personConfig = this.initPersonConfig
            }
        },
    },
    mounted() {
        this.getTeamList()
    },
    methods: {
        //获取团队列表
        getTeamList(){
            ajax.getTeamList().then((result)=>{
                this.teamList = result
            })
        },
        //根据选择的团队id获取团队等级列表
        queryBasCustomerGradeList() {
            ajax.getBasCustomerGradeList(this.form.distributorGroupID).then((result) => {
                this.orderGrade = result
                if (this.personConfig.length === this.orderGrade.length) {
                    this.isable = true
                }
                else {
                    this.isable = false
                }
            })
        },
        // 获取个人返点设置项列表
        getPersonConfigItemList(id) {
            ajax.getPersonConfigItemList(id).then((result) => {
                this.personConfig = result
                this.initPersonConfig = result
            })
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
                    ajax.savePersonConfig(this.form).then((result) => {
                        this.$message({
                            message: '保存成功!请设置个人返点规则',
                            type: 'success'
                        })
                        this.form.distributorPersonConfigID = result
                        this.queryBasCustomerGradeList()
                        this.refresh()
                    }).catch((error) => {
                        this.$message.error(error)
                    })
                }
            })
        },
        // 保存返点规则
        saveGroom() {
            if (this.form.distributorPersonConfigID === '' || this.form.distributorPersonConfigID == null) {
                this.$message({
                    message: '请先设置用户管理',
                    type: 'success'
                })
                return
            }
            // 判断是否拥有重复的客户等级id
            for (var i = 0; i < this.personConfig.length; i++) {
                for(var j = i+1; j < this.personConfig.length; j++) {
                    if (this.personConfig[i].customerGradeID === this.personConfig[j].customerGradeID) {
                        this.$message({
                            message: '等级不能相同!',
                            type: 'warning'
                        })
                        return
                    }
                }
            }
            ajax.SavePersonConfigItem(this.personConfig).then(() => {
                this.$message({
                    message: '保存成功!',
                    type: 'success'
                })
                this.close()
            }).catch((error) => {
                this.$message.error(error)
            })
        },
        // 新增返点设置
        addGoodsType() {
            this.barCode.distributorPersonConfigID = this.form.distributorPersonConfigID
            this.personConfig.push(cloneDeep(this.barCode))
        },
        // 删除现货类型
        delGoodsType(index, distributorPersonItemID) {
            ajax.deletePersonConfigItem(distributorPersonItemID).then(() => {
                this.$message({
                    message: '删除成功!',
                    type: 'success'
                })
                this.personConfig.splice(index, 1)
            }).catch((error) => {
                this.$message.error(error)
            })
        },
        // 刷新页面
        refresh() {
            this.$emit('refresh')
        }
    }
}