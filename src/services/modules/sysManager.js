// 系统设置 - 所有接口
import ajax from '../fetch'

export default{
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
    }
}
