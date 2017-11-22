// 返点管理 - 所有数据操作接口
import ajax from '../fetch'

export default {
    /**
     * 获取同级推荐返点设置-分页列表
     * @param  {[type]} data [description]
     */
     selectSibIntroConfig(data) {
        return ajax({
            url: '/DistributorRebateConfig/SelectSibIntroConfigListPage',
            method: 'post',
            body: data
        })
    }, 
    /**
     * 获取跨级推荐返点设置-分页列表
     * @param {[type]} query    [description]
     * @param {[type]} page     [description]
     * @param {[type]} pageSize [description]
     */
     selectSkipLevel(condition, page, pageSize) {
        return ajax({
            url: '/DistributorRebateConfig/SelectSkipLevelIntroConfigListPage',
            method: 'post',
            body: {
                condition: condition,
                pageSize: pageSize,
                page: page
            }
        })
    }, 
    /**
        更新（跨级/平级）推荐返点设置-启用状态
     * [UpdateIntroConfigStatus description]
     * @param {[type]} data [description]
     */
     UpdateIntroConfigStatus(data) {
        return ajax({
            url: '/DistributorRebateConfig/UpdateIntroConfigStatus',
            method: 'post',
            body: data
        })
    }, 
    /**
        个人推荐返点设置-启用状态
     * [UpdateIntroConfigStatus description]
     * @param {[type]} data [description]
     */
     updatePersonConfigStatus(data) {
        return ajax({
            url: '/DistributorRebateConfig/UpdatePersonConfigStatus',
            method: 'post',
            body: data
        })
    }, 
    /*
    **个人业绩返点列表 condition  查询条件   
    */
    selectPersonConfig(condition, page, pageSize){
        return ajax({
            url: '/DistributorRebateConfig/SelectPersonConfigListPage',
            method: 'post',
            body: {
                condition: condition,
                page: page,
                pageSize: pageSize
            }
        })
    },
    /**
        个人推荐返点设置详情
     * [id description]
     * @param {[type]} id [description]
     */
     getPersonConfigDetail(id) {
        return ajax({
            url: '/DistributorRebateConfig/GetPersonConfigDetail?id='+id,
            method: 'get',
        })
    }, 
    /**
        保存个人推荐返点设置
     * @param {[type]} query [description]
     */
     savePersonConfig(query) {
        return ajax({
            url: '/DistributorRebateConfig/SavePersonConfig',
            method: 'post',
            body: query
        })
    },
    /**
        保存个人推荐返点设置项
     * @param {[type]} query [description]
     */
     SavePersonConfigItem(query) {
        return ajax({
            url: '/DistributorRebateConfig/SavePersonConfigItem',
            method: 'post',
            body: query
        })
    },
    /**
        删除个人推荐返点设置项
     * @param {[type]} id [description]
     */
     deletePersonConfigItem(id) {
        return ajax({
            url: '/DistributorRebateConfig/DeletePersonConfigItem?id='+id,
            method: 'post',
        })
    },  
    /**
        获取个人推荐返点设置项列表
     * @param {[type]} id [description]
     */
     getPersonConfigItemList(id) {
        return ajax({
            url: '/DistributorRebateConfig/GetPersonConfigItemList?id='+id,
            method: 'get',
        })
    },  
    /*
    **商品返点列表
    */
    selectGoodsConfig(condition, page, pageSize){
        return ajax({
            url: '/DistributorRebateConfig/SelectGoodsConfigListPage',
            method: 'post',
            body: {
                condition: condition,
                pageSize: pageSize,
                page: page
            }
        })
    },    
    /*
    **获取商品返点设置详情
    */
    getGoodsConfigDetail(id){
        return ajax({
            url: '/DistributorRebateConfig/GetGoodsConfigDetail?id='+id,
            method: 'get',
        })
    },    
    /*
    **更新商品返点设置-启用状态
    */
    updateGoodsConfigStatus(condition){
        return ajax({
            url: '/DistributorRebateConfig/UpdateGoodsConfigStatus',
            method: 'post',
            body: condition
        })
    },    
    /*
    **获取商品返点等级列表
    */
    getGoodsRebateLevelList(id){
        return ajax({
            url: '/DistributorRebateConfig/GetGoodsRebateLevelList?id='+id,
            method: 'get',
        })
    },    
    /*
    **保存商品返点设置
    */
    saveGoodsConfig(condition){
        return ajax({
            url: '/DistributorRebateConfig/SaveGoodsConfig',
            method: 'post',
            body: condition
        })
    },    
    /*
    **获取商品返点设置-基础模型
    */
    getGoodsConfigBaseModel(id, gradeId){
        return ajax({
            url: '/DistributorRebateConfig/GetGoodsConfigBaseModel?id='+id+'&gradeId='+gradeId,
            method: 'get',
        })
    },    
    /*
    **获取商品返点设置-商品模型
    */
    getGoodsConfigGoodsModel(id, gradeId){
        return ajax({
            url: '/DistributorRebateConfig/GetGoodsConfigGoodsModel?id='+id+'&gradeId='+gradeId,
            method: 'get',
        })
    },    
    /*
    **保存商品返点设置项
    */
    saveGoodsConfigItem(condition){
        return ajax({
            url: '/DistributorRebateConfig/SaveGoodsConfigItemBaseModel',
            method: 'post',
            body: condition
        })
    },    
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
    **获取（跨级/平级）推荐返点设置详情
     */
    getIntroConfigDetail(id){
        return ajax({
            url: '/DistributorRebateConfig/GetIntroConfigDetail?id='+id,
            method: 'get',
        })
    },
    /**根据团队ID获取该团队等级列表
     * [getBasCustomerGradeList description]
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    getBasCustomerGradeList(distributorGroupID){
        return ajax({
            url: '/Group/GetBasCustomerGradeList?distributorGroupID=' +distributorGroupID,
            method: 'get',
        })
    },
    /*
     * 保存推荐返点设置
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    saveIntroConfig(data) {
        return ajax({
            url: '/DistributorRebateConfig/SaveIntroConfig',
            method: 'post',
            body: data
        })
    },
    //获取推荐返点设置-基础模型
    getIntroConfigBaseModel(id, gradeId){
        return ajax({
            url: '/DistributorRebateConfig/GetIntroConfigBaseModel?id=' +id+'&gradeId='+gradeId,
            method: 'get',
        })
    },
    //获取推荐返点设置-商品模型
    getIntroConfigGoodsModel(id, gradeId){
        return ajax({
            url: '/DistributorRebateConfig/GetIntroConfigGoodsModel?id=' +id+'&gradeId='+gradeId,
            method: 'get',
        })
    },
     //保存推荐返点设置项
    saveIntroConfigItemBaseModel(data){
        return ajax({
            url: '/DistributorRebateConfig/SaveIntroConfigItemBaseModel',
            method: 'post',
            body: data
        })
    },
    /**
     * 查询团队-下拉框
     */
    getTeamList(Page,PageSize,Condition){
        return ajax({
            url: '/Group/SelectBasDistributorGroupAllList',
            method: 'get',
        })
    },
    /**
     * 启用/禁用 condition id数组和状态 [description]
     */
    updateGoodsConfigStatus(condition){
        return ajax({
            url: '/DistributorRebateConfig/UpdateGoodsConfigStatus',
            method: 'post',
            body: condition
        })
    },
    /**
     * 获取跨级推荐返点等级列表 id 推荐返点ID [description]
     */
    getSkipIntroRebate(id){
        return ajax({
            url: '/DistributorRebateConfig/GetSkipIntroRebateLevelList?id='+id,
            method: 'get',
        })
    },
    /*
     * 获取团队业绩返点设置-分页列表
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    selectTeamConfigListPage(condition, page, pageSize) {
        return ajax({
            url: '/DistributorRebateConfig/SelectTeamConfigListPage',
            method: 'post',
            body: {
                condition: condition,
                pageSize: pageSize,
                page: page
            }
        })
    },
    /*
     * 获取团队业绩返点设置详情
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    getTeamConfigDetail(id) {
        return ajax({
            url: '/DistributorRebateConfig/GetTeamConfigDetail?id='+id,
            method: 'get',
        })
    },
    /*
     * 获取团队业绩返点设置详情
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    getTeamConfigDetail(id) {
        return ajax({
            url: '/DistributorRebateConfig/GetTeamConfigDetail?id='+id,
            method: 'get',
        })
    },
    /*
     * 更新团队业绩返点设置-启用状态
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    updateTeamConfigStatus(condition) {
        return ajax({
            url: '/DistributorRebateConfig/UpdateTeamConfigStatus',
            method: 'post',
            body: condition
        })
    },
    /*
     * 保存团队业绩返点设置
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    saveTeamConfig(condition) {
        return ajax({
            url: '/DistributorRebateConfig/SaveTeamConfig',
            method: 'post',
            body: condition
        })
    },
    /*
     * 保存团队业绩返点设置项
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    saveTeamConfigItem(condition) {
        return ajax({
            url: '/DistributorRebateConfig/SaveTeamConfigItem',
            method: 'post',
            body: condition
        })
    },
    /*
     * 获取团队业绩返点设置项列表
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    getTeamConfigItemList(id) {
        return ajax({
            url: '/DistributorRebateConfig/GetTeamConfigItemList?id='+id,
            method: 'get',
        })
    },
    /*
     * 删除团队业绩返点设置项
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    deleteTeamConfigItem(id) {
        return ajax({
            url: '/DistributorRebateConfig/DeleteTeamConfigItem?id='+id,
            method: 'post',
        })
    },
}
