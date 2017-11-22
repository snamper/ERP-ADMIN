<template>
    <el-table :data="list" highlight-current-row border style="width: 100%" @selection-change="selectChange" show-overflow-tooltip="true">
        <el-table-column align="center" type="selection" fixed="left" width="55">
        </el-table-column>
        <el-table-column align="center" prop="parentCode" label="大码" width="150">
        </el-table-column>
        <el-table-column align="center" prop="code" label="小码" width="150">
        </el-table-column>
        <el-table-column align="center" prop="detectCode" label="防伪码" width="100">
        </el-table-column>
        <el-table-column align="center" prop="customBC" label="关联sku" width="100">
        </el-table-column>
        <el-table-column align="center" prop="sheet" label="关联订单" width="200">
        </el-table-column>
        <el-table-column align="center" prop="customerName" label="收货人" width="100">
        </el-table-column>
        <el-table-column align="center" prop="detectCodeCheck" label="查询数次" width="100">
        </el-table-column>
        <el-table-column align="center" prop="" label="启用/禁用" width="100">
            <template scope="scope">
                <span v-if="scope.row.status === 1">已启用</span>
                <span v-if="scope.row.status === 0" class="disable">已禁用</span>
                <span v-if="scope.row.status === -1">不限</span>
            </template>
        </el-table-column>
        <el-table-column align="center" prop="statusDesc" label="状态" width="100">
        </el-table-column>
        <el-table-column align="center" prop="note" label="备注" min-width="200">
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="100">
            <template scope="scope">
                <!-- 多个按钮 -->
                <pg-button-group>
                    <pg-button icon="chakanjilu" title="查询记录" @click="edit(scope.row)"></pg-button>
                </pg-button-group>
            </template>
        </el-table-column>
    </el-table>   
</template>

<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>

<style rel="stylesheet/less" lang="less" scoped>
    .disable {
        color: red;
    }
</style>