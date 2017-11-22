<template>
    <pg-box :isShowBox="show" @close="close">
        <div class="box_title">设置等级信息</div>
        <div>
            <h2>基本信息</h2>
            <el-select v-bind:disabled="selectDisable" v-model="editForm.priceType" >
                <el-option
                    v-for="item in priceOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            
            <el-button size="small"  @click="closeType">{{priceBtnName}}</el-button>
            <h2>价格信息</h2>
            <pg-search-form
                v-model="query"
                :default-form="defaultQuery"
                slot="search-form"
                @search="search">
            </pg-search-form>
        </div>
        <!-- <el-table :data="editForm" highlight-current-row border style="width: 90%">
            <el-table-column align="center" prop="goodsName" width="200">
            </el-table-column>
            <el-table-column align="center" prop="" label="" width="150" v-for=" item in editForm.gradePrice">
                <template scope="scope">
                    <el-input v-model="item.price"></el-input>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="" label="总代" width="150">
                <template scope="scope">
                    <el-input v-model='scope.row.gradePrice[1].price'></el-input>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="" label="省代" width="150">
                <template scope="scope">
                    <el-input v-model="scope.row.gradePrice[2].price"></el-input>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="" label="市代" width="150">
                <template scope="scope">
                    <el-input v-model="scope.row.gradePrice[3].price"></el-input>
                </template>
            </el-table-column>       
        </el-table>  -->
        <div class="table_warp">
            <table class="table" cellpadding="0" cellspacing="0">
                <thead>
                    <tr class="table_header">
                        <th class="table_header_item"></th>
                        <th v-for="item in groups" class="table_header_item">
                            <span>{{item.name}}</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in editForm.goodsGradePriceList" class="table_tr">
                        <td  class="table_tr_item">
                            <span v-bind:title="item.goodsCustomNo+'-'+item.goodsName+'-'+item.goodsPrice" class="table_tr_goodsName" >{{item.goodsCustomNo}} - {{item.goodsName}} - {{item.goodsPrice}}</span>
                        </td>
                        <td v-for="item2 in item.gradePrice"  class="table_tr_item">
                            <el-input v-model.number="item2.price"class=" table_tr_item_input"></el-input>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="btn_group">
           <el-button size="small" type="primary" @click="save">保存</el-button>
            <el-button size="small" @click="close">返回</el-button> 
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
    
    .table_warp{
        padding: 30px;
        background: #EFF2F7;
        border:1px solid #D3DCE6;
        box-sizing: border-box;
        .table {
            width: 100%;
           .table_header {
                height: 50px;
                .table_header_item {
                    width: 150px;
                    text-align: center;
                    color: #324057;
                    font-weight: normal;
                    border-bottom:1px solid #D3DCE6;

                }
            } 
            .table_tr {
                .table_tr_item {
                    width: 150px;
                    text-align: center;
                    color: #324057;
                    height: 40px;
                    .table_tr_goodsName{
                        width: 160px;
                        display: block;
                        overflow: hidden;
                        height: 1em;
                    }
                    .table_tr_item_input {
                        width: 100px; 
                    }
                }
            }
        }
    }
    .btn_group{
        margin-top: 20px;
    }
</style>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>
