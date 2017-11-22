import { cloneDeep } from 'lodash'
import {customer as ajax} from 'services'
export default {
    props: {
        show: Boolean,
        editForm: Object,
        hasLevelList: Array
    },
    data() {
        return {
            //是否下拉选项
            option:[{
                value:0,
                label:'否'
            },
            {
                value:1,
                label:'是'
            }],
            //等级列表
            levelList: [],
            /*{
                name:'',
                power:'',
                status:'',
                upLevelQty:'',
                levelQty:'',
                childCheck:'',
                isUpgradeResetFirs:'',
                chargeAmount:'',
                guaranteeMoney:'',
                orderAmount:'',
                upgradeAmount:'',
                isNeedCheck:'',
                rebateRate:''
            }*/
            form: {},
            // 初始表单
            initForm: {
                // teamname: '',
                // teamcode: '',
                // note:'',
            },
            
        
        }
    },
    watch: {
        editForm(editForm) {
            this.form = cloneDeep(this.editForm)
            this.getTeamLevelList(this.form.distributorGroupID);
            //this.setList(this.hasLevelList)
        }
    },
    // mounted() {
    // },
    // created() {
    //     this.setForm(this.editForm);
        
    // },
    methods: {
        // 全选
        selectChange(selections) {
            this.selected = selections
            console.log(selections)
        },
        //重置form
        resetForm() {
            this.form = cloneDeep(this.initForm)
        },
        //设置等级列表
        setList(list) {
            console.info('hasLevelList');
            console.info(list);
            this.levelList = list
        },
        //设置form信息
        setForm(editForm) {
            this.form = cloneDeep(this.editForm)

        },
        // 返回
        close() {
            this.$emit('close')
        },
        //新增一个等级row
        newLevel() {

            var oneNew = new Object({
                name:'',
                power:'',
                isExpCurr:'',
                upLevelQty:'',
                levelQty:'',
                childCheck:'',
                isUpgradeResetFirst:'',
                chargeAmount:'',
                guaranteeMoney:'',
                orderAmount:'',
                upgradeAmount:'',
                isNeedCheck:'',
                rebateRate:'',
                priceRate:'',
                firstAmount:''
            })
            this.levelList.push(oneNew)
        },
        //查询团队级别列表
        getTeamLevelList(distributorGroupID) {
            ajax.queryTeamLevelList(distributorGroupID).then((result)=>{
                this.levelList = result
                console.info(result)
            });
        },
        // 保存
        save() {

            var distributorGroupID = this.form.distributorGroupID
            //匹配1-100的正则表达式
            var numberReg = /^([1-9]\d{0,1}|100)$/
            for(let i=0;i<this.levelList.length;i++ ) {
                var one = this.levelList[i]
                console.info(one.priceRate)
                if(one.priceRate !=null &&one.priceRate !=''){
                    if(!numberReg.test(parseInt(one.priceRate))) {
                        this.$message.error("第"+(i+1)+"条等级信息折扣格式不正确，请填写正确")
                        return false;
                    }
                }
            }
            ajax.saveTeamLevelList(distributorGroupID, this.levelList)
                .then((result)=>{
                    console.log(result);
                    this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                    this.close();
                })
                .catch((error) => {
                    this.$message.error(error)
                });
        },

        //删除
        deleteList(index){
            this.levelList.splice(index,1)
        }
        
    }
}