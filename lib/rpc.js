const db = require('./db');
const request = require('async-request');
const generateName = require('sillyname');
const util = require('util')

let github = {
    client_id: process.env.GITHUB_ID,
    client_secret: process.env.GITHUB_SECRET
}

if(github.client_secret){
    github = require('../oauth.json').github;
}

function randomColor(){
    const colors = ['#F9D068', '#F96868', '#76D358', '#000000']

    return colors[Math.floor(Math.random()*colors.length)];
}


const methods = {
    async hello(){
        return ['world', 'hello']
    },
    async echo({message}){
        return [message, 'echo']
    },

    async signOut(_, ctx){
        delete ctx.websocket.user;
        return ["done", ""];
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
        const access_token = JSON.parse(github_auth.body).access_token;
        let user = await db.User.findAll({
            where: {
                github_token: access_token
            }
        })[0]
        if(!user){
            const github_user = await request('https://api.github.com/user?access_token='+access_token, {
                headers: {
                    "User-Agent": "travel-o"
                }
            })
            gh_user = JSON.parse(github_user.body)
            user = await db.User.create({
                username: gh_user.login,
                avatar_url: gh_user.avatar_url,
                color: randomColor(),
                github_token: access_token
            })
        }

        const topic = `users/${user.id}`;
        ctx.broadcast.register(topic, ctx.websocket);
        return [user, topic];

    },


    async newUser(_, ctx){
        const username = generateName();

        const user = await db.User.create({
            username: username,
            color: randomColor()
        })

        ctx.websocket.user = user;

        const topic = `users/${user.id}`;
        ctx.broadcast.register(topic, ctx.websocket);
        return [user, topic];
    },

    async updateUser({color}, ctx){
        const user = ctx.websocket.user
        user.color = color;
        await user.save();
        const topic = `users/${user.id}`;
        return [user, topic]
    }
}

module.exports = methods;
