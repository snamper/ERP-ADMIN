<template>
    <pg-box :isShowBox="show" @close="close">
        <div class="box_title">{{title}}跨级推荐返点规则</div>
        <el-tabs v-model="activeName2" type="card">
            <el-tab-pane label="用户管理" name="first">        
                <el-form ref="form" :model="form" label-width="110px" :rules="rules" :inline="false">
                    <el-form-item label="团队"  prop="distributorGroupID">
                        <el-select v-model="form.distributorGroupID"  placeholder="请选择所属团队" width="100">
                            <el-option
                              v-for="item in teamList"
                              :key="item.id"
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
                              v-for="item in defaultForm.configTypeList"
                              :key="item.text"
                              :label="item.text"
                              :value="item.value">
                            </el-option>
                       </el-select>
                     </el-form-item>
                    <el-form-item label="发放方式" prop="payMothod">
                       <el-select v-model="form.payMothod" placeholder="请选择发放方式">
                            <el-option
                              v-for="item in defaultForm.payMothodList"
                              :key="item.text"
                              :label="item.text"
                              :value="item.value">
                            </el-option>
                       </el-select>
                     </el-form-item>
                    <el-form-item label="推荐关系等级" prop="customerGradeFlag">
                       <el-select v-model="form.customerGradeFlag" placeholder="请选择推荐关系等级">
                            <el-option
                              v-for="item in defaultForm.grade"
                              :key="item.value"
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

            <!-- 返点设置的页面 -->
            <el-tab-pane label="返点设置" name="second" v-if="form.distributorIntroConfigID !== '' ||  form.distributorIntroConfigID != null">
                <!-- 当参考指标选择订单金额或固定金额，推荐等级选择不限时 -->
                <div v-if="(form.configType === 1 || form.configType === 2) && form.customerGradeFlag === 0" class="groom">
                    <div class="groom_item">
                        <span class="groom_title">推荐关系-1</span>
                        <el-input class="groom_input" placeholder="1-100" v-model.number="baseModel.rebateItems[0].point" @change="baseChange(0)"></el-input>
                    </div>
                    <div class="groom_item">
                        <span class="groom_title">推荐关系-2</span>
                        <el-input class="groom_input" v-model.number="baseModel.rebateItems[1].point" @change="baseChange(1)"></el-input>
                    </div>
                    <div class="groom_item">
                        <span class="groom_title">推荐关系-3</span>
                        <el-input class="groom_input" v-model.number="baseModel.rebateItems[2].point" @change="baseChange(2)"></el-input>
                    </div>
                    <div class="btn-group">
                        <el-button size="small" type="primary" @click="saveGroom">保存</el-button>
                        <el-button size="small" @click="close">返回</el-button>
                    </div>
                </div>
                <!-- 当参考指标选择订单金额或固定金额，推荐等级选择指定时时 -->
                <div v-if="(form.configType === 1 || form.configType === 2) && form.customerGradeFlag === 1" class="groom">
                    <el-collapse v-model="activeNames" @change="handleChange" accordion>
                        <el-collapse-item :title="item.name" :name="item.id" v-for="item in collapse">
                            <div class="groom_item">
                                <span class="groom_title">推荐关系-1</span>
                                <el-input class="groom_input" placeholder="1-100" v-model.number="baseModel.rebateItems[0].point" @change="baseChange(0, item.id)"></el-input>
                            </div>
                            <div class="groom_item">
                                <span class="groom_title">推荐关系-2</span>
                                <el-input class="groom_input" v-model.number="baseModel.rebateItems[1].point" @change="baseChange(1, item.id)"></el-input>
                            </div>
                            <div class="groom_item">
                                <span class="groom_title">推荐关系-3</span>
                                <el-input class="groom_input" v-model.number="baseModel.rebateItems[2].point" @change="baseChange(2, item.id)"></el-input>
                            </div>
                            <div class="btn-group">
                                <el-button size="small" type="primary" @click="saveGroom">保存</el-button>
                                <el-button size="small" @click="close">返回</el-button>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <!-- 当参考指标选择商品金额时，推荐等级选择不限时 -->
                <div v-if="form.configType === 3 && form.customerGradeFlag === 0" class="groom">
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
                                <tr v-for="item in goodsModel" class="table_tr">
                                    <td  class="table_tr_item">
                                        <span v-bind:title="item.goodsCustomNo+'-'+item.goodsName+'-'+item.goodsPrice" class="table_tr_goodsName" >{{item.goodsCustomNo}} - {{item.goodsName}} - {{item.goodsPrice}}</span>
                                    </td>
                                    <td v-for="item2 in item.rebateItems"  class="table_tr_item">
                                        <el-input v-model.number="item2.point" class=" table_tr_item_input"></el-input>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="btn-group">
                        <el-button size="small" type="primary" @click="saveGroom">保存</el-button>
                        <el-button size="small" @click="close">返回</el-button>
                    </div>
                </div>
                <!-- 当参考指标选择商品金额时，推荐等级选择指定时时 -->
                <div v-if="form.configType === 3 && form.customerGradeFlag === 1" class="groom">
                    <el-collapse v-model="activeNames" @change="handleChange" accordion>
                          <el-collapse-item :title="item.name" :name="item.id" v-for="item in collapse">
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
                                            <tr v-for="item in goodsModel" class="table_tr">
                                                <td  class="table_tr_item">
                                                    <span v-bind:title="item.goodsCustomNo+'-'+item.goodsName+'-'+item.goodsPrice" class="table_tr_goodsName" >{{item.goodsCustomNo}} - {{item.goodsName}} - {{item.goodsPrice}}</span>
                                                </td>
                                                <td v-for="item2 in item.rebateItems"  class="table_tr_item">
                                                    <el-input v-model.number="item2.point" class=" table_tr_item_input"></el-input>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="btn-group">
                                    <el-button size="small" type="primary" @click="saveGroom(item.id)">保存</el-button>
                                    <el-button size="small" @click="close">返回</el-button>
                                </div>
                          </el-collapse-item>
                    </el-collapse>
                </div>
            </el-tab-pane>
        </el-tabs>
    </pg-box>
</template>
<style rel="stylesheet/less" lang="less" scoped>
    .groom {
        margin-top: 20px;
        padding-left: 10%;
        .groom_item {
            margin: 10px;
            .groom_input {
                display: inline-block;
                margin-left: 30px;
                width: 30%;
            }
        }
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
                .table_tr_item {
                    width: 150px;
                    text-align: center;
                    color: #324057;
                    height: 40px;
                    .table_tr_goodsName{
                        width: 160px;
                        display: block;
                        overflow: hidden;
                        height: 2em;
                    }
                    .table_tr_item_input {
                        width: 100px; 
                    }
                }
            }
        }
    }
    .btn-group {
        margin-top: 40px;
        margin-left: 30px;
    }
</style>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>
