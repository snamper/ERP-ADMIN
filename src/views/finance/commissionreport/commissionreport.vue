<template>
	<!-- 财务管理 - 佣金报表 -->
	<div class="commissionreport">
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
             <!--按钮 -->
            <pg-operations :btns="operations" @exportOrder="exportOrder" ></pg-operations>
            <!-- 列表 -->
            <pg-table 
                :list="reportList"
                @select-change="selectChange">
            </pg-table>
            <!-- 分页 -->
            <pg-pagination slot="pagination" @size-change="sizeChange" @current-change="currentChange" :page-size="pageSize" :total="total"></pg-pagination>
        </div>
	</div>
</template>

<style type="stylesheet/less" lang="less" scoped>
	@import '~assets/styles/_variables.less';

	.commissionreport {

	}
</style>

<script type="text/babel">
	import commissionreport from './commissionreport'

	export default {
		...commissionreport
	}
</script>