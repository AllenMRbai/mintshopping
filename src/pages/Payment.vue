<template>
<div>
    <div class="list_box">
		<div class="list flex_betwen dashed_bottom">
			<div class="black">订单编号</div>
			<div class="black order_id">{{ this.$route.params.orderId }}</div>
		</div>
		<div class="list flex_betwen">
			<div class="grey">应付金额</div>
			<div class="red">￥<span>{{ this.$route.params.price }}</span></div>
		</div>
	</div>
	
	<div class="pay_title line_bottom">请选择支付方式</div>
	<div class="radio_list_box">
		<label class="list flex_betwen line_bottom" v-if="payWay==='wechat'">
			<div class="icon"><img src="../assets/wechat.jpg"></div>
			<div class="my_radio active">
				<input type="radio" value='0' name="pay-method"  style="display: none;">
				<img src="../assets/common_hook_white.png">
			</div>
		</label>
		<label class="list flex_betwen" v-if="payWay==='alipay'">
			<div class="icon"><img src="../assets/alipay.jpg"></div>
			<div class="my_radio active">
				<input type="radio" value='0' name="pay-method"  style="display: none;">
				<img src="../assets/common_hook_white.png">
			</div>
		</label>
	</div>
	
	<mt-button type="primary" size="large" style="background-color:#ee2532;width: 90%;margin:0 auto;" @click="payIt">立即支付</mt-button>
</div>
    
</template>

<script>
import { MessageBox,Indicator } from 'mint-ui';

export default {
  name:'Payment',
  components:{
	  price:0
  },
  data () {
    return {
        payWay:''//该值为wechat或alipay。微信浏览器为微信支付，其他浏览器为支付宝
    }
      
  },
  computed:{
	  
  },
  methods:{
	//判断浏览器类型
	showWich(){
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i)=="micromessenger") {//如果是微信网页，显示微信支付
			return 'wechat';
		} else {//如果不是微信网页，显示支付宝
			return 'alipay';
		}
	},
	//支付按钮
	payIt(){
		let now=this.payWay;

		if(now==='wechat'){
			this.wechatInterface();//微信支付
		}else if(now==='alipay'){
			this.alipayInterface();//支付宝支付
		}else{
			MessageBox('提示', '支付页面出错，请稍等一会再点击支付');
		}
	},
	//支付宝支付接口
	alipayInterface(){

		let token=this.getToken();//获取token
		if(!token){//如果没有token就直接跳到登录页面
			this.goSignIn();
			return;
		}
		
		let id=this.$route.params.orderId;
		Indicator.open();
		this.$http.get(`http://api.lingkuaiyou.com/Order/Alipay_WEB?id=${id}&token=${token}`).then(data=>{
			Indicator.close();

			console.log('支付宝支付中')
			console.log(data)
			document.write(data.body.data);
		}).catch(err=>{
			throw(err)
		})
	},
	//微信支付接口
	wechatInterface(){
		MessageBox('提示', '这是微信支付');
	},
	//获得本地的token
	getToken(){
		let token=localStorage.getItem('token');
		if(token===null || token===''){
			return false;
		}
		return encodeURIComponent(token);
	},
	//跳转到登录页面
	goSignIn(){
		this.$router.push({
			path:'/sign/signIn',
			query: { redirect: this.$route.fullPath }
		});//'/sign/signIn'
	},
  },
  created(){
	  this.payWay=this.showWich();
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
	font-weight: normal;
	color: #333333;
	font-size: 14px;
}
.list_box .order_id{
	max-width: 180px;
	word-wrap: break-word;
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
