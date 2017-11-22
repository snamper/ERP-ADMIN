<template>
    <div v-html="initContent" @input="outputContent" style="height: 400px"></div>
</template>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>