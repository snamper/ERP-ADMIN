<template>
    <!-- 返点管理 - 平级返点 -->
    <div class="peersrebates">
        <!-- 搜索条件 -->
        <pg-search-form
            v-model="query.condition"
            :default-form="defaultQuery"
            :more="moreQuery"
            :resetForm="resetForm.condition"
            :is-show-more="isShowMoreQuery"
            @openMore="toggleOpen"
            slot="search-form"
            @search="search">
        </pg-search-form>
        <div class="pg_content">
            <!-- 按钮 -->
            <pg-operations :btns="operations"  @add="add" @enable="enable" @disable="disable"></pg-operations>
            <!-- 列表 -->
            <pg-table 
                :list="customerList"
                @select-change="selectChange"
                @edit="edit">
            </pg-table>
            <!-- 分页 -->
            <pg-pagination slot="pagination" @size-change="sizeChange" @current-change="currentChange" :page-size="pageSize" :total="total"></pg-pagination>
        </div>
        <!-- 编辑弹窗页 -->
        <pg-edit :title="editTitle" :show="showEdit" :isEdit="isEdit" :editForm="editForm" @close="closeEdit" @refresh="refresh"></pg-edit>
    </div>
</template>

<style type="stylesheet/less" lang="less" scoped>
    @import '~assets/styles/_variables';

    .peersrebates {
        width: 100%;
    }
</style>

<script type="text/babel">
    import peersrebates from './peersrebates'

    export default {
        ...peersrebates
    }
</script>