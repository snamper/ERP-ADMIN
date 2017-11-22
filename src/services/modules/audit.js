// 审核管理
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
    **获取分销商注册申请
    */ 
    selectRegisterListPage(data){
        return ajax({
            url: '/DistributorApplyAudit/SelectRegisterListPage',
            method: 'post',
            body:data
        })
    },
    /*
    **获取分销商升级申请
    */
    selectUpgradeListPage(data){
        return ajax({
            url: '/DistributorApplyAudit/SelectUpgradeListPage',
            method: 'post',
            body:data
        })
    },
    /*
    **获取分销商提现申请
    */
    selectWithdrawCashListPage(data){
        return ajax({
            url: '/DistributorApplyAudit/SelectWithdrawCashListPage',
            method: 'post',
            body:data
        })
    },
    /*
    **公司审核注册申请
    */
    companyAuditRegister(data){
        return ajax({
            url: '/DistributorApplyAudit/CompanyAuditRegister',
            method: 'post',
            body:data
        })
    },
    /*
    **公司审核升级申请
    */
    companyAuditUpgrade(data){
        return ajax({
            url: '/DistributorApplyAudit/CompanyAuditUpgrade',
            method: 'post',
            body:data
        })
    },
    /*
    **公司审核提现申请
    */
    companyAuditWithdrawCash(data){
        return ajax({
            url: '/DistributorApplyAudit/CompanyAuditWithdrawCash',
            method: 'post',
            body:data
        })
    },
    /*
    **获取公司审核充值申请
    */
    selectPayApplyListPageForCompany(data){
        return ajax({
            url: '/DistributorApplyAudit/SelectPayApplyListPageForCompany',
            method: 'post',
            body:data
        })
    },
    /*
    **公司审核充值申请 POST /api/
    */
    auditPayApply(data){
        return ajax({
            url: '/DistributorApplyAudit/AuditPayApply',
            method: 'post',
            body:data
        })
    },
}