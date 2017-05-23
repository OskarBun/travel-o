<template>
    <div class="ProfilePage" style="background-image:url(src/assets/world_outline.svg)">
        <div class="profile">
            <div class="bubble">
                <user-bubble :style="border_style" :image="avatar_url"></user-bubble>
            </div>
            <div class="details" v-if="username">
                <div class="title">{{username}}</div>
                <div class="colors">
                    <span>Pick your colour:</span>
                    <select v-model="color">
                        <option>#69AEBB</option>
                        <option>#F9D068</option>
                        <option>#F96868</option>
                        <option>#76D358</option>
                        <option>#000000</option>
                    </select>
                </div>
                <div class="guest" v-if="guest">
                    <div>You are signed in as a guest.</div>
                </div>
                <div class="sign" @click="sign_out">Sign Out</div>
            </div>
            <div class="notice" v-else>
                <div>You are not signed in.</div>
                <div class="sign" @click="sign_in">Sign In</div>
            </div>
        </div>
    </div>
</template>


<script>
// JS Imports
// -- Vuex Helpers
import {mapState} from 'vuex'
// –– Components
import UserBubble from '../components/user-bubble.vue'

// TEMPORARY DATA
// import user_json from '../user.json'


export default {
    components: {
        'user-bubble': UserBubble
    },
    props: [ 'id' ],
    data() {
        return {
        }
    },
    computed: {
        border_style() {
            var colour = this.color
            return { borderColor:colour, borderWidth: '10px' }
        },
        color: {
            get(){
                return this.$store.state.user.color
            },
            set(value){
                this.$store.dispatch('updateUser', {color:value})
            }
        },
        ...mapState({
            username: state => state.user.username,
            avatar_url: state => state.user.avatar_url,
            user_id: state => state.user.id,
            guest: state => state.user.guest
        })
    },
    methods: {
        sign_in() {
            this.$store.dispatch("newUser")
        },
        sign_out() {
            this.$store.dispatch("signOut")
        }
    },
    mounted() {
        // load user if id prop is set
        if(this.id) {

        }
    }
}
</script>


<style>
.ProfilePage {
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;

    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

.ProfilePage
.profile {
    min-width: 300px;
    margin: auto;
    padding: 20px 5px;

    background: #FFF;
    border: 2px solid #69AEBB;
    text-align: center;
}

.ProfilePage
.profile
.bubble {
    display: flex;
    align-items: center;
    text-align: center;

    width: 250px;
    height: 250px;
    margin: auto;

    font-size: 200px;
    line-height: 300px;
}

.ProfilePage
.guest {
    margin-top: 10px;
    color: #F96868;
}

.ProfilePage
.notice {
    color: #F96868;
    font-size: 1.3em;
}

.ProfilePage
.sign {
    color: #F96868;
    width: 100px;
    margin: auto;
    border: 2px solid #F96868;
    padding: 3px 5px;
    margin-top: 15px;
}

.ProfilePage
.sign:hover {
    background: #FFEDED;
    cursor: pointer;
}
</style>
