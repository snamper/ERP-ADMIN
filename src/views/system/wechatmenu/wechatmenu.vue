<template>
	<!-- 系统管理 - 微信菜单配置 -->
	<div class="scan">
		<h1 class="title">微信菜单配置</h1>
		<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="checkAll">全选</el-checkbox>
		<el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
			<el-checkbox :label="item.mobileMenuID" v-for="item in menu" :checked="item.status === 1" class="inline">
				{{item.name}}
		    </el-checkbox>
		</el-checkbox-group>
		<el-button @click="save" type="primary" class="btn">保存</el-button>
	</div>
</template>

<style type="stylesheet/less" lang="less" scoped>
	@import '../../../assets/styles/_variables.less';
	.scan {
		margin-top: 50px;
		margin-left: 100px;
		.title {
			color: #99A9BF;
			margin: 20px 10px;
		}
		.checkAll {
			margin-bottom: 10px;
		}
		.btn {
			margin-top: 20px;
			margin-left: 15px;
		}
		.inline {
			display: block;
			margin-left: 15px;
			margin-bottom: 10px;
		}
	}
	
</style>

<script type="text/babel">
	import wechatmenu from './wechatmenu'

	export default {
		...wechatmenu
	}
</script>