// 基础数据
import * as types from '../mutationTypes'

const state = {
    stateList: [], // 省
    teamList: [], // 团队列表
    tagList: [], // 分类标签
    companyInfo:{},//公司信息
}

const mutations = {
    // 保存省数据
    [types.GET_REGIONS] (state, data) {
        state.stateList = data
    },
    // 保存团队列表
    [types.GET_TEAMLIST] (state, data) {
        state.teamList = data
    },
    // 保存分类标签
    [types.GET_TAGLIST] (state, data) {
        state.tagList = data
    },
    //公司信息
    [types.GET_COMPANYINFO] (state, data) {
        state.companyInfo = data
    }
} 

export default{
    state,
    mutations
}