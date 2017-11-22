import * as types from '../mutationTypes'

const state = {
    demoList: []
}

const mutations = {
    [types.DEMO_SET](state, data){
        state.demoList = data
    }
}

export default{
    state,
    mutations
}