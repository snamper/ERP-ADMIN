<template>
    <pg-dialog :isShow="show" @close="close">
        <div class="pg-dialog">
        
            <!-- 按钮 -->
            <pg-operations :btns="operations" @account="account" @amount="amount"></pg-operations>
            <!-- 列表 -->
            <pg-table 
                :list="detailList"
                >
            </pg-table>
            <!-- 分页 -->
            <pg-pagination slot="pagination" @size-change="sizeChange" @current-change="currentChange" :page-size="pageSize" :total="total"></pg-pagination>
        </div>
    </pg-dialog>
</template>

<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>
