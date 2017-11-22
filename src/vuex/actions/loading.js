import * as types from '../mutationTypes.js'

export default {
    /**
     * 全屏显示加载动画
     * @param  {[type]}  options.commit    [description]
     * @param  {Boolean} isShowFillLoading [description]
     * @return {[type]}                    [description]
     */
    showFullLoading: ({ commit }, isShowFillLoading) => {
        commit(types.SHOW_FULL_LOADING, isShowFillLoading)
    },
    /**
     * 局部显示加载动画
     * @param  {[type]} options.commit [description]
     * @param  {[type]} localLoading   [description]
     * @return {[type]}                [description]
     */
    showLocalLoading: ({ commit }, localLoading) => {
        commit(types.SHOW_LOCAL_LOADING, localLoading)
    }
}