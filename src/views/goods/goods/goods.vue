<template>
	<!-- 商品管理 - 商品列表 -->
	<div class="goods">
		<!-- 搜索条件 -->
		<pg-search-form
            v-model="query"
            :default-form="defaultQuery"
            :more="moreQuery"
            :resetForm="resetForm"
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
                :list="goodList"
                :skuList="skuList"
                @select-change="selectChange"
                @edit="edit"
                @getSku="getSku"
                @addSku="addSku"
                @disableSku="disableSku"
                @ableSku="ableSku"
                @editSku="editSku">
            </pg-table>
            <!-- 分页 -->
            <pg-pagination slot="pagination" @size-change="sizeChange" @current-change="currentChange" :page-size="pageSize" :total="total"></pg-pagination>
        </div>
        <!-- 编辑弹窗页 -->
        <pg-edit :title="editTitle" :show="showEdit" :isEdit="isEdit" :editForm="editForm" @close="closeEdit" @refresh="refresh"></pg-edit>
        <!-- 编辑sku弹窗页 -->
        <pg-skuedit :title="editTitle" :show="showSkuEdit" :isSkuEdit="isSkuEdit" :skuEditForm="editSkuForm" @closeSkuEdit="closeSkuEdit" @refershSku="refershSku"></pg-skuedit>
	</div>
</template>

<style type="stylesheet/less" lang="less" scoped>
	@import '~assets/styles/_variables.less';

	.goods {

	}
</style>

<script type="text/babel">
	import goods from './goods'

	export default {
		...goods
	}
</script>