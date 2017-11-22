<template>
	<!-- 系统管理  模式配置 -->
	<div class="modeconfig">
		<el-form :model="ruleForm" ref="ruleForm"  label-width="100px" class="demo-ruleForm">
		    <el-form-item label="分销团队">

				<el-select v-model="ruleForm.distributorGroupID" placeholder="请选择活动区域">
                    <el-option v-for=" item in teamList" :label="item.name" :value="item.distributorGroupID"></el-option>
				</el-select>
		    </el-form-item>
		    <el-form-item label="发货模式">

				<el-select v-model="ruleForm.deliveryMode" placeholder="请选择活动区域">
					<el-option v-for=" item in modeList" :label="item.text" :value="item.flag"></el-option>
				</el-select>
		    </el-form-item>

			<el-form-item label="充值模式">
				<el-checkbox-group v-model="ruleForm.type">
					<el-checkbox label="开启" name="type"></el-checkbox>
					<label style="margin-left:30px;">资金保障系数
                        <el-input :disabled="disabledInp" v-model="ruleForm.financeRate" placeholder="请输入资金保障系数"></el-input>
					</label>
					<label style="margin-left:30px;">最低等级
						<el-select :disabled="disabledInp" v-model="ruleForm.rechargeGrade" placeholder="请选择等级">
							<el-option v-for="item in customerGradeLis" :key="item.customerGradeID" :label="item.name" :value="item.customerGradeID"></el-option>
						</el-select>						
					</label>
				</el-checkbox-group>
			</el-form-item>	    

		    <el-form-item>
			    <el-button type="primary" @click="submitForm">保存</el-button>
		    </el-form-item>
		</el-form>
	</div>
</template>

<script type="text/babel">
	import modeconfig from './modeconfig'
	export default {
		...modeconfig
	}
</script>
<style rel="stylesheet/less" lang="less" scoped>
    @import '~assets/styles/_variables';
    .modeconfig {
	    margin-top: 50px;
	    padding: 50px;
	    border: 1px solid #999;
    }
    .el-input {
	    position: relative;
	    font-size: 14px;
	    display: inline-block;
	    width: inherit;
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
	    width: 100%;
	}
</style>