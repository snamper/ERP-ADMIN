<template>
    <el-table :data="list" highlight-current-row border style="width: 100%" @selection-change="selectChange" @expand="getSku">
        <el-table-column align="center" type="selection" fixed="left" width="55">
        </el-table-column>
         <!-- sku列表 --> 
        <el-table-column type="expand">
            <template scope="scope">
                <el-table :data="skuList" highlight-current-row border style="width: 80%" class="skuTable">
                    <el-table-column align="center" prop="customBC" label="sku编号" min-width="200">
                    </el-table-column>
                    <el-table-column align="center" prop="property" label="属性" min-width="200">
                    </el-table-column>
                    <el-table-column align="center" prop="stockQty" label="库存" width="100">
                    </el-table-column>
                    <el-table-column align="center" prop="" label="状态" width="100">
                        <template scope="scope">
                            <span v-if="scope.row.status === -1">不限</span>
                            <span v-if="scope.row.status === 1">已启用</span>
                            <span v-if="scope.row.status === 0" class="disable">已禁用</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作" min-width="180">
                        <template scope="scope">
                            <!-- 多个按钮 -->
                            <pg-button-group>
                                <pg-button icon="tiaozhengkucun" title="调整库存" @click="editSku(scope.row, 2)"></pg-button>
                                <pg-button icon="xiugai" title="编辑sku" @click="editSku(scope.row, 1)"></pg-button>
                                <pg-button icon="jinyong" title="禁用sku" @click="disableSku(scope.row)"></pg-button>
                                <pg-button icon="qiyong" title="启用sku"  @click="ableSku(scope.row)"></pg-button>
                            </pg-button-group>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </el-table-column>
        <el-table-column align="center" prop="customNo" label="货号" width="150">
        </el-table-column>  
        <el-table-column align="center" prop="name" label="商品名称" min-width="200">
        </el-table-column>
        <el-table-column align="center" prop="" label="图片" width="200">
            <template scope="scope">
                <!-- <img :src="scope.row.mainImageUrl" class="goodsimg"> -->
                <pg-img :src="scope.row.mainImageUrl" class="goodsimg"></pg-img>
            </template>
        </el-table-column>
        <el-table-column align="center" prop="brandDesc" label="品牌" width="100">
        </el-table-column>
        <el-table-column align="center" prop="basePrice" label="售价" width="100">
        </el-table-column>
        <el-table-column align="center" prop="" label="修改时间" width="200">
            <template scope="scope">
                <!-- <el-tooltip class="item" effect="dark" placement="top-start">
                    <div slot="content">{{scope.row.createTime}}</div> 
                    <span v-popover:popover v-if="scope.row.createTime">{{scope.row.createTime.substring(2,9)}}</span>
                </el-tooltip> -->
                <span>{{scope.row.editTime}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" prop="editor" label="修改人" width="100">
        </el-table-column>
        <el-table-column align="center" prop="" label="状态" width="100">
            <template scope="scope">
                <span v-if="scope.row.status === -1">不限</span>
                <span v-if="scope.row.status === 1">已启用</span>
                <span v-if="scope.row.status === 0" class="disable">已禁用</span>
            </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="150">
            <template scope="scope">
                <!-- 多个按钮 -->
                <pg-button-group>
                    <pg-button icon="xiugai" title="编辑商品" @click="edit(scope.row)"></pg-button>
                    <pg-button icon="tianjiasku" title="添加sku" class="tianjiasku" @click="addSku(scope.row)"></pg-button>
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
   .disable {
        color: red;
    }
    .icon-icon_tianjiasku:before {
        color: #fff;
    }

</style>