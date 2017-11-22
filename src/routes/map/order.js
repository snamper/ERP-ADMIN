// 订单管理

import order from '../../views/order/order/order.vue' // 订单列表

export default [
	{
		path: '/order',
		name: 'order',
		component: order,
		meta: {
			title: '订单列表'
		}
	},
]