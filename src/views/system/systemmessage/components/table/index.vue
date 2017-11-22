<template>
    <el-table :data="list" highlight-current-row border style="width: 100%" @selection-change="selectChange">
        <el-table-column align="center" fixed="left" type="selection" width="55">
        </el-table-column>
        <!--<el-table-column align="center" prop="textTypeDesc" label="文本标题" width="139"></el-table-column>-->
        <el-table-column align="center" prop="subject" label="文本标题" width="250"></el-table-column>
        <el-table-column align="center" prop="distributorGroupName" label="针对团队" width="250">
            <template scope="scope">
                <span v-if="scope.row.distributorGroupName">{{scope.row.distributorGroupName}}</span>
                <span v-else>不限</span>
            </template>            
        </el-table-column>
        <el-table-column align="center" prop="flag" label="发送状态" width="110">
            <template scope="scope">
                <span v-if="scope.row.flag  === 100">已发送</span>
                <span v-if="scope.row.flag  === 0">未发送</span>
                <span v-if="scope.row.flag  === 95">删除</span>
               <!--  <span v-if="scope.row.flag  ===1">已启用</span>
                <span style="color: red" v-if="scope.row.status ===0" class="disable">已禁用</span> -->
            </template>
        </el-table-column>
        <el-table-column align="center" prop="editor" label="修改人" width="110"></el-table-column>
        <el-table-column align="center" prop="editTime" label="修改时间" width="250"></el-table-column>
        <el-table-column align="center" prop="flag"  fixed="right" label="操作" min-width="240">
            <template scope="scope">
                <pg-button-group>
                    <pg-button v-if="scope.row.flag != 100" icon="xiugai" title="修改"  @click="edit(scope.row)"></pg-button>
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