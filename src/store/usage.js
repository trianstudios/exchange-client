import axios from 'axios';

export default {

    namespaced: true,

    state: {
        usage: 0
    },

    getters: {
        usage(state){
            return state.usage
        }
    },

    mutations: {
        SET_USAGE(state, payload){
            state.usage = payload
        },
        INCREMENT_USAGE(state, payload){
            state.usage = state.usage + payload
        },
        DECREMENT_USAGE(state, payload){
            state.usage = state.usage - payload
        }
    },

    actions: {
        async getUsage({ commit }){
            let response = await axios.get('/api/v1/user/usage')
            commit('SET_USAGE', response.data.data.usage)
        }
    }

}
