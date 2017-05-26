<template>
    <div class="MenuPanel">
        <div class="menu-segment menu-left">
            <router-link class="menu-link" :to="{ name:'home' }">
                <span class="icon"><icon fill="#FFF"></icon></span>
                <span class="title site-title">Travelo</span>
            </router-link>
        </div>
        <div class="menu-segment menu-centre">
            <div class="trip-users" v-if="trip_users">
                <div class="user" v-for="user in trip_users" :key="user.id">
                    <div class="user-spacer">
                        <user-bubble class="user-icon" :image="user.avatar_url" :color="user.color"></user-bubble>
                    </div>
                    <div class="tip" :style="{color:user.color}">
                        <span>{{user.username}}</span>
                    </div>
                </div>
                <div class="add-user" @click="add_user">
                    <span class="lnr lnr-cross"></span>
                </div>
            </div>
        </div>
        <div class="menu-segment menu-right">
            <router-link class="menu-link" :to="{ name: 'user', params: { id: user_id }}">
                <div class="profile">
                    <div class="profile-name">
                        <span v-if="username">{{username}}</span>
                        <span v-else>Sign In</span>
                    </div>
                    <div class="profile-image">
                        <user-bubble :image="avatar_url"></user-bubble>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>


<script>
// JS Imports
// -- Vuex Helpers
import { mapState } from 'vuex'

// –– Dependencies
import event_bus from '../event.js';

// –– Components
import Icon from '../components/icon.vue'
import UserBubble from '../components/user-bubble.vue'


export default {
    components: {
        'icon': Icon,
        'user-bubble': UserBubble
    },
    computed: {
        ...mapState({
            user_id: state => state.user.id,
            username: state => state.user.username,
            color: state => state.user.color,
            avatar_url: state => state.user.avatar_url,
            trip_users: state => state.trip.users
        })
    },
    methods: {
        add_user() {
            // trigger add action panel
            event_bus.$emit('show_add_user')
        }
    }
}
</script>


<style>
.MenuPanel {
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
}

.MenuPanel
.menu-segment {
    display: inline-block;
    height: 100%;
    min-width: 350px;
    box-sizing: border-box;
    overflow: hidden;
}

.MenuPanel
.menu-segment.menu-centre {
    flex-grow: 1;
}

.MenuPanel
.menu-segment.menu-right {
    text-align: right;
    clear: both;
}

.MenuPanel .menu-segment span,
.MenuPanel .menu-segment a {
    vertical-align: middle;
}

.MenuPanel
.menu-link {
    color: #FFF;
    text-decoration: none;
}

.MenuPanel
.icon {
    display: inline-block;
    width: 40px;
    height: 100%;
    margin-left: 10px;
}

.MenuPanel
.profile-name {
    font-weight: 100;
    font-size: 25px;
    margin-right: 10px;
}

.MenuPanel
.profile {
    display: flex;
    align-items: center;
    float: right;

    height: 50px;

    font-size: 40px;
    line-height: 40px;
    margin-right: 10px;
}

.MenuPanel
.profile-image {
    display: flex;
    align-items: center;

    width: 50px;
    height: 100%;
}

.MenuPanel
.menu-center {
    display: block;
    overflow: auto;
}

.MenuPanel
.trip-users {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
}

.MenuPanel
.trip-users
.user {
    position: relative;
    display: flex;
    align-items: center;
    min-width: 50px;
}

.MenuPanel
.trip-users
.user .user-spacer {
    z-index: 2;
    border: 2px solid #FFF;
    border-radius: 50%;
    box-sizing: border-box;
}

.MenuPanel
.trip-users .user
.user-icon {
    width: 40px;
    height: 40px;
    font-size: 35px;
    background: #FFF;
    color: #69AEBB;
    border-width: 3px;
}

.MenuPanel
.trip-users .user
.tip {
    visibility: hidden;

    display: block;
    overflow: hidden;
    width: 0px;

    height: 35px;
    line-height: 30px;

    z-index: 1;
    margin-left: -10px;

    font-size: 18px;
    color: #69AEBB;
    background: #FFF;

    border: 1px solid #69AEBB;
    padding: 0px;

    box-sizing: border-box;

    transition: all .1s;
}

.MenuPanel .trip-users .user:hover .tip,
.MenuPanel .trip-users .user .tip:hover {
    visibility: visible;
    width: 100%;
    padding: 0px 15px;
}

.MenuPanel
.add-user {
    display: flex;
    align-items: center;
    background: #FFF;
    color: #69AEBB;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    text-align: center;
    margin-left: 10px;
}

.MenuPanel
.add-user:hover {
    cursor: pointer;
    background-color: #E0FFE0;
}

.MenuPanel
.add-user .lnr {
    display: block;
    margin: auto;
    transform: rotate(45deg);
    font-weight: bold;
}
</style>
