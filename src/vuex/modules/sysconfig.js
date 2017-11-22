// 全局系统配置相关
import * as types from '../mutationTypes'

const state = {
	// 菜单按钮的操作记录
	menusHancleRecord:[],
	// 当前商家的图片资源
	images: [],
    accountInfo: {}
}

const mutations = {
	/**
	 * 设置菜单的操作记录
	 */
	[types.SYS_MENUSHANDLERECORD_BY_SET] (state, menu) {
		// 循环判断
		let isExists = false
		state.menusHancleRecord.forEach((element, index) => {
			if (element.path === menu.path) {
				isExists = true
			}
		})

		if (!isExists) {
			state.menusHancleRecord.push(menu)
			// 如果超出10个移除第一个
			if (state.menusHancleRecord.length > 5) {
				state.menusHancleRecord.splice(0,1)
			}
		}
	},
	/**
	 * 删除指定的操作记录
	 */
	[types.SYS_MENUSHANDLERECORD_BY_DEL] (state, path) {
		state.menusHancleRecord.forEach((element, index) => {
			if (element.path === path) {
				state.menusHancleRecord.splice(index,1)
			}
		})
	},
	/**
	 * 删除所有的操作记录
	 */
    [types.SYS_MENUSHANDLERECORD_BY_DELALL] (state) {
    	state.menusHancleRecord =[]
    },
    /**
     * 登录者信息
     */
    [types.SET_ACCOUNT] (state, data) {
        state.accountInfo = data
    },
    /**
     * 设置当前商家的图片资源
     */
    [types.SYS_IMAGES_BY_SET] (state, imgs) {
    	state.images = imgs
    },
    /**
     * 清除当前商家的图片资源
     */
    [types.SYS_IMAGES_BY_DEL] (state) {
    	state.images = []
    }
} 

export default{
    state,
    mutations
}