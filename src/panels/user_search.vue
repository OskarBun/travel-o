<template>
    <div class="UserSearchPanel">
        <div class="header">
            <input class="search-text" placeholder="Invite people.." type="text" ref="search" v-model="search"/>
            <span class="lnr lnr-magnifier" @click="$refs.search.focus()"></span>
        </div>
        <ul class="body">
            <li class="user" v-for="user in results">
                <div class="name">{{user.username}}</div>
                <div class="add" @click="add_to_trip(user)" v-if="user">
                    <span class="lnr lnr-plus-circle"></span>
                </div>
            </li>
        </ul>
        <div class="footer map-link">
            <div class="back" @click="back">Back</div>
        </div>
    </div>
</template>
<script>
// JS Imports
// -- Vuex Helpers
import { mapState } from 'vuex'

// –– Dependencies
import event_bus from '../event.js';


// component definition
export default {
    computed: {
        search: {
            get(){
                return this.$store.state.user.search.query;
            },
            set(query){
                this.$store.dispatch('search_user', {query})
            }
        },
        ...mapState({
            results: state => state.user.search.results
        })
    },
    methods: {
        add_to_trip(user){
            if(this.$store.state.user.id != user.id) {
                this.$store.dispatch('add_user', {user_id: user.id})
            }
        },
        back() {
            event_bus.$emit('show_add_destination')
        }
    }
}
</script>
<style>
.UserSearchPanel {
    position: relative;
    width: 100%;
    height: 100%;
}

.UserSearchPanel .header,
.UserSearchPanel .footer {
    display: flex;
    align-items: center;
    width: 90%;
    height: 60px;
    margin: auto;

    line-height: 30px;
    font-size: 20px;
}

.UserSearchPanel .header .search-text,
.UserSearchPanel .header .lnr {
    display: block;
    height: 30px;
    border: none;
    border-bottom: 1px solid #69AEBB;
    box-sizing: border-box;
}

.UserSearchPanel
.header .search-text {
    flex-grow: 1;
}

.UserSearchPanel .header .search-text:focus,
.UserSearchPanel .header .search-text:focus + .lnr {
    border-color: #F9D068;
}

.UserSearchPanel
.header .search-text:focus + .lnr {
    color: #F9D068;
}

.UserSearchPanel
.header .lnr:before {
    vertical-align: middle;
    cursor: pointer;
}

.UserSearchPanel
.body {
    width: 100%;
    margin: 0;
    height: calc(100% - 60px*2);
    padding: 10px 0px;
    box-sizing: border-box;
    overflow: auto;
    list-style: none;
}


.UserSearchPanel
.body
.user {
    display: flex;
    width: 100%;
    padding: 10px 15px;
    box-sizing: border-box;

    color: #000;
    border-bottom: 1px solid #F1F1F1;
    background: #FFF;

    line-height: 20px;
    vertical-align: middle;
}

.UserSearchPanel
.body
.user:first-child {
    border-top: 1px solid #F1F1F1;
}

.UserSearchPanel
.body
.user:hover {
    background-color: #E8F8FB;
}

.UserSearchPanel
.body .user
.name {
    flex-grow: 1;
}

.UserSearchPanel
.body .user
.add {
    display: block;
    width: 50px;
    font-size: 18px;
    text-align: center;
}

.UserSearchPanel
.body .user
.add:hover {
    color: #F9D068;
    font-weight: bold;
    cursor: pointer;
}

.UserSearchPanel
.footer .back {
    text-align: center;
    width: 100%;
    border: 2px solid #69AEBB;
    padding: 5px 10px;
    cursor: pointer;
}

.UserSearchPanel
.footer .back:hover {
    background-color: #80CAD8;
    color: #FFF;
}

.UserSearchPanel .footer .back[disabled],
.UserSearchPanel .footer .back:hover[disabled] {
    background-color: #FFF;
    border-color: #CCC;
    color: #CCC;
    cursor: not-allowed;
}
</style>
