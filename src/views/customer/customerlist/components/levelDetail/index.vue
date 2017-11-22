<template>
    <pg-box :isShowBox="show" @close="close">
        <div class="box_title">
            <em v-if="queryLevel=='upper'">上级分销树</em>
            <em v-if="queryLevel=='lower'">下级分销树</em>
        </div>
        <!--上级分销树-->
        <div class="upper" style="padding-left: 50%;" v-if="queryLevel=='upper'">
            <!--<div class="upperbox" v-for="(item,index) in form.upper">
                <div v-if="index>0" class="border" code='item.label'></div>
                {{item.label}}
            </div>-->
            <el-steps :space="100" direction="vertical" :active="1">
                <em v-for="(item,index) in upper">
                <el-step :title="item.customerName"></el-step>
                </em>
            </el-steps>
        </div>
        <!--下级分销树-->
        <div class="lower" v-if="queryLevel=='lower'">
            <el-tree :data="lower" default-expand-all :props="defaultProps" ></el-tree>
        </div>
       
    </pg-box>
</template>
<style>
    .border{
        height: 80px;
        width: 0px;
        border: 1px solid black;
        margin: 0 0 0 3
    }
    
</style>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>
