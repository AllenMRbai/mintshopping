<template>
<div>
    <mt-swipe :auto="0" style="height:100px;">
			<mt-swipe-item class="swip_item" style="background-color:red">1</mt-swipe-item>
			<mt-swipe-item class="swip_item" style="background-color:green">2</mt-swipe-item>
			<mt-swipe-item class="swip_item" style="background-color:blue">3</mt-swipe-item>
		</mt-swipe>
    <div class="hot">这是个人中心</div>

</div>
    
</template>

<script>

export default {
  name: 'me',
  components:{

  },
  data () {
    return {
      
    }
  },
  created:function(){

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .hot{
     margin-top: 60px;
     font-size: 20px;
     text-align: center;
     color:red;
 }
 .swip_item{
   text-align: center;
   color:#fff;
   font-size: 20px;
   font-weight: bold;
   line-height: 100px;
 }
</style>
