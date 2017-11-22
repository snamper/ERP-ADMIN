// 订单管理 - 所有数据操作接口
import ajax from '../fetch'

export default {
	/**
     * 获取订单列表
     * @param  {Object} query [description]
     * @return {[type]}        [description]
     */
    selectOrderListPage (query, page, pageSize) {
        return ajax({
            url: '/Order/SelectOrderListPage',
            method: 'post',
            body: {
                condition: query,
                page: page,
                pageSize: pageSize
            }
        })
    },
    /**
     * 获取订单详情
     * @param  {string} id [description]
     * @return {[type]}        [description]
     */
    getOrderDetail (id) {
        return ajax({
            url: '/Order/GetOrderDetail?id='+id,
            method: 'get',
        })
    },
    /**
     * 获取快递公司列表
     * @param  {string} name [description]
     * @return {[type]}        [description]
     */
    selectDeliveryList () {
        return ajax({
            url: '/Order/SelectDeliveryList',
            method: 'get',
        })
    },
    /**
     * 根据订单主键修改快递公司
     * @param  {string} condition [description]
     * @return {[type]}        [description]
     */
    updateOrderDeliver (condition) {
        return ajax({
            url: '/Order/UpdateOrderDeliver',
            method: 'post',
            body: condition
        })
    },
    /**
     * 绑定快递单
     * @param  {string} condition [description]
     * @return {[type]}        [description]
     */
    bindDeliverSheetID (condition) {
        return ajax({
            url: '/Order/BindDeliverSheetID',
            method: 'post',
            body: condition
        })
    },
    /**
     * 确认付款
     * @param  {string} list [description]
     * @return {[type]}        [description]
     */
    confirmPay (list) {
        return ajax({
            url: '/Order/ConfirmPay',
            method: 'post',
            body: list
        })
    },
    /**
     * 取消订单
     * @param  {string} list [description]
     * @return {[type]}        [description]
     */
    cancelOrder (list) {
        return ajax({
            url: '/Order/CancelOrder',
            method: 'post',
            body: list
        })
    },
	/**
     * 转到待扫描
     * @param  {string} list [description]
     * @return {[type]}        [description]
     */
    changeToWaitForScan (list) {
        return ajax({
            url: '/Order/ChangeToWaitForScan',
            method: 'post',
            body: list
        })
    },
    /**
     * 公司发货
     * @param  {string} list [description]
     * @return {[type]}        [description]
     */
    sendGoodsFromMerchant (list) {
        return ajax({
            url: '/Order/SendGoodsFromMerchant',
            method: 'post',
            body: list
        })
    },
    /**
     * 订单详情中修改快递公司
     * @param  {string} condition [description]
     * @return {[type]}        [description]
     */
    updateDeliverSheetID (condition) {
        return ajax({
            url: '/Order/UpdateDeliverSheetID',
            method: 'post',
            body: condition
        })
    },
    /**
     * 获取打印订单信息
     * @param  {[type]} id 订单id
     * @return {[type]}    [description]
     */
    getPrintOrderInfo(id) {
        return ajax({
            url: '/Order/GetPrintOrderInfo?id=' + id,
            method: 'get'
        })
    },
    /*
     * 溯源扫码
     * @param  {string} condition [description]
     * @return {[type]}        [description]
     */
    scan (condition) {
        return ajax({
            url: '/Order/Scan',
            method: 'post',
            body: condition
        })
    },
    /**
     * 溯源扫码-扫码完成之后
     * @param  {string} condition [description]
     * @return {[type]}        [description]
     */
    finishScan (condition) {
        return ajax({
            url: '/Order/FinishScan',
            method: 'post',
            body: condition
        })
    },
    /**
     * 溯源扫码-重新扫码
     * @param  {string} id [description] 
     * @return {[type]}        [description]
     */
    clearScan (id) {
        return ajax({
            url: '/Order/ClearScan?id='+id,
            method: 'get',
        })
    },
    /**
     * 获取所属快递下拉列表 （快递管理）
     * @return {[type]}        [description]
     */
    getBasDeliveryList() {
        return ajax({
            url: '/Delivery/GetBasDeliveryList',
            method: 'get',
        })
    },
    /**
     * 获取快递分页列表 （快递管理）
     *@param  {object} data [description]
     * @return {[type]}   
     */
    getSelectBasMerchantDeliveryPageList(data) {
        return ajax({
            url: '/Delivery/SelectBasMerchantDeliveryPageList',
            method: 'post',
            body:data
        })
    },
    /**
     * 启用/禁用快递 （快递管理）
     *@param   {object} data [description]
     * @return {[type]}
     */
    updateStatus(data) {
        return ajax({
            url: '/Delivery/UpdateMerchantDeliveryStatus',
            method: 'post',
            body:data
        })
    },
    /**
     * 保存档案配置 （快递管理）
     *@param   {object} data [description] 
     * @return {[type]}
     */
    saveMerchantDelivery(data) {
        return ajax({
            url: '/Delivery/SaveMerchantDelivery',
            method: 'post',
            body:data
        })
    },
    /**
     * 获取快递类型下拉列表 （快递管理）
     *@param   {object} data [description]    POST /api/
     * @return {[type]}
     */
    queryDeliveryTypeList() {
        return ajax({
            url: '/Delivery/GetDeliveryTypeList',
            method: 'get',
        })
    },
    /**
     * 保存快递对接（快递管理）
     *@param   {object} data [description]  
     * @return {[type]}
     */
    saveMerchantDeliveryConfig(data) {
        return ajax({
            url: '/Delivery/SaveMerchantDeliveryConfig',
            method: 'post',
            body: data
        })
    },
    /**
     * 获取快递对接（快递管理）
     *@param   {object} data [description]  
     * @return {[type]}
     */
    getMerchantDeliveryConfig(id) {
        return ajax({
            url: '/Delivery/GetMerchantDeliveryConfig?id=' + id,
            method: 'get',
        })
    },
    /**
     * 获取快递单打印数据（打印快递单）
     *@param   {object} data [description] 
     * @return {[type]}
     */
    getDeliverySheetPrintData(data) {
        return ajax({
            url: '/Print/GetDeliverySheetPrintData',
            method: 'post',
            body:data
        })
    },
    /**
     * 获取打印模版（打印订单）
     *@param   {object} data [description] 
     * @return {[type]}
     */
    getPrintTplExpress(data) {
        return ajax({
            url: '/Print/GetPrintTpl',
            method: 'post',
            body:data
        })
    },
    /**
     * 保存绑定唯一码
     *@param   {object} data [description] 
     * @return {[type]}
     */
    saveBindQRcode(data) {
        return ajax({
            url: '/Order/SaveBindQRcode',
            method: 'post',
            body:data
        })
    },
}