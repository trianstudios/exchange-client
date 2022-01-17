import axios from 'axios';

export default {

    namespaced: true,

    state: {
        files: []
    },

    getters: {
        files(state){
            return state.files
        }
    },

    mutations: {
        SET_FILES(state, payload){
            state.files = payload
        },
        ADD_FILE(state, payload){
            state.files = [payload, ...state.files]
        },
        REMOVE_FILE(state, payload){
            state.files = state.files.filter(file => file.uuid !== payload)
        }
    },

    actions: {
        async getFiles({ commit }){
            let response = await axios.get('/api/v1/files')
            commit("SET_FILES", response.data.data)
        },

        async deleteFile({ commit }, uuid){
            await axios.delete(`/api/v1/files/${uuid}`)
            commit("REMOVE_FILE", uuid)
        }
    }

}
