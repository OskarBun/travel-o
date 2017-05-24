// JS Imports
// –– Websocket
import ws from '../ws.js'


const SearchModule = {
    state: {
        query: null,
        results: []
    },
    actions: {
        search_trips ({ state, commit }, params) {
            state.query = params.query

            // ws.rpc('searchDestinations', params).then((results)=>{
            //     state.results = results
            // })
        }
    }
}

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
    },
    modules: {
        search: SearchModule
    }
}

export default DestinationModule
