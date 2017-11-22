<template>
    <div>
        <div class="box clearfix">
            <div class="title">
                列表渲染
            </div>
            <pg-demo :title="title" :list="demoList"></pg-demo>
            <a href="javascript:void(0)" @click="openBox">弹出</a>
            <pg-box :isShowBox="isShowBox" @close="closeBox"></pg-box>
        </div>
    </div>
</template>
<style rel="stylesheet/less" lang="less" scoped>
    @import '~assets/styles/_variables';
    .title {
        font-size: 30px;
    }
</style>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>