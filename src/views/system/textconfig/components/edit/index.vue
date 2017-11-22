<template>
    <pg-box :isShowBox="show" @close="close">
        <div class="box_title">{{title}}</div>
        <el-form ref="form" :model="form" label-width="100px" :rules="rules" :inline="true">
            <el-form-item label="文本位置" >
                <el-select v-model="form.textType" placeholder="请选择">
                    <el-option
                    v-for="item in textType"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文件名称" prop="name">
                <el-input v-model="form.name" placeholder="请输入内容"></el-input>
            </el-form-item>
            
            <el-form-item label="针对团队" prop="distributorGroupID">
                <el-select v-model="form.distributorGroupID" placeholder="请选择">
                    <el-option
                    v-for="item in teams"
                    :key="item.id"
                    :label="item.desc"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <br>
            <el-form-item label="文本详情" >
                <pg-editor ref="contentEditor" v-model="form.content" :init-content="content"></pg-editor>
            </el-form-item>
            <br>
            <el-form-item label="外部链接">
                <el-input v-model="form.url" placeholder="请输入内容"></el-input>
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
