import { cloneDeep } from 'lodash'
import { rebates as ajax} from 'services'

export default {
    props: {
        title: String,
        show: Boolean,
        isEdit: Boolean,
        editForm: Object,
    },
    data() {
        return {
            activeName2: 'first',//默认tab页
            teamList: [],//团队下拉列表
            orderGrade: [],//下单人等级列表
            saveStatus: false,//返点设置基础详情表单保存状态，当为true才能进行基础模型和商品模型设置保存
            rebateItems: [
                {
                    distributorIntroItemID: '',
                    customerGradeID: '',
                    goodsID: '',
                    level: 1,
                    point: '',
                    dataStatus: 0,// 数据状态,0:无操作,1:新增,2:更新,3:删除
                    
                },
                {
                    distributorIntroItemID: '',
                    customerGradeID: '',
                    goodsID: '',
                    level: 2,
                    point: '',
                    dataStatus: 0,
                },
                {
                    distributorIntroItemID: '',
                    customerGradeID: '',
                    goodsID: '',
                    level: 3,
                    point: '',
                    dataStatus: 0,
                },
            ],
            //基础模型返点
            baseModel: {
            	distributorIntroConfigID: '',
                rebateItems:[]          
            },
            //固定的基础模型用来比较
            newBaseModel:{
                point1:'',
                point2:'',
                point3:''
            },
            //商品模型页面绑定的东西
            searchGoodsModel: [],
            //商品模型返点
            goodsModel: [
                {
                    goodsID: "",
                    goodsName: "",
                    goodsCustomNo: "",
                    goodsPrice: 0,
                    distributorIntroConfigID: "",
                    rebateItems: [
                        {
                            distributorIntroItemID: "",
                            customerGradeID: "",
                            level: 0,
                            goodsID: "",
                            point: '',
                            dataStatus: 1
                        },
                        {
                            distributorIntroItemID: "",
                            customerGradeID: "",
                            level: 0,
                            goodsID: "",
                            point: '',
                            dataStatus: 1
                        },
                        {
                            distributorIntroItemID: "",
                            customerGradeID: "",
                            level: 0,
                            goodsID: "",
                            point: '',
                            dataStatus: 1
                        },
                    ]
                },
            ],
            //商品返点保存的固定值
            newGoodsModel: [],
            //商品返点保存时候传的 参数
            goodsForm: {
            	distributorIntroConfigID: '',
            	rebateItems: []
            },
            form: {
            },
            oldForm: {},// 用于记录初始表单值为了保存表单失败时初始化表单
            //搜索框查询条件
            query: {
                goodsCustomNo: '',
                goodsName: ''
            },
            
            // 初始表单
            initForm: {
                distributorIntroConfigID: '', //推荐返点设置ID ,
                distributorGroupID: '',//分销团队ID ,
                distributorGroupID_old: '', // 修改之前的团队ID
                orderGradeID_old: '', // 修改之前代理商等级
                orderGradeID:'', //请求代理商等级 ,
                configType: '',//参考指标/返点类型,1:订单金额,2:固定金额,3:商品金额 ,
                operType: '',//订单类型,0:全部,1:后期补货,2:首批进货,4:一次性 ,
                payMothod: '',//发放方式,0:上级发放,1:公司发放 ,
                customerGradeFlag: 0,//是否限定推荐人等级,1:限定,0:不限 ,
                introFlag: 0,//推荐类型,0:平级推荐,1:跨级推荐 ,
                status: 0,//状态,1:启用,0:禁用 ,
                note: '',//备注 ,
            },
            // 输入验证
            rules: {
                distributorGroupID: [
                    { required: true, message: '请选择所属团队', trigger: 'blur' },
                ],
                orderGradeID: [
                    { required: true, type: "regexp", message: '请选择下单人等级', trigger: 'blur' },//验证可以为空
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
                zhibiao: [
                    {
                        text: '订单金额',
                        value: 1
                    },                    {
                        text: '固定金额',
                        value: 2
                    },                    {
                        text: '商品金额',
                        value: 3
                    },
                ],
                send: [
                    {
                        text: '公司发放',
                        value: 1
                    },                    
                    {
                        text: '上级发放',
                        value: 0
                    }
                ],
            }
        }         
    },
    computed: {
        // 搜索区默认显示
        defaultQuery: {
            get() {
                return [
                    {
                        type: 'input',
                        label: '货号',
                        model: 'goodsCustomNo'
                    },
                    {
                        type: 'input',
                        label: '名称',
                        model: 'goodsName',
                    },
                ]
            }
        },
    },
    watch: {
        isEdit() {
            //每次进来都先显示第一页
        	this.activeName2 = 'first'
            if (this.isEdit) {
                this.form = cloneDeep(this.editForm)
                //console.log(this.form.distributorIntroConfigID)
                // 查询基础信息
                this.queryIntroConfigDetail(this.form.distributorIntroConfigID)
                // 查询基础的返点信息
                this.queryIntroConfigBaseModel()
                // 查询商品模型的返点信息
                this.queryIntroConfigGoodsModel()
            }
            else {
                this.resetForm()
            }
        },
        editForm(editForm) {
            this.setForm(this.editForm)
        },
        // editForm(editForm) {
        //     if (this.isEdit) {
        //         console.log(this.form)
        //         this.form = cloneDeep(this.editForm)
        //         console.log(this.form)
        //     }
        //     else {
        //         this.resetForm()
        //     }
        // },
        'form.distributorGroupID': function() {
            this.queryBasCustomerGradeList(this.form.distributorGroupID)
            if(this.form.distributorGroupID_old === this.form.distributorGroupID) {
                if( this.form.orderGradeID_old === null) {
                    this.form.orderGradeID = ''
                }
            } else {
            	this.form.orderGradeID = ''
            }
            
        }
    },
    mounted() {
        //查询团队下拉列表
        this.getTeamList()
        if (!this.isEdit) {
            this.resetForm()
        }
        if (this.isEdit) {
            this.queryIntroConfigBaseModel()
        }
    },
    created() {
        this.setForm(this.editForm)
        //console.log(this.editForm)
    },
    methods: {
         // 搜索
        search() {
            this.searchGoodsModel = this.searArrayByKey(this.goodsModel, this.query)
            this.newGoodsModel = cloneDeep(this.searchGoodsModel)
        },
        //获取团队列表
        getTeamList(){
            ajax.getTeamList().then((result)=>{
                console.log(result)
                this.teamList = result
                //desc id
            })
        },
        //根据选择的团队id获取团队等级列表
        queryBasCustomerGradeList(distributorGroupID) {
            ajax.getBasCustomerGradeList(distributorGroupID).then((result) => {
                this.orderGrade = result
                if(result.length > 0) {
                     this.orderGrade.unshift({
                        name: '不限',
                        customerGradeID: '',
                     })
                }
            })
        },
        // 获取（跨级/平级）推荐返点设置详情
        queryIntroConfigDetail(id) {
            ajax.getIntroConfigDetail(id).then((result) => {
                this.form = result
                // 用于记录初始值为了保存表单失败时初始化表单
                this.oldForm = cloneDeep(result)
                this.form.distributorGroupID_old = this.form.distributorGroupID 
                this.form.orderGradeID_old = this.form.orderGradeID 
                //console.log('this.form')

            })
        },
        //获取推荐返点设置基础模型
        queryIntroConfigBaseModel() {
            console.log(this.form)
            ajax.getIntroConfigBaseModel(this.form.distributorIntroConfigID,this.form.orderGradeID).then((result) => {
                var data = result
            	this.newBaseModel = {
            		point1: '',
            		point2: '',
            		point3: '',
            	}
            	// 判断基础模型是否有数据
            	if (data.rebateItems.length === 0) {
            		// 没数据的情况下，制定默认的数据模型
            		data.rebateItems = cloneDeep(this.rebateItems) // (this.baseModel.rebateItems)
                    //console.log(this.rebateItems)
            	} 
                else {
            		// 可能个别没有
            		var levels=''
            		result.rebateItems.forEach((item)=> {
            			levels += ','+item.level+''
                        switch(item.level) {
                            case 1:
                                this.newBaseModel.point1 = item.point
                                break;
                            case 2:
                                this.newBaseModel.point2 = item.point
                                break;
                            case 3:
                                this.newBaseModel.point3 = item.point
                                break;
                        }
            		})
            		if (levels.indexOf('1') == -1) {
            			result.rebateItems.push({
	                        distributorIntroItemID: "",
	                        customerGradeID: "",
	                        level: 1,
	                        goodsID: "",
	                        point: '',
	                        dataStatus: 0
            				
            			})
            		}
            		if (levels.indexOf('2') == -1) {
            			result.rebateItems.push({
	                        distributorIntroItemID: "",
	                        customerGradeID: "",
	                        level: 2,
	                        goodsID: "",
	                        point: '',
	                        dataStatus: 0
            				
            			})
            		}
            		if (levels.indexOf('3') == -1) {
            			result.rebateItems.push({
	                         distributorIntroItemID: "",
	                        customerGradeID: "",
	                        level: 3,
	                        goodsID: "",
	                        point: '',
	                        dataStatus: 0           				
            			})
            		}
            	}
                data.rebateItems.sort((a,b) => {
                	return a.level - b.level
                })
            	this.baseModel = data   
            })
        },
        //基础模型输入框change事件
        baseChange(item, index) {
        	//console.log('wuxinxnx')
        	//console.log(this.baseModel)
        	//console.log(this.newBaseModel)
            if(index == 0) {
                //输入框有值 
                if(item.point) {
                    if(this.newBaseModel.point1 === item.point) {
                        item.dataStatus = 0//误操作                    
                    }else {
                    	if(!this.newBaseModel.point1) {
                    		item.dataStatus = 1 //新增
                    	}else {
                    		item.dataStatus = 2//更新
                    	} 
                    }
                }
                if(!item.point) {
                    if(this.newBaseModel.point1) {
                        item.dataStatus = 3 //删除
                    }else {
                        item.dataStatus = 0 //误操作
                    }
                }
            }
            if(index == 1) {
                //输入框有值 
                if(item.point) {
                    if(this.newBaseModel.point2) {
                        item.dataStatus = 2//更新
                    }else {
                        item.dataStatus = 1 //新增
                    }
                }
                if(!item.point) {
                    if(this.newBaseModel.point2) {
                        item.dataStatus = 3 //删除
                    }else {
                        item.dataStatus = 0 //误操作
                    }
                }
            }
            if(index == 2) {
                //输入框有值 
                if(item.point) {
                    if(this.newBaseModel.point3) {
                        item.dataStatus = 2//更新
                    }else {
                        item.dataStatus = 1 //新增
                    }
                }
                if(!item.point) {
                    if(this.newBaseModel.point3) {
                        item.dataStatus = 3 //删除
                    }else {
                        item.dataStatus = 0 //误操作
                    }
                }
            }
        },
        //商品模型输入框状态改变时
        goodsModelChange() { 
        	//console.log('kaishibijiao')
        	//console.log(this.searchGoodsModel)
        	//console.log(this.goodsModel)
        	//console.log(this.newGoodsModel)
        	// 循环商品
            this.searchGoodsModel.forEach((item, index) => {
            	// 循环商品的设置项
                item.rebateItems.forEach((items, indexs) => {
                	
                	// 对比值是否有变化
                	if (this.newGoodsModel[index].rebateItems[indexs].point) {
                		// 初始化数据有值
                		
                		// 1、现有数据是否有值
                		// 有 -->是否相等：相等（无操作）：不相等（更新）
                		// 无 -->删除
                		if(items.point === this.newGoodsModel[index].rebateItems[indexs].point) {
            				items.dataStatus = 0 //无操作
	                	} else {
	                		//没值
	                		if(!items.point) {
	                			items.dataStatus = 3//删除
	                		}else {
	                			items.dataStatus = 2//更新
	                		}
	                		
	                	}
                	} else {
                		// 初始化数据无值
                		
                		// 1、判断当前数据是否有值
                		// 有 -->新增
                		// 无 -->无操作
                		if(items.point) {
                			items.dataStatus = 1//新增
                		}else {
                			items.dataStatus = 0//无操作
                		}
                	}
                })
            })                    
//           this.goodsForm = cloneDeep(this.goodsModel)
//           this.goodsForm.forEach((item) => {
//           	delete item.goodsID
//           	delete item.goodsName
//           	delete item.goodsCustomNo
//           	delete item.goodsPrice
//           	delete item.goodsID
//           })
			//console.log('caocaocao')
			//console.log(this.goodsModel)
             this.goodsForm.distributorIntroConfigID = this.searchGoodsModel[0].distributorIntroConfigID
             this.goodsForm.rebateItems = []
             this.searchGoodsModel.forEach((item) => {
             	
             	item.rebateItems.forEach((itm) => {
             		this.goodsForm.rebateItems.push(itm)
             	})
             	
             })
             //console.log('woainima')
             //console.log(this.goodsForm)
        },
        //获取推荐返点设置商品模型
        queryIntroConfigGoodsModel() {
            ajax.getIntroConfigGoodsModel(this.form.distributorIntroConfigID,this.form.orderGradeID).then((result) => {
            	//console.log('商品返点设置')
            	//console.log(result)
                var data = result  
             if(data) {
             	data.forEach((item,index) => {
             		if(item.rebateItems.length == 0) {
                         item.rebateItems = cloneDeep(this.rebateItems)
             		}else {
                         var levels=''
                         item.rebateItems.forEach((items) =>{
                             levels += ','+items.level+''
                         })
                         if (levels.indexOf('1') == -1) {
                             item.rebateItems.push({
                                 distributorIntroItemID: "",
                                 customerGradeID: "",
                                 level: 1,
                                 goodsID: "",
                                 point: '',
                                 dataStatus: 0
                                 
                             })
                         }
                         if (levels.indexOf('2') == -1) {
                             item.rebateItems.push({
                                 distributorIntroItemID: "",
                                 customerGradeID: "",
                                 level: 2,
                                 goodsID: "",
                                 point: '',
                                 dataStatus: 0
                                 
                             })
                         }
                         if (levels.indexOf('3') == -1) {
                             item.rebateItems.push({
                                  distributorIntroItemID: "",
                                 customerGradeID: "",
                                 level: 3,
                                 goodsID: "",
                                 point: '',
                                 dataStatus: 0                           
                             })
                         }                            
                     }
             		//排序
             		item.rebateItems.sort((a,b) => {
             			return a.level - b.level
             		})
             		//设置goodsID
             		item.rebateItems.forEach((itm) => {
             			itm.goodsID = item.goodsID
             		})
             		
             	})
                this.goodsModel = data
                this.searchGoodsModel = cloneDeep(this.goodsModel)
                this.newGoodsModel = cloneDeep(this.searchGoodsModel)
             }
				//this.newGoodsModel = cloneDeep(data)
                /*this.goodsModel = data
                this.searchGoodsModel = cloneDeep(this.goodsModel)
                this.newGoodsModel = cloneDeep(this.searchGoodsModel)*/
                //console.log('11111')
                //console.log(this.goodsModel)
            })
        },
        //保存返点基础模型
        saveModel(flag) {
            if(this.saveStatus == true) {               
                if(flag == 1) {
                	ajax.saveIntroConfigItemBaseModel(this.baseModel).then((result) => {
    	                this.$message({
    	                    message: '保存成功',
    	                    type: 'success'
    	                })
                        this.saveStatus = false
    	                this.close()           			

                	}).catch((error) => {
                            this.$message.error(error)
                        })
                }
                if(flag == 2) {
                    this.goodsModelChange()
                    ajax.saveIntroConfigItemBaseModel(this.goodsForm).then((result) => {
    	                this.$message({
    	                    message: '保存成功',
    	                    type: 'success'
    	                })
                        this.saveStatus = false
    	                this.close()           			

                    }).catch((error) => {
                            this.$message.error(error)
                        }) 
                }
            }else {
                this.$message({
                    message: '保存失败！请先保存基础设置再保存返点设置项。',
                    type: 'warning'
                })
            }
        },
        //Tab切换组件控制
        handleClick(tab, event) {
            //console.log(tab, event)
        },
        //表单重置
        resetForm() {
            this.form = cloneDeep(this.initForm)
            this.baseModel = []
            this.searchGoodsModel = []
        },
        //设置表单
        setForm(editForm) {
            if (this.isEdit) {
                this.form = cloneDeep(this.editForm)
            }
            else {
                this.resetForm()
            }
        },
        // 返回
        close() {
            this.$emit('close')
            
        },
        // 保存
        save() {
            this.form.status = 0 //修改或者编辑完都让状态改为禁用
            this.saveStatus = false
            this.$refs.form.validate((valid) => {
                if (valid) {
                    // 验证通过
                    ajax.saveIntroConfig(this.form).then((result) => {
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        })
                        this.saveStatus = true
                        	this.form.distributorIntroConfigID = result
                			// 查询基础的返点信息
                			this.queryIntroConfigBaseModel()
                			//新增时候保存完 查询商品模型的返点信息
                			this.queryIntroConfigGoodsModel()
                        	this.refresh()

                    }).catch((error) => {
                        this.$message.error(error)
                        this.saveStatus = false
                        //保存失败时恢复初始表单
                        if(this.isEdit) {
                            this.form = this.oldForm
                        }else {
                            cloneDeep(this.initForm)
                        }
                    })

                }
            })
        },
        // 刷新父级列表页面
        refresh() {
            this.$emit('refresh')
        },
        //前端搜素函数
		searArrayByKey(arr, keyObj) {
            let result = []
            arr.forEach((item) => {
                let isMate = true
                for (let k in keyObj) {
                    if (item[k].indexOf(keyObj[k].replace(/^\s*|\s*$/g, "")) != -1) {
                        if (isMate) {
                            isMate = true
                        }
                    }
                    else {
                        isMate = false
                    }
                }
                if (isMate) {
                    result.push(item)
                    isMate = false
                }
            })
            return result
      }
    }
}