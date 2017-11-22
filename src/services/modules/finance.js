// 财务管理 - 所有数据操作接口
import ajax from '../fetch'

export default {
	/**
     * 查询分销账户列表
     */
    queryDistributorAccountList(page, pageSize, condition) {
        return ajax({
            url:'/Finance/SelectDistributorAccountListPage',
            method:'post',
            body:{
                page:page,
                pageSize:pageSize,
                condition:condition
            }
        })
    },
    //调整账户佣金、余额 
    updateAdjustAccount(data){
        return ajax({
            url:'/Finance/AdjustAccount',
            method:'post',
            body:data
        })
    },
    //查询账户流水
    queryAccountBookList(condition, pageSize, page) {
        return ajax({
            url:'/Finance/SelectDistributorAccountBookList',
            body:{
                    condition: condition,
                    pageSize:pageSize,
                    page: page
                },
            method:'post'
        })
    },

    /**
     * 查询佣金报表列表
     */
    queryReportList(page, pageSize, condition) {
        return ajax({
            url:'/Finance/SelectAmountReportPage',
            method:'post',
            body:{
                page:page, 
                pageSize:pageSize, 
                condition:condition
            }
        })
    },
    /**
     * 查询佣金类型
     */
    querySheetType() {
        return ajax({
            url:'/Finance/SelectAmountSheetType',
            method:'get'
        })
    }
}