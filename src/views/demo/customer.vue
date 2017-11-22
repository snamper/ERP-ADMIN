<template>
	<!-- 客户管理 - 分销客户列表 -->
	<div class="customer">
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
            <pg-operations :btns="operations" @add="add" @del="del" @enable="enable" @disable="disable" @print="print"></pg-operations>
            <!-- 列表 -->
            <pg-table 
                id="print_table"
                :list="customerList"
                @select-change="selectChange"
                @edit="edit">
            </pg-table>
            <!-- 分页 -->
            <pg-pagination slot="pagination" @size-change="sizeChange" @current-change="currentChange" :page-size="pageSize" :total="total"></pg-pagination>
        </div>
        <!-- 编辑弹窗页 -->
        <pg-edit :title="editTitle" :show="showEdit" :isEdit="isEdit" :editForm="editForm" @close="closeEdit" @addGoods="addGoods"></pg-edit>
        <!-- 商品列表选择 -->
        <pg-goods :show="isShowGoods" @changeGoods="changeGoods" @close="closeGoods"></pg-goods>
	</div>
</template>

<script type="text/babel">
	import customer from './customer'
	export default {
		...customer
	}
</script>