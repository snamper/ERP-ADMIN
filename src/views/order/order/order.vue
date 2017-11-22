<template>
	<!-- 订单管理 - 订单列表 -->
	<div class="order">
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
            <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="代付款"></el-tab-pane>
				<el-tab-pane label="待发货" name="second"></el-tab-pane>
				<el-tab-pane label="已发货"></el-tab-pane>
				<el-tab-pane label="已取消"></el-tab-pane>
				<el-tab-pane label="已完成"></el-tab-pane>
				<!-- 列表 -->
	            <pg-table 
	                :list="orderList"
	                :type="type"
	                @select-change="selectChange"
	                @edit="edit"
	                @addSku="addSku"
	                @scan="scan">
	            </pg-table>
			</el-tabs>
            <pg-pagination slot="pagination" @size-change="sizeChange" @current-change="currentChange" :page-size="pageSize" :total="total"></pg-pagination>
        </div>
        <!-- 编辑弹窗页 -->
        <pg-edit :title="editTitle" :show="showEdit" :isEdit="isEdit" :editForm="editForm" @close="closeEdit"></pg-edit>
        <!-- 编辑sku弹窗页 -->
        <pg-skuedit :title="editTitle" :show="showSkuEdit" :editForm="editForm" @closeSkuEdit="closeSkuEdit"></pg-skuedit>
	</div>
</template>

<style type="stylesheet/less" lang="less" scoped>
	@import '~assets/styles/_variables.less';

	.order {

	}
</style>

<script type="text/babel">
	import order from './order'

	export default {
		...order
	}
</script>