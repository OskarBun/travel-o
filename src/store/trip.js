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
        destinations: []
    },
    mutations: {
        set_trip(state, trip) {
            state.id = trip.id
            state.title = trip.title
            state.access = trip.access
            state.destinations = trip.destinations || []
        },
        reset_trip(state) {
            state.id = null,
            state.title = null,
            state.access = null,
            state.destinations = []
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
            params.trip_id = state.trip.trip_id
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
        add_destination({ state, commit, rootState }, params) {
            if(!state.id) return;
            params.trip_id = state.id;
            return ws.rpc('addDestination', params).then((destination)=>{
                destination.user = rootState.user
                state.destinations.push(destination)
                return destination
            })
        }
    },
    modules: {
        search: SearchModule
    }
}

export default TripModule
