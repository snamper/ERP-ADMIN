// 商品管理

import peersrebates from '../../views/rebates/peersrebates/peersrebates.vue' //平级返点
import skiprebates from '../../views/rebates/skiprebates/skiprebates.vue' // 跨级返点
import myrebates from '../../views/rebates/myrebates/myrebates.vue' // 个人业绩返点
import goodsrebates from '../../views/rebates/goodsrebates/goodsrebates.vue' // 商品返点
import grouprebates from '../../views/rebates/grouprebates/grouprebates.vue' // 团队返点

export default [
    {
        path: '/peersrebates',
        name: 'peersrebates',
        component: peersrebates,
        meta: {
            title: '平级返点',
        }
    },
    {
        path: '/skiprebates',
        name: 'skiprebates',
        component: skiprebates,
        meta: {
            title: '跨级返点',
        }
    },
    {
        path: '/myrebates',
        name: 'myrebates',
        component: myrebates,
        meta: {
            title: '个人业绩返点',
        }
    },
    {
        path: '/goodsrebates',
        name: 'goodsrebates',
        component: goodsrebates,
        meta: {
            title: '商品返点',
        }
    },
    {
        path: '/grouprebates',
        name: 'grouprebates',
        component: grouprebates,
        meta: {
            title: '团队返点',
        }
    },
]