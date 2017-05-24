<template>
    <div class="TestPage">
        <input v-model.lazy="search">
        <ul>
            <li v-for="user in results">{{user.username}}</li>
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
