<template>
<div>
    <div class="address_pannel" v-if="!showDefault">
		<div class="address_card" v-for="(card,index) in addressCards" :key="card.ID">
			<div @click="editAddress(card)">
				<div class="top flex_betwen">
					<div class="name">{{ card.Name }}</div>
					<div class="phone">{{ card.Mobile }}</div>
				</div>
				<div class="address">{{ card.Details }}</div>
			</div>
			<div class="bottom flex_betwen line_top">
				<div class="set_btn flex_start" :class="{'active':card.IsDefault===1}" @click="setDefault(card.ID,index,card)">
					<div class="square"><img src="../assets/common_hook_white.png"></div>
					<div class="title" v-if="card.IsDefault===0">设为默认</div>
					<div class="title" v-else>默认地址</div>
				</div>
				<div class="bottom_right flex_end">
					<div class="pic_btn flex_center" @click="editAddress(card)">
						<div class="icon"><img src="../assets/edit_icon.png"></div>
						<div class="title">编辑</div>
					</div>
					<div class="pic_btn flex_center">
						<div class="icon"><img src="../assets/garbage_icon.png"></div>
						<div class="title" @click="removeAddress(card.ID,index)">删除地址</div>
					</div>
				</div>
			</div>
		</div>

	</div>
	<div v-else>
		<div class="default_pic"><img src="../assets/default_noposition.png"></div>
		<div class="default_title">您还未添加任何地址</div>
	</div>

	<div style="height:50px;"></div>

	<router-link tag="div" to="/address/addAddress/add" class="add_btn flex_center line_top">
		<div class="add_icon"><img src="../assets/common_add_red.jpg"></div><div>添加地址</div>
	</router-link>
</div>
</template>

<script>
import { MessageBox,Indicator } from 'mint-ui';

export default {
  name: 'ManageAddress',
  data () {
    return {
		addressCards:[],
		showDefault:false,
    }
  },
  methods:{
	  getAddresses(){
		let token=this.getToken();
		if(!token){//如果没有token就直接跳到登录页面
			this.goSignIn();
			return;
		}
		this.$http.get(`http://api.lingkuaiyou.com/User/GetUserAddressList?token=${token}`).then(function(data){
			//let body=JSON.parse(data.bodyText);
			console.log(data.body)
			if(data.body.result){//成功获取个人信息，这表明该用户登录成功
				//MessageBox('提示', '登录成功！');
				//console.log(body.data);
				//localStorage.setItem("token",body.data);
				//this.$router.replace('/me');
				let addresses=data.body.data.DataList;
				let len=addresses.length;
				for(let i=0;i<len;i++){
					this.addressCards.push(addresses[i])
				}
				if(len<1){
					this.showDefault=true;
				}
			}else{
				//this.goSignIn();
			}
		}).catch(function(err){
			console.log(err)
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
	  removeAddress(id,ind){
		MessageBox.confirm('确定删除该地址?').then(action => {
			let token=this.getToken()
			if(!token){//本地没token return 并跳转到登录页面
				this.goSignIn();
				return;
			}
			Indicator.open();
			this.$http.get(`http://api.lingkuaiyou.com/User/DelUserAddress?token=${token}&id=${id}`).then(function(data){
				Indicator.close();
				if(data.body.result){//删除成功
					this.addressCards.splice(ind,1);
				}else{
					MessageBox(' ', data.body.message);
				}
			})
		}).catch(function(err){

		});
	  },
	  setDefault(id,ind,card){//设为默认
	  	if(card.IsDefault===1){
			  return;
		  }
	    let token=this.getToken()
		if(!token){//本地没token return 并跳转到登录页面
			this.goSignIn();
			return;
		}
		Indicator.open();
		this.$http.get(`http://api.lingkuaiyou.com/User/SetDefault?token=${token}&id=${id}`).then(function(data){
			Indicator.close();
			if(data.body.result){//设置成功
				let cards=this.addressCards
				let len=cards.length;
				for(let i=0;i<len;i++){
					if(i===ind){
						cards[i].IsDefault=1;
					}else{
						cards[i].IsDefault=0;
					}
				}
			}else{
				MessageBox(' ', data.body.message);
			}
		})
	  },
	  editAddress(card){//编辑地址
		  let name=encodeURIComponent(card.Name);
		  let address=encodeURIComponent(card.Details);
		  this.$router.push({
			path:`/address/addAddress/${card.ID}/${name}/${card.Mobile}/${address}/${card.Provinceid}/${card.Cityid}/${card.Areaid}/${card.ProvinceName}/${card.CityName}/${card.AreaName}`
		  });
	  }
	},
  created(){
	  this.getAddresses();
  }

}

</script>

<style scoped>
/* 缺省页面 */
.default_pic{
	width: 70%;
	margin:0 auto;
	margin-top:4vh;
	opacity: .7;
}
.default_title{
	text-align: center;
	color: #c0c1c2;
	font-size: 16px;
}

.add_btn{
	background-color: #fff;
	width: 100%;
	width: 100vw;
	height: 50px;
	position: fixed;
	left: 0;
	bottom: 0;
	color: #fc0449;
	font-size: 18px;
}
.add_btn .add_icon{
	width: 16px;
	height: 16px;
	margin-right:6px;
}

/*地址卡片*/
.address_card{
	background-color: #fff;
	margin-bottom: 10px;
}
.address_card .top{
	height: 36px;
	padding: 0 8px;
}
.address_card .top>div{
	color:#213540;
	font-weight: bold;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.address_card .top .name{
	width: 40vw
}
.address_card .top .phone{
	width: 50vw;
	text-align: right;
}
.address_card .address{
	color: #666666;
	padding: 18px 8px;
	padding-top:08px;
}
.address_card .bottom{
	width: 96vw;
	margin:0 auto;
	height: 40px;
	padding:0 3px;
}
.address_card .bottom .title{
	color: #213540;
}
.address_card .set_btn{
	height: 40px;
}

.address_card .set_btn .square{
	width: 16px;
	height: 16px;
	border-radius: 2px;
	padding:2px;
	border:1px solid #213540;
	margin-right: 3px;
}
.address_card .set_btn.active .square{
	background-color: #fc0449;
	border:none;
}
.address_card .set_btn.active .title{
	color:#fc0449;
}
.address_card .bottom .pic_btn{
	margin-left: 20px;
	height: 40px
}
.address_card .bottom .icon{
	width: 16px;
	height: 16px;
	margin-right: 2px;

}
</style>
