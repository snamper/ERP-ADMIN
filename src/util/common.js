import { uniqBy } from 'lodash'
import Vue from 'vue'
import {rootPath} from '../services/fetch/config'
import cookie from 'js-cookie'

/**
 * 获取当前登录authToken
 */
export const authToken = function() {
    return cookie.get('wxb_erp_authToken') ? cookie.get('wxb_erp_authToken') : ''
}
/**
 * 保存当前登录authToken
 */
export const saveAuthToken = function(authToken) {
    cookie.get('wxb_erp_authToken', authToken)
}
/**
 * 删除当前登录authToken
 */
export const removeAuthToken = function() {
    cookie.remove('wxb_erp_authToken')
}

/**
 * 获取当前服务器域名端口
 */
export const hostUrl = function() {
    return rootPath.substring(0, rootPath.length - 4)
}
/**
 * 检测浏览器是否为windows
 * @returns {boolean}
 */
export const isWindows = function () {
    return /windows|win32/i.test(navigator.userAgent)
}
/**
 * 检测浏览器是否为mac
 * @returns {boolean}
 */
export const isMac = function () {
    return /macintosh|mac os x/i.test(navigator.userAgent)
}

/**
 * 将'key1.key2'形式的字符串分隔成['key1','key2']的数组
 * @param value {string}
 * @returns {array}
 */
export const splitByDot = function (value) {
    if (value) {
        return value.split('.')
    } else {
        return []
    }
}

/**
 * 通过字符串对object多层取值,字符串为'key1.key2'的形式
 * @param obj {object} 目标对象
 * @param keyString {string} 形为'key1.key2'的字符串
 * @returns {*}
 */
export const getValByKey = function (obj, keyString) {
    let result = obj
    const keyArray = splitByDot(keyString)
    const len = keyArray.length
    if (len > 0) {   // 如果key存在,则取对应的值,否则将原对象返回
        keyArray.forEach((key,index) => {
            if (typeof result[key] === 'undefined' || result[key] === null) {
                if (index === len - 1) {
                    result[key] = null
                } else {
                    result[key] = {}
                }
            }
            result = result[key]
        })
    }
    return result
}
/**
 * 通过字符串对object多层设值,字符串为'key1.key2'的形式
 * @param obj {object} 目标对象
 * @param keyString {string} 要设置值的key,形为'key1.key2'的字符串
 * @param val {*} 需要设置的值
 */
export const setValByKey = function (obj, keyString, val) {
    let current = obj
    const keyArray = splitByDot(keyString)
    const len = keyArray.length

    if (len > 0) {
        keyArray.forEach((key,index) => {
            if (len === 1) {   // 如果为单层,则直接设置
                obj[key] = val
            } else {   // 否则在最后一层设置值,以保持对象的引用
                if (index === len - 1) {
                    current[key] = val;
                }
                current = current[key]
            }
        })
    }
}
/**
 * 为对象设置属性
 * @param obj {object} 需要设置的对象
 * @param keyString {string} 形如key.key.key的形式
 */
export const setObjKey = function (obj, keyString) {
    let current = obj
    const keyArray = splitByDot(keyString)
    const len = keyArray.length
    if (len > 0) {
        keyArray.forEach((key,index) => {
            if (typeof current[key] === 'undefined' || current[key] === 'null' || current[key] === null ) {
                if (index === len -1) {
                    Vue.set(current,key,'') // 最后一层将值设为空
                } else {
                    Vue.set(current,key,{})
                }
            }
            current = current[key]
        })
    }
}
/**
 * 将PID ID形式的数组转换为树状JSON格式
 * @param a {Array} 需要转换的数组
 * @param idStr {string}   ID
 * @param pidStr {string} PID
 * @param chindrenStr {string} 子键名
 * @returns {Array} 数组只有一个元素,为树状JSON格式
 */

export const transArrayToJson = function(a, idStr, pidStr, chindrenStr) {
    var r = [],
        hash = {},
        id = idStr,
        pid = pidStr,
        children = chindrenStr,
        i = 0,
        j = 0,
        len = a.length;
    for (; i < len; i++) {
        hash[a[i][id]] = a[i];
    }
    for (; j < len; j++) {
        var aVal = a[j],
            hashVP = hash[aVal[pid]];
        if (hashVP) {
            !hashVP[children] && (hashVP[children] = []);
            hashVP[children].push(aVal);
        } else {
            r.push(aVal);
        }
    }
    return r;
}
/**
 * 从数组中取出对应字段的值,组成新的数组
 * @param array {array} 原始数组
 * @param key {string} 形如'key.key'的字符串
 * @returns {array}
 */
export const arrayMapByKey = function (array, key) {
    return array.map((item) => {
        return getValByKey(item, key)
    })
}

// 导出
export const exportFile = function(url) {
    const method = rootPath.substring(0, rootPath.length - 4) + url

    // 方法一
    // var newTab=window.open('about:blank')
    // newTab.location.href = method

    // 方法二
    console.log(method)
    let $iframe = document.createElement('iframe')
    $iframe.setAttribute('id','download_iframe')
    $iframe.setAttribute('style','display: none')
    $iframe.setAttribute('src','about:blank')
    document.body.appendChild($iframe)

    let iframe_doc = $iframe.contentWindow || $iframe.contentDocument
    let iframe_html
    if (iframe_doc.document) {
        iframe_doc = iframe_doc.document
    }
    iframe_html = "<html><head></head><body>"
    iframe_html = "<script>window.location = '"+ method +"'</script>"
    iframe_html += "</body></html>"
    iframe_doc.open()
    iframe_doc.write(iframe_html)
}

/**
* 设置表格的选中默认值
* @param selected {array} 选中的行
* @param ref {string} ref值 默认为'table'
**/
export const setDefaultRow = function (selected, ref = 'table') {
    this.$nextTick(() => {
        selected.forEach((row) => {
            this.$refs[ref].toggleRowSelection(row,true)
        })
    })
    
}
/**
 * @param stringArray {array} 由多个字符串分隔组成的数组,如['广东','广州','天河','666号']
 * @returns {string} 组成用','分隔的字符串
 */
export const joinString = function (stringArray) {
    return stringArray.filter((item) =>  !!item).join(',') || ''
}
/**
 * 批量获取下拉列表数据,如果下拉列表中没有数据,则获取
 * @param baseLookUp {array} 需要获取的下拉列表,对象数组,包含两个键 data(array,下拉列表的数据数组),method(function,获取下拉列表数据的方法)
 */
export const getBaseLookUpData = function (baseLookUp) {
    baseLookUp.forEach((item) => {
        if (!item.data || item.data.length === 0) {
            item.method()
        }
    })
}
/**
 * 字符串前补全
 * @param str {string} 原始字符串
 * @param len
 * @param fillStr
 * @returns {*}
 */
export const preFill = function (str, len = 2, fillStr = '0') {
    const fillLen = len - String(str).length
    if (fillLen > 0) {
        const fillArray = new Array(fillLen).fill(fillStr)
        fillArray.push(str)
        return fillArray.join('')
    } else {
        return str
    }
}
/**
 * 将后端传过来的时间格式化
 * @param time {string} 后端传过来的时间数据
 * @param isFull {boolean} 如果为true,则取年月日时分秒,否则取年月日
 * @returns {string} 格式化后的时间
 */
export const formatTime = function(time,isFull) {
    if (isFull) {
        const reg = /\.\d{0,3}/
        return time ? time.replace(reg, '').replace(/T/, ' ') : ''
    } else {
        return time ? time.split('T')[0] : ''
    }
}
/**
 * element时间组件格式化
 * @param time
 * @param isFull
 * @returns {*}
 */
export const formatTimeRange = function (time,isFull) {
    if (time) {
        const dateTime = new Date(time)
        const year = preFill(dateTime.getFullYear())
        const month = preFill(dateTime.getMonth() + 1)
        const day = preFill(dateTime.getDate())
        const hours = preFill(dateTime.getHours())
        const minutes = preFill(dateTime.getMinutes())
        const seconds = preFill(dateTime.getSeconds())
        if (isFull) {
            return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
        } else {
            return year + '-' + month + '-' + day
        }

    } else {
        return time
    }
}

// 当前时间
export const currentTime = function(isFull) {
    const dateTime = new Date()
    const year = preFill(dateTime.getFullYear())
    const month = preFill(dateTime.getMonth() + 1)
    const day = preFill(dateTime.getDate())
    const hours = preFill(dateTime.getHours())
    const minutes = preFill(dateTime.getMinutes())
    const seconds = preFill(dateTime.getSeconds())
    if (isFull) {
        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    } else {
        return year + '-' + month + '-' + day
    }
}
/**
 * 将数字转换为设定的小数形式
 * @param number {number} 需要转换的数字
 * @param accuracy {number} 精度,默认为两位
 * @returns {number} 转换后的数字
 * @constructor
 */
export const fixedTo = function (number, accuracy = 2) {
    return number ? new Number(number).toFixed(accuracy) : 0

}
/**
 * 将用分号分隔的字符串分割成数组
 * @param value {string} 用分号分隔的字符串
 */
export const splitBySemi = function (value) {
    let stringValue = value
    if (typeof value === 'number') {
        stringValue = String(value)
    }
    return stringValue ? stringValue.split(';') : []
}

/**
 * 数组对象中,同一个key的值是否一致
 * @param array {array} 数组对象
 * @param key {string} 形如'key.key'的键名
 * @returns {boolean} true表示所有的键都一致,false表示有一不致的键
 */
export const isSameValue = function (array, key) {
    const uniqArray = uniqBy(array,key)
    if (uniqArray.length === 1) {
        return true
    } else {
        return false
    }
}
export const downloadApp = function (url = '/App_File/打印服务.rar') {
    window.open(url)
}
/**
 * 时间formatter,用在表格数据格式化
 * @param row
 * @param column
 * @returns {string}
 */
export const timeFormatter = function (row, column) {
    const key = column.property
    const time = getValByKey(row,key)
    return formatTime(time,true)
}
export const fixedToFormatter = function (row, column) {
    const key = column.property
    const number = getValByKey(row,key)
    return fixedTo(number)
}
/**
 * 获取table的宽度,并保存
 * @param ref {string} 列的ref值
 * @param widthContainer {array} 保存宽度信息的容器
 */
export const getColWidth = function (widthContainer,ref = 'table') {
    const temp = []
    const cols = this.$refs[ref].$el.querySelector('.el-table__header-wrapper .el-table__header').querySelectorAll('colgroup col')
    Array.from(cols).forEach((item,index) => {
        temp[index] = item.width
    })
    this.$nextTick(() => {
        temp.forEach((item,index) => {
            widthContainer[index] = item
        })
    })
}
/**
 * 计算树形所有下级的数量
 * @param treeArray {array} 树形数组
 * @param childKey {string} 存放子级的数组
 */
export const treeCount = function (treeArray, childKey) {
    treeArray.forEach((leaf) => {
        if (leaf[childKey]) {
            treeCount(leaf[childKey],childKey)
        }
        leafCount(leaf,childKey)
    })

}
/**
 * 计算所有子级的数量
 * @param leaf {object} 树形对象
 * @param childKey {string} 存放子级的数组
 */
function leafCount(leaf,childKey) {
    Vue.set(leaf,'count',0)
    nextChildNumber(leaf[childKey])
    function nextChildNumber(childrens) {
        if (childrens) {
            leaf.count += childrens.length
            childrens.forEach((item) => {
                nextChildNumber(item[childKey])
            })
        }
    }
}

/**
 * 判断对象是否有值
 * @param  {object}  e 对象
 */
export const isEmptyObject = function (e) {
    var t
    for (t in e) {
        return !1
    }
    return !0
}