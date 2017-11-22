<template>
    <div class="editor_field"
        @mousedown.stop="handleEmit('position-change', $event)">
        <div class="field">
            <span 
            @dblclick="handleEmit('set-edit-field', $event)"
            @click.stop="handleEmit('focus-field', $event)"
            @blur="handleEmit('get-content', $event)"
            contenteditable="false">
                {{fieldText}}
            </span>
        </div>
        <div class="remove_field" @click="handleEmit('remove-field', $event)">
            <span class="iconfont icon-icon_guanbianniu"></span>
        </div>
    </div>
</template>

<style type="stylesheet/less" lang="less" scoped>
	@import '~assets/styles/_variables';
    .editor_field {
        position: absolute;
        cursor: move;
        &:hover .remove_field {
            display: block;
        }
        .field {
            height: 100%;
            box-sizing: border-box;
            border: 1px dashed #000;
            span {
                display: block;
                height: 100%;
            }
        }
        .remove_field {
            position: absolute;
            left: -7px;
            top: -7px;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            overflow: hidden;
            color: #fff;
            background: #ff4949;
            cursor: pointer;
            line-height: 1;
            font-size: 0;
            text-align: center;
            display: none;
            span {
                font-size: 14px;
            }
        }
    }
</style>

<script type="text/babel">
	import index from './index'
	export default {
		...index
	}
</script>