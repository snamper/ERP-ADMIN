// 商品管理

import brand from '../../views/goods/brand/brand.vue' // 品牌列表
import goods from  '../../views/goods/goods/goods.vue' // 商品列表
import sku from '../../views/goods/sku/sku.vue' // SKU列表
import qrcode from '../../views/goods/qrcode/qrcode.vue' // 二维码管理

export default [
    {
        path: '/brand',
        name: 'brand',
        component: brand,
        meta: {
            title: '品牌列表',
        }
    },
    {
        path: '/goods',
        name: 'goods',
        component: goods,
        meta: {
            title: '商品列表',
        }
    },
    {
        path: '/sku',
        name: 'sku',
        component: sku,
        meta: {
            title: 'SKU列表',
        }
    },
    {
        path: '/qrcode',
        name: 'qrcode',
        component: qrcode,
        meta: {
            title: '二维码管理',
        }
    },
]