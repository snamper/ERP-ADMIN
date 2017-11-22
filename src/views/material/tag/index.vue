<template>
    <!-- 素材管理 标签列表 -->
    <div class="tag">
        <!-- 搜索条件 -->
        <div class="pg_content">
            <!-- 按钮 -->
            <pg-operations :btns="operations" @add="add"></pg-operations>
            <!-- 列表 -->
            <pg-table 
                :list="tagList"
                @del="del">
            </pg-table>
            <!-- 分页 -->
            <pg-pagination slot="pagination" @size-change="sizeChange" @current-change="currentChange" :page-size="pageSize" :total="total"></pg-pagination>
            <!-- 编辑弹窗页 -->
            <pg-edit :title="editTitle" :show="showEdit" @refresh="refresh" @close="closeEdit"></pg-edit>
        </div>
    </div>
</template>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>