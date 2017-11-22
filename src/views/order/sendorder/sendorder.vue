<template>
	<!-- 订单管理 - 发货订单 -->
	<div class="sendorder">
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
            <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="待处理" name="first"></el-tab-pane>
				<el-tab-pane label="待扫描"></el-tab-pane>
				<el-tab-pane label="已发货"></el-tab-pane>
				<el-tab-pane label="已取消"></el-tab-pane>
				<el-tab-pane label="已完成"></el-tab-pane>
				<div class="button_type">
		            <span>批量操作:</span>
		            <div class="button_type_item" v-if="type ===0">
		                <el-button type="default" size="small" @click="modifyCourier">修改快递公司</el-button>
		                <el-button type="default" size="small"  @click="">获取快递单号</el-button>
		                <el-button type="default" size="small" @click="boundExpress">绑定快递单</el-button>
		                <el-button type="default" size="small" @click="importDeliverySheet">导入快递单号</el-button>
		                <el-button type="default" size="small"  @click="printExpress">打印快递单</el-button>
		                <el-button type="default" size="small"  @click="printOrder">打印订单</el-button>
		                <el-button type="default" size="small"  @click="exportOrder">导出订单信息</el-button>
		                <el-button type="default"  size="small" @click="sendGoodsFromMerchant">直接发货</el-button>
		                <el-button type="default"  size="small" @click="changeToWaitForScan">转到待扫描</el-button>
		                <!-- <el-button type="default" size="small"  @click="">下载打印程序</el-button> -->
		            </div>
		            <div class="button_type_item" v-else-if="type ===1">
		                <el-button type="default" size="small" @click="scanCode">溯源扫描</el-button>
		                <el-button type="default" size="small" @click="sendGoodsFromMerchant">发货</el-button>
		            </div>
		            <div class="button_type_item" v-else>
		                <el-button type="default" size="small" @click="exportOrder">导出订单信息</el-button>
		            </div>
		        </div>
				<!-- 列表 -->
	            <pg-table 
	                :list="orderList"
	                :goodList="goodList"
	                :type="type"
	                @select-change="selectChange"
	                @edit="edit"
	                @cancel="cancel"
	                @scan="scan"
	                @getGood="getGood"
	            >
	            </pg-table>
			</el-tabs>
            <pg-pagination slot="pagination" @size-change="sizeChange" @current-change="currentChange" :page-size="pageSize" :total="total"></pg-pagination>
        </div>
        <!-- 编辑弹窗页 -->
        <pg-edit :title="editTitle" :show="showEdit" :editForm="editForm" @close="closeEdit" @refresh="refresh"></pg-edit>
        <!-- 编辑sku弹窗页 -->
        <pg-skuedit :title="editTitle" :btnType="btnType" :show="showSkuEdit" @refresh="refresh" :editForm="editSkuForm" @closeSkuEdit="closeSkuEdit" :editSkuForm="editForm"></pg-skuedit>
        <!-- 导入快递单号 -->
        <pg-file-upload @success="deliverySheetUploadSuccess" v-model="isOpenFileUpload" :import-type="1"></pg-file-upload>
	</div>
</template>

<style type="stylesheet/less" lang="less">
	@import '../../../assets/styles/_variables.less';
	
	.sendorder {
		.button_type {
	        margin-top: 10px;
	        margin-bottom: 10px;
	        .button_type_item {
	            display: inline-block;
	            margin-left: 20px;
	            .el-button+.el-button {
					margin-left: 0px;
					margin-bottom: 8px;
	            }
	        }
	    }
	}
</style>

<script type="text/babel">
	import sendorder from './sendorder'

	export default {
		...sendorder
	}
</script>