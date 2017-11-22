<template>
    <div class="print" ref="print">
        <el-row :gutter="20">
            <el-col :span="24">
                <h1>订单明细</h1>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="3">
                订单号：
            </el-col>
            <el-col :span="9">
                {{detail.sheet}}
            </el-col>
            <el-col :span="3">
                下单时间：
            </el-col>
             <el-col :span="9">
                {{detail.createTime}}
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="3">
                提交代理：
            </el-col>
            <el-col :span="9">
                {{detail.reqCustomerName}}（{{detail.gradeName}}）
            </el-col>
            <el-col :span="3">
                订单状态：
            </el-col>
            <el-col :span="9">
                <span v-if="detail.orderStatus === -1">待付款</span>
                <span v-if="detail.orderStatus === 0">已录入</span>
                <span v-if="detail.orderStatus === 10 || detail.orderStatus === 30">已审核</span>
                <span v-if="detail.orderStatus === 90">待扫描</span>
                <span v-if="detail.orderStatus === 92">已扫描</span>
                <span v-if="detail.orderStatus === 100 || detail.orderStatus === 110">已发货</span>
                <span v-if="detail.orderStatus === 95">已删除</span>
                <span v-if="detail.orderStatus === 97 || detail.orderStatus === 99">已取消</span>
                <span v-if="detail.orderStatus === 110">已完成</span>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="3">
                收货人：
            </el-col>
            <el-col :span="9">
                {{detail.linkMan}}
            </el-col>
            <el-col :span="3">
                收货电话：
            </el-col>
            <el-col :span="9">
                {{detail.mobile}}
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="3">
                收货人：
            </el-col>
            <el-col :span="21">
                {{detail.address}}
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <h3>总计：{{detail.totalPrice}}（含邮费：{{detail.postFee}}）</h3>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-table :data="detail.listOrderItemList" style="width: 100%">
                    <el-table-column
                        prop="customBC"
                        label="条码">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="商品名称">
                    </el-table-column>
                    <el-table-column
                        prop="qty"
                        label="数量">
                    </el-table-column>
                    <el-table-column
                        prop="price"
                        label="商品单价">
                    </el-table-column>
                    <el-table-column
                        prop="totalPrice"
                        label="商品金额总计">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="print_btn">
            <el-button type="primary" @click="print">打印订单</el-button>
        </el-row>
    </div>
</template>
<style rel="stylesheet/less" lang="less" scoped>
    @import '~assets/styles/_variables';
    @media print {
        .print_btn {
            display: none;
        }
    }
    .print {
        width: 780px;
        padding-top: 30px;
        margin: 0 auto;
        h1 {
            text-align: center;
        }
        h3 {
            text-align: right;
        }
        .print_btn {
            text-align: center;
        }
        .el-row {
            margin-bottom: 15px;
        }
    }
</style>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>