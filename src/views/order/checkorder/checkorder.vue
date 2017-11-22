<template>
	<!-- 订单管理 - 待审核订单 -->
	<div class="checkorder">
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
            <pg-operations 
             	:btns="operations" 
             	@exportOrder="exportOrder" 
             	@saveOrder="saveOrder" 
             	@cancelOrder="cancelOrder"
             >
            </pg-operations>
			<!-- 列表 -->
	        <pg-table 
	            :list="orderList"
	            :goodList="goodList"
	            @select-change="selectChange"
	            @edit="edit"
	            @getGood="getGood"
	        >
	        </pg-table>
            <pg-pagination slot="pagination" @size-change="sizeChange" @current-change="currentChange" :page-size="pageSize" :total="total"></pg-pagination>
        </div>
        <!-- 编辑弹窗页 -->
        <pg-edit :title="editTitle" :show="showEdit" :editForm="editForm" @close="closeEdit"></pg-edit>
	</div>
</template>

<style type="stylesheet/less" lang="less" scoped>
	@import '../../../assets/styles/_variables.less';
	
	.checkorder {

	}
</style>

<script type="text/babel">
	import checkorder from './checkorder'

	export default {
		...checkorder
	}
</script>