<template>
    <div class="ProfilePage">
        <div class="profile">
            <div class="bubble">
                <user-bubble :style="border_style" :image="avatar_url"></user-bubble>
            </div>
            <div class="details" v-if="username">
                <div class="title">{{username}}</div>
                <div class="colors">
                    <span>Pick your colour:</span>
                    <compact-picker class="picker" v-model="color"/>
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
// –– Vuex Helpers
import {mapState} from 'vuex'
// –– Dependencies
import { Compact } from 'vue-color'
// –– Components
import UserBubble from '../components/user-bubble.vue'

// TEMPORARY DATA
// import user_json from '../user.json'


export default {
    components: {
        'user-bubble': UserBubble,
        'compact-picker': Compact
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
}

.ProfilePage
.profile {
    min-width: 300px;
    margin: auto;
    padding: 20px 15px;

    background: #FFF;
    border: 2px solid #69AEBB;
    text-align: center;
}

.ProfilePage
.picker {
    margin: auto;
    box-shadow: none;
}

.ProfilePage
.profile
.bubble {
    display: flex;
    align-items: center;
    text-align: center;

    width: 300px;
    height: 300px;
    margin: auto;

    font-size: 200px;
    line-height: 320px;
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
