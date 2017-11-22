<template>
	<!-- 系统管理 - 微信消息模板 -->
	<div class="scan">
		<el-form label-position="right" label-width="200px" :model="form">
			<h2 class="title">公众号配置</h2>
			<el-form-item label="AppID（应用ID）">
			    <el-input v-model="form.whchatSubscriptionConfig.appkey" class="msg_input"></el-input>
			</el-form-item>
			<el-form-item label="AppSecret（应用密匙）">
			    <el-input v-model="form.whchatSubscriptionConfig.appSecret" class="msg_input"></el-input>
			</el-form-item>
			<el-form-item label="MchID（支付商户号）">
			    <el-input v-model="form.whchatSubscriptionConfig.mchID" class="msg_input"></el-input>
			</el-form-item>
			<el-form-item label="PartnerKey（初始支付密匙）">
			    <el-input v-model="form.whchatSubscriptionConfig.key" class="msg_input"></el-input>
			</el-form-item>
			
			<h2 class="title">微信通知消息模板</h2>
			<el-form-item label="下级注册通知模板">
			    <el-input v-model="form.registerTemplate.template" class="msg_input" placeholder="模板ID"></el-input>
			    <span class="text">OPENTM205776174</span>
				<el-button @click="edit(form.registerTemplate)" class="msg_btn" type="primary">编辑</el-button>
			</el-form-item>
			<el-form-item label="自身下单通知模板">
			    <el-input v-model="form.createOrderTemplate.template" class="msg_input" placeholder="模板ID"></el-input>
			    <span class="text">OPENTM205776174</span>
			    <el-button @click="edit(form.createOrderTemplate)" class="msg_btn" type="primary">编辑</el-button>
			</el-form-item>
			<el-form-item label="订单提交通知上级模板">
			    <el-input v-model="form.commitOrderTemplate.template" class="msg_input" placeholder="模板ID"></el-input>
			    <span class="text">OPENTM205776174</span>
			    <el-button @click="edit(form.commitOrderTemplate)" class="msg_btn" type="primary">编辑</el-button>
			</el-form-item>
			<el-form-item label="订单审核状态通知">
			    <el-input v-model="form.auditOrderTemplate.template" class="msg_input" placeholder="模板ID"></el-input>
			    <span class="text">OPENTM205776174</span>
			    <el-button @click="edit(form.auditOrderTemplate)" class="msg_btn" type="primary">编辑</el-button>
			</el-form-item>
			<el-form-item label="发货通知">
			    <el-input v-model="form.sendGoodsTemplate.template" class="msg_input" placeholder="模板ID"></el-input>
			    <span class="text">OPENTM205776174</span>
			    <el-button @click="edit(form.sendGoodsTemplate)" class="msg_btn" type="primary">编辑</el-button>
			</el-form-item>
		</el-form>
		<!-- 编辑弹窗页 -->
        <pg-edit :title="editTitle" :show="showEdit" :editForm="editForm" @close="closeEdit"></pg-edit>
		<el-button @click="save" type="primary" class="btn">保存</el-button>
	</div>
</template>

<style type="stylesheet/less" lang="less" scoped>
	@import '../../../assets/styles/_variables.less';
	.scan {
		margin-top: 50px;
		.title {
			color: #C0CCDA;
		}
		.btn {
			margin-top: 20px;
			margin-left: 10%;
		}
		.msg_input {
			display: inline-block;
			width: 60%;
		}
		.text {
			margin-left: 20px;
		}
		.msg_btn {
			display: inline-block;
			margin-left: 20px;
		}
	}
	

</style>

<script type="text/babel">
	import wechatmessage from './wechatmessage'

	export default {
		...wechatmessage
	}
</script>