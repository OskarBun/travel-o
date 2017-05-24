<template>
    <div class="MenuPanel">
        <div class="menu-segment menu-left">
            <router-link class="menu-link" :to="{ name:'home' }">
                <span class="icon"><icon fill="#FFF"></icon></span>
                <span class="title site-title">Travelo</span>
            </router-link>
        </div>
        <div class="menu-segment menu-centre">
            <!-- contextual items will go here -->
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
import {mapState} from 'vuex'
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
            username: state => state.user.username,
            color: state => state.user.color,
            avatar_url: state => state.user.avatar_url,
            user_id: state => state.user.id
        })
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
</style>
