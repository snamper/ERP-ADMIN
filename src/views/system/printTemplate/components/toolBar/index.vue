<template>
    <div class="font-bar">
        <ul class="font-list">
            <!-- 字体大小 -->
            <li class="font-item">
                <el-select
                    v-model="fieldStyle.fontSize"
                    filterable
                    allow-create
                    :disabled="typeof fieldStyle.fontSize === 'undefined'" placeholder="请选择font-size">
                    <el-option v-for="fontSize in fontSizes" :label="fontSize" :value="fontSize"></el-option>
                </el-select>
            </li>
            <!-- 加粗 -->
            <li class="font-item" @click="changeFontWeight" :class="{'active': fieldStyle.fontWeight === 'bold', 'disable': typeof fieldStyle.fontWeight === 'undefined'}">加粗</li>
            <!-- 斜体 -->
            <li class="font-item" @click="changeFontStyle" :class="{'active': fieldStyle.fontStyle === 'italic', 'disable': typeof fieldStyle.fontStyle === 'undefined'}">斜体</li>
            <!-- 左对齐 -->
            <li class="font-item" @click="changeTextAlign('left')" :class="{'active': fieldStyle.textAlign === 'left', 'disable': fieldStyle.textAlign === 'undefined'}">左对齐</li>
            <!-- 居中 -->
            <li class="font-item" @click="changeTextAlign('center')" :class="{'active': fieldStyle.textAlign === 'center', 'disable': fieldStyle.textAlign === 'undefined'}">居中</li>
            <!-- 右对齐 -->
            <li class="font-item" @click="changeTextAlign('right')" :class="{'active': fieldStyle.textAlign === 'right', 'disable': fieldStyle.textAlign === 'undefined'}">右对齐</li>
            <li class="font-item font-item-color">
                <el-color-picker v-model="fieldStyle.color"></el-color-picker>
            </li>
        </ul>
    </div>
</template>

<style type="stylesheet/less" lang="less" scoped>
	@import '~assets/styles/_variables';
    .font-bar {
        box-sizing: border-box;
        width: 100%;
        height: 50px;
    }
    .font-item {
        font-weight: bold;
        display: inline-block;
        color: #fff;
        line-height: 50px;
        margin-right: 14px;
        cursor: pointer;
        .el-select {
            width: 180px;
        }
        &.disable {
            cursor: not-allowed;
        }
        &.active {
            color: #d7b791;
        }
        &.font-item-color {
            vertical-align: middle;
            line-height: normal;
        }
    }
</style>

<script type="text/babel">
	import index from './index'
	export default {
		...index
	}
</script>