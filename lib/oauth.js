const Router = require('koa-router');
const request = require('koa-request');

const router = new Router();

const auth = {
    github: {
        confirmed: {},
        waiting: {},
        get(state){
            return new Promise((resolve, reject)=>{
                if(this.confirmed[state]){
                    resolve(this.confirmed[state]);
                } else {
                    this.waiting[state] = resolve;
                }
            });
        },
        confirm(state, code){
            if(this.waiting[state]){
                this.waiting[state](code)
            } else {
                this.confirmed[state] = code;
            }
        }
    }
}

router.get('/oauth/github', (ctx, next)=>{
    const query = ctx.request.query
    const code = query.code;
    const state = query.state;
    auth.github.confirm(state, code);
});

module.exports = {
    auth,
    router
}
