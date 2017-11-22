<template>
    <div>
        <div class="button_type">
            <span>批量操作</span>
            <div class="button_type_item" v-if="type ===1">
                <el-button type="default" @click="">获取快递单号</el-button>
                <el-button type="default" @click="">导入快递单号</el-button>
                <el-button type="default" @click="">打印快递单</el-button>
                <el-button type="default" @click="">导出订单信息</el-button>
                <el-button type="default" @click="">发货</el-button>
            </div>
            <div class="button_type_item" v-else-if="type ===0">
                <el-button type="default" @click="">标记为已发货</el-button>
                <el-button type="default" @click="">导出订单信息</el-button>
            </div>
            <div class="button_type_item" v-else>
                <el-button type="default" @click="">导出订单信息</el-button>
            </div>
        </div>
        <el-table :data="goodList" highlight-current-row border style="width: 100%" @selection-change="selectChange" show-overflow-tooltip="true">
            <el-table-column align="center" type="selection" fixed="left" width="55">
            </el-table-column>
             <!-- 商品列表 --> 
            <el-table-column type="expand">
                <template scope="scope">
                    <el-table :data="skuList" highlight-current-row border style="width: 60%" class="skuTable">
                        <el-table-column align="center" prop="bainhao" label="商品货号" width="200">
                        </el-table-column>
                        <el-table-column align="center" prop="attr" label="sku属性" width="100">
                        </el-table-column>
                        <el-table-column align="center" prop="stQ" label="数量" width="100">
                        </el-table-column>
                        <el-table-column align="center" prop="status" label="金额" width="100">
                        </el-table-column>
                        <el-table-column align="center" prop="status" label="备注" width="100">
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="bainhao" label="订单号" width="200">
            </el-table-column>  
            <el-table-column align="center" prop="brand" label="下单时间" width="200">
            </el-table-column> 
            <el-table-column align="center" prop="" label="提交人" width="200">
            </el-table-column>
            <el-table-column align="center" prop="brand" label="收货人" width="100">
            </el-table-column>
            <el-table-column align="center" prop="" label="标记" width="100">
            </el-table-column>
            <el-table-column align="center" prop="" label="打印数次" width="200">
            </el-table-column v-if="type ===1">
            <el-table-column align="center" prop="" label="收货电话" width="100" v-if="type !==0 && type !==1">
            </el-table-column>
            <el-table-column align="center" prop="" label="查看付款截图" width="100" v-if="type ===0">
            </el-table-column>
            <el-table-column align="center" prop="" label="备注" width="100" v-if="type !==1">
            </el-table-column>
            <el-table-column align="center" prop="" label="快递公司" width="100"  v-if="type !==1&&type !==0">
            </el-table-column>
            <el-table-column align="center" prop="name" label="快递单号" width="100">
            </el-table-column>
            <el-table-column align="center" fixed="right" label="操作" min-width="200">
                <template scope="scope">
                    <!-- 多个按钮 -->
                    <pg-button-group>
                        <pg-button icon="chakan" @click="edit(scope.row,0)"></pg-button>
                        <pg-button icon="xiugai" @click="scan(scope.row,1)" v-if="type ===1"></pg-button>
                        <pg-button icon="shezhidengji" @click="" v-if="type ===1"></pg-button>
                    </pg-button-group>
                    <!-- 一个按钮 -->
                    <pg-button icon="shezhidengji" v-if="type ===0" @click=""></pg-button>
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
    .button_type {
        margin-top: 10px;
        margin-bottom: 10px;
        height: 50px;
        .button_type_item {
            display: inline-block;
            margin-left: 20px;
        }
    }
</style>