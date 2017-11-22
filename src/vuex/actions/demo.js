import * as types from '../mutationTypes.js'

export default {
    setDemo: ({ commit }, data) => {
        commit(types.DEMO_SET, data)
    }
}