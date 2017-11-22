<template>
    <pg-box :isShowBox="show" @close="close">
        <div class="box_title">{{title}}</div>
        <el-form label-position="right" label-width="200px" :model="editForm" class="muban">
            <el-form-item label="{First. DATA}">
                <el-input v-model="editForm.firstData" class="muban_input"></el-input>
            </el-form-item>
            <!-- 下级注册通知模版 -->
            <el-form-item label="" v-if="editForm.templateType === 1">
                <h3 class="title">内容</h3>
                <span>代理姓名:xxxxxx</span>
                <span>代理微信:xxxxxx</span>
                <span>代理手机:xxxxxx</span>
            </el-form-item>
            <!--  自身下单通知模版 -->
            <el-form-item label="" v-if="editForm.templateType === 2">
                <h3 class="title">内容</h3>
                <span>订单号:xxxxxx</span>
                <span>订单金额:xxxxxx</span>
                <span>收货人:xxxxxx</span>
                <span>联系电话:xxxxxx</span>
                <span>收货地址:xxxxxx</span>
            </el-form-item>
            <!-- 订单提交通知上级模版 -->
            <el-form-item label="" v-if="editForm.templateType === 3">
                <h3 class="title">内容</h3>
                <span>订单号:xxxxxx</span>
                <span>订单金额:xxxxxx</span>
                <span>送达时间:xxxxxx</span>
                <span>联系方式:xxxxxx</span>
                <span>送货地址:xxxxxx</span>
            </el-form-item>
            <!-- 订单审核状态通知 -->
            <el-form-item label="" v-if="editForm.templateType === 4">
                <h3 class="title">内容</h3>
                <span>订单号:xxxxxx</span>
                <span>审核时间:xxxxxx</span>
                <span>审核结果:xxxxxx</span>
            </el-form-item>
            <!-- 发货通知 -->
            <el-form-item label="" v-if="editForm.templateType === 5">
                <h3 class="title">内容</h3>
                <span>审核时间:xxxxxx</span>
                <span>订单编号:xxxxxx</span>
                <span>快递公司:xxxxxx</span>
                <span>物流单号:xxxxxx</span>
            </el-form-item>
            <el-form-item label="{remark. DATA}">
                <el-input v-model="editForm.remarkData" class="muban_input"></el-input>
            </el-form-item>
        </el-form>
        <div class="btn-group">
            <el-button @click="save" type="primary">保存</el-button>
            <el-button @click="close" type="primary">关闭</el-button>
        </div>
    </pg-box>
</template>

<style rel="stylesheet/less" lang="less" scoped>
    .muban {
        margin: 20px 0;
        .muban_input {
            width: 80%;
        }
        .title {
            margin-left: -60px;
            color: #8492A6;
        }
        span {
            display: block;
            margin: 10px 0;
            color: #8492A6;
        }
    }
    .btn-group {
        margin-top: 50px;
        margin-left: 100px;
    }
</style>

<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>
