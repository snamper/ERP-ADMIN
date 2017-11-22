<template>
    <pg-box :isShowBox="show" @close="close">
        <div class="box_title">{{title}}</div>

        <div class="bgColor" style="background-color: #EEF1F6;border: 1px solid #dfe6ec;border-bottom:none;">
            <el-button style="margin:20px 0px 20px 20px" @click="addGoodsType">新增API</el-button>
            <el-table style="border:none;" :data="form.params">
                <el-table-column align="center" type="index" label="序号" width="200">           
                </el-table-column>
                <el-table-column align="center" label="参数名称" min-width="200">           
                    <template scope="scope">
                         <el-input v-model="scope.row.name"  placeholder="请输入参数名称"></el-input>
                    </template>
                </el-table-column>
                <el-table-column  align="center"   label="值" min-width="200">
                    <template scope="scope">
                         <el-input v-model="scope.row.value"  placeholder="请输入值"></el-input>
                    </template>                  
                </el-table-column>
                <el-table-column align="center" label="描述" min-width="200">
                    <template scope="scope">
                        <el-input v-model="scope.row.note"  placeholder="请输入描述"></el-input>
                    </template>
                </el-table-column>
            </el-table>  
        </div> 
        <div class="btn-group">
            <el-button size="small" type="primary" @click="save">保存</el-button>
            <el-button size="small" @click="close">返回</el-button>
        </div>  
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
