<template>
    <el-table :data="list" highlight-current-row border style="width: 100%" @selection-change="selectChange">
        <el-table-column align="center" fixed="left" type="selection" width="55">
        </el-table-column>
        <el-table-column align="center" prop="name" label="名称" width="400"></el-table-column>
        <el-table-column align="center" prop="editTime" label="修改时间" width="300"></el-table-column>
        <el-table-column align="center" prop="editor" label="修改人" width="300"></el-table-column>
        <el-table-column align="center" prop="status" label="状态" width="300">
            <template scope="scope">
               <span v-if="scope.row.status==1">已启用</span>
               <span v-if="scope.row.status==0" style="color:red">已禁用</span>
            </template>            
        </el-table-column>
        <el-table-column align="center" label="操作" min-width="150">
            <template scope="scope">
                <!-- 一个按钮 -->
                <pg-button icon="chakan" title="查看" @click="edit(scope.row)"></pg-button>
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