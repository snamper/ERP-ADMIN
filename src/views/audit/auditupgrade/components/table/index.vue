<template>
    <el-table :data="list" highlight-current-row border style="width: 100%">
        <el-table-column align="center" prop="name" label="客户姓名" min-width="150"></el-table-column>
        <el-table-column align="center" prop="groupName" label="申请团队" min-width="200"></el-table-column>
        <el-table-column align="center" prop="oldGradeName" label="原来等级" min-width="150"></el-table-column>
        <el-table-column align="center" prop="gradeName" label="申请等级" width="150"></el-table-column>
        <el-table-column align="center" prop="applyTime" label="申请时间" min-width="150"></el-table-column>
        <el-table-column align="center" prop="oldParentName" label="原上级" width="150"></el-table-column>
        <el-table-column align="center" prop="parentName" label="新上级" width="150"></el-table-column>
        <el-table-column align="center" prop="wechat" label="微信号" width="150"></el-table-column>
        <el-table-column align="center" prop="mobile" label="手机号" width="150"></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="150">
            <template scope="scope">
                <pg-button-group>
                    <pg-button v-if="scope.row.flag === 1" icon="tongyi" title="同意"  @click="enable(scope.row)"></pg-button>
                    <pg-button v-if="scope.row.flag === 1" icon="jujue" title="拒绝"   @click="disable(scope.row)"></pg-button>
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