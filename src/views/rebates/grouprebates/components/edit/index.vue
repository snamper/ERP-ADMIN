<template>
    <pg-box :isShowBox="show" @close="close">
        <div class="box_title">{{title}}</div>
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="用户管理" name="first">
                <el-form ref="form" :model="form" label-width="100px" :rules="rules" :inline="false">
                    <el-form-item label="所属团队" prop="distributorGroupID">
                          <el-select  v-model="form.distributorGroupID" placeholder="请选择">
                            <el-option
                                v-for="item in teamList"
                                :key="item.id"
                                :label="item.desc"
                                :value="item.id">
                            </el-option>
                          </el-select>   
                    </el-form-item>
                    <el-form-item label="包含自己" prop="inCludeSelf">
                          <el-select  v-model="form.inCludeSelf" placeholder="请选择">
                            <el-option
                              v-for="item in cludeSelf"
                              :key="item.value"
                              :label="item.text"
                              :value="item.value">
                            </el-option>
                          </el-select>                
                    </el-form-item>
                    <el-form-item label="参考指标" prop="configType">
                          <el-select  v-model="form.configType" placeholder="请选择">
                            <el-option
                              v-for="item in configTypeList"
                              :key="item.value"
                              :label="item.text"
                              :value="item.value">
                            </el-option>
                          </el-select>                
                    </el-form-item>
                    <el-form-item label="发放方式" prop="payMothod">
                          <el-select  v-model="form.payMothod" placeholder="请选择">
                            <el-option
                              v-for="item in payMothodList"
                              :key="item.value"
                              :label="item.text"
                              :value="item.value">
                            </el-option>
                          </el-select>                
                    </el-form-item>
                    <el-form-item label="备注" prop="note" style="width: 400px;">
                        <el-input
                          type="textarea"
                          :rows="4"
                          placeholder="请输入内容"
                          v-model="form.note">
                        </el-input>
                    </el-form-item> 
                </el-form>
                <div class="btn-group">
                    <el-button size="small" type="primary" @click="save">保存</el-button>
                    <el-button size="small" @click="close">返回</el-button>
                </div>
            </el-tab-pane>           
            <!-- 返点设置的页面 -->
            <el-tab-pane label="返点设置" name="second">        
                <div class="bgColor" style="background-color: #EEF1F6;border: 1px solid #dfe6ec;border-bottom:none;">
                    <el-button style="margin:20px 0px 20px 20px" @click="addGoodsType">增加</el-button>
                    <el-table style="border:none;" :data="personConfig">
                        <el-table-column  align="center"   label="业绩范围" min-width="300">
                            <template scope="scope">
                                <p style="width: 48%;float: left">
                                    <el-input v-model.number="scope.row.beginValue"  placeholder="0" ></el-input>
                                </p>
                                <p style="width: 4%;float: left;text-align: center">
                                    -
                                </p>                            
                                <p style="width: 48%;float: left">
                                    <el-input v-model.number="scope.row.endValue"  placeholder="0" ></el-input>
                                </p>    
                            </template>                     
                        </el-table-column>
                        <el-table-column align="center" label="参数值" min-width="200">
                            <template scope="scope">
                                <el-input v-model.number="scope.row.point" placeholder="1-100"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="操作" min-width="150">
                            <template scope="scope">
                                <el-button @click="delGoodsType(scope.$index, scope.row.distributorPerformanceItemID)">删除</el-button>
                            </template>                    
                        </el-table-column>
                    </el-table>  
                </div> 
                <div class="btn-group">
                    <el-button size="small" type="primary" @click="saveGroom">保存</el-button>
                    <el-button size="small" @click="close">返回</el-button>
                </div>
            </el-tab-pane>
        </el-tabs>
    </pg-box>
</template>
<style rel="stylesheet/less" lang="less" scoped>
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
