import { system as ajax } from '../../../services'

export default {
    data() {
        return {
            //表单参数
            ruleForm: {
                distributorGroupID: "",//团队id
                deliveryMode: "", //发货模式 0逐级压货 1公司代发货 
                rechargeMode: 0,// 是否充值 1充值 0非充值 
                financeRate: "",//资金保障系统 %，充值时确定可审金额 
                rechargeGrade: "",//充值最低等级  
                type:[]              
            },
            disabledInp:true,//启用或禁用
            //错误提示信息
            // rules: {
            //     distributorGroupID: [
            //         {  required: true, message: '请选选择分销团队', trigger: 'change' }
            //     ],
            //     deliveryMode: [
            //         {  required: true,type: 'number', message: '请选选择发货模式', trigger: 'change' }
            //     ],

            // },
            //发货模式下拉数据
            modeList: [
                {
                    text: "逐级发货",
                    flag: 0
                },
                {
                    text: "公司代发货",
                    flag: 1
                },
            ],
            teamList: [],//获取团队列表
            customerGradeLis: [],//根据团队id获取等级列表
        };
    },
    watch:{
        //启用禁用
        "ruleForm.type" (){
                this.disabledInp = !this.disabledInp 
                 
                if(!this.disabledInp && this.ruleForm.type.length == 1) {
                    this.ruleForm.rechargeMode = 1
                    this.ruleForm.rechargeGrade = ""

                } else {
                    this.ruleForm.rechargeMode = 0
                }  
        },
        "ruleForm.distributorGroupID"() {
            if(!this.ruleForm.distributorGroupID) return 
            this.getBasCustomerList()
        }
    },
    mounted () {
        this.getTeamList()
    },
    methods: {
        getTeamList(){
            let query=  {
                code: '',
                name: '',
                editor: '',
                time:'',
                beginEditTime:'',
                endEditTime:'',
                status: '1',
                note:'',
            };
            ajax.queryTeamList(1,100,query).
              then((result)=>{
                  if(result){
                      this.teamList = result.dataList;
                  }
            });
        },
        getBasCustomerList(){
            ajax.getBasCustomerGradeList(this.ruleForm.distributorGroupID).then((result)=>{
                this.customerGradeLis = result
            })
        },
        submitForm() {

            //判断是否有分销团队
            if(!this.ruleForm.rechargeMode) {
                delete this.ruleForm.financeRate
                delete this.ruleForm.rechargeGrade
            }

            //分销团队
            if(this.ruleForm.distributorGroupID === "") {
                this.$message({
                    message: '请选择分销团队',
                    type: 'warning'
                })
                return                   
            }

            //发货模式
            if(this.ruleForm.deliveryMode === "") {
                this.$message({
                    message: '请选择发货模式',
                    type: 'warning'
                })

                return                   
            }

            //判断是否有充值模式
            if(this.ruleForm.rechargeMode == 1) {

                //资金保障系数
                if(this.ruleForm.financeRate == ""){
                    this.$message({
                        message: '请输入资金保障系数',
                        type: 'warning'
                    }) 

                    return                   
                }

                //最低等级
                if(this.ruleForm.rechargeGrade == ""){
                    this.$message({
                        message: '请选择最低等级',
                        type: 'warning'
                    }) 

                    return                    
                }
            }
           // this.$message.error(error)

            //删除多余的TY
            delete this.ruleForm.type

            ajax.updateGroupModelConfig(this.ruleForm).then((result)=>{
                this.$message({
                    message: '保存成功',
                    type: 'success'
                }) 
                this.resetForm()               
            })
        },
        resetForm() {
            this.ruleForm = {
                distributorGroupID: "",//团队id
                deliveryMode: "", //发货模式 0逐级压货 1公司代发货 
                rechargeMode: 0,// 是否充值 1充值 0非充值 
                financeRate: "",//资金保障系统 %，充值时确定可审金额 
                rechargeGrade: "",//充值最低等级  
                type:[]              
            }          
        }
    }
}