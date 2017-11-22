<template>
    <el-table :data="list" highlight-current-row border style="width: 100%" @selection-change="selectChange">
        <el-table-column align="center" fixed="left" type="selection" width="55">
        </el-table-column>
        <el-table-column align="center" prop="textTypeDesc" label="文本位置" width="139"></el-table-column>
        <el-table-column align="center" prop="name" label="文本名称" min-width="340"></el-table-column>
        <el-table-column align="center" prop="editTime" label="针对团队" width="241"></el-table-column>
        <el-table-column align="center" prop="editor" label="修改人" width="110"></el-table-column>
        <el-table-column align="center" prop="createTime" label="修改时间" width="329"></el-table-column>
        <el-table-column align="center" prop="status" label="状态" width="100">
            <template scope="scope">
                <span v-if="scope.row.status ===-1">不限</span>
                <span v-if="scope.row.status ===1">已启用</span>
                <span style="color: red" v-if="scope.row.status ===0" class="disable">已禁用</span>
            </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" min-width="240">
            <template scope="scope">
                <pg-button-group>
                    <pg-button icon="xiugai" title="修改"  @click="edit(scope.row)"></pg-button>
                    <pg-button icon="chakan1" title="查看"  @click="detail(scope.row)"></pg-button>
                    <!--<pg-buttonn icon="shezhidengji"  @click="edit(scope.row)"></pg-button>-->
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