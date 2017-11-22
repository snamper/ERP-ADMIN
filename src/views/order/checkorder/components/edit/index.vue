<template>
    <pg-box :isShowBox="show" @close="close">
        <div class="box_title">{{title}}</div>
        <div class="header">
            <span class="agent">下单代理：{{ editForm.reqCustomerName }}({{ editForm.groupName  }} .{{ editForm.gradeName }})</span>
            <span class="orderNu">订单号：{{ editForm.sheet }}</span>
        </div>
        <div class="goodInfo">
            <h2 class="box_title">商品信息</h2>
            <el-table :data="goodList" highlight-current-row border style="width: 70%" class="goodTable">
                <el-table-column align="center" prop="serialNumber" label="序号" min-width="100">
                </el-table-column>
                <el-table-column align="center" prop="customNo" label="货号" min-width="100">
                </el-table-column>
                <el-table-column align="center" prop="" label="规格" min-width="100">
                    <template scope="scope">
                        <span>{{scope.row.property1 }}\{{scope.row.property2 }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="qty" label="数量" min-width="100">
                </el-table-column>
                <el-table-column align="center" prop="price" label="单价" min-width="100">
                </el-table-column>
            </el-table>
            <p class="sum">总计：{{ editForm.totalPrice }}（订单价{{ editForm.totalPrice-editForm.postFee }}+运费{{ editForm.postFee }}）</p>
        </div>
        <div class="orderInfo">
            <h2 class="box_title">订单信息</h2>
            <div class="orderInfo_item">
                <span class="time">下单时间:&nbsp;{{ editForm.createTime }}</span>
                <span class="submit_agent">提交代理:&nbsp;{{ editForm.reqCustomerName }}（{{ editForm.groupName }}，{{ editForm.gradeName }}）</span>
                <div class="status">
                    订单状态:&nbsp;
                    <span v-if="editForm.orderStatus === -1">待付款</span>
                    <span v-if="editForm.orderStatus === 0">已录入</span>
                    <span v-if="editForm.orderStatus === 10 || editForm.orderStatus === 30">已审核</span>
                    <span v-if="editForm.orderStatus === 90">待扫描</span>
                    <span v-if="editForm.orderStatus === 92">已扫描</span>
                    <span v-if="editForm.orderStatus === 100 || editForm.orderStatus === 110">已发货</span>
                    <span v-if="editForm.orderStatus === 95">已删除</span>
                    <span v-if="editForm.orderStatus === 97 || editForm.orderStatus === 99">已取消</span>
                    <span v-if="editForm.orderStatus === 110">已完成</span>
                </div>
            </div>
            <div class="orderInfo_item">
                <span class="linkName">收货人:&nbsp;{{ editForm.linkMan }}</span>
                <span class="phone">电话:&nbsp;{{ editForm.mobile }}</span>
            </div>
            <div class="orderInfo_item">
                收货地址：&nbsp;{{ editForm.address }}
            </div>
        </div>
        <div>
            <span class="note">备注:</span>
            <el-input type="textarea" :rows="6" class="area_input" v-model="editForm.note"></el-input>
        </div>
        <br><br>
        <el-button @click="close">关闭</el-button>
    </pg-box>
</template>
<style rel="stylesheet/less" lang="less" scoped>
    .input_item {
        width: 30%;
    }
    .box_title {
        padding-bottom: 0px;
        margin-bottom: 30px;
    }
    .el-row {
        margin-top: 10px;
    }
    p {
        padding: 0;
        margin: 0;
    }
    .header {
        margin-top: 20px;
        margin-left: -20px;
        background: #1F2D3D;
        color: #fff;
        padding: 0px 20px;
        height: 80px;
        line-height: 80px;
        position: relative;
        font-size: 16px;
        .orderNu {
            position: absolute;
            right: 20px;
        }
    }
    .goodInfo {
        .sum {
            margin: 20px 0px 10px 60%;
        }
    }
    .orderInfo_item {
        margin-left: 20px;
        margin-bottom: 30px;
        .time {
            margin: 0px 30px 10px 0px;
        }
        .linkName {
            margin: 0px 125px 10px 0px;
        }
        .submit_agent , .phone{
            margin: 0px 30px 10px 0px;
        }
        .status {
            display: inline-block;
        }
    }
    .area_input {
        width: 30%;
        vertical-align: top;
    }
    .note {
        vertical-align: top;
    }
</style>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>
