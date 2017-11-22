<template>
    <pg-box :isShowBox="show" @close="close">
        <div class="box_title">{{title}}</div>
        <el-form :model="form"  :rules="rules" label-width="100px">
            <el-form-item label="所属快递" prop="deliveryID">
                <el-select v-model="form.deliveryID"  placeholder="请选择所属快递">
                    <el-option v-for=" item in deliveryList" :key="item.deliveryID" :label="item.name" :value="item.deliveryID"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="快递编码" prop="code">
                <el-input v-model="form.code" placeholder="请输入快递编码" class="input_item"></el-input>
            </el-form-item>
            <el-form-item label="快递名称" prop="name">
                <el-input v-model="form.name" placeholder="请输入品牌名称" class="input_item"></el-input>
            </el-form-item>
            <el-form-item label="快递类型" prop="deliveryType">
                <el-select v-model="form.deliveryType"  placeholder="请选择快递类型">
                    <el-option v-for=" item in deliveryTypeList" :key="item.code" :label="item.text" :value="item.code "></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="优先级" prop="orderNo">
                <el-input v-model="form.orderNo" placeholder="请输入优先级" class="input_item"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="linkMan">
                <el-input v-model="form.linkMan" placeholder="请输入联系人" class="input_item"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="linkTel">
                <el-input v-model="form.linkTel" placeholder="请输入联系电话" class="input_item"></el-input>
            </el-form-item>
            <el-form-item label="启用/禁用">
                <el-select v-model="form.status"  placeholder="请选择状态">
                    <el-option v-for=" item in disableList" :key="item.val" :label="item.text" :value="item.val "></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="form.note" placeholder="请输入备注" class="input_item"></el-input>
            </el-form-item>
            <el-form-item class="el-form-item_btns">
                <el-button size="small" type="primary" @click="save">保存</el-button>
                <el-button size="small" @click="close">返回</el-button>
            </el-form-item>
        </el-form>
    </pg-box>
</template>

<style rel="stylesheet/less" lang="less">
    .input_item {
        width: 200px;
    }
</style>

<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>
