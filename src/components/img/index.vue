<template>
    <img :src="this.util.hostUrl() + src">
</template>

<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>