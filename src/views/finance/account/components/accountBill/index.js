import { cloneDeep } from 'lodash'
import PgTable from './components/table/index.vue'
import {finance as ajax} from 'services'

export default {
    components: {
        PgTable
    },
    props: {
        show: Boolean,
        brankList: Array,
        editForm:Object,
    },
    data() {
        return {
            isShowMoreQuery: false, // 搜索区是否显示更多
            //分页参数
            page: 1, // 当前页码
            pageSize: 15, // 每页条数
            total: 10, // 总条数
            
            flag:'1',
            detailList: [], //流水列表
            accountBookList:[],//余额流水
            amountBookList:[],//佣金流水
            // 操作区按钮
            operations: [
                {
                    name: '余额',
                    action: 'account',
                    type: 'primary'
                },
                {
                    name: '佣金',
                    action: 'amount',
                    type: ''
                },
            ],
        
        }
    },
    methods: {
        // 关闭
        close() {
            this.$emit('close')
        },
        // 分页-当前页数更新触发
        currentChange(current) {
            this.page = current
        },
        // 分页-每页条数更改时触发
        sizeChange(size) {
            this.pageSize = size
        },
        // 余额
        account() {
            this.operations[0].type = 'primary'
            this.operations[1].type = ''
            this.detailList = this.accountBookList
            this.flag = 1
            this.getAccountBookList()
            // this.close()
            // this.$emit('addgoods', this.selected)
        },
        // 佣金
        amount() {
            this.operations[1].type = 'primary'
            this.operations[0].type = ''
            this.flag = 2
            this.getAccountBookList()
            // this.close()
            // this.$emit('addgoods', this.selected)
        },
        getAccountBookList() {
            let param = {
                distributorLinkID: this.editForm.distributorLinkID,
                flag: this.flag
            }
            ajax.queryAccountBookList(param,this.pageSize,this.page)
                .then((result)=>{
                    this.total = result.total
                    this.detailList = result.dataList
                    this.accountBookList = result.accountBookList
                    this.amountBookList = result.amountBookList
                })
        }
    },
    watch :{
        show(){
            if(this.show){
                this.getAccountBookList()
            }
        },
        page(val){
            this.getAccountBookList()
        },
        pageSize(val){
            this.getAccountBookList()
        }
    }
}