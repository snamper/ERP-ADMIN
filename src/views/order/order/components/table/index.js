export default {
    props: {
        list: Array,
        type: Number
    },
    data() {
        return {
            goodList: [
                {
                    createTime: '2017-05-24 17:12:32',
                    note: 'test',
                    bainhao: '113456123414464',
                    brand: '高端A货高端A货高端A货高端A货'
                },
                {
                    createTime: '2017-05-24 17:12:32',
                    note: 'test前端测试test前端测试test前端测试test前端测试test前端测试test前端测试',
                    bainhao: '113456',
                    brand: '高端A货高端A货高端A货高端A货'
                }
            ],
            skuList: [
                {
                   bainhao: '113456123414464', 
                   attr: '白,箱',
                   status: '已启用',
                   stQ: 122
                },
                {
                   bainhao: '113456123414464', 
                   attr: '白,箱',
                   status: '已启用',
                   stQ: 126
                }
            ]
        }
    },
    methods: {
        // 编辑商品
        edit(item) {
            this.$emit('edit', item)
        },
        // 新增sku
        addSku(item) {
            this.$emit('addSku', item)
        },
        // 编辑sku
        scan(item) {
            this.$emit('scan', item)
        },
        // 全选
        selectChange(val) {
            this.$emit('select-change', val)
        },
        // 禁用sku
        disable(item) {
            console.log('禁用sku')
        },
        // 启用sku
        able(item) {
            console.log('启用sku')
        }
    }
}