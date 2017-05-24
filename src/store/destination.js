// JS Imports
// –– Websocket
import ws from '../ws.js'

const DestinationModule = {
    state: {
        id: null,
        name: null,
        latlon: null,
        created_by: null
    },
    mutations: {
        set_destination(state, destination) {
            state.id = destination.id
            state.name = destination.name
            state.latlon = destination.latlon
            state.created_by = destination.created_by
        }
    }
}

export default DestinationModule
