<template>
    <el-table :data="list" highlight-current-row border stripe style="width: 100%" @selection-change="selectChange">
        <el-table-column align="center" fixed="left" type="selection" width="55">
        </el-table-column>
        <el-table-column align="center" prop="teamname" label="所属团队" width="300"></el-table-column>
        <el-table-column align="center" prop="name" label="分销客户名称" width="300"></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" min-width="150">
            <template scope="scope">
                <!-- 多个按钮 -->
                <pg-button-group>
                    <pg-button icon="chakan" @click="edit(scope.row)"></pg-button>
                    <pg-button icon="xiugai" @click="edit(scope.row)"></pg-button>
                    <pg-button icon="shezhidengji"></pg-button>
                </pg-button-group>
                <!-- 一个按钮 -->
                <pg-button icon="shezhidengji"></pg-button>
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