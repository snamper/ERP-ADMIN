<template>
    <el-table :data="list" highlight-current-row border style="width: 100%" @selection-change="selectChange" show-overflow-tooltip="true">
        <el-table-column align="center" type="selection" fixed="left" width="55">
        </el-table-column>
        <el-table-column align="center" prop="code" label="编号" width="150">
        </el-table-column>  
        <el-table-column align="center" prop="name" label="品牌名称" min-width="200">
        </el-table-column>
        <el-table-column align="center" prop="" label="修改时间" width="200">
            <template scope="scope">
                <!-- <el-tooltip class="item" effect="dark" placement="top-start">
                    <div slot="content">{{scope.row.createTime}}</div> 
                    <span v-popover:popover v-if="scope.row.createTime">{{scope.row.createTime.substring(2,9)}}</span>
                </el-tooltip> -->
                <span>{{scope.row.createTime}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" prop="editor" label="修改人" width="100">
        </el-table-column>
        <el-table-column align="center" prop="" label="状态" width="100">
            <template scope="scope">
                <span v-if="scope.row.status ===-1">不限</span>
                <span v-if="scope.row.status ===1">已启用</span>
                <span v-if="scope.row.status ===0" class="disable">已禁用</span>
            </template>
        </el-table-column>
        <el-table-column align="center" prop="note" label="备注" min-width="200">
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="150">
            <template scope="scope">
                <!-- 多个按钮 -->
                <pg-button-group>
                    <pg-button icon="chakan" title="查看品牌详情" @click="edit(scope.row, 0)"></pg-button>
                    <pg-button icon="xiugai" title="编辑品牌" @click="edit(scope.row, 1)"></pg-button>
                </pg-button-group>
            </template>
        </el-table-column>
    </el-table>   
</template>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>
<style rel="stylesheet/less" lang="less" scoped>
    .disable {
        color: red;
    }
</style>