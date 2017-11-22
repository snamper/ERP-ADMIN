<template>
    <!-- 素材管理 标签列表 -->
    <div class="tag">
        <!-- 搜索条件 -->
        <pg-search-form
            v-model="query"
            :default-form="defaultQuery"
            :more="moreQuery"
            :is-show-more="isShowMoreQuery"
            @openMore="toggleOpen"
            slot="search-form"
            @search="search">
        </pg-search-form>
        <div class="pg_content">
            <!-- 按钮 -->
            <pg-operations :btns="operations" @add="add" @del="del" @issue="issue"></pg-operations>
            <!-- 列表 -->
            <pg-table 
                :list="libraryList"
                @select-change="selectChange"
                @edit="edit">
            </pg-table>
            <!-- 分页 -->
            <pg-pagination slot="pagination" @size-change="sizeChange" @current-change="currentChange" :page-size="pageSize" :total="total"></pg-pagination>
            <!-- 编辑弹窗页 -->
            <pg-edit :title="editTitle" :show="showEdit" :isEdit="isEdit" :editForm="editForm" @refresh="search" @close="closeEdit"></pg-edit>
        </div>
    </div>
</template>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>