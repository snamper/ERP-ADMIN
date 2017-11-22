<template>
	<!-- 订单管理 - 扫码 -->
	<div class="scan">
		<div class="scan_opt">
			<el-row>
				<el-col :span="2">
					<span class="">扫码方式:</span>
				</el-col>
				<el-col :span="5">
					<el-checkbox v-model="checked">扫描完成自动发货</el-checkbox>
				</el-col>
				<el-col :span="15">
					<el-radio-group v-model.number="type" class="radio">
	                    <el-radio :label="0">手动输入</el-radio>
	                    <el-radio :label="1">扫描枪</el-radio>
	                </el-radio-group>
                </el-col>
			</el-row>
			<el-row :gutter="20" class="input_item">
				<el-col :span="8">
					<span class="title">快递单号</span>
					<!-- <el-input class="value" v-focus="deliveryFocus" v-model="deliverySheetID" @input="change(0)"></el-input> -->
					<input type="text" class="value" v-focus="deliveryFocus" v-model="deliverySheetID" @input="change(0)" @keydown.enter="keyUp(1)">
				</el-col>
				<el-col :span="8">
					<span class="title">商品条形码</span>
					<!-- <el-input class="value" v-focus="goodNuFocus" v-model="barCode" @input="change(1)"></el-input> -->
					<input type="text" class="value" v-focus="goodNuFocus" v-model="barCode" @input="change(1)" @keydown.enter="keyUp(2)">
				</el-col>
				<el-col :span="8">
					<span class="title">关联唯一码</span>
					<!-- <el-input class="value" v-focus="uniCodeFocus" v-model="uniqueCode" @input="change(2)"></el-input> -->
					<input type="text" class="value" v-focus="uniCodeFocus" v-model="code" @input="change(2)" @keydown.enter="keyUp(3)">
				</el-col>
			</el-row>
			<el-row :gutter="20" class="btn_group">
				<el-col :span="3">
					<el-button type="primary" @click="again">重新扫描</el-button>
				</el-col>
				<!-- <el-col :span="3">
					<el-button>暂停扫描</el-button>
				</el-col> -->
			</el-row>
		</div>
		<div class="order_info">
			<el-row :gutter="40" class="btn_group">
				<el-col :span="12">
					<span class="title">未扫</span>
					<el-table :data="notScan" border style="width: 100%">
					    <el-table-column align="center" prop="customNo" label="商品货号" min-width="100">
					    </el-table-column>
					    <el-table-column align="center" prop="customBC" label="sku" min-width="100">
					    </el-table-column>
					    <el-table-column align="center" prop="qty" label="数量" min-width="100">
					    </el-table-column>
					  </el-table>					
				</el-col>
				<el-col :span="12">
					<span class="title">已扫</span>
					<el-table :data="hasScan" border style="width: 100%">
					    <el-table-column align="center" prop="customNo" label="商品货号" min-width="100">
					    </el-table-column>
					    <el-table-column align="center" prop="customBC" label="sku" min-width="100">
					    </el-table-column>
					    <el-table-column align="center" prop="hasScanedNum" label="数量" min-width="100">
					    </el-table-column>
					  </el-table>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<style type="stylesheet/less" lang="less" scoped>
	@import '../../../assets/styles/_variables.less';
	
	.scan {
		margin-top: 50px;
		.scan_opt {
			background: #EFF2F7;
			padding: 30px 50px 20px 30px;
			.input_item {
				margin-top: 30px;
				.title {
					vertical-align: middle;
					display: inline-block;
				}
				.value {
					vertical-align: middle;
					display: inline-block;
					width: 60%;
					margin-left: 20px;
				}
			}
			.btn_group {
				margin-top: 30px;
			}
		}
		.order_info {
			margin-top: 50px;
			.title {
				margin-bottom: 30px;
				display: inline-block;
			}
		}
	}
</style>

<script type="text/babel">
	import scancode from './scancode'

	export default {
		...scancode
	}
</script>