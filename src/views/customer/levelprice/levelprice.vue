<template>
	<!-- 客户管理 - 分销团队列表 -->
	<div class="levelprice">
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
            <!-- 列表 -->
            <pg-table 
                :list="teamList"
                @select-change="selectChange"
                @edit="edit"
				@detail="detail"
				@level="level"
                @goods="goods">
            </pg-table>
            <!-- 分页 -->
            <pg-pagination slot="pagination" @size-change="sizeChange" @current-change="currentChange" :page-size="pageSize" :total="total"></pg-pagination>
        </div>
         <!--编辑弹窗页 -->
        <pg-edit :title="editTitle" :groups="groups":show="showEdit" :isEdit="isEdit" :editForm="editForm" @close="closeEdit" @searchPrice="searchPrice"></pg-edit>
	</div>
</template>

<style type="stylesheet/less" lang="less" scoped>
	@import '~assets/styles/_variables';

	.levelprice {
		
	}
</style>

<script type="text/babel">
	import levelprice from './levelprice'

	export default {
		...levelprice
	}
</script>