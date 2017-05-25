// JS Imports
// –– Websocket
import ws from '../ws.js'
import geocoder from 'google-geocoder'



var geo = geocoder({
    key: 'AIzaSyB8W81LbL8wRLGnehNXqG3BjtdvDcnPxn0'
});



const SearchModule = {
    state: {
        query: null,
        results: []
    },
    actions: {
        search_destination ({ state, commit }, params) {
            state.query = params.query

            geo.find(params.query, (err, data)=>{
                state.results = data
            })
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
