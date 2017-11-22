<template>
    <pg-box :isShowBox="show" @close="close">
        <div class="box_title">{{title}}</div>
        <el-form ref="form" :model="form" label-width="100px" :rules="rules" :inline="true">
            <el-form-item label="素材库名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="分类标签" prop="materialTagID">
                <el-select v-model="form.materialTagID">
                    <el-option :label="tag.desc" :value="tag.id" v-for="tag in tagList"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="针对团队">
                <el-select v-model="form.distributorGroupID">
                    <el-option :label="team.name" :value="team.distributorGroupID" v-for="team in teamList"></el-option>
                </el-select>
            </el-form-item>
            <br>
            <el-form-item label="文案编辑" prop="description">
                <el-input type="textarea" v-model="form.description" style="min-width: 500px"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="编辑类型">
                <el-select v-model="form.fileType">
                    <el-option :label="file.text" :value="file.value" v-for="file in uploadFileType"></el-option>
                </el-select>
            </el-form-item>
            <br>
            <el-form-item label="上传" v-if="form.fileType == 0">
                <pg-upload multiple :files="uploadImgs" folder-type="91" @upload-success="multipleUploadSuccess" :is-img-file="true"></pg-upload>
            </el-form-item>
            <el-form-item label="上传" v-if="form.fileType == 99">
                <pg-upload multiple :files="uploadOptions" folder-type="91" @upload-success="multipleUploadSuccess" :is-img-file="false"></pg-upload>
                <div class="el-upload__tip">只能上传zip、rar压缩格式素材，大小不超过10M，该通道微信端无法下载，需要在PC端自行转存。</div>
            </el-form-item>
            <br>
            <el-form-item class="el-form-item_btns">
                <el-button size="small" type="primary" @click="save">保存</el-button>
                <el-button size="small" type="primary" @click="issue">保存并发布</el-button>
                <el-button size="small" @click="close">返回</el-button>
            </el-form-item>
        </el-form>
    </pg-box>
</template>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>
