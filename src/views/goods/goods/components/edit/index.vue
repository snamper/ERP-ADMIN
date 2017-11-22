<template>
    <pg-box :isShowBox="show" @close="close">
        <div class="box_title">{{title}}</div>
        <div class="box_title">&nbsp;&nbsp;商品信息</div>
        <el-form ref="form" :model="form" label-width="100px" :rules="rules" :inline="true">
            <el-form-item label="商品货号" prop="customNo" placeholder="请输入1-64个字母或数字">
                <el-input v-model="form.customNo"></el-input>
            </el-form-item>
            <el-form-item label="商品名称" prop="name">
                <el-input v-model="form.name" placeholder="请输入1-64个字母或数字"></el-input>
            </el-form-item>
            <el-form-item label="统一销售价" prop="basePrice">
                <el-input v-model.number="form.basePrice"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="所属品牌" prop="brandID">
                <el-select v-model="form.brandID" placeholder="请选择">
                    <el-option
                    v-for="item in brandList"
                    :label="item.name"
                    :value="item.brandID">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="规格1名称">
                <el-input v-model="form.barcodePropertyName1" placeholder="ex:颜色,容量"></el-input>
            </el-form-item>
            <el-form-item label="规格2名称">
                <el-input v-model="form.barcodePropertyName2" placeholder="ex:尺码,包装"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="单位">
                <el-input v-model="form.unit" placeholder="ex:件,盒,箱"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="商品图片">
                <pg-upload :files="mainFiles" @upload-success="uploadSuccess" folderType='11' tip="1:1,小于700*700"></pg-upload>
                <p class="title">主图</p>
                <pg-upload :files="subFiles" multiple @upload-success="multipleUploadSuccess" folderType='11' tip="25:9,750*270"></pg-upload>
                <p class="title">轮播图</p>
            </el-form-item>
            <br>
            <el-form-item label="商品详情">
                <pg-editor ref="contentEditor" v-model="form.goodsDetailContent" :init-content="goodsDetailContent"></pg-editor>
            </el-form-item>
            <br>
            <el-form-item label="质检报告">
                <pg-editor ref="contentEditor2" v-model="form.goodsQualityReptContent" :init-content="goodsQualityReptContent"></pg-editor>
            </el-form-item>
            <br>
            <el-form-item class="el-form-item_btns">
                <el-button size="small" type="primary" @click="save">保存</el-button>
                <el-button size="small" @click="close">返回</el-button>
            </el-form-item>
        </el-form>
        <!-- 查看 -->
        
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
    .title {
        margin-left: 40px;
    }
</style>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>
