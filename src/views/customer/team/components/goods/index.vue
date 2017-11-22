<template>
    <pg-box :isShowBox="show" @close="close">
        <div class="box_title">设置团队分销商品</div>
        <h2>商品信息</h2>
        <div class="addDiv">
            <el-button size="small"  @click="addGoods">增加</el-button>
            <el-button size="small" @click="removeGoods">移除</el-button>
        </div>
        <el-form ref="form" :model="form" label-width="100px"  :inline="true">
            <el-table :data="goodsList" highlight-current-row border style="width: 100%" @selection-change="selectChange">
                <el-table-column align="center" fixed="left" type="selection" width="55">
                </el-table-column>
                <el-table-column align="center" prop="customNo" label="货号"width="200"></el-table-column>
                <el-table-column align="center" prop="name" label="商品名称" width="200"></el-table-column>
                <el-table-column align="center" prop="brandDesc"  label="品牌名称" min-width="200"></el-table-column>
                <el-table-column align="center" prop="basePrice"  label="价格" min-width="200"></el-table-column>   
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <pg-pagination slot="pagination" @size-change="sizeChange" @current-change="currentChange" :page-size="paginationParam.pageSize" :total="paginationParam.total"></pg-pagination>
            
            <el-form-item class="el-form-item_btns">
                <el-button size="small" type="primary" @click="save">保存</el-button>
                <el-button size="small" @click="close">返回</el-button>
            </el-form-item>
        </el-form>
        <!--等级弹窗页 -->
        <!--<add-goods  :show="isShowAdd" @addGoods='updateForm' @close="closeEdit()"></add-goods >-->
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
    .addDiv{
        width: 110px;
        margin: 0 0 20px 20px;
    }
</style>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>
