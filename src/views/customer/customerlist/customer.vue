<template>
	<!-- 客户管理 - 分销客户列表 -->
	<div class="customer">
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
           
            <div class="tree" style="width: 20%; height:500px;float: left; padding-right:10px; box-sizing:border-box;">
                <el-select ref="team" v-model="treeDistributorGroupID" style="width: 100%;" placeholder="不限">
                    <el-option
                        v-for="item in teamList"
                        :key="item.distributorGroupID"
                        :label="item.name"
                        :value="item.distributorGroupID">
                    </el-option>
                </el-select>
                <div style="height: 12px"></div>
                <el-tree
                    :data="treeList"
                    :props="defaultProps"
                    @node-click="handleNodeClick"
                    @node-expand ="nodeExpand"
                    ref="tree">
                </el-tree>
            </div>
            <div class="list" style="width: 80%;float: left;">
                <!-- 按钮 -->
                <pg-operations :btns="operations" @add="add" 
                @enable="enable" @disable="disable" 
                @delayed="delayed" @upgrade="upgrade" @Downgrade="Downgrade"
                @ImportFile="ImportFile" @exportFile="exportFile"></pg-operations>
                <!-- 列表 -->
                <pg-table 
                    :list="customerList"
                    @select-change="selectChange"
                    @detail="detail"
                    @edit="edit"
                    @level="level">
                </pg-table>
                <!-- 分页 -->
                <pg-pagination slot="pagination" @size-change="sizeChange" @current-change="currentChange" :page-size="pageSize" :total="total"></pg-pagination>
            </div>
            <div class="clearfix"></div>
        </div>
        <!-- 编辑弹窗页 -->
        <pg-edit :detail='isDetail' :place="placeData" :title="editTitle" :teamsList="teamList" :show="showEdit" :type="editType" :isEdit="isEdit" :editForm="editForm" @close="closeEdit(1)" @setPlace="setPlace"></pg-edit>
        <!-- 等级查询弹出框 -->
        <pg-level :show="isShowLevel" :editForm="editForm" :queryLevel="queryLevel" @close="closeEdit(2)"></pg-level>
        <!--设置地址弹框-->
        <edit-place :show="editPlaceShow" @editPlace="modifyPlace"  @closePlace="closePlace"></edit-place>
	</div>
</template>

<script type="text/babel">
	import customer from './customer'
	export default {
		...customer
	}
</script>