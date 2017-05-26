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
.TestPage {
    width: 100%;
    height: 100%;
    text-align: center;
    background-color: #FFFFFF;
    padding: 10px 50px;
    box-sizing: border-box;
}

.TestPage
ul {
    list-style-type: none;
    padding: 0;
}
</style>
