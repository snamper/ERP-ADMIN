<template>
    <el-pagination
        v-if="total > 0"
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        :layout="layout"
        :total="total">
    </el-pagination>
</template>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>