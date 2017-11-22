// 商品管理 - 所有数据操作接口
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
    /**
     * 查询团队列表 
     */
    getBasCustomerGradeList(DistributorGroupID){
        return ajax({
            url: '/Group/GetBasCustomerGradeList?DistributorGroupID='+DistributorGroupID,
            method: 'get'
        })
    },    
    /**
     * 保存模式配置
     */
    updateGroupModelConfig(data){
        return ajax({
            url: '/Group/UpdateGroupModelConfig',
            method: 'post',
            body:data
        })
    },         
	/**
     * 获取移动菜单
     * @param  {Object} query [description]
     * @return {[type]}        [description]
     */
    getMobileMenu (status) {
        return ajax({
            url: '/Account/GetMobileMenu?status='+status,
            method: 'get',
        })
    },
    /**
     * 设置移动端菜单
     * @param  {Object} query [description]
     * @return {[type]}        [description]
     */
    updateMobileMenu (list) {
        return ajax({
            url: '/Account/UpdateMobileMenu',
            method: 'post',
            body: list
        })
    },
     /**
     * 查询文本配置列表
     * @param {*} condition 
     * @param {*} page 
     * @param {*} pageSize 
     */
    queryTextConfigList(condition ,page ,pageSize) {
        return ajax({
            url:'/Text/SelectTextPageList',
            method: 'post',
            body: {
                'condition':condition,
                'page':page,
                'pageSize':pageSize
            }
        })
    },

    /**
     * 保存文本配置
     * @param {*} data 
     */
    saveTextConfig(data) {
        return ajax({
            url: '/Text/SaveBasText',
            method: 'post',
            body: data
        })
    },

    /**
     * 文本配置启用或者禁用
     * @param {*} data 
     */
    setAbleTextConfig(list ,status) {
        return ajax({
            url: '/Text/UpdateTextStatus',
            method: 'post',
            body: {listID:list, status:status}
        })
    },

    /**
     * 获取公司详情
     */
    getCompanyDetail(){
        return ajax({
            url: '/BasResourceConfig/GetCompanyInfo',
            method: 'get',
        })
    },

    /**
     * 获取全部启用文章，给下拉框使用
     */
    getAllText(){
        return ajax({
            url: '/Text/GetTextDefinePagesList',
            method: 'get',
        })
    },

     /**
     * 保存公司详情
     * @param {*} data 
     */
    saveCompanyDetail(data) {
        return ajax({
            url: '/BasResourceConfig/SaveCompanyInfo',
            method: 'post',
            body: data
        })
    },
    /**
     * 获取微信公众号和微信通知消息模版配置信息
     * @param {*} data 
     */
    getWechatSubAndTemplateConfig() {
        return ajax({
            url: '/BasResourceConfig/GetWechatSubAndTemplateConfig',
            method: 'get',
        })
    },
    /**
     * 保存微信公众号和微信通知消息模版配置信息
     * @param {*} data 
     */
    saveWechatSubAndTemplateConfig(condition) {
        return ajax({
            url: '/BasResourceConfig/SaveWechatSubAndTemplateConfig',
            method: 'post',
            body: condition
        })
    },
    /**
     * 保存微信消息模版FirstData，RemarkData
     * @param {*} data 
     */
    saveWechatTemplateFirstAndRemarkData(condition) {
        return ajax({
            url: '/BasResourceConfig/SaveWechatTemplateFirstAndRemarkData',
            method: 'post',
            body: condition
        })
    },
    /**
     * 全局配置分页
     * @param {*} data 
     */
    selectSysGlobalConfigListPage(condition, page, pageSize) {
        return ajax({
            url: '/Account/SelectSysGlobalConfigListPage',
            method: 'post',
            body: {
                condition: condition,
                pageSize: pageSize,
                page: page
            }
        })
    },
    /**
     * 修改全局配置
     * @param {*} data 
     */
    updateSysGlobalConfig(condition) {
        return ajax({
            url: '/Account/UpdateSysGlobalConfig',
            method: 'post',
            body: condition
        })
    },
    /**
     * 查询系统消息公告分页列
     * @param  {[type]} condition [description]
     * @return {[type]}           [description]
     */
    queryMsgOutPageList(condition, page,pageSize) {
        return ajax({
            url: '/Message/SelectMsgOutPageList',
            method: 'post',
            body: {
                'condition':condition,
                'pageSize':pageSize,
                'page':page,
            }
        })
    },
    /*
    /api/{id}查询系统消息公告详情MsgOutID
     */
    queryMsgOutById(data) {
        return ajax({
            url: '/Message/SelectMsgOutById?id=' + data,
            method: 'get',
        })
    },
    /*
    保存系统消息公告
     */
    saveMsgOut(data) {
        return ajax({
            url: '/Message/SaveMsgOut',
            method: 'post',
            body: data
        })
    },
    /*
    `/api发送消息
     */
    sendMsg(data) {
        return ajax({
            url: '/Message/SendMsg',
            method: 'post',
            body: data
        })
    },

}
