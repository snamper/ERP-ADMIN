<template>
    <pg-box :isShowBox="show" @close="close">
        <div class="box_title">{{title}}</div>
        <!-- 新增/编辑sku -->
        <div class="box_title" v-if="isSkuEdit !==2">&nbsp;&nbsp;基本信息</div>
        <el-form  v-if="isSkuEdit !==2" ref="form" :model="form" label-width="100px" :rules="rules" :inline="true">
            <el-form-item label="SKU编号" prop="customBC">
                <el-input v-model="form.customBC" placeholder="请输入1-64个字母或数字"></el-input>
            </el-form-item>
            <el-form-item label="带小包装" prop="hasSmallPack">
                <el-select v-model.number="form.hasSmallPack" placeholder="请选择">
                    <el-option
                      v-for="item in packList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="库存">
                <el-input v-model.number="form.stockQty" :disabled="true" v-if="isSkuEdit === 1"></el-input>
                <el-input v-model.number="form.stockQty" v-else></el-input>
            </el-form-item>
            <br>
            <el-form-item label="规格1属性">
                <el-autocomplete
                    v-model="form.property1"
                    :fetch-suggestions="querySearchAsync1"
                    placeholder="请输入内容"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="规格2属性">
                <!-- <el-select v-model="form.property2" filterable placeholder="ex:尺码,包装">
                    <el-option
                      v-for="item in property2"
                      :label="item"
                      :value="item">
                    </el-option>
                </el-select> -->
                <el-autocomplete
                    v-model="form.property2"
                    :fetch-suggestions="querySearchAsync2"
                    placeholder="请输入内容"
                ></el-autocomplete>
            </el-form-item>
            <br><br>
            <div class="box_title" v-if="form.hasSmallPack ===1">&nbsp;&nbsp;小包装信息</div>
            <el-form-item label="包装数量" v-if="form.hasSmallPack ===1" prop="PackQty">
                <el-input v-model.number="form.packQty"></el-input>
            </el-form-item>
            <el-form-item label="小包装SKU" v-if="form.hasSmallPack ===1" prop="PackBarcodeID">
                <el-select v-model="form.packBarcodeID" filterable placeholder="请选择">
                    <el-option
                      v-for="item in packBarcode"
                      :label="item.customBC"
                      :value="item.barcodeID">
                    </el-option>
                </el-select>
                </el-select>
            </el-form-item>
            <br>
            <el-form-item class="el-form-item_btns">
                <el-button size="small" type="primary" @click="save" >保存</el-button>
                <el-button size="small" @click="close">返回</el-button>
            </el-form-item>
        </el-form>
        <!-- 调整库存 -->
        <el-form  v-if="isSkuEdit ===2" ref="adjustQty" :model="adjustQty" label-width="100px">
            <el-form-item label="动作">
                <el-select v-model.number="adjustQty.action" placeholder="请选择">
                    <el-option
                      v-for="item in actionList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>                
            </el-form-item>
            <el-form-item label="数值">
                <el-col :span="6">
                    <el-input v-model.number="adjustQty.qty"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item class="el-form-item_btns">
                <el-button size="small" type="primary" @click="save" >保存</el-button>
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
    p {
        padding: 0;
        margin: 0;
    }
</style>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>
