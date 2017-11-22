<template>
	<!-- 商品管理 - 二维码管理 -->
	<div class="qrcode">
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
                :list="globalConfiList"
                @edit="edit">
            </pg-table>
            <!-- 分页 -->
            <pg-pagination slot="pagination" @size-change="sizeChange" @current-change="currentChange" :page-size="pageSize" :total="total"></pg-pagination>
        </div>
        <!-- 编辑弹窗页 -->
        <pg-edit :title="editTitle" :show="showEdit" :editForm="editForm" @close="closeEdit" @refresh="refresh"></pg-edit>
	</div>
</template>

<style type="stylesheet/less" lang="less" scoped>
	@import '~assets/styles/_variables.less';

	.qrcode {

	}
</style>

<script type="text/babel">
	import globalconfig from './globalconfig'

	export default {
		...globalconfig
	}
</script>