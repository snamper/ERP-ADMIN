<template>
    <el-table :data="list" highlight-current-row border style="width: 100%" >
        <el-table-column align="center" prop="groupName" label="所属团队" width="200"></el-table-column>
        <el-table-column align="center" prop="name" label="分销商姓名" width="200"></el-table-column>
        <el-table-column align="center" prop="gradeName" label="等级" width="200"></el-table-column>
        <el-table-column align="center" prop="parentName" label="上级姓名" width="200"></el-table-column>
        <el-table-column align="center" prop="" label="注册时间" width="200">
            <template scope="scope">
                <span>{{scope.row.createTime}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" prop="mePerformance" label="个人业绩" width="200"></el-table-column>
        <el-table-column align="center" prop="subPerformance" label="直属下级业绩" width="200"></el-table-column>
        <el-table-column align="center" prop="subTwoPerformance" label="直属下二级业绩" ></el-table-column>
    </el-table>
</template>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>