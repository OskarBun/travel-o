// JS Imports
// –– Websocket
import ws from '../ws.js'

function mapUsers(destinations, people){
    if(!destinations) return []
    return destinations.map((d)=>{
        d.user = people.find(u=>d.created_by===u.id)
        return d
    })
}

const SearchModule = {
    state: {
        query: null,
        results: []
    },
    mutations: {
        set_results(state, trips){
            state.results = trips
        }
    },
    actions: {
        search_trips ({ state, commit }, params) {
            state.query = params.query

            ws.rpc('searchTrips', params).then((trips)=>{
                commit("set_results", trips)
            })
        }
    }
}

const TripModule = {
    state: {
        id: null,
        title: null,
        access: null,
        destinations: [],
        users: []
    },
    mutations: {
        set_trip(state, trip) {
            state.id = trip.id
            state.title = trip.title
            state.access = trip.access
            state.users = trip.people
            state.destinations = mapUsers(trip.destinations, trip.people)
        },
        reset_trip(state) {
            state.id = null
            state.title = null
            state.access = null
            state.destinations = []
            state.users = []
        },
        set_trip_user(state, user) {
            const i = state.users.findIndex(u=>u.id===user.id);
            state.users[i] = user;
            state.destinations = state.destinations.map(d=>{
                if(d.created_by === user.id){
                    d.user = user;
                }
                return d
            })
        },
        push_destination(state, destination){
            destination.user = state.users.find(user=>destination.created_by===user.id)
            const i = state.destinations.findIndex((d=>d.id===destination.id))
            if(i != -1){
                state.destinations[i] = destination
            } else {
                state.destinations.push(destination)
            }
        },
        push_user(state, user){
            const i = state.users.findIndex((u=>u.id===user.id))
            if(i != -1){
                state.users[i] = user
            } else {
                state.users.push(user)
            }
        },
        set_destinations(state, destinations){
            state.destinations = mapUsers(destinations, state.users)
        }
    },
    actions: {
        new_trip({ state, commit, rootState }, params) {
            return ws.rpc('newTrip', params).then((trip)=>{
                trip.destinations = [];
                commit('set_trip', trip)
                return trip
            })
        },
        update_trip ({ state, commit }, params) {
            params.trip_id = state.id
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
        add_destination({ state, commit }, params) {
            if(!state.id) return;
            params.trip_id = state.id;
            params.order = state.destinations.length + 1
            return ws.rpc('addDestination', params).then((destination)=>{
                commit('push_destination', destination)
                return destination
            })
        },
        add_user({ state, commit }, params){
            if(!state.id) return;
            params.trip_id = state.id;
            return ws.rpc('addUser', params).then((user)=>{
                commit('push_user', user)
                return user;
            })
        },
        order_destinations({ state, commit }, params){
            if(!state.id) return;
            params.trip_id = state.id;
            commit('set_destinations', params.destinations)
            return ws.rpc('orderDestinations', params).then((destinations)=>{
                commit('set_destinations', destinations)
            })
        }
    },
    modules: {
        search: SearchModule
    }
}

export default TripModule
