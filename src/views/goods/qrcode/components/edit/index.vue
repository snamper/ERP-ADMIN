<template>
    <pg-box :isShowBox="show" @close="close">
        <div class="box_title">{{title}}</div>
        <!-- 查看 -->
        <div v-if="isEdit ===false">
            <div class="header">
                <p class="large">大码:{{form.parentCode}}</p>
                <p class="small">小码:{{form.code}}</p>
            </div>
            <div class="record">
                <h2 class="title">发货记录</h2>
                <div class="record_item" v-for="item in form.deliveryRecords">
                    <span class="time">{{item.time}}</span>
                    <span class="company" v-if="item.shipper != null">{{item.shipper}}</span>
                    <span class="company" v-else>公司</span>发货给
                    <span class="people">{{item.receiver}}</span>，<span>关联订单号：{{item.sheet}}</span>
                </div>
            </div>
            <el-button size="small" @click="close" class="btn">关闭</el-button>
        </div>
    </pg-box>
</template>
<style rel="stylesheet/less" lang="less" scoped>
    .el-row {
        margin-top: 10px;
    }
    .remind {
        color: red;
        font-size: 12px;
    }
    p {
        padding: 0;
        margin: 0;
    }
    .header {
        background: #1F2D3D;
        color: #fff;
        padding: 10px 25px;
        margin-left: -20px;
        margin-bottom: 20px;
        font-size: 16px;
        .small {
            margin-top: 20px;
        }
    }
    .record {
        margin: 20px 10px;
        .title {
            font-weight: bold;
            color: #657385;
        }
        .record_item {
            margin-bottom: 15px;
            margin-left: 30px;
            .time {
                margin-right: 50px;
            }
            .company {
                margin-right: 10px;
            }
            .people {
                margin-left: 10px;
            }
        }
    }
    .qr_record {
        margin: 20px 10px;        
        .title {
            font-weight: bold;
            color: #657385;
        }
        .qr_record_item {
            margin-bottom: 15px;
            margin-left: 30px;
            .time {
                margin-right: 50px;
            }
            .first {
                margin-right: 50px;
            }
        }        
    }
    .btn {
        margin-top: 50px;
    }
</style>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>
