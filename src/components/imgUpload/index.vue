<template>
    <div class="source">
        <div>
            <ul class="el-uplaod-list el-upload-list--picture-card" v-if="isImgFile">
                <li class="el-upload-list__item is-success" v-for="file in fileList">
                    <transition name="el-fade-in-linear">
                        <pg-img class="el-upload-list__item-thumbnail" :src="file.imgUrl" v-if="file.isSuccess"></pg-img>
                    </transition>
                    <transition name="el-fade-in-linear">
                        <div class="el-loading-spinner" v-if="!file.isSuccess">
                            <svg viewBox="25 25 50 50" class="circular">
                                <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
                            </svg>
                        </div>
                    </transition>
                    <span class="el-upload-list__item-actions" v-if="file.imgUrl">
                        <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                            <i class="el-icon-delete2"></i>
                        </span>
                    </span>
                </li>
            </ul>
            <div 
                class="el-upload el-upload--text"
                @click="handleClick" v-show="isShowUpload">
                <span class="avatar-img-size-tip">{{tip}}</span>
                <i class="el-icon-plus avatar-uploader-icon"></i>
                <input 
                    type="file" 
                    name="file" 
                    class="__input" 
                    @change="handleChange" 
                    ref="input" 
                    :multiple="multiple"
                    :accept="accept">
            </div>
            <ul class="el-upload-list el-upload-list--text" v-if="!isImgFile">
                <li class="el-upload-list__item is-success" v-for="file in fileList">
                    <transition name="el-fade-in-linear">
                        <div v-if="file.isSuccess">
                            <a class="el-upload-list__item-name">
                                <i class="el-icon-document"></i>
                                {{file.imgUrl.substring(file.imgUrl.lastIndexOf('\/')+1)}}
                            </a>
                            <i class="el-icon-close" @click="handleRemove(file)"></i>
                        </div>
                    </transition>
                    <span v-if="!file.isSuccess"><i class="el-icon-loading"></i>上传中...</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<style rel="stylesheet/less" lang="less" scoped>
    @import '../../assets/styles/_variables';
    .source {
        padding: 24px 24px 0 0;
    }
    .el-upload-list--picture-card .el-upload-list__item {
        width: 100px;
        height: 100px;
    }
    .el-upload-list--text {
        margin: 0;
        padding: 0;
        list-style: none;
        .el-upload-list__item {
            height: 30px;
            transition: all .5s cubic-bezier(.55,0,.1,1);
            font-size: 14px;
            color: #48576a;
            line-height: 1.8;
            margin-top: 5px;
            box-sizing: border-box;
            border-radius: 4px;
            width: 100%;
            position: relative;
            &:first-child {
                margin-top: 10px;
            }
            &-name {
                color: #48576a;
                display: block;
                margin-right: 40px;
                overflow: hidden;
                padding-left: 4px;
                text-overflow: ellipsis;
                transition: color .3s;
                white-space: nowrap;
                text-decoration: none;
                .el-icon-document {
                    color: #97a8be;
                    margin-right: 7px;
                    height: 100%;
                    line-height: inherit;
                }
            }
            .el-icon-close {
                display: block;
                position: absolute;
                top: 5px;
                right: 5px;
                cursor: pointer;
                opacity: .75;
                color: #48576a;
                transform: scale(.7);
            }
        }
    }
    .avatar-img-size-tip {
        font-size: 12px;
        color: red;
        position: absolute;
        bottom: 40%;
        left: 0;
        height: 30px;
        text-align: center;
        width: 100%;
    }
    .el-upload {
        background: #fbfdff;
        border: 1px dashed #d9d9d9;
        border-radius: 5px;
        box-sizing: border-box;
        width: 100px;
        height: 100px;
        line-height: 98px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        vertical-align: top;
    }
    .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 98px;
        text-align: center;
    }
    .__input {
        display: none;
    }
</style>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>