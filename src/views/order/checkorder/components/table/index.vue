<template>
    <div>
       <el-table :data="list" highlight-current-row border style="width: 100%" @selection-change="selectChange" @expand="getGood" @cell-click="cellclick">
           <el-table-column align="center" type="selection" fixed="left" width="55">
           </el-table-column>
            <!-- 商品列表 --> 
           <el-table-column type="expand">
                <template scope="scope">
                    <el-table :data="goodList" highlight-current-row border style="width: 70%" class="skuTable">
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
                        <el-table-column align="center" prop="note" label="备注" min-width="100">
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="sheet" label="订单号" width="200">
            </el-table-column>  
            <el-table-column align="center" prop="createTime" label="下单时间" width="200">
            </el-table-column> 
            <el-table-column align="center" prop="reqCustomerName" label="提交人" width="150">
            </el-table-column>
            <el-table-column align="center" prop="totalAmount" label="金额" width="100">
            </el-table-column>
            <el-table-column align="center" prop="linkMan" label="收货人" width="150">
            </el-table-column>
            <el-table-column align="center" prop="" column-key="img" label="查看付款截图" min-width="150">
                <template scope="scope">
                    <pg-img :src="scope.row.url" class="goodsimg"></pg-img>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="note" label="备注" min-width="150">
            </el-table-column>
            <el-table-column align="center" fixed="right" label="操作" width="100">
                <template scope="scope">
                       <!-- 多个按钮 -->
                    <pg-button-group>
                        <pg-button icon="chakan" title="订单详情" @click="edit(scope.row)"></pg-button>
                    </pg-button-group>
                </template>
            </el-table-column>
        </el-table>  
        <pg-dialog :isShow="show" @close="close" :size="size" :title="title">
            <pg-img :src="imgUrl" class="payImg"></pg-img>
        </pg-dialog>
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
    .goodsimg {
        width: 60px;
        // height: 60px;
        overflow: hidden;
        vertical-align: middle;
        margin: 10px 0;
        background: #F9FAFC;   
        &:hover {
            cursor: pointer;
        }
   }
   .payImg {
        display: inline-block;
        margin-left: 25%;
        width: 50%;
        height: 50%;
   }

</style>