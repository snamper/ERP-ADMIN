<template>
    <div>
        <div class="print-buttons">
            <el-button @click="print" type="primary">打印</el-button>
        </div>
        <div class="printMain" :style="pattern.paper.style" v-for="(delivery,index) in deliveryLists" :class="{'page-next': index < deliveryLists.length -1 }">

            <img class="printMain-background-img" :src="pattern.paper.style.imgUrl" alt="">
            <div class="print-fields" v-for="editField in pattern.editField">
                <div class="formHead" :style="editField.style">
                    <div class="formHeadField" v-if="!formHeadField.isBarcode" :style="formHeadField.style" v-for="formHeadField in editField.fields">{{formHeadField.content}}</div>
                    <div class="formHeadField barcodeField" v-if="formHeadField.isBarcode" :style="{left: formHeadField.style.left,top:formHeadField.style.top}" v-for="formHeadField in editField.fields">{{formHeadField.content}}</div>
                    <img class="formHeadField" :src="img.url" alt="" :style="img.style" v-for="img in editField.customImg">
                </div>
            </div>
        </div>
    </div>
</template>
<style rel="stylesheet/less" lang="less" scoped>
    @import '~assets/styles/_variables';

    .page-next {
        page-break-after: always;
    }
    @media print {
        .noprint {
            display:none;
        }
    }
    .printMain {
        position: relative;
        margin: 0 auto;
        .printMain-background-img {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 1;
        }
        .print-fields {
            z-index: 2;
        }
        .formHead {
            position: relative;
            .formHeadField {
                position: absolute;
                &.barcodeField {
                    overflow: inherit!important;
                }
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