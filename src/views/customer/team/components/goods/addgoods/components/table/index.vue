<template>
    <el-table :data="list" highlight-current-row border stripe style="width: 100%" @selection-change="selectChange">
        <el-table-column align="center" fixed="left" type="selection" width="55">
        </el-table-column>
        <el-table-column align="center" prop="customNo" label="货号" width="200"></el-table-column>
        <el-table-column align="center" prop="name" label="商品名称" width="200"></el-table-column>
        <el-table-column align="center" prop="brandDesc"  label="品牌类型" min-width="200"></el-table-column>
        <el-table-column align="center" prop="basePrice"  label="价格" min-width="200"></el-table-column> 
    </el-table>
</template>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>