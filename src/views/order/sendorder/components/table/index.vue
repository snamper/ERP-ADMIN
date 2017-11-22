<template>
    <div>
        <el-table :data="list" highlight-current-row border style="width: 100%" @selection-change="selectChange" @expand="getGood">
            <el-table-column align="center" type="selection" fixed="left" width="55">
            </el-table-column>
             <!-- 商品列表 --> 
            <el-table-column type="expand">
                <template scope="scope">
                    <el-table :data="goodList" highlight-current-row border style="width: 80%" class="skuTable">
                        <el-table-column align="center" prop="customNo" label="商品货号" min-width="100">
                        </el-table-column>
                        <el-table-column align="center" prop="" label="sku属性" min-width="100">
                            <template scope="scope">
                                <span>{{scope.row.property1 }}\{{scope.row.property2 }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="qty" label="数量" min-width="100">
                        </el-table-column>
                        <el-table-column align="center" prop="price" label="金额" min-width="100">
                        </el-table-column>
                        <el-table-column align="center" prop="price" label="唯一码" min-width="100">
                            <template scope="scope">
                                <span v-for="item in scope.row.listQrCode">{{item}}&nbsp;&nbsp;</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="note" label="备注" min-width="100">
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="sheet" label="订单号" min-width="200">
            </el-table-column>  
            <el-table-column align="center" prop="createTime" label="下单时间" min-width="200">
            </el-table-column> 
            <el-table-column align="center" prop="reqCustomerName" label="提交人" min-width="150">
            </el-table-column>
            <el-table-column align="center" prop="linkMan" label="收货人" min-width="150">
            </el-table-column>
            <el-table-column align="center" prop="mobile" label="收货电话" min-width="150" v-if="type !== 0 && type !== 1">
            </el-table-column>
            <el-table-column align="center" prop="note" label="备注" min-width="150" v-if="type !== 0 && type !== 1">
            </el-table-column>
            <el-table-column align="center" prop="deliveryName" label="快递公司" min-width="150">
            </el-table-column>
            <el-table-column v-if="type === 1 && type === 0" align="center" prop="printTimes" label="打印数次" width="100">
            </el-table-column>
            <el-table-column align="center" prop="deliverySheetID" label="快递单号" min-width="200">
            </el-table-column>
            <el-table-column align="center" fixed="right" label="操作" width="180">
                <template scope="scope">
                    <!-- 多个按钮 -->
                    <pg-button-group>
                        <!-- 查看订单详情 -->
                        <pg-button icon="chakan" title="订单详情" @click="edit(scope.row)"></pg-button>
                        <!-- 取消按钮 -->
                        <!-- <pg-button icon="quxiao" title="取消订单" @click="cancel(scope.row)" v-if="type ===0 || type ===1"></pg-button> -->
                        <pg-button icon="quxiao" title="取消订单" @click="cancel(scope.row)" v-if="type ===0"></pg-button>
                        <!-- 导入唯一码 -->
                        <pg-button icon="daoruweiyima" title="导入唯一码" @click="scan(scope.row)" v-if="type ===1"></pg-button>
                    </pg-button-group>
                </template>
            </el-table-column>
        </el-table>   
    </div>
</template>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>
<style rel="stylesheet/less" lang="less" scoped>
    .skuTable {
        margin-left: 30px;
    }
</style>