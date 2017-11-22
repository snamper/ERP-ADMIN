<template>
	<!-- 仪表板页面 -->
	<div class="dashboard">
		<h2>仪表板页面</h2>
        <el-row :gutter="20">
            <router-link :to="{path: '/checkorder'}">
                <el-col :span="8" >
                    <div class="top bg">
                        <div class="icon">
                            <i class="iconfont icon-icon_dingdanguanli"></i>
                        </div>
                        <div class="num order">{{pendingItem.pendingOrderCount}}</div>
                        <div class="title">待处理订单</div>
                    </div>
                </el-col>
            </router-link>
            <router-link :to="{path: '/auditregister'}">
                <el-col :span="8">
                    <div class="top bg">
                        <div class="icon">
                            <i class="iconfont icon-icon_chulidingdan"></i>
                        </div>
                        <div class="num apply">{{pendingItem.pendingAuditCount}}</div>
                        <div class="title">待处理申请</div>
                    </div>
                </el-col>
            </router-link>
            <router-link :to="{path: '/auditupgrade'}">
                <el-col :span="8">
                    <div class="top bg">
                        <div class="icon">
                            <i class="iconfont icon-icon_shengji"></i>
                        </div>
                        <div class="num up">{{pendingItem.pendingUpGradeCount}}</div>
                        <div class="title">待处理升级</div>
                    </div>
                </el-col>
            </router-link>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="16">
                <div class="bg max chart">
                    <div id="chart"></div>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="bg max">
                    <div class="title">已开通业务</div>
                    <div class="operation">
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <img src="../../assets/images/icon_fangwei.png">
                            </el-col>
                            <el-col :span="18">
                                <div class="title">防伪溯源</div>
                                <div class="title">80%人在用</div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <img src="../../assets/images/icon_weishangcheng.png">
                            </el-col>
                            <el-col :span="18">
                                <div class="title">微商城</div>
                                <div class="title">80%人在用</div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <img src="../../assets/images/icon_weixiaobao.png">
                            </el-col>
                            <el-col :span="18">
                                <div class="title">微销宝</div>
                                <div class="title">80%人在用</div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <img src="../../assets/images/icon_erp.png">
                            </el-col>
                            <el-col :span="18">
                                <div class="title">ERP</div>
                                <div class="title">80%人在用</div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
        </el-row>
	</div>
</template>

<style type="stylesheet/less" lang="less" scoped>
	@import '~assets/styles/_variables.less';
    .dashboard {
        overflow-x: hidden;
        h2 {
            color: #777;
        }
        .top.bg {
            text-align: center;
            padding: 55px 0;
            .icon {
                width: 80px;
                height: 80px;
                line-height: 80px;
                background: #f8f9fb;
                border-radius: 100%;
                margin: 0 auto;
                i {
                    font-size: 36px;
                    color: #ccc;
                }
            }
            .num {
                padding-top: 42px;
                font-size: 40px;
                &.order {
                    color: #ff3b30;
                }
                &.apply {
                    color: #09bb07;
                }
                &.up {
                    color: #09bb07;
                }
            }
        }
        .bg {
            background: #fff;
            border-radius: 5px;
            &.max {
                height: 620px;
                padding: 20px;
            }
            &.chart {
                text-align: center;
                position: relative;
                #chart {
                    position: absolute;
                    padding: 20px;
                    left: 0;
                    top: 0;
                    right: 0;
                    bottom: 0;
                }
            }
            .title {
                padding-top: 18px;
                color: #777777;
                font-size: 18px;
            }
        }
        .el-row {
            margin-bottom: 20px;
        }
        .operation {
            .title {
                font-size: 16px;
                padding-top: 0;
                height: 30px;
                line-height: 30px;
            }
            .el-row {
                margin-top: 20px;
                margin-bottom: 0;
            }
        }
    }
</style>

<script type="text/babel">
	import dashboard from './dashboard'

	export default {
		...dashboard
	}
</script>