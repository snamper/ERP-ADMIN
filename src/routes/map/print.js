// 打印

const PrintOrder = resolve => require(['views/print/order/index.vue'], resolve) // 订单打印
const PrintExpress = resolve => require(['views/print/express/index.vue'], resolve) // 快递单打印


export default [
    {
        path: '/printOrder',
        name: 'printOrder',
        component: PrintOrder,
        meta: {
            title: '订单打印',
        }
    },
    {
        path: '/printExpress',
        name: 'printExpress',
        component: PrintExpress,
        meta: {
            title: '快递单打印',
        }
    }
]