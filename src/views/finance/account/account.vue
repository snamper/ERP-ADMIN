<template>
	<!-- 财务管理 - 分销账户 -->
	<div class="account">
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
             <!--按钮 
            <pg-operations :btns="operations" @add="add"  @enable="enable" @disable="disable"></pg-operations>-->
            <!-- 列表 -->
            <pg-table 
                :list="customerList"
                @select-change="selectChange"
                @edit="edit"
				@detail="detail">
            </pg-table>
            <!-- 分页 -->
            <pg-pagination slot="pagination" @size-change="sizeChange" @current-change="currentChange" :page-size="pageSize" :total="total"></pg-pagination>
        </div>
        <!-- 调整弹窗页 -->
        <pg-edit  :show="showEdit"  :editForm="editForm" @close="closeEdit(1)"></pg-edit>
		<!-- 账户流水弹窗 -->
        <pg-account :show="isDetail"  :editForm="editForm" @close="closeEdit(2)"></pg-account>
	</div>
</template>

<style type="stylesheet/less" lang="less" scoped>
	@import '~assets/styles/_variables.less';

	.account {

	}
</style>

<script type="text/babel">
	import account from './account'

	export default {
		...account
	}
</script>