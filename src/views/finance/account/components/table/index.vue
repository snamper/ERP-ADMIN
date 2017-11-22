<template>
    <el-table :data="list" highlight-current-row border style="width: 100%" @selection-change="selectChange">
        <el-table-column align="center" fixed="left" type="selection" width="55">
        </el-table-column>
        <el-table-column align="center" prop="distributorGroupName" label="团队名称" width="300"></el-table-column>
        <el-table-column align="center" prop="customerName" label="分销客户名称" width="300"></el-table-column>
        <el-table-column align="center" prop="customerGradeName" label="等级" width="300"></el-table-column>
        <el-table-column align="center" prop="amount" label="佣金" width="300"></el-table-column>
        <el-table-column align="center" prop="account" label="余额" width="300"></el-table-column>
        <el-table-column align="center" prop="editor" label="操作人" width="300"></el-table-column>
        <el-table-column align="center" prop="editTime" label="操作时间" width="300"></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" min-width="150">
            <template scope="scope">
                <!-- 操作 @click="detail(scope.row)"-->
                <pg-button-group>
                    <pg-button icon="xiugai" title="调整" @click="edit(scope.row)"></pg-button>
                    <pg-button icon="chakan" title="操作流水" @click="detail(scope.row)"></pg-button>
                    
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