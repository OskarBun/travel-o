<template>
    <div class="MainPage">
        <div class="intro">
            <div class="flag flag-one">
                <icon fill="#F9D068"></icon>
                <div class="info-box">
                    <div class="info-border">
                        <div class="title">Collaborate</div>
                        <div class="info">Invite your friends and family to organise your travels together.</div>
                    </div>
                </div>
            </div>
            <div class="flag flag-two">
                <icon fill="#F96868"></icon>
                <div class="info-box">
                    <div class="info-border">
                        <div class="title">Plan</div>
                        <div class="info">Choose your destinations and plan your route.</div>
                    </div>
                </div>
            </div>
            <div class="flag flag-three">
                <icon fill="#76D358"></icon>
                <div class="info-box">
                    <div class="info-border">
                        <div class="title">Travel</div>
                        <div class="info">Bring your travel plan with you and get going on your new adventure.</div>
                    </div>
                </div>
            </div>
            <div class="start">
                <router-link class="title start-link" :to="{ name:'map' }">Plan a Trip</router-link>
            </div>
        </div>
    </div>
</template>


<script>
// JS Imports
// –– Components
import Icon from '../components/icon.vue'


export default {
    components: {
        'icon': Icon,
    }
}
</script>


<style>
.MainPage {
    position: relative;
    width: 100%;
    height: 100%;
}

.MainPage
.intro {
    display: block;
    width: 100%;
    height: auto;
    margin: auto;
}

.MainPage
.flag {
    position: absolute;
    width: 100px;
    height: 100px;
}

.MainPage .flag.flag-one   { top: 10%; left: 15%;  }
.MainPage .flag.flag-two   { top: 25%; left: 45%;  }
.MainPage .flag.flag-three { top: 10%; right: 15%; }

.MainPage
.info-box {
    position: absolute;
    top: 100%;
    right: calc(-200px / 2);

    width: 250px;
    border: 2px solid #FFF;
}

.MainPage
.info-border {
    background: #FFF;
    border: 2px solid #69AEBB;
    padding: 10px 15px;
}

.MainPage
.info-box
.title {
    color: #F9D068;
}

.MainPage
.start {
    position: absolute;
    left: 0; bottom: 20%;
    width: 100%;
    text-align: center;
}

.MainPage
.start
.start-link {
    display: inline-block;
    background: #69AEBB;
    padding: 10px 15px;
    border: 2px solid #FFF;
    color: #FFF;
}

.MainPage
.start
.start-link:hover {
    background: #80CAD8;
    color: #FFF;
}

</style>
