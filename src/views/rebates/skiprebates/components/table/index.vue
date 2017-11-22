<template>
    <el-table :data="list" highlight-current-row border style="width: 100%" @selection-change="selectChange">
        <el-table-column align="center" fixed="left" type="selection" width="55">
        </el-table-column>
        <el-table-column align="center" prop="teamName" label="团队" min-width="100"></el-table-column>
        <el-table-column align="center" prop="orderGradeName" label="下单人等级" width="110">
        </el-table-column>
        <el-table-column align="center" prop="" label="订单类型" width="100">
            <template scope="scope">
               <span v-if="scope.row.operType == 0">全部</span>
               <span v-if="scope.row.operType == 1">后期补货</span>
               <span v-if="scope.row.operType == 2">首批进货</span>
               <span v-if="scope.row.operType == 4">一次性</span>
            </template>             
        </el-table-column>
        <el-table-column align="center" prop="" label="参考指标" width="100">
            <template scope="scope">
               <span v-if="scope.row.configType == 1">订单金额</span>
               <span v-if="scope.row.configType == 2">固定金额</span>
               <span v-if="scope.row.configType == 3">商品金额</span>
            </template>         
        </el-table-column>
        <el-table-column align="center" prop="" label="发放方式" width="100">
            <template scope="scope">
               <span v-if="scope.row.payMothod == 0">上级发放</span>
               <span v-if="scope.row.payMothod == 1">公司发放</span>
            </template>  
        </el-table-column>
        <el-table-column align="center" prop="editTime" label="修改时间" min-width="110"></el-table-column>
        <el-table-column align="center" prop="editor" label="修改人" width="100"></el-table-column>
        <el-table-column align="center" prop="note" label="备注" width="100"></el-table-column>
        <el-table-column align="center" prop="status" label="状态" width="100">
            <template scope="scope">
               <span v-if="scope.row.status == 1">已启用</span>
               <span v-else style="color: red">已禁用</span>
            </template>             
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="100">
            <template scope="scope">
                <pg-button icon="xiugai" title="修改" @click="edit(scope.row)"></pg-button>
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
