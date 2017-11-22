// 商品管理

import account from '../../views/finance/account/account.vue' // 分销账户
import commissionreport from '../../views/finance/commissionreport/commissionreport.vue' //佣金报表

export default [
    {
        path: '/account',
        name: 'account',
        component: account,
        meta: {
            title: '分销账户',
        }
    },
    {
        path: '/commissionreport',
        name: 'commissionreport',
        component: commissionreport,
        meta: {
            title: '佣金报表',
        }
    }
]