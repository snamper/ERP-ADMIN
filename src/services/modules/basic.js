// 基础数据
import ajax from '../fetch'

export default {
    /**
     * 省市区
     * @param  {object} data [description]
     * @return {[type]}      [description]
     */
    selectRegionList(data) {
        return ajax({
            url: '/Basic/SelectRegionList',
            method: 'post',
            body: data
        })
    },
     /**
     * 查询团队详情
     */
    queryCompanyInfo(){
        return ajax({
            url: '/BasResourceConfig/GetCompanyInfoByDomain',
            method: 'get',
        })
    },
}