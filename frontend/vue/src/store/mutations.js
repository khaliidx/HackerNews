

export default {
        _login(state) {
            state.pending = true;
        },
        _loginSuccess(state) {
            state.isLoggedIn = true;
            state.pending = false;
        },
        _logout(state) {
            state.isLoggedIn = false;
        },
        _setCurrentTopic(state, payload){
            state.topic = payload.topic;
        },
    }
