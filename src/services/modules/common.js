// 公共接口 - 所有数据操作接口
import ajax from '../fetch'

export default {
    /**
     * 获取导入模块文件
     * @param  {[type]} importType [description]
     * @return {[type]}            [description]
     */
	getImportTemplateFile(importType, auth = false) {
        return ajax({
            url: '/Common/GetImportTemplateFile?type=' + importType,
            method: 'get',
            auth
        })
    },
    /**
     * 导出Excel报表
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    exportExcel(data) {
        return ajax({
            url: '/Common/Export',
            method: 'post',
            body: data
        })
    }
}