<template>
    <el-table :data="list" highlight-current-row border stripe style="width: 100%" @selection-change="selectChange">
        <el-table-column align="center" fixed="left" type="selection" width="55">
        </el-table-column>
        <el-table-column align="center" prop="groupName" label="所属团队" min-width="200"></el-table-column>
        <el-table-column align="center" prop="customerName" label="分销客户名称" min-width="200"></el-table-column>
        <el-table-column align="center" prop="weChat" label="微信号" min-width="182"></el-table-column>
        <el-table-column align="center" prop="introducer" label="推荐人" width="130"></el-table-column>
        <el-table-column align="center" prop="gradeName" label="分销等级" width="140"></el-table-column>
        <el-table-column align="center" prop="times" label="到期时间/(天)" width="80">
        </el-table-column>
        <el-table-column align="center" prop="" label="状态" width="80">
            <template scope="scope">
                <span v-if="scope.row.status ===-1">不限</span>
                <span v-if="scope.row.status ===1">已启用</span>
                <span style="color: red" v-if="scope.row.status ===0" class="disable">已禁用</span>
            </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" min-width="240">
            <template scope="scope">
                <!-- 操作按钮 -->
                <pg-button-group>
                    <pg-button icon="chakan1" title="查看" @click="detail(scope.row)"></pg-button>
                    <pg-button icon="xiugai" title="修改" @click="edit(scope.row)"></pg-button>
                    <pg-button icon="shangjifenxiaoshu1" title="上级分销树" @click="level(scope.row,1)"></pg-button>
                    <pg-button icon="xiajifenxiaoshu1" title="下级分销树" @click="level(scope.row,2)"></pg-button>
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