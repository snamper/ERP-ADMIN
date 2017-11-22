<template>
    <div>
        <el-table :data="list" highlight-current-row border style="width: 100%" @cell-click="cellclick">
            <el-table-column align="center" prop="customerName" label="客户姓名" min-width="100"></el-table-column>
            <el-table-column align="center" prop="groupName" label="团队" min-width="110"></el-table-column>
            <el-table-column align="center" prop="gradeName" label="等级" min-width="100"></el-table-column>
            <el-table-column align="center" prop="value" label="充值金额" min-width="100"></el-table-column>
            <el-table-column align="center" prop="applyTime" label="申请时间" min-width="100"></el-table-column>
            <el-table-column align="center" prop="parentName" label="上级" min-width="100"></el-table-column>
            <el-table-column align="center"  label="打款凭证" column-key="img" min-width="110">
                <template scope="scope">
                    <pg-img :src="scope.row.payUrl" class="goodsimg"></pg-img>
                </template>            
            </el-table-column>
            <el-table-column align="center" prop="wechat" label="微信号" min-width="110"></el-table-column>
            <el-table-column align="center" prop="mobile" label="手机号" min-width="110"></el-table-column>
            <el-table-column align="center" fixed="right" label="操作" width="150">
                <template scope="scope">
                    <pg-button-group>
                        <pg-button  @click="enable(scope.row)" v-if="scope.row.flag === 0" icon="tongyi" title="同意" ></pg-button>
                        <pg-button  @click="disable(scope.row)" v-if="scope.row.flag === 0" icon="jujue" title="拒绝" ></pg-button>
                    </pg-button-group>
                </template>
            </el-table-column>
        </el-table>
        <pg-dialog :isShow="show" @close="close" :size="size" :title="title">
            <pg-img :src="imgUrl" class="payImg"></pg-img>
        </pg-dialog>
    </div>
</template>

<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>

<style rel="stylesheet/less" lang="less" scoped>
    .skuTable {
        margin-left: 30px;
    }
    .goodsimg {
        width: 60px;
        // height: 60px;
        overflow: hidden;
        vertical-align: middle;
        margin: 10px 0;
        background: #F9FAFC;   
        &:hover {
            cursor: pointer;
        }
    }
    .payImg {
        display: inline-block;
        margin-left: 25%;
        width: 50%;
        height: 50%;
    } 

</style>