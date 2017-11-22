<template>
	<!-- 业绩管理 - 业绩统计 -->
	<div class="resultstatistics">
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
            <pg-operations :btns="operations" @add="add" ></pg-operations>
            <!-- 列表 -->
            <pg-table :list="resultstatisticsList">
            </pg-table>
            <!-- 分页 -->
            <pg-pagination slot="pagination" @size-change="sizeChange" @current-change="currentChange" :page-size="pageSize" :total="total"></pg-pagination>
        </div>
	</div>
</template>

<style type="stylesheet/less" lang="less" scoped>
	@import '../../../assets/styles/_variables.less';

	.resultstatistics {

	}
</style>

<script type="text/babel">
	import resultstatistics from './resultstatistics'

	export default {
		...resultstatistics
	}
</script>