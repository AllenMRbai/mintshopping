<template>
<div>
    <div class="list_box">
		<div class="list flex_betwen dashed_bottom">
			<div class="black">订单编号</div>
			<div class="black">YJ10607101504068870937</div>
		</div>
		<div class="list flex_betwen">
			<div class="grey">应付金额</div>
			<div class="red">￥<span>126.00</span></div>
		</div>
	</div>
	
	<div class="pay_title line_bottom">请选择支付方式</div>
	<div class="radio_list_box">
		<label class="list flex_betwen line_bottom">
			<div class="icon"><img src="../assets/wechat.jpg"></div>
			<div class="my_radio active">
				<input type="radio" value='0' name="pay-method" checked="true" style="display: none;">
				<img src="../assets/common_hook_white.png">
			</div>
		</label>
		<label class="list flex_betwen">
			<div class="icon"><img src="../assets/alipay.jpg"></div>
			<div class="my_radio">
				<input type="radio" value='0' name="pay-method" style="display: none;">
				<img src="../assets/common_hook_white.png">
			</div>
		</label>
	</div>
	
	<mt-button type="primary" size="large" style="background-color:#ee2532;width: 90%;margin:0 auto;">立即支付</mt-button>
</div>
    
</template>

<script>

export default {
  name:'Payment',
  components:{
	  
  },
  data () {
    return {
        
    }
      
  },
  computed:{
	  
  },
  methods:{
	  
  },
  created(){
     //获得当前路由的name
     var asd=this.$route;
     console.log(asd)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*订单编号盒子*/
.list_box{
	background-color: #fff;
	margin-top: 10px;
	padding: 0 10px;
}
.list_box .list{
	padding: 0 10px;
	height: 40px;
	padding: 0 6px;
}
.list_box .dashed_bottom{
	border-bottom: 1px dashed #ebebeb;
}
.list_box .grey{
	color: #999999;
}
.list_box .red{
	color: #dd3c34;
	font-weight: bold;
}
.list_box .black{
	font-weight: bold;
	color: #333333;
	font-size: 16px;
}

/*选择支付方式*/
.pay_title {
	background-color: #fff;
	height: 34px;
	line-height: 34px;
	padding-left: 10px;
	color: #9a9a9a;
	margin-top: 24px;
	font-size: 14px;
}

.radio_list_box{
	background-color: #fff;
	padding-left: 16px;
	margin-bottom: 50px;
}
.radio_list_box .list{
	height: 54px;
	padding:0 4px;
	padding-right: 20px;
}
.radio_list_box .icon{
	width: 40px;
	height: 40px;
	overflow: hidden;
	border-radius: 4px;
}
.radio_list_box .my_radio{
	width: 24px;
	height: 24px;
	border-radius: 50%;
	padding: 4px;
	border:1px solid #b0b0b0;
}
.radio_list_box .my_radio.active{
	background-color: #ee2532;
	border:none;
}
</style>
