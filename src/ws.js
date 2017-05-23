const loc = window.location, new_uri;
if (loc.protocol === "https:") {
    new_uri = "wss:";
} else {
    new_uri = "ws:";
}
new_uri += "//" + loc.host;

const ws = new WebSocket(new_uri)

const outs = {}
let id = 1
const pending = []

const rpc = (method, params) => {
    return new Promise((resolve, reject)=>{
        if(ws.readyState === 0){
            pending.push(()=>{
                const req = {jsonrpc: "2.0", id: id, method: method, params: params}
                ws.send(JSON.stringify(req))
                outs[req.id] = {resolve,reject}
                id++
            })
        } else if (ws.readyState == 1) {
            const req = {jsonrpc: "2.0", id: id, method: method, params: params}
            ws.send(JSON.stringify(req))
            outs[req.id] = {resolve,reject}
            id++
        } else {
            console.error("Websocket closed/closing");
        }
    })

}

ws.onopen = () => {
    for(send in rpc.pending){
        send();
    }
}

export default {
    rpc: rpc,
    vuex: store => {
        store.$rpc = rpc;
        ws.onmessage = (event) => {
            const resp = JSON.parse(event.data);
            if(resp.id === null){
                console.log(resp); //Do something with the store
            } else if(resp.id === 0) {
                console.log(resp.message)
                if(resp.user){
                    store.commit("loggedIn", resp.user);
                }
            } else if(outs[resp.id] === undefined) {
                console.error("Could not find response id")
            } else if(resp.error){
                outs[resp.id].reject(resp.error)
            } else {
                outs[resp.id].resolve(resp.result)
            }
        }
    }
}
