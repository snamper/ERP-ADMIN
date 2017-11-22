import * as types from '../mutationTypes'

const state = {
    isShowFullLoading: false,
    localLoading: ''
}

const mutations = {
    [types.SHOW_FULL_LOADING] (state, isShowFullLoading) {
        state.isShowFullLoading = isShowFullLoading
    },
    [types.SHOW_LOCAL_LOADING] (state, localLoading) {
        state.localLoading = localLoading
    }
}

export default{
    state,
    mutations
}