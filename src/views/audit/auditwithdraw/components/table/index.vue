<template>
    <el-table :data="list" highlight-current-row border style="width: 100%">
        <el-table-column align="center" prop="name" label="客户姓名" min-width="150"></el-table-column>
        <el-table-column align="center" prop="groupName" label="团队" min-width="200"></el-table-column>
        <el-table-column align="center" prop="gradeName" label="等级" min-width="150"></el-table-column>
        <el-table-column align="center" prop="value" label="提现金额" width="150"></el-table-column>
        <el-table-column align="center" prop="applyTime" label="申请时间" min-width="150"></el-table-column>
        <el-table-column align="center" prop="parentName" label="上级" width="150"></el-table-column>
        <el-table-column align="center" prop="erweima" label="收款二维码" min-width="150">
            <template scope="scope">
            <pg-img :src="scope.row.imgUrl" class="goodsimg"></pg-img>
            </template>            
        </el-table-column>
        <el-table-column align="center" prop="wechat" label="微信号" width="150"></el-table-column>
        <el-table-column align="center" prop="mobile" label="手机号" width="150"></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="150">
            <template scope="scope">
                <pg-button-group> 
                    <pg-button v-if="scope.row.flag === 0" icon="tongyi" title="同意"  @click="enable(scope.row)"></pg-button>
                    <pg-button v-if="scope.row.flag === 0" icon="jujue" title="拒绝"   @click="disable(scope.row)"></pg-button>
                </pg-button-group>
            </template>
        </el-table-column>
    </el-table>
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

</style>