<template>
    <pg-box :isShowBox="show" @close="close">
        <div class="box_title">{{title}}</div>
        <el-form v-if="!isEdit" ref="form" :model="form" label-width="100px" :rules="rules" :inline="true">
            <el-form-item label="名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <br>        
            <el-form-item label="授权模版" prop='mainImageUrl'>
                <pg-upload folderType='31' @upload-success="uploadSuccess"></pg-upload>
            </el-form-item>
            <br>         

            <el-form-item class="el-form-item_btns">
                <el-button size="small" type="primary" @click="save">保存</el-button>
                <el-button size="small" @click="close">返回</el-button>
            </el-form-item>
        </el-form>
        <el-form v-if="isEdit"  ref="form" :model="form" label-width="100px" :rules="rules" :inline="true">
             <el-form-item label="授权模版">
                <template scope="scope">
                    <pg-img :src="form.mainImageUrl" class="goodsimg"></pg-img>
                </template>
            </el-form-item>
            <br/>
            <el-form-item class="el-form-item_btns">
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
    .goodsimg {

        overflow: hidden;
        vertical-align: middle;
        max-width: 500px;
        margin: 10px 0;
        background: #F9FAFC;   
   }
</style>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>
