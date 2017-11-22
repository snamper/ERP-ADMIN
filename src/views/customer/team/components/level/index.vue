<template>
    <pg-box :isShowBox="show" @close="close">
        <div class="box_title">设置等级信息</div>
        <div class="addDiv">
        <el-button size="small"  @click="newLevel">增加</el-button>
        </div>
        <el-form ref="form" :model="form" label-width="100px">
            <el-table :data="levelList" highlight-current-row border style="width: 100%" @selection-change="selectChange">
                <!--<el-table-column align="center" fixed="left" type="selection" width="55">
                </el-table-column>-->
                <el-table-column align="center" prop="name" label="等级名称" width="200">
                    <template scope="scope">
                        <el-input v-model='scope.row.name'></el-input>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="power" label="等级权重" width="200">
                    <template scope="scope">
                        <el-input v-model='scope.row.power'></el-input>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="isExpCurr"  label="发展平级" min-width="200">
                    <template scope="scope">
                        <el-select v-model="scope.row.isExpCurr" >
                            <el-option
                                v-for="item in option"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="upLevelQty" label="可升层数" width="200">
                    <template scope="scope">
                        <el-input v-model='scope.row.upLevelQty'></el-input>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="levelQty" label="可发展层数" width="200">
                    <template scope="scope">
                        <el-input v-model='scope.row.levelQty'></el-input>
                    </template>
                </el-table-column>
                
                    <el-table-column align="center" prop="childCheck"  label="升级需最高级审核" min-width="200">
                        <template scope="scope">
                            <el-select v-model="scope.row.childCheck" >
                                <el-option
                                    v-for="item in option"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                <el-table-column align="center" prop="isUpgradeResetFirst"  label="升级首货重置" min-width="200">
                    <template scope="scope">
                        <el-select v-model="scope.row.isUpgradeResetFirst" >
                            <el-option
                                v-for="item in option "
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="chargeAmount" label="充值最低金额" width="200">
                    <template scope="scope">
                        <el-input v-model='scope.row.chargeAmount'></el-input>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="firstAmount" label="首货限额" width="200">
                    <template scope="scope">
                        <el-input v-model='scope.row.firstAmount'></el-input>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="orderAmount" label="补货限额" width="200">
                    <template scope="scope">
                        <el-input v-model='scope.row.orderAmount'></el-input>
                    </template>
                </el-table-column>
                
                <el-table-column align="center" prop="isNeedCheck"  label="公司审核" min-width="200">
                    <template scope="scope">
                        <el-select v-model="scope.row.isNeedCheck" >
                            <el-option
                                v-for="item in option"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="priceRate" label="商品折扣" width="200">
                    <template scope="scope">
                        <el-input v-model='scope.row.priceRate'></el-input>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="保证金" width="200">
                    <template scope="scope">
                        <el-input v-model='scope.row.guaranteeMoney'></el-input>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="" label="操作" width="200">
                    <template scope="scope">
                        <el-button size="small" type="primary"  @click="deleteList(scope.$index)">删除</el-button>
                    </template>
                </el-table-column>    
                
            </el-table>
            <el-form-item class="el-form-item_btns">
                <el-button size="small" type="primary" @click="save">保存</el-button>
                <el-button size="small" @click="close">返回</el-button>
            </el-form-item>
        </el-form>
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
    .addDiv{
        width: 100px;
        margin: 0 0 20px 20px;
    }
</style>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>
