// 客户管理 - 所有数据操作接口
import ajax from '../fetch'

export default {
    /**
     * 保存团队
     */
    saveTeam (data) {
        return ajax({
            url: '/Group/UpdateBasDistributorGroup',
            method: 'post',
            body: data
        })
    },
    /**
     * 查询团队列表
     */
    queryTeamList(page,pageSize,condition){
        return ajax({
            url: '/Group/SelectBasDistributorGroupListPage',
            method: 'post',
            body:{ 
                page: page,
                pageSize: pageSize,
                condition: condition
            }
        })
    },
    /**
     * 启用或者禁用团队
     */
    changeSatus(list, status){
        return ajax({
            url: '/Group/UpdateBasDistributorGroupStatus',
            method: 'post',
            body: {"listID":list,
                    "status": status
                }
        })
    },
    /**
     * 查询团队详情
     */
    queryTeamDetail(distributorGroupID){
        return ajax({
            url: '/Group/SelectBasDistributorGroupaDetail?distributorGroupID='+distributorGroupID,
            method: 'get',
        })
    },
    /**
     * 查询团队级别列表
     */
    queryTeamLevelList(distributorGroupID){
        return ajax({
            url: '/Group/GetBasCustomerGradeList?distributorGroupID='+distributorGroupID,
            method: 'get',
        })
    },
    /**
     * 批量保存团队级别列表
     * DistributorGroupID: 团队id 
     */
    saveTeamLevelList(distributorGroupID, list){
        return ajax({
            url: '/Group/UpdateBasCustomerGrade',
            method: 'post',
            body:  {
                "distributorGroupID": distributorGroupID,
                "listGrade":list
                }
        })
    },

    /**
     * 设置团队的商品
     */
    saveTeamGoods(data) {
        return ajax({
            url: '/GradeGoods/AddBasDistributorGoods',
            method: 'post',
            body:  data
        })
    },

    /**
     * 根据团队ID查询团队商品列表
     */
    queryTeamGoodsList(data){
        return ajax({
            url: '/GradeGoods/SelectBasDistributorGoodsListPage',
            method: 'post',
            body:  data
        })
    },
    /**
     * 移除已经存在团队中的商品
     */
    removeTeamGoods(data) {
        return ajax({
            url: '/GradeGoods/DelBasDistributorGoods',
            method: 'post',
            body:  data
        })
    },


    /**
     * 保存分销客户
     */
    saveCustomer(data){
        return ajax({
            url: '/Customer/UpdateCustomer',
            method: 'post',
            body :data,
        })
    },

    /*
     *查询推荐人的列表
     */
    querySelectIntror(data){
        return ajax({
            url: '/Customer/SelectIntror',
            method: 'post',
            body :data,
        })
    },
    /**
     * 查询客户列表
     */
    queryCustomerList(data){
        return ajax({
            url: '/Customer/SelectListPage',
            method: 'post',
            body :data,
        })
    },

    /**
     * 获取客户详情
     */
    queryCustomerDetail(distributorLinkID){
        return ajax({
            url: '/Customer/GetDistributionAccount?distributorLinkID='+distributorLinkID,
            method: 'get',
        })
    },

    /**
     * 更新分销客户的状态
     */
    saveCustomerStatus(list,status){
        return ajax({
            url: '/Customer/UpdateStatus',
            method: 'post',
            body :{
                    listID:list,
                    status:status
                  },
        })
    },

     /**
     * 延长授权时间
     */
    extendTime(list){
        return ajax({
            url: '/Customer/ExtendAccountExpireDate',
            method: 'post',
            body :list,
                    
        })
    },

   /**
     * 获取直接下级或者递归下级的分销客户
     * DistributorGroupID:团队ID
     * NeedChild:是否需要递归下级（不仅显示下级），仅用于遍历树结构时有效 1:将遍历子节点 0:不遍历
     * parentId 上级Id
     */
    SelectCustomerTree(distributorGroupID, needChild, parentID, customerID){
        return ajax({
            url: '/Customer/SelectCustomerTreeDown',
            method: 'post',
            body :{
                    distributorGroupID:distributorGroupID,
                    needChild:needChild,
                    parentID:parentID,
                    customerID:customerID
                },
                    
        })
    }, 

     /**
     * 获取分销客户的上级分销树
     * DistributorGroupID:团队ID
     * NeedChild:是否需要递归下级（不仅显示下级），仅用于遍历树结构时有效 1:将遍历子节点 0:不遍历
     * parentId 上级Id
     */
    SelectCustomerTreeUp(distributorGroupID, needChild, parentID, customerID)
    {
        return ajax({
            url: '/Customer/SelectCustomerTreeUp',
            method: 'post',
            body :{
                    distributorGroupID:distributorGroupID,
                    needChild:needChild,
                    parentID:parentID,
                    customerID:customerID
                },
                    
        })
    }, 
    /**
     * 获取分销客户的下级分销树
     * id:关系ID
     */
    SelectCustomerTreeDown(id)
    {
        return ajax({
            url: '/Customer/SelectCustomerChildTreeDown?id='+id,
            method: 'get',
                    
        })
    }, 

    /**
     * 搜索直属上下级客户
     */
    treeClickSelectListPageByLinkID(condition, pageSize, page) {
        return ajax({
            url: '/Customer/SelectListPageByLinkID',
            method: 'post',
            body :{
                    condition:condition,
                    pageSize:pageSize,
                    page:page,
                },
                    
        })
    },

    /**
     * 根据客户ID查询详情
     */
    queryCustomerDetailByCustomerId(id) {
        return ajax({
            url: '/Customer/GetCustomerInfo?id='+id,
            method: 'get',
        })
    },

    /**
     * 分销客户升级
     */
    customerLevelUp(DistributorLinkID) {
        return ajax({
            url: '/Customer/UpgradeLevel?id='+DistributorLinkID,
            method: 'get',
        })
    },

    /**
     * 分销客户降级
     */
    customerLevelDown(DistributorLinkID) {
        return ajax({
            url: '/Customer/DowngradeLevel?id='+DistributorLinkID,
            method: 'get',
        })
    },
    /**
     * 查询等级商品价
     */
    selectGradePriceList(condition) {
        return ajax({
            url: '/GradeGoods/SelectGradePriceList',
            method: 'post',
            body: condition
        })
    },
    /**
     * 获取团队等级列表
     */
    getBasCustomerGradeList(id) {
        return ajax({
            url: '/Group/GetBasCustomerGradeList?DistributorGroupID='+id,
            method: 'get',
        })
    },
    /**
     * 保存等级商品价
     */
    saveGradePriceList(query) {
        return ajax({
            url: '/GradeGoods/SaveGradePriceList',
            method: 'post',
            body: query
        })
    },
    /**
     * 获取全部团队-下拉框
     */
    selectBasDistributorGroupAllList() {
        return ajax({
            url: '/Group/SelectBasDistributorGroupAllList',
            method: 'get',
        })
    },

    /**
     * 获取全部启用状态的客户 - 下拉框 
     */
    selectStatusCustomerNameList(CustomerName) {
        return ajax({
            url: '/Customer/SelectStatusCustomerNameList?CustomerName'+CustomerName,
            method: 'get',
        })
    }
}