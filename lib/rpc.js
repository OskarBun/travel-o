const db = require('./db');
const request = require('async-request');
const generateName = require('sillyname');
const util = require('util')

let github = {
    client_id: process.env.GITHUB_ID,
    client_secret: process.env.GITHUB_SECRET
}

// dont use oAuth in local development
// requires return url which isnt available locally
if(!github.client_secret && !process.env.NODE_ENV === 'development'){
    github = require('../oauth.json').github;
}

// random colour is assigned to users unless changed
function randomColor(){
    const colors = [
        '#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00',
        '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF',
        '#333333', '#808080', '#CCCCCC', '#D33115', '#E27300', '#FCC400',
        '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF',
        '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00',
        '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E'
    ];

    return colors[Math.floor(Math.random()*colors.length)];
}

// RPC Methods
const methods = {
    async echo({message}){
        return [message, 'echo'];
    },

    async signOut(_, ctx){
        delete ctx.websocket.user;
        return ["done", null];
    },

    async _auth({cookie}){
        return await db.User.findById(cookie);
    },

    async github({state}, ctx){
        //match the state with a auth callback, make the post, return user
        const code = await ctx.oauth.github.get(state)
        var options = {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            data: {
                client_id: github.client_id,
                client_secret: github.client_secret,
                code: code
            }
        };
        const github_auth = await request('https://github.com/login/oauth/access_token', options)
        const github_user = await request('https://api.github.com/user?access_token='+JSON.parse(github_auth.body).access_token, {
            headers: {
                "User-Agent": "travel-o"
            }
        });
        const gh_user = JSON.parse(github_user.body);
        let user = await db.User.findAll({
            where: {
                github_id: gh_user.id
            }
        });
        if(user.length === 0){
            user = await db.User.create({
                username: gh_user.login,
                avatar_url: gh_user.avatar_url,
                color: randomColor(),
                github_id: gh_user.id
            });
        } else {
            user = user[0];
        }

        ctx.websocket.user = user;

        const topic = `user/${user.id}`;
        ctx.broadcast.register(topic, ctx.websocket);
        return [user, topic];

    },


    async newUser(_, ctx){
        const username = generateName();

        const user = await db.User.create({
            username: username,
            color: randomColor()
        });

        ctx.websocket.user = user;

        const topic = `user/${user.id}`;
        ctx.broadcast.register(topic, ctx.websocket);
        return [user, topic];
    },

    async updateUser({color}, ctx){
        const user = ctx.websocket.user
        user.color = color;
        await user.save();
        const topic = `user/${user.id}`;
        return [user, topic];
    },

    async searchUser({query}, ctx){
        const users = await db.User.findAll({
            where: {
                username: {
                    $like: `%${query}%`
                }
            }
        });
        return [users, null];
    },

    async newTrip({title, access}, ctx){
        const user = ctx.websocket.user;

        // create trip
        const trip = await db.Trip.create({
            title: title,
            access: 'private'
        });

        // add user role
        const role = await db.Role.create({
            user_id: user.id,
            trip_id: trip.id
        });

        const topic = `map/trip/${trip.id}`;
        return [trip, topic];
    },

    async getTrip({id, access}, ctx){
        const user = ctx.websocket.user;

        // create trip
        const trips = await user.getTrips({
            where: { id: id },
            include: [ {
                model: db.Destination,
                include: [ db.User ]
            } ]
        });
        const trip = trips[0];

        const topic = `map/trip/${trip.id}`;
        return [trip, topic];
    },

    async updateTrip({title, trip_id}, ctx){
        const user = ctx.websocket.user;

        // create trip
        const trips = await user.getTrips({
            where: { id: trip_id },
            include: [ {
                model: db.Destination,
                include: [ db.User ]
            } ]
        });
        const trip = trips[0];

        trip.title = title;
        await trip.save();

        const topic = `map/trip/${trip.id}`;
        return [trip, topic];
    },

    async addDestination({trip_id, lat, lng, name}, ctx){
        const user = ctx.websocket.user;

        // find trip
        const destination = await db.Destination.create({
            lat,
            lng,
            name,
            trip_id,
            created_by: user.id
        });

        const topic = `map/trip/${trip_id}/destination`
        return [destination, topic]
    },

    async searchTrips({query}, ctx){
        const user = ctx.websocket.user;

        // filter if query was set
        let trips = [];
        if(query) {
            trips = await user.getTrips({
                where: {
                    title: { $like: `%${query}%` }
                }
            });
        }
        else {
            trips = await user.getTrips();
        }
        return [trips, null];
    }
}

module.exports = methods;
