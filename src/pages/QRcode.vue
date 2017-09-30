<template>
<div class="follow_box">
    <h1>猪圈圈公众号</h1>
    <div class="qrcode"><img src="../assets/commen_qrcode.jpg"></div>
    <p>长按二维码，扫码即可关注我们</p>
</div>
    
</template>

<script>

export default {
  name: 'QRcode',
  data () {
    return {
	 
    }
  },
  methods:{
	 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.follow_box{
    width: 100%;
    height: 100%;
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    padding-top: 14vw;
}
.follow_box h1{
    font-size: 20px;
    text-align: center;
    line-height: 30px;
    margin:0 0 18px 0;
}
.follow_box .qrcode{
    width: 60%;
    width: 60vw;
    height: 60vw;
    margin:0 auto;
    margin-bottom: 16px;
}
.follow_box p{
    text-align: center;
    font-size: 15px;
    color: #666;
}
</style>
