import * as types from '../mutationTypes'

export default {
	/** 
	 * 设置菜单的操作记录
	 */
	setMenusRecord: ({commit}, menu) => {
		commit(types.SYS_MENUSHANDLERECORD_BY_SET, menu)
	},
	/** 
	 * 删除菜单的操作记录
	 */
	delMenusRecord: ({commit}, path) => {
		commit(types.SYS_MENUSHANDLERECORD_BY_DEL, path)
	},
	/** 
	 * 删除所有菜单的操作记录
	 */
	delAllMenusRecord: ({commit}) => {
		commit(types.SYS_MENUSHANDLERECORD_BY_DELALL)
	},
	/**
	 * 保存登录者信息
	 */
	setAccount: ({ commit }, data) => {
		commit(types.SET_ACCOUNT, data)
	},
	/**
	 * 设置商家图片资源
	 */
	setSysImages: ({ commit }, imgs) => {
		commit(types.SYS_IMAGES_BY_SET, imgs)
	},
	/**
	 * 删除商品图片资源
	 */
	delSysImages: ({ commit }) => {
		commit(types.SYS_IMAGES_BY_DEL)
	}
}