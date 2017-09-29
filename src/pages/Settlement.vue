<template>
<div>
    <!-- 收货地址面板 -->
    <router-link tag="div" to="/address" class="adress_pannel">
        <div class="top flex_betwen">
            <div class="name">{{ addressMessage.name }}</div>
            <div class="phone">{{ addressMessage.phone }}</div>
        </div>
        <div class="bottom flex_betwen">
            <div class="icon_position"><img src="../assets/common_position_grey.png"></div>
            <div class="adress" :class="{'text_center':!addressMessage.haveDefault}">{{ addressMessage.address }}</div>
            <div class="icon_go"><img src="../assets/common_rightarrow_grey.png"></div>
        </div>
    </router-link>
    <div class="color_line"></div>

    <!-- 商品面板 -->
    <div class="pro_detail_pannel">
        <div class="flex_box flex_betwen">
            <div class="pic"><img :src="product.pic"></div>
            <div class="right_box">
                <div class="pro_name">{{ product.title }}</div>
                <div class="zhu_currency">可获得<span>{{ product.price }}</span>猪币</div>
                <div class="choice">{{ product.options }}</div>
            </div>
        </div>
    </div>

    <!-- 结算面板 -->
    <div class="settle_pannel">
        <div class="settle_list flex_betwen line_bottom">
            <div class="title">商品金额</div>
            <div class="price">￥{{ product.price }}</div>
        </div>
        <div class="settle_list flex_betwen line_bottom">
            <div class="title grey">运费</div>
            <div class="price grey">+￥{{ product.freight }}</div>
        </div>
        <div class="settle_list flex_betwen">
            <div class="title">总金额</div>
            <div class="price red">￥{{ product.freight+product.price }}</div>
        </div>
    </div>

    <!-- 底部提交bar -->
    <!-- 底部交易bar -->
    <div class="bottom_bar line_top">
        <div class="flex_bar flex_end">
            <div></div>
            <div class="btn buy_btn" @click="submitOrder">提交订单</div>
        </div>
    </div>

</div>
    
</template>

<script>
import { MessageBox,Indicator } from 'mint-ui';

export default {
  name:'Settlement',
  components:{
	  
  },
  data () {
    return {
	    addressMessage:{
		  phone:'',
		  name:'',
		  address:'点击添加收货地址',
		  id:'',
		  haveDefault:false
		},
		product:{
			pic:'',
			title:'',
			freight:0.00,
			price:0.00,
			options:''
		}
		
    }
      
  },
  computed:{
	  
  },
  methods:{
	  initAddress(){
		this.addressMessage.haveDefault=false;
		this.addressMessage.phone='';
		this.addressMessage.name='';
		this.addressMessage.id='',
		this.addressMessage.address='点击添加收货地址';
	  },
	  getAddress(){
		let token=this.getToken();
		if(!token){//如果没有token就直接跳到登录页面
			this.goSignIn();
			return;
		}
		this.$http.get(`http://api.lingkuaiyou.com/User/GetUserAddressList?token=${token}`).then(function(data){

			//console.log(data.body)
			if(data.body.result){//成功获取个人信息，这表明该用户登录成功

				let addresses=data.body.data.DataList;
				let len=addresses.length;
				for(let i=0;i<len;i++){
					if(addresses[i].IsDefault===0){
						continue;
					}else{
						let addr=this.addressMessage;
						addr.haveDefault=true;
						addr.phone=addresses[i].Mobile;
						addr.name=addresses[i].Name;
						addr.address=addresses[i].Details;
						addr.id=addresses[i].ID;
					}
				}
				if(len<1){
					this.initAddress()
				}
			}else{
				this.initAddress()
			}
		}).catch(function(err){
			console.log(err)
		})
	 },
	 getProduct(){
		  this.$http.get(`http://api.lingkuaiyou.com/Goods/GetGoodsInfo?id=${this.$route.params.productId}`)
		  .then((data)=>{
			  let body=data.body;
			  console.log(body)
			if(body.result){
				this.product.pic=body.data.Pic;
				this.product.title=body.data.Title;
				this.product.price=body.data.Price;
				this.product.options=decodeURIComponent(this.$route.params.options);
			}else{

			}
			
		  })
		  .catch((err)=>{
			  console.log(err);
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
		this.$router.push({
			path:'/sign/signIn',
			query: { redirect: this.$route.fullPath }
		});//'/sign/signIn'
	  },
	  submitOrder(){//提交订单
		let token=this.getToken();
		if(!token){//如果没有token就直接跳到登录页面
			this.goSignIn();
			return;
		}
		if(!this.submitValidation()){//如果没有填写默认地址的话直接返回
			return;
		}
		MessageBox.confirm('确定地址填写无误?').then(action=>{
			
			Indicator.open();
			console.log('开始提交订单')
			console.log(token)
			console.log(this.$route.params.productId)
			console.log(this.addressMessage.id)
			console.log(this.product.options)
			// console.log(this.addressMessage.id)
			// console.log(this.$route.params.options)
			
			this.$http.get(`http://api.lingkuaiyou.com/Order/PlaceOrder?token=${token}&goodsid=${this.$route.params.productId}&addressid=${this.addressMessage.id}&goodsoption=${encodeURIComponent(this.product.options)}`).then(function(data){
				Indicator.close();
				console.log(data.body)
				if(data.body.result){//表示订单生成成功
					this.$router.replace({
						path:`/payment/${data.body.data}/${this.product.price}`
					})
				}else{
					MessageBox('提示', data.body.message);
				}
			})
		}).catch(err=>{
			
		})
		
	  },
	  submitValidation(){
		  if(!this.addressMessage.haveDefault){
			  MessageBox('提示', '请添加收货地址');
			  return false;
		  }
		  return true;
	  }
  },
  created(){
	  this.getAddress();
	  this.getProduct();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/*收货地址面板*/
.adress_pannel .bottom .adress.text_center{
	text-align: center;
	font-size: 16px;
	line-height: 60px;
	font-weight: bold;
	color: #666;
	height: 60px;
}
.adress_pannel{
	background-color: #fff;
	width: 100%;
	width: 100vw;
	padding: 10px 0;
}
.adress_pannel .top{
	width: 80vw;
	margin:0 auto;
}
.adress_pannel .top .name{
	max-width: 34vw;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	font-size:18px;
	color: #051b28;
}
.adress_pannel .top .phone{
	max-width: 44vw;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	font-size:18px;
	color: #051b28;
}
.adress_pannel .bottom{
	margin-top: 8px;
	width: 100%;
	width: 100vw;
	padding: 0 2vw;
}
.adress_pannel .bottom .icon_position{
	width: 8vw;
	padding: 2px;
}
.adress_pannel .bottom .icon_go{
	width: 8vw;
	padding: 6px;
}
.adress_pannel .bottom .adress{
	width: 80vw;
	padding: 0 4px;
	color: #213540;
}
.color_line{
	background-image: url(../assets/color_line.jpg);
	background-repeat: repeat-x;
	background-size: auto 100%;
	width: 100%;
	height: 4px;
}
/*商品面板*/
.pro_detail_pannel{
	background-color: #fff;
	margin-top: 6px;
	padding: 10px 8px;
}
.pro_detail_pannel .flex_box{
	flex:1;
}
.pro_detail_pannel .pic{
	width: 28vw;
	height: 28vw;
}
.pro_detail_pannel .right_box{
	flex:1;
	height: 28vw;
	padding: 0 6px;
}
.pro_detail_pannel .right_box .pro_name{
	font-size: 14px;
	line-height: 20px;
	height: 40px;
	overflow: hidden;
	color: #383838;
}
.pro_detail_pannel .right_box .zhu_currency{
	color: #b2b2b2;
	font-size: 14px;
}
.pro_detail_pannel .right_box .zhu_currency span{
	color: #f9a109;
}
.pro_detail_pannel .right_box .choice{
	color: #999999;
	font-size: 12px;
}

/*结算面板*/
.settle_pannel{
	background-color: #fff;
	margin-top: 8px;
	padding-left: 18px;
	padding-right: 18px;
}
.settle_pannel .settle_list{
	padding:8px 4px;
}
.settle_pannel .settle_list .grey{
	font-size: 14px;
	color: #999999;
}
.settle_pannel .settle_list .red{
	color: #fa083a;
}














/*底部交易bar*/
.bottom_bar{
	position: fixed;
	bottom:0;
	left: 0;
	width: 100%;
	width: 100vw;
	height: 46px;
	background-color: #fff;
	z-index: 100;
}
.bottom_bar .flex_bar{
	width: 100%;
	height: 100%;
}
.bottom_bar .buy_btn{
	color: #fff;
    background-image: -webkit-linear-gradient(351deg, rgb(249,9,54) 0%, rgb(253,3,79) 100%);
    background-image: -o-linear-gradient(351deg, rgb(249,9,54) 0%, rgb(253,3,79) 100%);
    background-image: linear-gradient(81deg, rgb(249,9,54) 0%, rgb(253,3,79) 100%);
    width: 40%;
    width: 40vw;
    height: 100%;
    line-height: 46px;
    text-align: center;
}

</style>
