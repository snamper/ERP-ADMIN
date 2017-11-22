// 快递单打印

import { order as ajax } from 'services'

export default {
    data() {
        return {
            id: '',
            detail: {},
            initHtml: '',
            pattern: {},//模版数据
            deliveryLists: [],//打印数据
        }
    },
    mounted() {
        this.id = JSON.parse(this.$route.query.id)  //JSON.parse(localStorage.printDeliveryList)
        //this.id = this.$route.query.id
        console.log(this.id)
        this.getPrintExpress() //获取快递打印模版
        this.getPrintOrderInfo() //获取快递打印数据
    },
    methods: {
        //获取快递打印模版
        getPrintExpress(){
            ajax.getPrintTplExpress({
                flag: 1,
                printTemplateType: {
                    businessType: 3,
                    merchantDeliveryId: this.$route.query.merchantDeliveryId,
                    shopId: "",
                    payMode: 4
                },
            }).then((result)=>{

                console.log(JSON.parse(result.replace(/\\/ig,'')))
                //this.pattern = JSON.parse(result.replace(/\\/ig,''))
                if(result) {
                    this.pattern = JSON.parse(result.replace(/\\/ig,''))
                }

                console.log(this.pattern)
            }).catch((error) => {
                this.$message.error(error)
            })
        },
        //获取快递打印数据
        getPrintOrderInfo() {
            ajax.getDeliverySheetPrintData({
                sheet:this.id
            }).then((result) => {
                console.log(result)
                this.deliveryLists = result
            })
        },
        print() {
            window.print()
        }
    }
}