<template>
    <pg-box :isShowBox="show" @close="close">
        <div class="box_title">设置等级信息</div>
        <div>
        <h2>基本信息</h2>
        <el-select v-bind:disabled="selectDisable" v-model="priceType" >
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
        <el-form ref="form" :model="form" label-width="100px">
            <el-table :data="priceList" highlight-current-row border style="width: 100%" @selection-change="selectChange">
                <!--<el-table-column align="center" fixed="left" type="selection" width="55">
                </el-table-column>-->
                <el-table-column align="center" prop="name" label="" width="300">
                    <template scope="scope">
                        {{scope.row.code}}{{scope.row.name}}({{scope.row.price}})
                     </template>
                </el-table-column>
                <el-table-column align="center" prop="name" label="ceo" width="200">
                    <template scope="scope">
                        <el-input v-model='scope.row.name'></el-input>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="zd" label="总代" width="200">
                    <template scope="scope">
                        <el-input v-model='scope.row.zd'></el-input>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="shengd" label="省代" width="200">
                    <template scope="scope">
                        <el-input v-model='scope.row.shengd'></el-input>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="shid" label="市代" width="200">
                    <template scope="scope">
                        <el-input v-model='scope.row.shid'></el-input>
                    </template>
                </el-table-column>
                 
                
            </el-table>
            <el-form-item class="el-form-item_btns">
                <el-button size="small" type="primary" @click="save">保存</el-button>
                <el-button size="small" @click="close">返回</el-button>
            </el-form-item>
        </el-form>
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
</style>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>
