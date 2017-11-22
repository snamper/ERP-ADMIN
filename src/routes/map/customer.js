// 客户管理

import customer from '../../views/customer/customerlist/customer.vue' // 分销客户列表
import levelprice from '../../views/customer/levelprice/levelprice.vue' // 等级商品价
import team from '../../views/customer/team/team.vue' // 分销团队列表


export default [
    {
        path: '/customer',
        name: 'customer',
        component: customer,
        meta: {
            title: '分销代理列表',
        }
    },
    {
        path: '/levelprice',
        name: 'levelprice',
        component: levelprice,
        meta: {
            title: '等级商品价',
        }
    },
    {
        path: '/team',
        name: 'team',
        component: team,
        meta: {
            title: '分销团队列表',
        }
    },
]