<template>
	<!-- 系统管理  模式配置 -->
	<div class="modeconfig">
		<br>
		<br>
		<el-form :model="form"  ref="form" label-width="100px" class="demo-ruleForm">
		    <el-form-item label="公司名称" >
				<input autocomplete="off" v-model="form.corpName" type="text" rows="2" validateevent="true" class="el-input__inner">
		    </el-form-item>
			<br>
		    <el-form-item label="公司联系方式" prop="">
				<input autocomplete="off" type="text" v-model="form.contact" rows="2" validateevent="true" class="el-input__inner">
		    </el-form-item>
			<br>
			<el-form-item label="ERP域名" prop="">
				<input autocomplete="off" type="text" v-model="form.webSite" rows="2" validateevent="true" class="el-input__inner">
		    </el-form-item>
			<br>
			<el-form-item label="微信端域名" prop="">
				<input autocomplete="off" type="text" v-model="form.securityWebSite" rows="2" validateevent="true" class="el-input__inner">
		    </el-form-item>
			<br>
			<el-form-item label="微信公众号二维码" prop="type">
				<!--<pg-upload  :files="test"  @upload-success="uploadPayQRCode" folderType='11'></pg-upload>-->
				<pg-upload :files="subscriptionQrCode" @upload-success="uploadWechatQRCode" folderType="111"></pg-upload>
			</el-form-item>
			<el-form-item label="公司收款二维码" prop="type">
				<!--<pg-upload  :files="test"  @upload-success="uploadPayQRCode" folderType='11'></pg-upload>-->
				<pg-upload :files="payQRCode" @upload-success="uploadPayQRCode" folderType="21"></pg-upload>
			</el-form-item>
			<el-form-item label="前端登陆页LOGO" prop="type">
				<pg-upload :files="loginLogo" @upload-success="uploadLoginLogo" folderType='111' tip="png,小于270*150"></pg-upload>
			</el-form-item>
			<el-form-item label="前端登陆页背景" prop="type">
				<pg-upload :files="loginBackImage" @upload-success="uploadLoginBackImage" folderType='111' tip="png、jpg,大于750*1206"></pg-upload>
			</el-form-item>		
			<el-form-item label="后台LOGO" prop="type">
				<pg-upload :files="manageLogo" @upload-success="uploadManageLogo" folderType='111' tip="png、jpg,大于117*117"></pg-upload>
			</el-form-item>	
			<el-form-item label="首页轮播图" prop="type">
				<pg-upload :files="carouselImages" multiple @upload-success="multipleUploadSuccess" folderType='111' tip="750*270"></pg-upload>
			</el-form-item>   
			<el-form-item  v-for="image in form.carouselImages" label="关联页面" prop="region">
				<el-select v-model="image.basTextID" placeholder="读取自定义页面">
					<el-option v-for="text in texts" :label="text.desc" :value="text.id"></el-option>
				</el-select>
		    </el-form-item>
		    <el-form-item>
			    <el-button type="primary" @click="save()">保存</el-button>
		    </el-form-item>
		</el-form>
	</div>
</template>

<script type="text/babel">
	import companyinfo from './companyinfo'
	export default {
		...companyinfo
	}
</script>
<style rel="stylesheet/less" lang="less" scoped>
    @import '~assets/styles/_variables';
    .modeconfig {
        font-size: 30px;

    }
    .e-input {
	    position: relative;
	    font-size: 14px;
	    display: inline-block;
	    // width: 100%;
    }
	.el-input__inner {
	    -webkit-appearance: none;
	    -moz-appearance: none;
	    appearance: none;
	    background-color: #fff;
	    background-image: none;
	    -webkit-border-radius: 4px;
	    -moz-border-radius: 4px;
	    border-radius: 4px;
	    border: 1px solid #bfcbd9;
	    -webkit-box-sizing: border-box;
	    -moz-box-sizing: border-box;
	    box-sizing: border-box;
	    color: #1f2d3d;
	    display: block;
	    font-size: inherit;
	    height: 36px;
	    line-height: 1;
	    outline: 0;
	    padding: 3px 10px;
	    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
	    -o-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
	    -moz-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
	    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
	    width: 40%;
	}
</style>