// 业绩管理
import ajax from '../fetch'

export default {
    /**
     * 获取素材标签下拉列表
     * @return {[type]} [description]
     */
    getMaterialTagList() {
        return ajax({
            url: '/Material/GetBasMaterialTagList',
            method: 'get'
        })
    },
    /**
     * 获取素材标签分页列表
     * @param  {[type]} page     [description]
     * @param  {[type]} pageSize [description]
     * @return {[type]}          [description]
     */
    getMaterialTagPageList(page, pageSize, localLoading = 'materialTagPage') {
        return ajax({
            url: '/Material/SelectMaterialTagPageList',
            method: 'post',
            localLoading,
            body: {
                page: page,
                pageSize: pageSize
            }
        })
    },
    /**
     * 保存素材标签
     * @param  {[type]} name [description]
     * @return {[type]}      [description]
     */
    saveMaterialTag(name) {
        return ajax({
            url: '/Material/SaveMaterialTag?name=' + name,
            method: 'get'
        })
    },
    /**
     * 根据ID删除素材库标签
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    delMaterialTag(id) {
        return ajax({
            url: '/Material/DelMaterialTag?id=' + 'abc',
            method: 'get'
        })
    },
    /**
     * 获取素材库分页列表
     * @param  {[type]} page     [description]
     * @param  {[type]} pageSize [description]
     * @param  {[type]} data     [description]
     * @return {[type]}          [description]
     */
    getMaterialStockPageList(page, pageSize, data, localLoading = 'materialStockPage') {
        return ajax({
            url: '/Material/SelectMaterialStockPageList',
            method: 'post',
            localLoading,
            body: {
                page: page,
                pageSize: pageSize,
                condition: data
            }
        })
    },
    /**
     * 批量删除素材库
     * @param  {[type]} ids [description]
     * @return {[type]}     [description]
     */
    delMaterialStock(ids) {
        return ajax({
            url: '/Material/DelMaterialStock',
            method: 'post',
            body: ids
        })
    },
    /**
     * 批量发布素材库
     * @param  {[type]} ids [description]
     * @return {[type]}     [description]
     */
    publishMaterialStock(ids) {
        return ajax({
            url: '/Material/PublishMaterialStock',
            method: 'post',
            body: ids
        })
    },
    /**
     * 查询素材库详情
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    selectMaterialStock(id) {
        return ajax({
            url: '/Material/SelectMaterialStock?id=' + id,
            method: 'get'
        })
    },
    /**
     * 保存素材库
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    saveMaterialStock(data) {
        return ajax({
            url: '/Material/SaveMaterialStock',
            method: 'post',
            body: data
        })
    }
}