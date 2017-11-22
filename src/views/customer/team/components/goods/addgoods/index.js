import { cloneDeep } from 'lodash'
import PgTable from './components/table/index.vue'
import {goods as ajax} from 'services'

export default {
    components: {
        PgTable
    },
    props: {
        show: Boolean,
        brankList: Array,
    },
    data() {
        return {
            isShowMoreQuery: false, // 搜索区是否显示更多
            //分页参数
            page: 1, // 当前页码
            pageSize: 15, // 每页条数
            total: 10, // 总条数
            // 搜索条件
            selected:[],
            query: {
                    customNo: '',
                    name: '',
                    brandID:'',
                    status:1
                    },
            goodsList: [], //商品列表
            // 操作区按钮
            operations: [
                {
                    name: '增加',
                    action: 'add',
                },
            ],
        
        }
    },
    computed: {
        // 搜索区默认显示
        defaultQuery: {
            get() {
                return [
                    {
                        type: 'input',
                        label: '货号',
                        model: 'customNo'
                    },
                    {
                        type: 'input',
                        label: '名称',
                        model: 'name'
                    },
                    
                ]
            }
        },
        moreQuery: {
            get() {
                return [
                   {
                        type: 'select',
                        label: '品牌',
                        model: 'brandID',
                        text: 'name',
                        value: 'propertyID',
                        options: this.brankList
                    }
                    
                ]
            }
        },

    },
    methods: {
        // 关闭
        close() {
            this.$emit('close')
        },
        // 搜索区显示更多
        toggleOpen(isShow) {
            this.isShowMoreQuery = isShow
        },
        // 搜索按钮
        search() {
            this.page = 1
            this.selectGoodsListPage();
        },
        // 全选
        selectChange(selections) {
            this.selected = selections
            console.log(selections)
        },
        // 分页-当前页数更新触发
        currentChange(current) {
            this.page = current
        },
        // 分页-每页条数更改时触发
        sizeChange(size) {
            this.pageSize = size
        },
        // 添加
        add() {
            this.close()
            this.$emit('addgoods', this.selected)
        },
        // 查询商品列表
        selectGoodsListPage() {
            ajax.selectGoodsListPage(this.query,this.page,this.pageSize).then((result) => {
                this.goodsList = result.dataList
                this.total = result.total
            })
        },
    },
    watch :{
        //监听show重置列表
        show(show) {
            if(show){
                this.selected=[]
                this.goodsList= []
            }
        },
        page(val){
            this.selectGoodsListPage()
        },
        pageSize(val){
            this.selectGoodsListPage()
        }
    }
}