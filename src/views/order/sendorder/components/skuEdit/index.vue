<template>
    <div>
    <pg-box :isShowBox="show" @close="close">
        <div class="box_title">{{title}}</div>
        <!-- 导入唯一码的操作区 -->
        <div v-if="btnType === 2">
            <p class="oederNu">订单号：{{orderDetail.sheet}}</p>
            <el-button class="import_btn" @click="importDeliverySheet">导入</el-button>
            <el-table :data="orderDetail.listOrderItemList" highlight-current-row border style="width: 80%" class="goodTable">
                <el-table-column align="center" prop="customNo" label="商品货号" min-width="150">
                </el-table-column>
                <el-table-column align="center" prop="customBC" label="sku" min-width="150">
                    <!-- <template scope="scope">
                        <span>{{scope.row.property1 }}\{{scope.row.property2 }}</span>
                    </template> -->
                </el-table-column>
                <el-table-column align="center" prop="qty" label="数量" min-width="100">
                </el-table-column>
                <el-table-column align="center" prop="" label="唯一码" min-width="200">
                    <template scope="scope">
                        <el-input v-for="item in scope.row.listQrCodeList" :disabled="item.isable" v-model="item.qrCode" class="input_item"></el-input>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 修改快递公司的操作区 -->
        <div v-if="btnType === 0" class="deliver">
            <el-select v-model="deliver" filterable placeholder="请选择">
                <el-option
                    v-for="item in delivers"
                    :key="item.id"
                    :label="item.desc"
                    :value="item.id">
                </el-option>
            </el-select>
        </div>
        <!-- 绑定快递单的操作区 -->
        <div v-if="btnType === 1" class="deliver">
            <el-button @click="close" class="deliver_btn">关闭</el-button>
            <el-button @click="save" class="deliver_btn">保存</el-button>
            <el-button @click="again" class="deliver_btn">重新扫描</el-button>
            <!-- <el-button @click="" class="deliver_btn">停止扫描</el-button> -->
            <div class="scan_type">
                <span>扫码方式:</span>
                <el-radio-group v-model.number="type" class="radio">
                    <el-radio :label="0">手动输入</el-radio>
                    <el-radio :label="1">扫描枪</el-radio>
                </el-radio-group>
            </div>
            <div class="deliverList">
                <div class="deliverList_header">
                    <span class="order">订单号</span><span class="deliverOrder">快递单号</span>
                </div>
                <div class="deliverList_item" v-for="(item, index) in editForm">
                    <span class="order">{{item.sheet}}</span>
                    <!-- <el-input size="small" class="deliverOrder" @change="change(index)" v-focus="focus" v-model="item.deliverySheetID"></el-input> -->
                    <input type="text" class="deliverOrder" v-focus="item.focus" v-model="item.deliverySheetID" @input="change(index, editForm)">
                </div>
            </div>
        </div>
        <div class="btn-group" v-if="btnType !== 1">
            <el-button @click="save">保存</el-button>
            <el-button @click="close">关闭</el-button>
        </div>
        
    </pg-box>
        <!-- 导入唯一码 -->
        <pg-file-upload @success="deliverySheetUploadSuccess" v-model="isOpenFileUpload" :import-type="3"></pg-file-upload>
    </div>
</template>
<style rel="stylesheet/less" lang="less" scoped>
    .el-row {
        margin-top: 10px;
    }
    .import_btn {
        margin: 20px;
    }
    .goodTable {
        margin-left: 20px;
        .input_item {
            margin: 3px 0;
        }
    }
    .btn-group {
        margin-top: 50px;
        margin-left: 150px;
    }
    p {
        padding: 0;
        margin: 0;
    }
    .deliver {
        margin-left: 200px;
        margin-top: 50px;
        .deliver_btn {
            margin-right: 100px;
            margin-left: 10px;
        }
        .deliverList {
            margin-top: 20px;
            .deliverList_header {
                margin-bottom: 20px;
                .order {
                    margin-left: 60px;
                    margin-right: 200px;
                }
                .deliverOrder {
                    width: 200px;
                }
            }
            .deliverList_item {
                margin-bottom: 10px;
                .order {
                    margin-left: 30px;
                    margin-right: 100px;
                }
                .deliverOrder {
                    width: 200px;
                }
            }
        }
        .scan_type {
            margin-top: 30px;
            .radio {
                margin-left: 10px;
            }
        }
    }
</style>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>
