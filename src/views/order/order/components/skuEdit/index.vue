<template>
    <pg-box :isShowBox="show" @close="close">
        <div class="box_title">{{title}}</div>
        <p class="oederNu">订单号：1 170510 4898 0001</p>
        <el-button class="import_btn">导入</el-button>
        <el-table :data="goodList" highlight-current-row border style="width: 90%" class="goodTable">
            <el-table-column align="center" prop="bainhao" label="商品货号" width="150">
            </el-table-column>
            <el-table-column align="center" prop="attr" label="sku" width="150">
            </el-table-column>
            <el-table-column align="center" prop="stQ" label="数量" width="100">
            </el-table-column>
            <el-table-column align="center" prop="" label="大/小码" min-width="250">
                <template scope="scope">
                    <el-input></el-input>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="status" label="没扫" min-width="100">
            </el-table-column>
        </el-table>
        <div class="btn-group">
            <el-button>保存</el-button><el-button @click="close">关闭</el-button>
        </div>
    </pg-box>
</template>
<style rel="stylesheet/less" lang="less" scoped>
    .el-row {
        margin-top: 10px;
    }
    .import_btn {
        margin: 20px;
    }
    .goodTable {
        margin-left: 20px;
    }
    .btn-group {
        margin-top: 50px;
    }
    p {
        padding: 0;
        margin: 0;
    }
</style>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>
