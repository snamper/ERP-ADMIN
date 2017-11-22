<template>
    <div class="pg-button">
        <el-tooltip effect="dark" :content="title" placement="top" v-if="title">
            <button @click="handleClick">
                <i class="iconfont" :class="'icon-icon_' + icon" v-if="icon"></i>
                <span v-if="$slots.default"><slot></slot></span>
            </button>
        </el-tooltip>
        <button @click="handleClick" v-if="!title">
            <i class="iconfont" :class="'icon-icon_' + icon" v-if="icon"></i>
            <span v-if="$slots.default"><slot></slot></span>
        </button>
        <span class="line"></span>
    </div>
</template>
<script>
    export default {
        name : 'PgButton',
        props: {
            icon: {
                type: String,
                default: ''
            },
            title: String
        },
        methods: {
            handleClick(evt) {
                this.$emit('click', evt)
            }
        }
    }
</script>