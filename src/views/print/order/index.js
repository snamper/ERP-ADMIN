// 订单打印

import { order as ajax } from 'services'

export default {
    data() {
        return {
            id: '',
            detail: {},
            initHtml: ''
        }
    },
    mounted() {
        this.id = this.$route.query.id
        this.getPrintOrderInfo()
    },
    methods: {
        getPrintOrderInfo() {
            ajax.getOrderDetail(this.id).then((result) => {
                console.log(result)
                this.detail = result
            })
        },
        print() {
            window.print()
        }
    }
}