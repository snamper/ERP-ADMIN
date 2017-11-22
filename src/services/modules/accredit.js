// 授权 - 所有数据操作接口
import ajax from '../fetch'

export default {
	/**
     * 获取全部团队-下拉框
     */
    selectBasDistributorGroupAllList() {
        return ajax({
            url: '/Group/SelectBasDistributorGroupAllList',
            method: 'get',
        })
    },

    //获取授权列表
    queryAccreditList(page, pageSize, query) {
        return ajax({
            url:"/BasAuthorizationBook/SelectListPage",
            method:"post",
            body:{
                page:page,
                pageSize:pageSize,
                condition :query,
            }

        })
    },

    //保存新增授权
    saveNewAccredit(data) {
        return ajax({
            url:"/BasAuthorizationBook/Update",
            method:"post",
            body:data

        })
    },

    //更新授权状态
    updateAccreditStatus(list, status) {
        return ajax({
            url:"/BasAuthorizationBook/UpdateStatus",
            method:"post",
            body:{
                listID: list,
                status: status
            }

        })
    },

     //获取全部已经启用的授权样式列表
    queryEnableAccreditStyleList() {
        return ajax({
            url:"/BasAuthorizationCertificate/GetAllBasAuthorizationCertificate",
            method:"get",

        })
    },
    //查询授权样式列表
    queryAccreditStyleList(page, pageSize, query) {
        return ajax({
            url:"/BasAuthorizationCertificate/SelectListPage",
            method:"post",
            body:{
                page:page,
                pageSize:pageSize,
                condition :query,
            }

        })
    },

    //保存授权样式
    saveAccreditStyle(data) {
        return ajax({
            url:"/BasAuthorizationCertificate/Update",
            method:"post",
            body:data
        })
    },
    //更新授权样式的状态
    updataAccreditStyleStatus(data){
        return ajax({
            url:"/BasAuthorizationCertificate/UpdateStatus",
            method:"post",
            body:data
        })
    }

}