<template>
	<!-- 订单管理 - 快递管理 -->
	<div class="courier">
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
			<!-- 导入快递信息 @leadCourier="leadCourier"-->
            <pg-operations :btns="operations" @add="add"  @enable="enable" @disable="disable"></pg-operations>
			<!-- 列表 -->
	        <pg-table 
	            :list="merchantDeliveryPageList"
	            @select-change="selectChange"
	            @edit="edit"
	            @refresh="refresh"
	            @adddialogForm="adddialogForm"
	        >
	        </pg-table>
            <pg-pagination slot="pagination" @size-change="sizeChange" @current-change="currentChange" :page-size="pageSize" :total="total"></pg-pagination>
        </div>
        <!-- 编辑弹窗页 -->
        <pg-edit :title="editTitle" :show="showEdit" :isEdit="isEdit" :editForm="editForm" @close="closeEdit" @refresh="refresh"></pg-edit>

        <!-- 添加API -->
        <pg-express :title="expressTitle" :show="dialogFormVisible" :expressForm="expressForm" @close="closeEdit" @refresh="refresh"></pg-express>
        <!-- 导入快递信息 -->
        <!-- <pg-file-upload @success="deliverySheetUploadSuccess" v-model="isOpenFileUpload" :import-type="1"></pg-file-upload> -->
	</div>
</template>

<style type="stylesheet/less" lang="less" scoped>
	@import '../../../assets/styles/_variables.less';
	
	.courier {

	}
</style>

<script type="text/babel">
	import courier from './courier'

	export default {
		...courier
	}
</script>