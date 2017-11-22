<template>
    <pg-box :isShowBox="show" @close="close">
        <div class="box_title">{{title}}</div>
        <el-form ref="form" :model="form" label-width="100px" :rules="rules" :inline="true">
            <el-form-item label="名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <br>        
            <el-form-item label="授权对象" prop="distributorGroupID">
                  <el-select  v-model="form.distributorGroupID" placeholder="请选择">
                    <el-option
                      v-for="item in teamList"
                      :key="item.id"
                      :label='item.desc'
                      :value="item.id">
                    </el-option>
                  </el-select>   
            </el-form-item>
            <br>
            <el-form-item label="授权样式" prop="authorizationCertificateID">
                  <el-select  v-model="form.authorizationCertificateID" placeholder="请选择">
                    <el-option
                      v-for="item in accreditStyleList"
                      :key="item.id"
                      :label='item.desc'
                      :value="item.id">
                    </el-option>
                  </el-select>                
            </el-form-item>
            <br>         

            <el-form-item class="el-form-item_btns">
                <el-button size="small" type="primary" @click="save">保存</el-button>
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
