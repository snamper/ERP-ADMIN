import ajax from './fetch';

/**
 * Ajax请求接口定义
 * @param {String} options.method 请求方法，默认为get。
 * @param {String} options.url 请求相对路径
 * @param {Object} options.header 设置请求头
 * @param {Object} options.body 请求参数
 * @param {string} options.path 根路径
 * @param {boolean} options.isShowFullLoading 是否显示全屏加载动画
 * @param {boolean} options.localLoading 是否显示局部加载动画
 * @param {boolean} options.isShowError 是否自动显示错误信息
 * @return {Promise}
 */

export default ajax;
