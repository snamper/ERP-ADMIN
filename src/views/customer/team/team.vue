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
            <pg-operations :btns="operations" @add="add" @del="del" @enable="enable" @disable="disable"></pg-operations>
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
        <!--</div>-->
         <!--编辑弹窗页 -->
        <pg-edit :detail="isDetail" :title="editTitle" :uploadBtn ="uploadBtn" :show="showEdit" :isEdit="isEdit" :editForm="editForm" @close="closeEdit(1)"></pg-edit>
		<!--等级弹窗页 -->
        <pg-level  :show="isShowLevel" :hasLevelList="levelList" :editForm="editForm" @close="closeEdit(2)"></pg-level>
        <!--商品弹窗页 -->
        <gd-edit  :show="isShowGoods"  :addGoodsList='newgoodList' :editForm="editForm" @close="closeEdit(3)" @showaddgood="showAddGood"></gd-edit >
            <!--@addGoods='updateForm'-->
        <gd-add-goods :brankList="brankList" :show="isShowAdd" @addgoods='updateForm' @close="closeEdit(4)"></gd-add-goods >
	</div>
</template>

<style type="stylesheet/less" lang="less" scoped>
	@import '~assets/styles/_variables';

	.team {
		
	}
</style>

<script type="text/babel">
	import team from './team'

	export default {
		...team
	}
</script>