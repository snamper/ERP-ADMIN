<template>
       <el-table :data="list" highlight-current-row border style="width: 100%" @selection-change="selectChange">
           <el-table-column align="center" type="selection" fixed="left" width="55">
           </el-table-column>
           <el-table-column align="center" prop="code" label="快递编码" min-width="150">
           </el-table-column>  
           <el-table-column align="center" prop="name" label="快递名称" min-width="150">
           </el-table-column> 
           <el-table-column align="center" prop="deliveryName" label="所属快递" min-width="150">
           </el-table-column>
           <el-table-column align="center" prop="statusDesc" label="状态" min-width="150">
           </el-table-column>
           <el-table-column align="center" fixed="right" label="操作" min-width="150">
               <template scope="scope">
                   <!-- 多个按钮 -->
                   <pg-button-group>
                       <pg-button icon="xiugai" title="修改" @click="edit(scope.row)"></pg-button>
                       <pg-button icon="sucaiku" title="档案配置" @click="adddialogForm(scope.row)"></pg-button>
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
   }
</style>