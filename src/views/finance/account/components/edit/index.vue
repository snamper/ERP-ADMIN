<template>
    <pg-box :isShowBox="show" @close="close">
        <div class="box_title">调整</div>
        <el-form ref="form" :model="form" label-width="100px" :inline="true">
      
            <el-form-item label="类型" prop="">
                  <el-select v-model="form.type" placeholder="请选择">
                    <el-option
                      v-for="item in typeOptions"
                      :key="item.text"
                      :label='item.text'
                      :value="item.value">
                    </el-option>
                  </el-select>   
            </el-form-item>
            <br>
            <el-form-item label="动作" prop="grade">
                  <el-select  v-model="form.directFlag" placeholder="请选择">
                    <el-option
                      v-for="item in actionOptions"
                      :key="item.text"
                      :label='item.text'
                      :value="item.value">
                    </el-option>
                  </el-select>                
            </el-form-item>
            <br>         
            <el-form-item label="发生数" prop="accValue">
                <el-input v-model="form.accValue"></el-input>
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
