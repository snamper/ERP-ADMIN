<template>
    <el-table :data="list" v-loading="localLoading === 'materialStockPage'" element-loading-text="拼命加载中" highlight-current-row border stripe style="width: 100%" @selection-change="selectChange">
        <el-table-column align="center" fixed="left" type="selection" width="55">
        </el-table-column>
        <el-table-column align="center" prop="name" label="素材库名称" min-width="100"></el-table-column>
        <el-table-column align="center" prop="groupName" label="针对团队" width="200"></el-table-column>
        <el-table-column align="center" prop="materialTagName" label="标签" width="200"></el-table-column>
        <el-table-column align="center" prop="editor" label="修改人" width="100"></el-table-column>
        <el-table-column align="center" prop="editTime" label="修改时间" width="200"></el-table-column>
        <el-table-column align="center" prop="statusDesc" label="状态" width="100">
            <template scope="scope">
                <el-tag type="success" v-if="scope.row.status == 1">{{scope.row.statusDesc}}</el-tag>
                <el-tag v-else>{{scope.row.statusDesc}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="150">
            <template scope="scope">
                <pg-button icon="xiugai" title="编辑" @click="edit(scope.row)"></pg-button>
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