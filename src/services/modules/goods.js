// 商品管理 - 所有数据操作接口
import ajax from '../fetch'

export default {
	/**
     * 获取品牌列表
     * @param  {Object} query [description]
     * @return {[type]}        [description]
     */
    selectListPage (query, page, pageSize) {
        return ajax({
            url: '/Brand/SelectListPage',
            method: 'post',
            body: {
                condition: query,
                page: page,
                pageSize: pageSize
            }
        })
    },
    /**
     * 获取品牌详情
     * @param  {Object} query [description]
     * @return {[type]}        [description]
     */
    selectBasProperty (id) {
        return ajax({
            url: '/Brand/SelectBasProperty?PropertyID='+id,
            method: 'post',
        })
    },
    /**
     * 获取品牌-下拉框
     * @param  {Object} query [description]
     * @return {[type]}        [description]
     */
    getAllBrand (query, page, pageSize) {
        return ajax({
            url: '/Brand/GetAllBrand',
            method: 'get',
        })
    },
    /**
     * 新增/编辑品牌
     * @param  {Object} query [description]
     * @return {[type]}        [description]
     */
    update (query) {
        return ajax({
            url: '/Brand/Update',
            method: 'post',
            body: query
        })
    },
    /**
     * 启用/禁用品牌
     * @param  {Object} query [description]
     * @return {[type]}        [description]
     */
    updateStatus (query) {
        return ajax({
            url: '/Brand/UpdateStatus',
            method: 'post',
            body: query
        })
    },
    /**
     * 查询商品列表
     * @param  {Object} query [description]
     * @return {[type]}        [description]
     */
    selectGoodsListPage (query,page,pageSize) {
        return ajax({
            url: '/Goods/SelectGoodsListPage',
            method: 'post',
            body: {
            	condition: query,
            	pageSize: pageSize,
            	page: page
            }
        })
    },
    /**
     * 查询商品详情
     * @param  {Object} query [description]
     * @return {[type]}        [description]
     */
    selectBasGoodsDetail (goodID) {
        return ajax({
            url: '/Goods/SelectBasGoodsDetail?id='+goodID,
            method: 'get',
        })
    },
    /**
     * 新增/修改商品
     * @param  {Object} query [description]
     * @return {[type]}        [description]
     */
    saveBasGoods (query) {
        return ajax({
            url: '/Goods/SaveBasGoods',
            method: 'post',
            body: query
        })
    },
    /**
     * 启用/禁用商品
     * @param  {Object} query [description]
     * @return {[type]}        [description]
     */
    updateBasGoodsStatus (query) {
        return ajax({
            url: '/Goods/UpdateBasGoodsStatus',
            method: 'post',
            body: query
        })
    },
    /**
     * 查询商品sku
     * @param  {Object} query [description]
     * @return {[type]}        [description]
     */
    selectBarcodesByGoodsID (goodID) {
        return ajax({
            url: '/Goods/SelectBarcodesByGoodsID?id='+goodID,
            method: 'get',
        })
    },
    /**
     * 新增/修改sku
     * @param  {Object} query [description]
     * @return {[type]}        [description]
     */
    saveBasBarcode (query) {
        return ajax({
            url: '/Goods/SaveBasBarcode',
            method: 'post',
            body: query
        })
    },
    /**
     * 获取商品sku详情
     * @param  {Object} query [description]
     * @return {[type]}        [description]
     */
    selectBarcodeDetail (barcodeID) {
        return ajax({
            url: '/Goods/SelectBarcodeDetail?id='+barcodeID,
            method: 'get',
        })
    },
    /**
     * sku库存调整
     * @param  {Object} query [description]
     * @return {[type]}        [description]
     */
    skuStockAdjust (query) {
        return ajax({
            url: '/Goods/SkuStockAdjust',
            method: 'post',
            body: query
        })
    },
    /**
     * 启用/禁用SKU
     * @param  {Object} query [description]
     * @return {[type]}        [description]
     */
    updateBasBarCodeStatus (query) {
        return ajax({
            url: '/Goods/UpdateBasBarCodeStatus',
            method: 'post',
            body: query
        })
    },
    /**
     * 获取全部颜色
     * @return {[type]}        [description]
     */
    getAllColors () {
        return ajax({
            url: '/Goods/GetAllColors',
            method: 'get',
        })
    },
    /**
     * 获取全部码寸
     * @return {[type]}        [description]
     */
    getAllSizes () {
        return ajax({
            url: '/Goods/GetAllSizes',
            method: 'get',
        })
    },
    /**
     * 获取全部小包装sku
     * @return {[type]}        [description]
     */
    getAllBarcodes () {
        return ajax({
            url: '/Goods/GetAllBarcodes',
            method: 'get',
        })
    },
    /**
     * 查询二维码分页列表 condition [description]
     * @return {[type]}        [description]
     */
    selectQRCodeListPage (condition, page, pageSize) {
        return ajax({
            url: '/QRCode/SelectQRCodeListPage',
            method: 'post',
            body: {
                condition: condition,
                pageSize: pageSize,
                page: page
            }
        })
    },
    /**
     * 启用/禁用二维码 query [description]
     * @return {[type]}        [description]
     */
    updateQRCodeStaus (query) {
        return ajax({
            url: '/QRCode/UpdateQRCodeStatus',
            method: 'post',
            body: query
        })
    },
    /**
     * 二维码查询记录 id [description]
     * @return {[type]}        [description]
     */
    getQRCodeRecords (id) {
        return ajax({
            url: '/QRCode/GetQRCodeRecords?id='+id,
            method: 'get',
        })
    },
    /**
     * 清除二维码记录 id [description]
     * @return {[type]}        [description]
     */
    delQRCodeRecords (ids) {
        return ajax({
            url: '/QRCode/DelQRCodeRecords',
            method: 'post',
            body: ids
        })
    },
}