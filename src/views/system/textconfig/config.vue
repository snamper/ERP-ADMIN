<template>
	<!-- 客户管理 - 分销团队列表 -->
	<div class="team">
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
        <!--<div class="pg_content">-->
            <!-- 按钮 -->
            <pg-operations :btns="operations" @add="add"  @enable="enable" @disable="disable"></pg-operations>
            <!-- 列表 -->
            <pg-table 
                :list="list"
                @select-change="selectChange"
                @edit="edit"
				@detail="detail"
			    >
            </pg-table>
            <!-- 分页 -->
            <pg-pagination slot="pagination" @size-change="sizeChange" @current-change="currentChange" :page-size="pageSize" :total="total"></pg-pagination>
        <!--</div>-->
         <!--编辑弹窗页 -->
        <pg-edit :detail="isDetail" :title="editTitle" :textType='textType' :teams='teams' :show="showEdit" :isEdit="isEdit" :editForm="editForm" @close="closeEdit(1)"></pg-edit>
		<!--等级弹窗页 -->
	</div>
</template>

<style type="stylesheet/less" lang="less" scoped>
	@import '~assets/styles/_variables';

</style>

<script type="text/babel">
	import config from './config'

	export default {
		...config
	}
</script>