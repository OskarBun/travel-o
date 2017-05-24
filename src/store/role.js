// JS Imports
// –– Websocket
import ws from '../ws.js'


const RoleModule = {
    state: {
        id: null,
        user_id: null,
        trip_id: null,
        read: true,
        write: true
    },
    mutations: {
        set_role(state, role) {
            state.id = role.id
            state.user_id = role.user_id
            state.trip_id = role.trip_id
            state.read = role.read
            state.write = role.write
        }
    }
}

export default RoleModule
