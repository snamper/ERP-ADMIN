<template>
    <pg-dialog :size="size" :isShow="show" @close="close">
        <div class="pg-dialog">
            <!--:stateInfo="place.state" :cityInfo="place.city" :districtInfo="place.district"-->
            <pg-region @changeRegions="changeRegions" :stateInfo="place.state" :cityInfo="place.city" :districtInfo="place.district"></pg-region>
            <br>
            <el-button size="small" type="primary" @click="addPlace">设置</el-button>
            <el-button size="small" @click="close">返回</el-button>
        </div>
    </pg-dialog>
</template>
<style style rel="stylesheet/less" lang="less" scoped>
    .pg-dialog{
        min-width: 300px;
        width: 400px;
        margin: 0 auto
    }
</style>

<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>
