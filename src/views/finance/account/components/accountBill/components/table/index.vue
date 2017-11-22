<template>
    <el-table :data="list" highlight-current-row border stripe style="width: 100%" @selection-change="selectChange">
        <el-table-column align="center" prop="sheetTime" label="操作时间" width="200"></el-table-column>
        <el-table-column align="center" prop="name" label="动作类型" width="200">
            <template scope="scope">
                <span v-if="scope.row.directFlag==1">增加</span>
                <span v-if="scope.row.directFlag==-1">减少</span>
            </template>
        </el-table-column>
        <el-table-column align="center" prop="sheetTypeDesc"  label="业务类型" min-width="200"></el-table-column>
        <el-table-column align="center" prop="creater"  label="操作者" min-width="200"></el-table-column> 
        <el-table-column align="center" prop="accValue"  label="发生数" min-width="200"></el-table-column>
        <el-table-column align="center" prop="closeAccValue"  label="结余" min-width="200"></el-table-column>
    </el-table>
</template>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>