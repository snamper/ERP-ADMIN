import { cloneDeep } from 'lodash'
export default {
    props: {
        title: String,
        show: Boolean,
        editForm: Object
    },
    data() {
        return {
            goodList: [],//订单中的商品列表
        }
    },
    watch: {
        editForm(editForm) {
            // 获取订单中的商品列表
            this.goodList = this.editForm.listOrderItemList
        }
    },
    methods: {
        // 返回
        close() {
            this.$emit('close')
        },
    }
}