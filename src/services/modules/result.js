// 业绩管理
import ajax from '../fetch'

export default {
    /**
     * 查询团队列表
     */
    queryTeamList(Page,PageSize,Condition){
        return ajax({
            url: '/Group/SelectBasDistributorGroupListPage',
            method: 'post',
            body:{ Page:Page,
                PageSize:PageSize,
                Condition:Condition
                }
        })
    }, 
    /*
    **获取分销商业绩统计列表
    */
    selectPerformanceStatisticslistPage(data){
        return ajax({
            url: '/DistributorPerformance/SelectPerformanceStatisticslistPage',
            method: 'post',
            body:data
        })
    },
}