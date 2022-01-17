export default {

    namespaced: true,

    state: {
        snackbar: null
    },

    getters: {
        snackbar(state){
            return state.snackbar
        }
    },

    mutations: {
        SET_SNACKBAR(state, payload){
            state.snackbar = payload
        }
    },

    actions: {
        snackbar({ commit }, text){
            commit("SET_SNACKBAR", text)

            setTimeout(()=> {
                commit("SET_SNACKBAR", null)
            }, 3000)
        }
    }

}
