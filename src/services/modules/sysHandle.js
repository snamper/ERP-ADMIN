// 系统级别的所有数据操作接口
/*
 * 1、登录
 * 2、获取系统级别类的，比如logo，菜单等
 */
import ajax from '../fetch'
import { rootPath } from '../fetch/config'

export default {
    /**
     * 登录获取token
     * @param  {object} data 登录信息
     * @return {[type]}      [description]
     */
	login(data) {
        return ajax({
            url: '/token',
            formJson: false,
            method: 'post',
            body: data,
            headersData: { 'Content-Type': 'application/x-www-form-urlencoded' },
            path: rootPath.substring(0, rootPath.length - 4)
        })
    },
    /**
     * 获取功能菜单
     * @return {[type]} [返回菜单集合]
     */
    getMenus(auth = true) {
        return ajax({
            url: '/Account/GetMenuByLoginID',
            auth,
            method: 'get'
        })
    },
    /**
     * 获取当前商家的图片资源
     * @return {[type]} [返回商家的图片配置信息]
     * 图片类型
     * 1：系统LOGO、
     * 2：代理头部、
     * 3：微信关注、
     * 4：防伪查询、
     * 5：广告位、
     * 6-11：宣传图、
     * 12-16：微商城宣传图、
     * 17-19：微商城排行榜、
     * 20-22：微商城促销、
     * 23：微商城专栏 
     * 24：ERP登录页Logo
     */
    getSysImgs() {
        return ajax({
            url: '/Account/GetBasResourceConfig',
            method: 'get'
        })
    },
    /**
     * 获取登陆者信息
     * @param  {Boolean} auth 是否需要登录
     * @return {[type]}       [description]
     */
    getAccount(auth = true) {
        return ajax({
            url: '/Account/getAccount',
            auth,
            method: 'get'
        })
    }
}