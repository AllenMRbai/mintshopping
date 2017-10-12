<template>
<div>
  <div class="me_background">
		<div class="me_pannel">
			<div class="flex_box flex_start">
				<div class="sculpture" @click="goSignIn"><img :src="user.sculp"></div>
				<div class="name"  @click="goSignIn">{{ user.nickName }}</div>
			</div>
			
		</div>
	</div>
	
	<div class="cell_pannel">
		<div class="top flex_betwen line_bottom">
			<h4>我的订单</h4>
			<div class="flex_end">
				<router-link tag="div" class="grey" to="/orders/allOrders">查看全部</router-link>
				<div class="grey_arrow"><img src="../assets/common_rightarrow_grey.png"></div>
			</div>
		</div>
		<ul class="order_box flex_betwen">

      <template v-for="(order,index) in orders" >
        <router-link class="btn" :key="index" tag="li" :to="order.link">
          <div class="order_icon" :class="'order_'+index">
            <div class="red_bot" v-if="order.dot">{{ order.dot }}</div>
          </div>
          <p>{{ order.title }}</p>
        </router-link>
        <li class="line_right" :key="index" v-if="index!==(orders.length-1)"></li>
      </template>

		</ul>
	</div>

	<div class="cell_pannel">
		<div class="top line_bottom">
			<h4>其他</h4>
		</div>

		<router-link tag="div" :to="opt.link" class="lists_box" v-for="(opt,index) in options" :key="index">
			<div class="list flex_betwen">
				<div class="icon"><img :src="opt.icon"></div>
				<div class="right flex_betwen" :class="{'line_bottom':index!==(options.length-1)}">
					<div class="title">{{ opt.title }}</div>
					<div class="arrow"><img src="../assets/common_rightarrow_black.png"></div>
				</div>
			</div>

		</router-link>
	</div>

	<div class="blanck_space" style="height: 50px;"></div>
</div>
    
</template>

<script>

export default {
  name: 'me',
  data () {
    return {
	  user:{
		  sculp:'../../static/img/sculp_default.jpg',
		  nickName:'点击登录',
		  haveSignIn:false
	  },
      orders:[
        {title:'待付款',dot:0,link:'/orders/pendingPayment'},
        {title:'待发货',dot:0,link:'/orders/pendingShipment'},
        {title:'已发货',dot:0,link:'/orders/shipped'},
        {title:'退货/退款',dot:0,link:'/orders/allOrders'}
      ],
      options:[
        {title:'收货地址管理',icon:require('../assets/me_icons_5.jpg'),link:'/address'},
        {title:'关注公众号',icon:require('../assets/me_icons_4.jpg'),link:'/theOther/QRcode'},
        {title:'密码修改',icon:require('../assets/me_icons_3.jpg'),link:'/sign/alter1'},
        {title:'用户反馈',icon:require('../assets/me_icons_2.jpg'),link:'/theOther/feedback'},
        {title:'帮助',icon:require('../assets/me_icons_1.jpg'),link:'/theOther/help'},
      ]
    }
  },
  methods:{
	  getDot(){//获取各个状态的订单有几个
		  let token=this.getToken();
		  if(!token){
			  return;
		  }
		  //console.log(token)
		  this.$http.get(`http://api.lingkuaiyou.com/Order/GetOrderStatusNum?token=${token}`).then(function(data){
			//let body=JSON.parse(data.bodyText);
			console.log(data.body)
			if(data.body.result){//成功获取个人信息，这表明该用户登录成功
				//MessageBox('提示', '登录成功！');
				//console.log(body.data);
				//localStorage.setItem("token",body.data);
				//this.$router.replace('/me');
				this.orders[0].dot=data.body.data.ToPay;
				this.orders[1].dot=data.body.data.ToDelivery;
				this.orders[2].dot=data.body.data.ToReceipt;
				//this.orders[3].dot=data.body.data.ToPay;
			}else{
				//this.goSignIn();
			}
			}).catch(function(err){
				throw(err)
			})
	  },
	  getUser(){//获得用户个人信息
		  let token=this.getToken();
		  if(!token){
			  return;
		  }
		  this.user.haveSignIn=true;
		  this.user.nickName='加载中...';
		  //console.log(token)
		  this.$http.get(`http://api.lingkuaiyou.com/User/GetUserInfoInfo?token=${token}`).then(function(data){
			//let body=JSON.parse(data.bodyText);
			//console.log(data.body)
			if(data.body.result){//成功获取个人信息，这表明该用户登录成功
				//MessageBox('提示', '登录成功！');
				//console.log(body.data);
				//localStorage.setItem("token",body.data);
				//this.$router.replace('/me');
				this.user.haveSignIn=true;
				this.user.nickName=data.body.data.NickName || data.body.data.UserName || '您还未设置昵称';
				this.user.sculp='../../static/img/sculp_cat.jpg';
			}else{
				//this.goSignIn();
				this.user.haveSignIn=false;
				this.user.nickName='点击登录';
				this.user.sculp='../../static/img/sculp_default.jpg';
			}
		  }).catch(function(err){
			throw(err)
		  })
	  },
	  getToken(){//获得本地的token
		let token=localStorage.getItem('token');
		if(token===null || token===''){
			return false;
		}
		return encodeURIComponent(token);
	  },
	  goSignIn(){//跳转到登录页面
	  	if(this.user.haveSignIn){//如果已经登录的话，就不会跳转的登录界面
		  return;
		}
		this.$router.push({
			path:'/sign/signIn',
			query: { redirect: this.$route.fullPath }
		});//'/sign/signIn'
	  }
  },
  created:function(){
	  this.getDot();
	  this.getUser();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*头部个人信息面板*/
body{
	background-color: #f0f0f0;
}
.me_background{
	width: 100%;
	height: 120px;
	background-image: url('../assets/me_backgroundimg.jpg');
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 0 0;
	position: relative;
	margin-bottom: 60px;
}
.me_pannel{
	width: 92vw;
	height: 120px;
	background-color: #fff;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	padding: 10px;
	box-shadow: 0px 3px 8px 0px rgba(32, 32, 32, 0.05);
	position: absolute;
	left: 4vw;
	bottom:-40px;
}
.me_pannel .flex_box{
	padding:6px;
}
.me_pannel .sculpture{
	width: 74px;
	height: 74px;
	border-radius: 50%;
	border:3px solid #fff;
	box-shadow: 0px 2px 6px 0px rgba(32, 32, 32, 0.22);
	overflow:hidden;
}
.me_pannel  .name{
	color:#333333;
	margin-left: 10px; 
}

/*cell_box的身体和头部*/
.cell_pannel{
	width: 92vw;
	margin:0 auto;
	background-color: #fff;
	margin-bottom: 20px;
	box-shadow: 0px 1px 10px 0px rgba(32, 32, 32, 0.05);
}
.cell_pannel .top{
	height: 32px;
	margin:0 auto;
	width: 96%;
}
.cell_pannel h4{
	font-weight: normal;
	color:#333333;
	line-height: 32px;
}
.cell_pannel .top .grey{
	color: #999999;
}
.cell_pannel .top .grey_arrow{
	width: 14px;
	height: 14px;
	margin-left: 3px;
}

/*我的订单*/
.order_box{
	padding:18px 0 6px 0;
}
.order_box .btn{
	width: 22vw;

}
.order_box .btn p{
	text-align: center;
	color: #666666;
	font-size: 12px;
}
.order_box .line_right{
	height: 16vw;
	background-color: #ebebeb;
	width: 1px;
}
.order_box .order_icon{
	margin:0 auto;
	width: 10vw;
	height: 10vw;
	position: relative;
	background-image: url('../assets/me_order_icon.jpg');
	background-repeat: no-repeat;
	background-size: 100% auto;
	margin-bottom: 3px;
}
.order_box .order_icon.order_0{
	background-position: 0 33.3333333333%;
}
.order_box .order_icon.order_1{
	background-position: 0 0;
}
.order_box .order_icon.order_2{
	background-position: 0 66.666666666%;
}
.order_box .order_icon.order_3{
	background-position: 0 99.999999999%;
}
.order_box .order_icon .red_bot{
	width: 18px;
	height: 18px;
	color: #fff;
	background-color: #dd1028;
	border:1px solid #000000;
	font-size: 12px;
	text-align: center;
	line-height: 18px;
	border-radius: 50%;
	white-space: nowrap;
	overflow:hidden;
	text-overflow: ellipsis;
	position: absolute;
	top: -5px;
	right:-5px;
}

/*其他*/
/* .lists_box{

} */
.lists_box .list{
	height: 44px;
	flex:1;
}
.lists_box .icon{
	height: 40px;
	width: 40px;
	padding:6px;
	margin-left: 1px;
	margin-right: 3px;

}
.lists_box .right{
	padding: 0 6px;
	height: 44px;
	flex:1;
}
.lists_box .right .title{
	color: #666666;
}
.lists_box .right .arrow{
	width: 18px;
	height: 18px;
}
</style>
