// ERP后台的首页，仪表盘页面数据操作接口
import ajax from '../fetch'

export default {
    /**
     * 获取待处理事项统计
     * @return {[type]} [description]
     */
	getPendingItemCount() {
        return ajax({
            url: '/Count/GetPendingItemCount',
            method: 'get'
        })
    }
}