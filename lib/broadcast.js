function arrRemove(arr, item){
    const index = arr.indexOf(item);
    if(index != -1) {
        arr.splice(index, 1);
        return true;
    }
    return false
}

const pubsub = {
    _topics: {
        sockets: []
    },
    register(topic, ws){
        const subtopics = topic.split('/')
        let level = this._topics;
        for(sub of subtopics){
            if(level[sub]){
                level = level[sub]
            } else {
                level = level[sub] = {sockets: []}
            }
        }
        if(level.sockets.indexOf(ws)===-1) {
            level.sockets.push(ws)
            if(ws.subs) ws.subs.push(topic)
            else ws.subs = [topic]
        };
    },
    deregister(ws,topic){
        if(!topic){
            for(top in ws.subs){
                this.deregister(ws, top);
            }
        } else {
            const subtopics = topic.split('/')
            let level = this._topics;
            for(sub of subtopics){
                if(level[sub]){
                    level = level[sub]
                } else {
                    return false
                }
            }
            arrRemove(level.sockets, ws);
            arrRemove(ws.subs, topic);
        }
    },
    emit(topic, message){
        const subtopics = topic.split('/')
        let level = this._topics;
        let sockets = level.sockets;
        for(sub of subtopics){
            if(level[sub]){
                level = level[sub];
                sockets = sockets.concat(level.sockets)
            } else {
                break;
            }
        }
        for (ws of sockets) {
            ws.send(message);
        }
    }
}

module.exports = pubsub;
