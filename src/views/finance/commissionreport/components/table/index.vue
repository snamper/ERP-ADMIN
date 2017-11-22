<template>
    <el-table :data="list" highlight-current-row border style="width: 100%" @selection-change="selectChange">
        <el-table-column align="center" fixed="left" type="selection" width="55">
        </el-table-column>
        <el-table-column align="center" prop="distributorGroupName" label="所属团队" width="200"></el-table-column>
        <el-table-column align="center" prop="customerName" label="收佣客户名称" width="250"></el-table-column>
        <el-table-column align="center" prop="payCustomerName" label="付佣客户名称" width="250"></el-table-column>
        <el-table-column align="center" prop="sheetTypeDesc" label="佣金类型" width="180"></el-table-column>
        <el-table-column align="center" prop="accValue" label="金额" width="80"></el-table-column>
        <el-table-column align="center" prop="closeAccValue" label="结余" width="80"></el-table-column>
        <el-table-column align="center" prop="createTime" label="时间" width="200"></el-table-column>
        
    </el-table>
</template>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>