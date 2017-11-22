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
            <!-- 按钮 -->
            <pg-operations 
             	:btns="operations" 
             	@add="add" 
             	@del="del"
             	@enable="enable" 
             	@disable="disable"
             	@leadIn="leadIn"
             	@educe="educe"
                @printQR="printQR">
            </pg-operations>
            <!-- 列表 -->
            <pg-table 
                :list="QRList"
                @select-change="selectChange"
                @edit="edit">
            </pg-table>
            <!-- 分页 -->
            <pg-pagination slot="pagination" @size-change="sizeChange" @current-change="currentChange" :page-size="pageSize" :total="total"></pg-pagination>
        </div>
        <!-- 编辑弹窗页 -->
        <pg-edit :title="editTitle" :show="showEdit" :isEdit="isEdit" :editForm="editForm" @close="closeEdit"></pg-edit>
        <pg-file-upload @success="deliverySheetUploadSuccess" v-model="isOpenFileUpload" :import-type="2"></pg-file-upload>
	</div>
</template>

<style type="stylesheet/less" lang="less" scoped>
	@import '~assets/styles/_variables.less';

	.qrcode {

	}
</style>

<script type="text/babel">
	import qrcode from './qrcode'

	export default {
		...qrcode
	}
</script>