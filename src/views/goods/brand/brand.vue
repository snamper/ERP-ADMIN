<template>
	<!-- 商品管理 - 品牌列表 -->
	<div class="brand">
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
             	@add="add" 
             	@enable="enable" 
             	@disable="disable"
             	@leadIn="leadIn"
             	@educe="educe">
            </pg-operations>
            <!-- 列表 -->
            <pg-table 
                :list="brankList"
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
	@import '~assets/styles/_variables.less';
	.brand {
		width: 100%;
	}
</style>

<script type="text/babel">
	import brand from './brand'

	export default {
		...brand
	}
</script>