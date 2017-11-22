<template>
    <pg-box :isShowBox="show" @close="close">
        <div class="box_title">平级推荐返点规则{{title}}</div>
       <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <el-tab-pane label="用户管理" name="first">        
                <el-form ref="form" :model="form" label-width="110px" :rules="rules" :inline="false">
                    <el-form-item label="团队"  prop="distributorGroupID">
                     <!-- :disabled="isEdit" -->
                       <el-select v-model="form.distributorGroupID" placeholder="请选择所属团队" width="100">
                            <el-option
                              v-for="item in teamList"
                              :key="item.desc"
                              :label="item.desc"
                              :value="item.id">
                            </el-option>
                       </el-select>
                     </el-form-item>
                    <el-form-item label="下单人等级" prop="orderGradeID">
                       <el-select v-model="form.orderGradeID" placeholder="请选择下单人等级">
                            <el-option
                              v-for="item in orderGrade"
                              :key="item.name"
                              :label="item.name"
                              :value="item.customerGradeID">
                            </el-option>
                       </el-select>
                     </el-form-item>
                    <el-form-item label="订单类型" prop="operType">
                       <el-select v-model="form.operType" placeholder="请选择订单类型">
                            <el-option
                              v-for="item in defaultForm.orderType"
                              :key="item.text"
                              :label="item.text"
                              :value="item.value">
                            </el-option>
                       </el-select>
                     </el-form-item>
                    <el-form-item label="参考指标" prop="configType">
                       <el-select v-model="form.configType" placeholder="请选择参考指标">
                            <el-option
                              v-for="item in defaultForm.zhibiao"
                              :key="item.text"
                              :label="item.text"
                              :value="item.value">
                            </el-option>
                       </el-select>
                     </el-form-item>
                    <el-form-item label="发放方式" prop="payMothod">
                       <el-select v-model="form.payMothod" placeholder="请选择发放方式">
                            <el-option
                              v-for="item in defaultForm.send"
                              :key="item.text"
                              :label="item.text"
                              :value="item.value">
                            </el-option>
                       </el-select>
                     </el-form-item>
                    <el-form-item label="备注" prop="note">
                        <el-col :span="5">
                            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="form.note"></el-input>
                        </el-col>
                     </el-form-item>
                     <br>
                    <el-form-item class="el-form-item_btns">
                        <el-button size="small" type="primary" @click="save">保存</el-button>
                        <el-button size="small" @click="close">返回</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="返点设置" name="second">
                <!-- 商品金额 -->
            	<div  v-if="form.configType == 3">
			         <pg-search-form
			            v-model="query"
			            :default-form="defaultQuery"
			            :resetForm="resetForm.condition"
			            slot="search-form"
			            @search="search">
			        </pg-search-form> 
                    <div class="table_warp">
                        <table class="table" cellpadding="0" cellspacing="0">
                            <thead>
                                <tr class="table_header">
                                    <th class="table_header_item">分销商品货号</th>
                                    <th class="table_header_item">推荐关系-1</th>
                                    <th class="table_header_item">推荐关系-2</th>
                                    <th class="table_header_item">推荐关系-3</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in searchGoodsModel"  class="table_tr">
                                    <td class="table_tr_item">{{item.goodsCustomNo}}-{{item.goodsName}}({{item.goodsPrice}})</td>
                                    <td class="table_tr_item" v-for="items in item.rebateItems">
                                        <el-input class=" table_tr_item_input"  v-model.number="items.point" ></el-input>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>			        
               <el-row :gutter="20"  v-if="form.configType == 3">
                   <el-col :span="12">
                       <div class="grid-content bg-purple">
                           <el-button size="small" type="primary" @click="saveModel(2)">保存</el-button>
                           <el-button size="small" @click="close">返回</el-button>
                       </div>
                   </el-col>
               </el-row>
            </div>
               <!-- 订单金额//(或固定金额 )-->
               <!--<el-row v-if="form.configType == 1 || form.configType == 3">-->
               <el-row v-if="form.configType == 1">
                   <el-row :gutter="20" v-for="(item, index) in baseModel.rebateItems">
                       <el-col :span="3"><div style="text-align: center" class="grid-content bg-purple">推荐关系-{{index+1}}</div></el-col>
                       <el-col :span="4"><div class="grid-content bg-purple-light"><el-input @change='baseChange(item, index)' v-model.number="item.point" placeholder="1-100"></el-input></div></el-col>
                   </el-row>
               </el-row>
               <!-- 固定金额 -->
               <el-row v-if="form.configType == 2">
                   <el-row :gutter="20" v-for="(item, index) in baseModel.rebateItems">
                       <el-col :span="3"><div style="text-align: center" class="grid-content bg-purple">推荐关系-{{index+1}}</div></el-col>
                       <el-col :span="4"><div class="grid-content bg-purple-light"><el-input @change='baseChange(item, index)' v-model.number="item.point" ></el-input></div></el-col>
                   </el-row>
               </el-row>
               <el-row :gutter="20"  v-if="form.configType != 3">
                   <el-col :span="12">
                       <div class="grid-content bg-purple">
                           <el-button size="small" type="primary" @click="saveModel(1)">保存</el-button>
                           <el-button size="small" @click="close">返回</el-button>
                       </div>
                   </el-col>
               </el-row>
            </el-tab-pane>
        </el-tabs>
    </pg-box>
</template>
<style rel="stylesheet/less" lang="less" scoped>
    .el-row {
        margin-top: 10px;
    }
    .remind {
        color: red;
        font-size: 12px;
    }
    .grid-content {
        padding-left: 20px;
    }
  .el-row {
        margin-top: 10px;
    }
    .remind {
        color: red;
        font-size: 12px;
    }
    
    .table_warp{
        padding: 30px;
        background: #EFF2F7;
        border:1px solid #D3DCE6;
        box-sizing: border-box;
        .table {
            width: 100%;
           .table_header {
                height: 50px;
                .table_header_item {
                    width: 150px;
                    text-align: center;
                    color: #324057;
                    font-weight: normal;
                    border-bottom:1px solid #D3DCE6;

                }
            } 
            .table_tr {
                height: 60px;
                .table_tr_item {
                    width: 150px;
                    text-align: center;
                    color: #324057;
                    height: 40px;
                    .table_tr_item_input {
                        width: 100px; 
                    }
                }
            }
        }
    }
    .btn_group{
        margin-top: 20px;
    }
</style>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>
