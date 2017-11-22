<template>
    <pg-box :isShowBox="show" @close="close">
        <div class="box_title">{{title}}</div>
        <div class="config">
            <div class="switch">
                <span>{{editForm.name}}</span>
                <el-switch v-model="form.value" on-value="1" off-value="0"></el-switch>
            </div>
            <div class="btn_group">
                <el-button size="small" type="primary" @click="save">保存</el-button>
                <el-button size="small" @click="close">关闭</el-button>
            </div>
        </div>
    </pg-box>
</template>
<style rel="stylesheet/less" lang="less" scoped>
    .config, .btn_group{
        margin: 20px 50px;
    }
    .switch {
        margin-left: 50px;
        span {
            display: inline-block;
            margin-right: 10px;
        }
    }
</style>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>
