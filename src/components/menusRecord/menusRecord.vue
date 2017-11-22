<template>
	<div class="menusRecord">

		<div v-for="menu in menusRecord" v-bind:class="[currentPath === menu.path ? 'item hover' : 'item']" @click="toPath(menu.path)">
			{{menu.name}}
			<i v-if="currentPath != menu.path" class="close icon iconfont icon-icon_guanbianniu" @click="delMenu(menu.path)"></i>
		</div>
	</div>
</template>

<style type="stylesheet/less" lang="less" scoped>
	@import '~assets/styles/_variables.less';

	.menusRecord {
		width: 100%;
		white-spacing:nowrap;
		white-space:nowrap;
		overflow: hidden;

		.item {
			cursor: pointer;
			display: inline-block;
			background: #5b616a;
			color: #fff;
			padding: 10px 25px;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			margin-left: 1px;
			position: relative;

			.close {
				position: absolute;
				top: 5px;
				right: 5px;
				font-size: 12px;
			}
		}
		.item.hover {
			background: #d7b791;
		}

	}
</style>

<script type="text/babel">
	import menusRecord from './menusRecord'

	export default {
		...menusRecord
	}
</script>