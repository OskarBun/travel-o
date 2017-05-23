import ws from '../ws.js';

const userModule = {
    state: {
        username: null,
        id: 0,
        avatar_url: null,
        color: "#69AEBB",
        guest: true
    },
    mutations: {
        setUser(state, user){
            state.username = user.username;
            state.id = user.id;
            state.avatar_url = user.avatar_url;
            state.color = user.color;
            state.guest = user.github_token === null;
            //This needs to be server generated and SUPER secret
            document.cookie = "travelo.cookie="+user.id
        }
    },
    actions: {
        newUser ({ state, commit }) {
            ws.rpc('newUser', {username: 'Oskimo'}).then((user)=>{
                commit('setUser', user)
            });
        },
        updateUser ({ state, commit }, params) {
            ws.rpc('updateUser', params).then((user)=>{
                commit('setUser', user);
            });
        },
        signOut ({ state, commit }) {
            ws.rpc('signOut').then(()=>{
                state.username = null
                state.id = 0
                state.avatar_url = null
                state.color = "#69AEBB"
                state.guest = true
                document.cookie = "travelo.cookie" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            })
        }
    }
}

export default userModule;
