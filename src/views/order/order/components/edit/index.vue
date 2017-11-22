<template>
    <pg-box :isShowBox="show" @close="close">
        <div class="box_title">{{title}}</div>
        <div class="header">
            <span class="agent">下单代理：蔡枫华(团队1.总代)</span>
            <span class="orderNu">订单号：1 20170510 002 059 0</span>
        </div>
        <div class="goodInfo">
            <h2 class="box_title">商品信息</h2>
            <el-table :data="goodList" highlight-current-row border style="width: 60%" class="goodTable">
                <el-table-column align="center" prop="bainhao" label="序号" width="100">
                </el-table-column>
                <el-table-column align="center" prop="attr" label="货号" width="100">
                </el-table-column>
                <el-table-column align="center" prop="stQ" label="规格" width="100">
                </el-table-column>
                <el-table-column align="center" prop="status" label="数量" width="100">
                </el-table-column>
                <el-table-column align="center" prop="status" label="金额" min-width="100">
                </el-table-column>
            </el-table>
            <p class="sum">总计：317（订单价317+运费0）</p>
            <p class="sum">实付：289（订单价269+运费20）</p>
        </div>
        <div class="orderInfo">
            <h2 class="box_title">订单信息</h2>
            <div class="orderInfo_item">
                <span class="time">下单时间:&nbsp;2017.05.10.23:10</span>
                <span class="submit_agent">提交代理:&nbsp;刘德华（团队1，ceo）</span>
                <span class="status">订单状态:&nbsp;待发货</span>
            </div>
            <div class="orderInfo_item">
                <span class="linkName">收货人:&nbsp;XXX</span>
                <span class="phone">电话:&nbsp;XXX</span>
            </div>
            <div class="orderInfo_item">
                收货地址：&nbsp;XXX省XX区XX市XXXXXXXXXX
            </div>
        </div>
        <div class="logisticInfo">
            <h2 class="box_title">物流信息</h2>
            <div class="logistic">
                快递公司:&nbsp;<el-input class="input_item company"></el-input>
                快递单号:&nbsp;<el-input class="input_item"></el-input>
            </div>
            <div>
                <span class="note">备注:</span>
                <el-input type="textarea" :rows="6" class="area_input"></el-input>
            </div>
        </div>
        <br><br>
        <div class="btn-group">
            <el-button>保存</el-button><el-button @click="close">关闭</el-button>
        </div>
    </pg-box>
</template>
<style rel="stylesheet/less" lang="less" scoped>
    .input_item {
        width: 30%;
    }
    .box_title {
        padding-bottom: 0px;
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
            margin: 20px 0px 10px 50%;
            font-weight: bold;
        }
    }
    .orderInfo_item {
        margin-left: 20px;
        margin-bottom: 20px;
        font-weight: bold;
        .time {
            margin: 0px 30px 10px 0px;
        }
        .linkName {
            margin: 0px 125px 10px 0px;
        }
        .submit_agent , .phone{
            margin: 0px 30px 10px 0px;
        }
    }
    .logistic {
        margin-bottom: 20px;
        .company {
            margin-right: 50px;
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
