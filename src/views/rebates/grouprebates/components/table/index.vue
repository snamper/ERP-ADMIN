<template>
    <el-table :data="list" highlight-current-row border style="width: 100%" @selection-change="selectChange">
        <el-table-column align="center" fixed="left" type="selection" width="55">
        </el-table-column>
        <el-table-column align="center" prop="teamName" label="所属团队" min-width="150"></el-table-column>
        <el-table-column align="center" prop="" label="包含自己" min-width="100">
            <template scope="scope">
               <span v-if="scope.row.inCludeSelf === 1">是</span>
               <span v-if="scope.row.inCludeSelf === 0">否</span>
            </template>  
        </el-table-column>
        <el-table-column align="center" prop="configTypeDesc" label="参考指标" min-width="150">
            <template scope="scope">
               <span v-if="scope.row.configType === 1">订单金额</span>
               <span v-if="scope.row.configType === 2">固定金额</span>
               <span v-if="scope.row.configType === 3">商品金额</span>
            </template>  
        </el-table-column>
        <el-table-column align="center" prop="payMothodDesc" label="发放方式" min-width="150">
            <template scope="scope">
               <span v-if="scope.row.payMothod === 0">上级发放</span>
               <span v-if="scope.row.payMothod === 1">公司发放</span>
            </template>  
        </el-table-column>
        <el-table-column align="center" prop="editTime" label="修改时间" min-width="150"></el-table-column>
        <el-table-column align="center" prop="editor" label="修改人" min-width="150"></el-table-column>
        <el-table-column align="center" prop="note" label="备注" min-width="150"></el-table-column>
        <el-table-column align="center" prop="" label="状态" min-width="150">
            <template scope="scope">
               <span v-if="scope.row.status === 1">已启用</span>
               <span v-else style="color: red">已禁用</span>
            </template>      
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" min-width="150">
            <template scope="scope">
                <!-- 一个按钮 -->
                <pg-button icon="xiugai" @click="edit(scope.row)"></pg-button>
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