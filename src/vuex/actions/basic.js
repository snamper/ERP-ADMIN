import * as types from '../mutationTypes'
import { basic, customer, material, system } from 'services'
// 基础数据
export default {
    // 省
    getRegionStates: ({ state, commit }) => {
        const stateList = state.basic.stateList
        if (stateList.length === 0) {
            basic.selectRegionList({
                LevelID: 1,
                ParentID: '',
                Status: 1
            }).then((result) => {
                commit(types.GET_REGIONS, result)
            })
        }
    },
    // 团队列表
    getTeamList: ({ state, commit }, isUpdate = false) => {
        const teamList = state.basic.teamList
        if (teamList.length === 0 || isUpdate) {
            customer.queryTeamList(1, 100, { status: 1 }).then((result) => {
                commit(types.GET_TEAMLIST, result.dataList)
            })
        }
    },
    // 分类标签
    getTagList: ({ state, commit }, isUpdate = false) => {
        const tagList = state.basic.tagList
        if (tagList.length === 0 || isUpdate) {
            material.getMaterialTagList().then((result) => {
                commit(types.GET_TAGLIST, result)
            })
        }
    },
    // 获取公司信息
    getCompanyInfo: ({ state, commit }) => {
        const companyInfo = state.basic.companyInfo
        if (!companyInfo.merchantID) {
            system.getCompanyDetail().then((result) => {
                commit(types.GET_COMPANYINFO, result)
            })
        }
    }
}