<template>
    <el-table :data="list" highlight-current-row border style="width: 100%">
        <el-table-column align="center" prop="code" label="配置编码" min-width="100">
        </el-table-column>
        <el-table-column align="center" prop="module" label="模块" min-width="100">
        </el-table-column>
        <el-table-column align="center" prop="name" label="配置名称" min-width="100">
        </el-table-column>
        <el-table-column align="center" prop="" label="配置值" min-width="100">
            <template scope="scope">
                <span v-if="scope.row.value === '0'">禁用</span>
                <span v-if="scope.row.value === '1'">启用</span>
            </template>
        </el-table-column>
        <el-table-column align="center" prop="createTime" label="修改时间" min-width="200">
        </el-table-column>
        <el-table-column align="center" prop="creater" label="修改人" min-width="100">
        </el-table-column>
        <el-table-column align="center" prop="note" label="备注" min-width="200">
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="100">
            <template scope="scope">
                <pg-button icon="xiugai" title="修改配置" @click="edit(scope.row)"></pg-button>
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