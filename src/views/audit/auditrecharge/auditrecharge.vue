<template>
	<!-- 审核管理 - 充值审核 -->
    <div class="auditrecharge">
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
            <el-col :span="24" class="toolbar clearfix">
                <el-button size="small" :type="btn.type" @click.native="handleClick(btn)" v-for="btn in operations">{{ btn.name }}</el-button>
            </el-col>
            <!-- 列表 -->
            <pg-table 
                :list="itrechargeList"
                @refresh="refresh"
                @select-change="selectChange">
            </pg-table>
            <!-- 分页 -->
            <pg-pagination slot="pagination" @size-change="sizeChange" @current-change="currentChange" :page-size="pageSize" :total="total"></pg-pagination>
        </div>
    </div>
</template>

<style type="stylesheet/less" lang="less" scoped>
	@import '../../../assets/styles/_variables.less';

	.auditrecharge {

	}
</style>

<script type="text/babel">
	import auditrecharge from './auditrecharge'

	export default {
		...auditrecharge
	}
</script>