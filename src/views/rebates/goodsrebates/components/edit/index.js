import { cloneDeep } from 'lodash'
import { rebates as ajax} from 'services'

export default {
    props: {
        title: String,
        show: Boolean,
        isEdit: Boolean,
        editForm: Object
    },
    data() {
        return {
            activeName2: 'first',//默认tab
            activeNames: [],
            gradeId: '',//客户等级ID
            //代理人等级返点列表规则
            collapse: [],
            form: {},
            teamList: [],//团队下拉别表
            orderGrade: [],//下单人等级列表
            distributorGroupID_old: '', // 修改之前的团队ID
          // 初始表单
            initForm: {
                distributorRebateConfigID: '', //推荐返点设置ID ,
                distributorGroupID: '',//分销团队ID ,
                orderGradeID:'', //请求代理商等级 ,
                configType: '',//参考指标/返点类型,1:订单金额,2:固定金额,3:商品金额 ,
                operType: '',//订单类型,0:全部,1:后期补货,2:首批进货,4:一次性 ,
                payMothod: '',//发放方式,0:上级发放,1:公司发放 ,
                customerGradeFlag: '',//是否限定推荐人等级,1:限定,0:不限 ,
                status: 1,//状态,1:启用,0:禁用 ,
                note: '',//备注 ,
            },
            initBaseModel: {},//初始化的返点设置的基础模型
            resetModel: {
                distributorGoodsConfigID: "",
                rebateItems: [
                    {
                        distributorGoodsItemID: "",
                        customerGradeID: "",
                        level: 1,
                        goodsID: "",
                        point: "",
                        dataStatus: 0
                    },
                    {
                        distributorGoodsItemID: "",
                        customerGradeID: "",
                        level: 2,
                        goodsID: "",
                        point: "",
                        dataStatus: 0
                    },
                    {
                        distributorGoodsItemID: "",
                        customerGradeID: "",
                        level: 3,
                        goodsID: "",
                        point: "",
                        dataStatus: 0
                    }
                ]
            },//重置
            // 推荐返点设置的基础模型
            baseModel: {
                distributorGoodsConfigID: "",
                rebateItems: [
                    {
                        distributorGoodsItemID: "",
                        customerGradeID: "",
                        level: 1,
                        goodsID: "",
                        point: "",
                        dataStatus: 0
                    },
                    {
                        distributorGoodsItemID: "",
                        customerGradeID: "",
                        level: 2,
                        goodsID: "",
                        point: "",
                        dataStatus: 0
                    },
                    {
                        distributorGoodsItemID: "",
                        customerGradeID: "",
                        level: 3,
                        goodsID: "",
                        point: "",
                        dataStatus: 0
                    }
                ]
            },
            initGoodsModel: [],//基础商品模型
            // 商品模型
            goodsModel: [],
            // 输入验证
            rules: {
                distributorGroupID: [
                    { required: true, message: '请选择所属团队', trigger: 'blur' },
                ],
                orderGradeID: [
                    { required: true, message: '请选择下单人等级', trigger: 'blur' },
                ],
                operType: [
                    { required: true, type: "number", message: '请选择订单类型', trigger: 'change' },
                ],
                configType: [
                    { required: true, type: "number", message: '请选择参考指标', trigger: 'change' },
                ],
                payMothod: [
                    { required: true,  type: "number", message: '请选择发放方式', trigger: 'change' },
                ],
                customerGradeFlag: [
                    { required: true,  type: "number", message: '请选择推荐关系等级', trigger: 'change' },
                ],
            },
            //初始化表单下拉列表
            defaultForm: {
                orderType: [
                    {
                        text: '全部',
                        value: 0
                    },                    
                    {
                        text: '后期补货',
                        value: 1
                    },                    
                    {
                        text: '首批进货',
                        value: 2
                    },
                    // {
                    //     text: '一次性',
                    //     value: 4
                    // },
                ],
                configTypeList: [
                    {
                        text: '订单金额',
                        value: 1
                    },                    
                    {
                        text: '固定金额',
                        value: 2
                    },                    
                    {
                        text: '商品金额',
                        value: 3
                    },
                ],
                payMothodList: [
                    {
                        text: '上级发放',
                        value: 0
                    },
                    {
                        text: '公司发放',
                        value: 1
                    },                    
                ],
                grade: [
                    {
                        text: '不限',
                        value: 0
                    },
                    {
                        text: '指定',
                        value: 1
                    },                    
                ],
            }
        }
    },
    watch: {
        editForm() {
            // 编辑时
            if (this.isEdit) {
                this.form = cloneDeep(this.editForm)
                this.distributorGroupID_old = this.form.distributorGroupID
                // 如果推荐等级关系为指定时，获取等级列表
                if (this.form.customerGradeFlag === 1) {
                    this.getSkipIntroRebate()
                }
                if (this.form.configType === 3) {
                    if (this.form.customerGradeFlag === 0) {
                        // this.getGoodsConfigGoodsModel(this.form.orderGradeID)
                        // 当推荐人等级为不限时，不用传客户等级ID
                        this.getGoodsConfigGoodsModel()
                    }
                }
                else {
                    if (this.form.customerGradeFlag === 0) {
                        // this.getGoodsConfigBaseModel(this.form.orderGradeID)
                        this.getGoodsConfigBaseModel()
                    }
                }       
            }
            else {
                this.form = cloneDeep(this.initForm)
                // 重置基础模型
                this.baseModel = this.resetModel
            }
        },
        'form.distributorGroupID': function() {
            this.queryBasCustomerGradeList(this.form.distributorGroupID)
            if(this.distributorGroupID_old !== this.form.distributorGroupID) {
                this.form.orderGradeID = ''
            }
        },
    },
    mounted() {
        this.getTeamList()
    },
    methods: {
        search() {},
        //获取团队列表
        getTeamList(){
            ajax.getTeamList().then((result)=>{
                this.teamList = result
            })
        },
        //根据选择的团队id获取团队等级列表
        queryBasCustomerGradeList(distributorGroupID) {
            ajax.getBasCustomerGradeList(distributorGroupID).then((result) => {
                this.orderGrade = result
            })
        },
        // 状态改变时请求对应返点设置项模型
        baseChange(flag, id) {
            this.setdataStatus(flag, id)
        },
        // // 设置基础模型数据状态
        setdataStatus(flag, id) {
            // 如果还没有设置用户设置
            if (this.form.distributorRebateConfigID === '' || this.form.distributorRebateConfigID == null) {
                this.$message({
                    message: '请先设置用户管理',
                    type: 'warning'
                })
                return
            }
            if (this.initBaseModel.rebateItems[flag].point === this.baseModel.rebateItems[flag].point) {
                this.baseModel.rebateItems[flag].dataStatus = 0
            }
            else {
                if (this.initBaseModel.rebateItems[flag].point === "" && this.baseModel.rebateItems[flag].point !== "") {
                    this.baseModel.rebateItems[flag].dataStatus = 1  //新增
                }
                if (this.initBaseModel.rebateItems[flag].point !== "" && this.baseModel.rebateItems[flag].point !== "") {
                    this.baseModel.rebateItems[flag].dataStatus = 2  //更新
                }
                if (this.initBaseModel.rebateItems[flag].point !== "" && this.baseModel.rebateItems[flag].point === "") {
                    this.baseModel.rebateItems[flag].dataStatus = 3  //删除
                }
            }
            if (this.form.customerGradeFlag === 1) {
                this.baseModel.rebateItems[flag].customerGradeID = id
            }
            // else {
            //    this.baseModel.rebateItems[flag].customerGradeID = this.form.orderGradeID 
            // }
        },
        // 设置商品模型的数据状态
        setGoodDataStatus(id) {
            let goodModel = {
                distributorGoodsConfigID: '',
                rebateItems: []
            }
            this.goodsModel.forEach((item, index) => {
                item.rebateItems.forEach((items, indexs) => {
                    if (items.point === this.initGoodsModel[index].rebateItems[indexs].point) {
                        items.dataStatus = 0 //无操作
                    }
                    else {
                        if (items.point === '' && this.initGoodsModel[index].rebateItems[indexs].point !== '') {
                            items.dataStatus = 3 //删除
                        }
                        if (items.point !== '' && this.initGoodsModel[index].rebateItems[indexs].point === '') {
                            items.dataStatus = 1 //新增
                        }
                        if (items.point !== '' && this.initGoodsModel[index].rebateItems[indexs].point !== '') {
                            items.dataStatus = 2 //更新
                        }
                    }
                    if (this.form.customerGradeFlag === 1) {
                        items.customerGradeID = id
                    }
                    // else {
                    //     items.customerGradeID = this.form.orderGradeID
                    // }
                    items.goodsID = item.goodsID
                    goodModel.rebateItems.push(items)
                })
                // 把数组转化成接口所需要的数据接口
                goodModel.distributorGoodsConfigID = item.distributorGoodsConfigID
            })
            return goodModel
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
                    ajax.saveGoodsConfig(this.form).then((result) => {
                        this.$message({
                            message: '保存成功,请设置返点规则',
                            type: 'success'
                        })
                        this.form.distributorRebateConfigID = result
                        // 如果推荐等级关系为指定时，获取等级列表
                        if (this.form.customerGradeFlag === 1) {
                            this.getSkipIntroRebate()
                        }
                        // 如果商品金额是，获取商品模型
                        if (this.form.configType === 3) {
                            if (this.form.customerGradeFlag === 0) {
                                // this.getGoodsConfigGoodsModel(this.form.orderGradeID)
                                // 当推荐关系等级为不限时，获取模型不用传客户等级ID
                                this.getGoodsConfigGoodsModel()
                            }
                        }
                        else {
                            if (this.form.customerGradeFlag === 0) {
                                // this.getGoodsConfigBaseModel(this.form.orderGradeID)
                                // 当推荐关系等级为不限时，获取模型不用传客户等级ID
                                this.getGoodsConfigBaseModel()
                            }
                        }
                        
                        this.refresh()
                    }).catch((error) => {
                        this.$message.error(error)
                    })
                }
            })
        },
        // 获取返点设置的基础模型
        getGoodsConfigBaseModel(orderGradeID) {
            if (this.form.distributorRebateConfigID !== '') {
                // 编辑的时候
                ajax.getGoodsConfigBaseModel(this.form.distributorRebateConfigID,orderGradeID).then((result) => {
                    // 根据层级来排序
                    this.baseModel = cloneDeep(this.sortBaseArr(result))
                    this.initBaseModel = cloneDeep(this.sortBaseArr(result))
                })
            }
        },
        // 获取返点设置的商品模型
        getGoodsConfigGoodsModel(orderGradeID) {
            if (this.form.distributorRebateConfigID !== '') {
                ajax.getGoodsConfigGoodsModel(this.form.distributorRebateConfigID, orderGradeID).then((result) => {
                    this.initGoodsModel = []
                    this.initGoodsModel = cloneDeep(this.sortGoodArr(result))
                    this.goodsModel = []
                    this.goodsModel = cloneDeep(this.sortGoodArr(result))
                })
            }
        },
        // 对基础模型数组进行排序
        sortBaseArr(arr) {
            var levels=''
            arr.rebateItems.forEach((item) => {
                levels += ','+item.level+''
            })
            if (levels.indexOf('1') == -1) {
                arr.rebateItems.push({
                    distributorGoodsItemID: "",
                    customerGradeID: "",
                    level: 1,
                    goodsID: "",
                    point: "",
                    dataStatus: 0
                })
            }
            if (levels.indexOf('2') == -1) {
                arr.rebateItems.push({
                    distributorGoodsItemID: "",
                    customerGradeID: "",
                    level: 2,
                    goodsID: "",
                    point: '',
                    dataStatus: 0       
                })
            }
            if (levels.indexOf('3') == -1) {
                arr.rebateItems.push({
                    distributorGoodsItemID: "",
                    customerGradeID: "",
                    level: 3,
                    goodsID: "",
                    point: '',
                    dataStatus: 0                           
                })                 
            }   
            arr.rebateItems.sort(function(a, b) {
                return a.level-b.level
            }) 
            return arr
        },
        // 对商品模型数组进行排序
        sortGoodArr(arr) {
            arr.forEach((items) => {  
                var levels = ''
                items.rebateItems.forEach((item) => {
                    levels += ','+item.level+''
                })
                if (levels.indexOf('1') == -1) {
                    items.rebateItems.push({
                        distributorGoodsItemID: "",
                        customerGradeID: "",
                        level: 1,
                        goodsID: "",
                        point: "",
                        dataStatus: 0
                    })
                }
                if (levels.indexOf('2') == -1) {
                    items.rebateItems.push({
                        distributorGoodsItemID: "",
                        customerGradeID: "",
                        level: 2,
                        goodsID: "",
                        point: '',
                        dataStatus: 0       
                    })
                }
                if (levels.indexOf('3') == -1) {
                    items.rebateItems.push({
                        distributorGoodsItemID: "",
                        customerGradeID: "",
                        level: 3,
                        goodsID: "",
                        point: '',
                        dataStatus: 0                           
                    })                 
                }   
                items.rebateItems.sort(function(a, b) {
                    return a.level-b.level
                }) 
            })
            return arr
        },
        // 不等代理商等级之间的设置
        handleChange(activeNames) {
            // 清空输入框
            if (this.form.configType === 3) {
                this.goodsModel = []
                this.getGoodsConfigGoodsModel(activeNames)
                this.gradeId = activeNames
            }
            else {
                this.gradeId = activeNames
                this.getGoodsConfigBaseModel(activeNames)
            }
        },
        // 保存返点规则
        saveGroom(id) {
            let model = {}
            if (this.form.configType === 3) {
                model = cloneDeep(this.setGoodDataStatus(id))
            }
            else {
                model = cloneDeep(this.baseModel)
            }
            if (model.distributorGoodsConfigID === '' || model.distributorGoodsConfigID == null) {
                this.$message({
                    message: '请先设置用户管理!',
                    type: 'warning'
                })
                return
            }
            ajax.saveGoodsConfigItem(model).then(() => {
                this.$message({
                    message: '保存成功!',
                    type: 'success'
                })
                // 重置基础模型
                if (this.form.configType !== 3) {
                    this.baseModel = this.resetModel
                }
                this.refresh()
                if (this.form.customerGradeFlag === 0) {
                    this.close()
                }
                else {
                   this.handleChange(this.gradeId)
                }
            }).catch((error) => {
                this.$message.error(error)
            })
        },
        //获取商品推荐返点等级列表 
        getSkipIntroRebate() {
            ajax.getGoodsRebateLevelList(this.form.distributorGroupID).then((result) => {
                this.collapse = result
            })
        },
        // 刷新父级列表页面
        refresh() {
            this.$emit('refresh')
        },
    }
}