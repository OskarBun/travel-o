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

            ws.rpc('searchTrips', params).then((trips)=>{
                state.results = trips
            })
        }
    }
}

const TripModule = {
    state: {
        id: null,
        title: null,
        access: null,
        locations: []
    },
    mutations: {
        set_trip(state, trip) {
            state.id = trip.id
            state.title = trip.title
            state.access = trip.access
        }
    },
    actions: {
        new_trip({ state, commit }, params) {
            return ws.rpc('newTrip', params).then((trip)=>{
                commit('set_trip', trip)
                return trip
            })
        },
        update_trip ({ state, commit }, params) {
            return ws.rpc('updateTrip', params).then((trip)=>{
                commit('set_trip', trip)
                return trip
            })
        },
        get_trip({ state, commit }, params) {
            return ws.rpc('getTrip', params).then((trip)=>{
                commit('set_trip', trip)
                return trip
            })
        },
    },
    modules: {
        search: SearchModule
    }
}

export default TripModule
