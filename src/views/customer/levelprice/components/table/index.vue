<template>
    <el-table :data="list" highlight-current-row border style="width: 100%" @selection-change="selectChange">
        <el-table-column align="center" fixed="left" type="selection" width="55">
        </el-table-column>
        <el-table-column align="center" prop="code" label="分销团队编码" width="200"></el-table-column>
        <el-table-column align="center" prop="name" label="团队名称" min-width="200"></el-table-column>
        <el-table-column align="center" prop="editTime" label="修改时间" width="200"></el-table-column>
        <el-table-column align="center" prop="editor" label="修改人" width="150"></el-table-column>
        <el-table-column align="center" prop="" label="状态" width="150">
            <template scope="scope">
                <span v-if="scope.row.status === 1">已启用</span>
                <span v-else-if="scope.row.status === 0" class="disable">已禁用</span>
                <span v-else>不限</span>
            </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="80">
            <template scope="scope">
                    <pg-button icon="shezhidengjijia" title="设置等级价"  @click="edit(scope.row)"></pg-button>
                    <!--<pg-buttonn icon="shezhidengji"  @click="edit(scope.row)"></pg-button>-->
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

<style rel="stylesheet/less" lang="less">
    .disable {
        color: red;
    }
</style>