<template>
    <div class="Foo">
        <h2>id : {{id}}</h2>
        <h3>username: {{username}}</h3>
        <button @click="newUser">Websocket Test</button>
        <button @click="oauth">oAuth Test</button>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import uuid from 'uuid';

export default {
    data(){
        return {

        }
    },
    computed: mapState({
        username: state => state.user.username,
        id: state => state.user.id
    }),
    methods : {
        newUser() {
            this.$store.dispatch('newUser')
        },
        oauth() {
            const state = uuid.v4();
            // const popup = window.open('http://github.com/login/oauth/authorize?client_id=065ea78ba3a29fe0be3d&state='+state);
            this.$store.$rpc('github', {state}).then(result => {
                popup.close();
                this.$store.commit('loggedIn', result);
            });
        }
    },
}
</script>
