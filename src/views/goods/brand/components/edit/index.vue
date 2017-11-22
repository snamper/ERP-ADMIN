<template>
    <pg-box :isShowBox="show" @close="close">
    <!-- 新增品牌 -->
        <div class="box_title">{{title}}</div>
        <el-form ref="form" :model="form" label-width="100px" :rules="rules" :inline="true">
            <el-form-item label="编号" prop="code">
                <el-input v-model="form.code" placeholder="请输入2-5个数字" class="input_item"></el-input>
            </el-form-item>
            <el-form-item label="品牌名称" prop="name">
                <el-input v-model="form.name" placeholder="1-64个字符" class="input_item"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="备注">
                <el-input type="textarea" :rows="5" placeholder="请输入备注" v-model="form.note" class="input_item"></el-input>
            </el-form-item>
            <br>
            <el-form-item class="el-form-item_btns">
                <el-button size="small" type="primary" @click="save"  v-if="isEdit !== 0">保存</el-button>
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
    .input_item {
        width: 300px;
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
