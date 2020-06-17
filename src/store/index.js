import vue from 'vue'
import Vuex from 'vuex'

import { CHANGECOLLAPSE} from './mutations-type'
// 安装 vuex
vue.use(Vuex);

export default new Vuex.Store({
    state: {
        collapse: false,
    },
    getters: {

    },
    mutations: {
        [CHANGECOLLAPSE](state) {
            state.collapse = !state.collapse;
        }
    },
    actions: {

    },
    modules: {

    },
})