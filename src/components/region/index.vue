<!-- <template>
    <div class="region">
        <el-select v-model="stateRegionID" placeholder="省">
            <el-option v-for="state in stateList" :label="state.name" :value="state.regionID"></el-option>
        </el-select>
        <el-select v-model="cityRegionID" placeholder="市">
            <el-option v-for="city in cityList" :label="city.name" :value="city.regionID"></el-option>
        </el-select>
        <el-select v-model="districtRegionID" placeholder="区">
            <el-option v-for="district in districtList" :label="district.name" :value="district.regionID"></el-option>
        </el-select>
    </div>
</template>

<style rel="stylesheet/less" lang="less" scoped>
    @import '~assets/styles/_variables';
    .region {
        .el-select {
            width: 120px;
        }
    }
</style>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script> -->
<template>
    <div class="region">
        <el-select v-model="stateRegionID" placeholder="省">
            <el-option v-for="state in stateList" :label="state.name" :value="state.regionID"></el-option>
        </el-select>
        <el-select v-model="cityRegionID" placeholder="市">
            <el-option v-for="city in cityList" :label="city.name" :value="city.regionID"></el-option>
        </el-select>
        <el-select v-model="districtRegionID" placeholder="区">
            <el-option v-for="district in districtList" :label="district.name" :value="district.regionID"></el-option>
        </el-select>
    </div>
</template>

<style rel="stylesheet/less" lang="less" scoped>
    @import '~assets/styles/_variables';
    .region {
        .el-select {
            width: 120px;
        }
    }
</style>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>