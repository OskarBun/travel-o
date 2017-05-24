// JS Imports
// –– Websocket
import ws from '../ws.js'
// –– IDs
import uuid from 'uuid'


const SearchModule = {
    state: {
        query: null,
        results: []
    },
    actions: {
        search_user ({ state, commit }, params) {
            state.query = params.query

            ws.rpc('searchUser', params).then((users)=>{
                // console.log(users)
                state.results = users
            })
        }
    }
}

const UserModule = {
    state: {
        id: null,
        username: null,
        avatar_url: null,
        color: "#69AEBB",
        guest: true
    },
    mutations: {
        set_user(state, user) {
            state.id = user.id
            state.username = user.username
            state.avatar_url = user.avatar_url
            state.color = user.color
            state.guest = user.github_id === null
            //This needs to be server generated and SUPER secret
            document.cookie = "travelo.cookie="+user.id
        }
    },
    actions: {
        new_user ({ state, commit }) {
            ws.rpc('newUser', {}).then((user)=>{
                commit('set_user', user)
            })
        },
        update_user ({ state, commit }, params) {
            ws.rpc('updateUser', params).then((user)=>{
                commit('set_user', user)
            })
        },
        sign_out ({ state, commit }) {
            ws.rpc('signOut').then(()=>{
                state.username = null
                state.id = null
                state.avatar_url = null
                state.color = "#69AEBB"
                state.guest = true
                document.cookie = "travelo.cookie" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
            })
        },
        github ({ state, commit }) {
            const randState = uuid.v4()
            const popup = window.open('http://github.com/login/oauth/authorize?client_id=065ea78ba3a29fe0be3d&state='+randState)
            ws.rpc('github', {state: randState}).then(result => {
                popup.close()
                commit('set_user', result)
            })
        }
    },
    modules: {
        search: SearchModule
    }
}

export default UserModule
