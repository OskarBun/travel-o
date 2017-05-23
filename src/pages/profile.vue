<template>
    <div class="ProfilePage" style="background-image:url(src/assets/world_outline.svg)">
        <div class="profile">
            <div class="bubble">
                <user-bubble :style="border_style" :image="user_image"></user-bubble>
            </div>
            <div class="details" v-if="user">
                <div class="title">{{user.username}}</div>
                <div class="colors">
                    <span>Pick your colour:</span>
                    <select v-model="user.color">
                        <option>#69AEBB</option>
                        <option>#F9D068</option>
                        <option>#F96868</option>
                        <option>#76D358</option>
                        <option>#000000</option>
                    </select>
                </div>
                <div class="guest" v-if="user.guest">
                    <div>You are signed in as a guest.</div>
                </div>
            </div>
            <div class="notice" v-else>
                <div>You are not signed in.</div>
                <div class="sign-in" @click="sign_in">Sign In</div>
            </div>
        </div>
    </div>
</template>


<script>
// JS Imports
// –– Components
import UserBubble from '../components/user-bubble.vue'

// TEMPORARY DATA
import user_json from '../user.json'


export default {
    components: {
        'user-bubble': UserBubble
    },
    props: [ 'id' ],
    data() {
        return {
            user: null
        }
    },
    computed: {
        border_style() {
            var colour = this.user ? this.user.color : "#69AEBB"
            return { borderColor:colour, borderWidth: '10px' }
        },
        user_image() {
            return this.user ? this.user.profile_image : null
        }
    },
    methods: {
        sign_in() {
            // sign in here
        }
    },
    mounted() {
        // load user if id prop is set
        if(this.id) {
            this.user = user_json
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
.sign-in {
    color: #F96868;
    width: 100px;
    margin: auto;
    border: 2px solid #F96868;
    padding: 3px 5px;
    margin-top: 15px;
}

.ProfilePage
.sign-in:hover {
    background: #FFEDED;
    cursor: pointer;
}
</style>
