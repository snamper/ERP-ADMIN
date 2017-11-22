<template>
	<div class="pg_content">
        <el-form :inline="true" :model="form" label-width="80px">
            <el-form-item label="打印类型">
                <el-select v-model="form.printTemplateType.businessType" placeholder="打印类型" filterable disabled>
                    <el-option v-for="businessType in businessTypeList" :label="businessType.text" :value="businessType.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="背景图片">
                <el-input 
                    v-model="form.imgUrl"
                    placeholder="背景图片链接"
                    icon="upload"
                    :on-icon-click="handleIconClick">
                </el-input>
            </el-form-item>
            <el-form-item label="团队选择">
                <el-select v-model="form.distributorGroupID" placeholder="请选择团队" filterable>
                    <el-option v-for="team in teamList" :label="team.name" :value="team.distributorGroupID"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-row :gutter="20">
            <el-col :span="16">
                <div class="editor_title">
                    <pg-tool-bar :current-field="currentField"></pg-tool-bar>
                </div>
                <div class="editor">
                    <pg-img class="bg-image" :src="form.imgUrl" v-if="form.imgUrl"></pg-img>
                    <pg-text-field
                        v-for="field in editField.fields"
                        :field-text="field.code"
                        :style="field.style"
                        @position-change="dragStart($event, field, {horizonStyle: 'left',verticalStyle: 'top', direction: 'rb'})"
                        @set-edit-field="setEditField(field)"
                        @focus-field="setCurrentField(field)"
                        @get-content="getContent($event, field)"
                        @remove-field="removeField(editField.fields, field)">
                    </pg-text-field>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="fields">
                    <div class="title">插入模块</div>
                    <ul class="field-list">
                        <li v-for="field in fieldList" @click="changeField(field)">{{field.code}}</li>
                    </ul>
                </div>
            </el-col>
        </el-row>
        <div class="print-buttons">
            <el-button @click="saveTemplate" type="primary">保存</el-button>
        </div>
        <pg-drag-img-upload v-model="isOpenUpload" :importType="111" @success="uploadSuccess"></pg-drag-img-upload>
    </div>
</template>

<style type="stylesheet/less" lang="less" scoped>
	@import '~assets/styles/_variables';
    .print-buttons {
        margin-top: 20px;
    }
    .editor_title {
        width: 100%;
        height: 50px;
        line-height: 50px;
        background: #263548;
        padding: 0 20px;
        color: #fff;
        box-sizing: border-box;
    }
    .editor {
        width: 100%;
        height: 550px;
        background: #fafafa;
        position: relative;
        overflow-y: scroll;
        .bg-image {
            position: absolute;
            left: 0;
            top: 0;
        }
        &_field {
            position: absolute;
            cursor: move;
            .field {
                height: 100%;
                box-sizing: border-box;
                border: 1px dashed #000;
                span {
                    display: block;
                    height: 100%;
                }
            }
        }
    }
    .fields {
        .title {
            font-weight: bold;
            width: 100%;
            height: 50px;
            line-height: 50px;
            background: #263548;
            padding: 0 20px;
            color: #fff;
            box-sizing: border-box;
        }
        .field-list {
            box-sizing: border-box;
            width: 100%;
            padding: 0 12px;
            background: #fafafa;
            height: 550px;
            border: 1px solid #ccc;
            overflow-y: scroll;
            li {
                line-height: 38px;
                text-indent: 8px;
                color: #263548;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                cursor: pointer;
                &:not(:last-child) {
                    border-bottom: 1px dashed #ccc;
                }
            }
        }
    }
</style>

<script type="text/babel">
	import index from './index'
	export default {
		...index
	}
</script>