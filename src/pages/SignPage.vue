<template>
<div class="white_bg">
    <transition name="go" mode="out-in" appear>
        <keep-alive> 
            <router-view></router-view>
        </keep-alive>
    </transition>  
</div>
    
</template>

<script>

export default {
  name: 'SignPage',
  data () {
    return {
      
    }
  },
  methods:{

  },
  computed:{

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.go-enter-active, .go-leave-active {
  transition: all .3s
}
.go-enter, .go-leave-to{
  transform: translateX(100vw);
}

.white_bg{
   width: 100%;
   width: 100vw;
   height: 100vh;
   background-color: #fff;
   overflow-x: hidden;
   overflow-y: scroll;
   -webkit-overflow-scrolling: touch; 
}
</style>
