import { cloneDeep } from 'lodash'
import addGoods from './addgoods/index.vue'
import {customer as ajax} from 'services'

export default {
    props: {
        show: Boolean,
        editForm: Object,
        addGoodsList:Array
    },
    components:{
        addGoods
    },
    data() {
        return {
            //isShowAdd:false,//是否显示增加
            selected: [],//勾选数组
            goodsList: [],//商品列表数组
            form: {},
            // 初始表单
            initForm: {
                teamname: '',
                teamcode: '',
                note:'',
            },
            //分页参数
            paginationParam:{
                page: 1, // 当前页码
                pageSize: 15, // 每页条数
                total: 10, // 总条数
            },
        }
    },
    watch: {
        addGoodsList(addGoodsList) {
            if(addGoodsList.length>0) {
                for(var i=0;i<addGoodsList.length;i++){
                    let addGoodsId= addGoodsList[i].goodsID;
                    if(this.goodsList.length>0) {
                        for( let j = this.goodsList.length - 1 ; j >=0 ; j --) {
                            let goodsId = this.goodsList[j].goodsID;
                            if( addGoodsId === goodsId) {
                                break
                            } else{
                                if (j==0){
                                    this.goodsList.push(addGoodsList[i]);
                                }
                            }
                        }
                    }else{
                        this.goodsList.push(addGoodsList[i]);
                    }
                    
                }
            }
        },
        editForm(editForm) {
            this.paginationParam ={
                page: 1, // 当前页码
                pageSize: 15, // 每页条数
                total: 10, // 总条数
            },
            this.goodsList=[]
            this.form = cloneDeep(this.editForm)
            this.getTeamGoodsList();
            //this.getTeamDetail(this.editForm.distributorGroupID)
            
            //
        }
    },
    methods: {
        //打开添加商品的页面
        addGoods(){
            this.$emit('showaddgood');
        },
        //移除商品
        removeGoods(){
            console.log(this.selected);
            if(this.selected.length>0){
                console.info(this.goodsList)
                let select = this.selected
                let param=[]
                for(let i = select.length-1 ; i >= 0 ; i-- ){
                     let isNew= select[i].isNew
                     let selectId  = select[i].id
                     param.push(selectId)
                    for( let j = this.goodsList.length - 1 ; j >=0 ; j --){
                        let goodsId = isNew == 1?this.goodsList[j].distributorGoodsID:this.goodsList[j].goodsID
                        if( selectId === goodsId){
                            this.goodsList.splice(j,1);
                        }
                    }
                }
                
                ajax.removeTeamGoods(param)
                    .then((result)=>{
                        this.selected=[];
                    });  
                console.info(this.goodsList);
            }
            
            
        },
        // 全选
        selectChange(selections) {
            //his.selected = selections
            this.selected=[];
            for(let i=0;i<selections.length;i++){
                if(selections[i].distributorGoodsID) {
                    let one={
                        isNew:1,
                        id:selections[i].distributorGoodsID
                    }
                    this.selected.push(one)
                }else{
                    let one={
                        isNew:0,
                        id:selections[i].goodsID
                    }
                    this.selected.push(one)
                }
            }
            console.log(selections)
        },
        resetForm() {
            this.form = cloneDeep(this.initForm)
        },
        setForm(editForm) {
            // if (this.isEdit) {
            //     this.form = cloneDeep(this.editForm)
            // }
            // else {
            //     this.resetForm()
            // }
        },
        // 分页-当前页数更新触发
        currentChange(current) {
            this.paginationParam.page = current
        },
        // 分页-每页条数更改时触发
        sizeChange(size) {
            this.paginationParam.pageSize = size
        },
    
        // 返回
        close() {
            this.$emit('close')
        },
        // 保存
        save() {
            let param=[];
            let self =this
            self.goodsList.forEach(function(value,index) {
                let goodId = value.goodsID
                let one = {
                            "DistributorGroupID": self.form.distributorGroupID,
                            "GoodsID": goodId,
                          }
                param.push(one)
                
            });
            ajax.saveTeamGoods(param)
                .then((result)=>{
                    this.$message({
                        message:'保存成功',
                        type:'success'
                    })
                    this.close()
                })
                .catch((error)=>{
                    this.$message.error(error)
                })
        },
        //查询团队详情
        getTeamDetail(distributorGroupID) {
            ajax.queryTeamDetail(distributorGroupID)
                .then((result)=>{
                    this.form = result
                    console.info(result)
                });
        },

       getTeamGoodsList(){
           var self = this
           var data = {
                condition:self.form.distributorGroupID,
                pageSize:self.paginationParam.pageSize, 
                page:self.paginationParam.page,  
           }
           ajax.queryTeamGoodsList(data)
                .then((result)=>{
                    self.goodsList = result.dataList
                    self.paginationParam.total = result.total
                    console.info(result)
                });
       }
    }
}