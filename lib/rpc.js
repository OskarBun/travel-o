const db = require('./db');
const request = require('koa-request');
const generateName = require('sillyname');
let github = {
    client_id: process.env.GITHUB_ID,
    client_secret: process.env.GITHUB_SECRET
}

if(process.env.NODE_ENV === 'development'){
    github = require('../oauth.json').github;
}

const methods = {
    async hello(){
        return ['world', 'hello']
    },
    async echo({message}){
        return [message, 'echo']
    },

    async _auth({cookie}){
        return await db.User.findById(cookie);
    },

    async github({state}, ctx){
        //match the state with a auth callback, make the post, return user
        const code = await ctx.oauth.github.get(state)
        var options = {
        	url: 'https://github.com/login/oauth/access_token',
            method: 'POST',
            form: {
                client_id: github.client_id,
                client_secret: github.client_secret,
                code: code
            }
        };
        const response = await request.post(options)
        const access_token = JSON.parse(response.body);

    },


    async newUser({}, ctx){
        const username = generateName();

        const user = await db.User.create({username: username})

        const topic = `users/${user.id}`;
        ctx.broadcast.register(topic, ctx.websocket);
        return [user, topic];
    }
}

module.exports = methods;
