import ws from '../ws.js';

const userModule = {
    state: {
        username: 'None',
        id: 0
    },
    mutations: {
        loggedIn(state, user){
            state.username = user.username;
            state.id = user.id;
            //This needs to be server generated and SUPER secret
            document.cookie = "travelo.cookie="+user.id
        }
    },
    actions: {
        newUser ({ state, commit, $rpc }) {
            console.log($rpc);
            ws.rpc('newUser', {username: 'Oskimo'}).then((user)=>{
                commit('loggedIn', user)
            });
        }
    }
}

export default userModule;
