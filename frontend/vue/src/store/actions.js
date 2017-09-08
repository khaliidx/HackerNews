

export default {

        login({ commit }, creds) {
            commit("_login"); // show spinner
            return new Promise(resolve => {
                setTimeout(() => {
                    commit("_loginSuccess");
                    resolve();
                }, 1000);
            });
        },
        logout({ commit }) {
            commit("_logout");
        },

        setCurrentTopic({commit}, data){
            commit('_setCurrentTopic', {topic: data});
        }
    }
