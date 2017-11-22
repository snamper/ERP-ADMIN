<template>
    <el-table :data="list" v-loading="localLoading === 'materialTagPage'" element-loading-text="拼命加载中" highlight-current-row border stripe style="width: 100%">
        <el-table-column align="center" prop="name" label="标签名称" min-width="300"></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="150">
            <template scope="scope">
                <!-- 多个按钮 -->
                <pg-button-group>
                    <pg-button icon="quxiao" title="删除" @click="del(scope.row)"></pg-button>
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