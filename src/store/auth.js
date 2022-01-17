import axios from 'axios';

export default {

    namespaced: true,

    state: {
        authenticated: false,
        user: null
    },

    getters: {
        authenticated(state){
            return state.authenticated
        },
        user(state){
            return state.user
        }
    },

    mutations: {
        SET_AUTHENTICATED(state, payload){
            state.authenticated = payload
        },
        SET_USER(state, payload){
            state.user = payload
        }
    },

    actions: {
        async login({ dispatch }, credentials){
            await axios.get("/sanctum/csrf-cookie")
            await axios.post('/api/v1/login', credentials)

            return dispatch('me');
        },
        me({ commit }){
            return axios.get('/api/v1/user').then(response => {
                commit('SET_AUTHENTICATED', true);
                commit('SET_USER', response.data.data);
            }).catch(() => {
                commit('SET_AUTHENTICATED', false);
                commit('SET_USER', null);
            });
        },
        async logout({ dispatch }){
            await axios.post('/api/v1/logout');
            return dispatch('me')
        }
    }

}
