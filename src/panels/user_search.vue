<template>
    <div class="UserSearchPanel">
        <input v-model="search">
        <ul>
            <li v-for="user in results" @click="add_to_trip(user)">{{user.username}}</li>
        </ul>
    </div>
</template>
<script>
// load vuex store
import { mapState } from 'vuex'
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
            if(this.$store.state.user.id != user.id)
                this.$store.dispatch('add_user', {user_id: user.id})
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
    height: calc(100% - 60px);
    padding: 10px 0px;
    box-sizing: border-box;
    overflow: auto;
    list-style: none;
}


.UserSearchPanel
.body
.destination {
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
.destination:first-child {
    border-top: 1px solid #F1F1F1;
}

.UserSearchPanel
.body
.destination:hover {
    background-color: #E8F8FB;
}

.UserSearchPanel
.body .destination
.name {
    flex-grow: 1;
}

.UserSearchPanel
.body .destination
.add {
    display: block;
    width: 50px;
    font-size: 18px;
    text-align: center;
}

.UserSearchPanel
.body .destination
.add:hover {
    color: #F9D068;
    font-weight: bold;
    cursor: pointer;
}
</style>
