// 基础数据
import ajax from '../fetch'

export default {
    /**
     * 获取打印业务类型
     * @return {[type]} [description]
     */
    getBusinessType() {
        return ajax({
            url: '/Print/GetBusinessType',
            method: 'get'
        })
    },
    /**
     * 获取打印常量字段
     * @param  {[type]} printType [description]
     * @return {[type]}           [description]
     */
    getPrintFields(printType) {
        return ajax({
            url: '/Print/GetPrintFields?type=' + printType,
            method: 'get'
        })
    },
    /**
     * 获取打印模板
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    getPrintTpl(data) {
        return ajax({
            url: '/Print/GetPrintTpl',
            method: 'post',
            body: data
        })
    },
    /**
     * 保存打印模板
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    savePrintTpl(data) {
        return ajax({
            url: '/Print/SavePrintTemplate',
            method: 'post',
            body: data
        })
    }
}