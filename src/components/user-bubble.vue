<template>
<div class="UserBubble" :style="border_style">
    <div class="profile-img" :style="image_back" v-if="image"></div>
    <div class="profile-img" v-else>
        <span class="lnr lnr-user"></span>
    </div>
</div>
</template>

<script>
// Define Component
export default {
    props: {
        image: {
            type: String,
            default: null
        },
        color: {
            type: String,
            default: "#FFF"
        }
    },
    computed: {
        image_back() {
            return { backgroundImage: "url("+this.image+")" }
        },
        border_style() {
            return { borderColor: this.color }
        }
    }
}
</script>

<style>
.UserBubble {
    display: block;
    width: 80%;
    height: 80%;
    margin: auto;

    border: 2px solid #FFF;
    box-sizing: border-box;
    border-radius: 50%;
    overflow: hidden;
}

.UserBubble .profile-img {
    width: 100%;
    height: 100%;

    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

</style>
