<template>
    <pg-box :isShowBox="show" @close="close">
        <div class="box_title">{{title}}</div>
        <el-form ref="form" :model="form" label-width="100px" :rules="rules" :inline="true">
            <el-form-item label="编号" prop="code">
                <el-input v-model="form.code" placeholder="请输入1-4个英文字母"></el-input>
            </el-form-item>
            <el-form-item label="团队名字" prop="name">
                <el-input v-model="form.name" placeholder="请输入内容"></el-input>
            </el-form-item>
            
            <el-form-item label="起始号" prop="codeSerial">
                <el-input v-model="form.codeSerial" placeholder="请输入6个长度的数字"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="前缀" prop="codeHead">
                <el-input v-model="form.codeHead" placeholder="请输入1-4个英文字母"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="note">
                <el-input v-model="form.note" ></el-input>
            </el-form-item>
            
            <br>
            <el-form-item label="团队图片" >
                <!--:files='fileList2'-->
                <pg-upload @upload-success="uploadSuccess"  :files="imgFile"  folderType='41'></pg-upload>
            </el-form-item>
            
            <br>
            <el-form-item class="el-form-item_btns" >
                <el-button v-if="!detail" size="small" type="primary" @click="save">保存</el-button>
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
