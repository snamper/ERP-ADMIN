<template>
    <el-dialog
        :title="title"
        v-model="isOpen"
        size="small"
        :modal-append-to-body="appendToBody">
        <el-upload 
            class="upload"
            ref="upload"
            :action="action"
            :headers="headers"
            drag
            :multiple="multiple"
            :on-success="handleSuccess"
            :on-error="handleError"
            :data="bringData"
            :accept="accept">
            <i class="el-icon-upload"></i>
            <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传excel文件</div>
        </el-upload>
        <span slot="footer">
            <el-button @click.native="downTemplate">下载模板</el-button>
            <el-button @click.native="closeDialog">取消</el-button>
            <el-button type="primary" @click.native="closeDialog">确定</el-button>
        </span>
    </el-dialog>
</template>

<style rel="stylesheet/less" lang="less" scoped>
    @import '~assets/styles/_variables';
    .upload {
        text-align: center;
    }
</style>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>