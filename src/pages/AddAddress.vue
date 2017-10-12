<template>
<div>
    <div class="form_box">
		<label class="list line_bottom">
			<input type="text" placeholder="收件人姓名" class="input_list" v-model="name" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;">
		</label>
		<label class="list line_bottom">
			<input type="text" placeholder="手机号" class="input_list" maxlength="11" v-model="phone" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9]+/,'');}).call(this)">
		</label>
		<label class="list line_bottom" @click="showLocation">
			<input type="text" placeholder="省 市 区" class="input_list" readonly='readonly' id="nono" :value="getPCA">
		</label>
		<textarea placeholder="详细地址" class="text_box" v-model="detail"></textarea>
	</div>

	<div class="add_btn" @click="submitTable">保存并使用</div>

	<mt-popup
  v-model="popupVisible"
  position="bottom">
			<div class="flex_betwen picker_top line_bottom">
				<div class="grey" @click="hideLocation">取消</div>
				<div class="red" @click="confirmPanel">确定</div>
			</div>
  		<mt-picker :slots="slots" @change="onValuesChange" valueKey='name'></mt-picker>
	</mt-popup>
	
</div>


</template>

<script>
import { MessageBox,Indicator } from 'mint-ui';

export default {
  name: 'AddAddress',
  data () {
    return {
			slots: [
        {
          flex: 1,
					values: [{name:'请选择省',id:''}],
          className: 'slot1',
					textAlign: 'center',
					defaultIndex:0
				},
				{
          flex: 1,
					values: [{name:'请选择市',id:''}],
          className: 'slot2',
					textAlign: 'center',
					defaultIndex:0
				},
				{
          flex: 1,
					values: [{name:'请选择区',id:''}],
          className: 'slot3',
					textAlign: 'center',
					defaultIndex:0
        }
			],
			popupVisible:false,

			//以下内容是需要提交的表单信息
			name:'',//收件人姓名
			phone:'',//手机号
			location:{
				province:{//省
					name:'',
					id:''
				},
				city:{//市
					name:'',
					id:''
				},
				area:{//区
					name:'',
					id:''
				}
			},
			detail:'',//详细地址
			addressID:false,//如果是修改地址需要该ID,如果为false表示添加地址

			//以下内容不提交，用来与省市区绑定的
			pannel:{
				province:{//省
					name:'',
					id:''
				},
				city:{//市
					name:'',
					id:''
				},
				area:{//区
					name:'',
					id:''
				}
			}
    }
	},
	computed:{
		getPCA(){
			return (this.location.province.name+" "+this.location.city.name+" "+this.location.area.name).trim();
		},
		noSpacePCA(){
			return (this.location.province.name+this.location.city.name+this.location.area.name).trim();
		}
	},
	watch:{
		'pannel.province.name':function(){
			this.slots[2].values.splice(1);
			this.getCitiesList(this.pannel.province.id);
		},
		'pannel.city.name':function(){
			this.getAreasList(this.pannel.city.id);
		}
	},
  methods:{
		//判断这是添加地址还是修改地址
		addOrChange(){
			let pars=this.$route.params;
			if(pars.id==='add'){//该页面为添加地址
				return;
			}
			this.name=decodeURIComponent(pars.name);
			this.phone=pars.mobile;

			this.location.province.name=pars.provinceN
			this.location.province.id=pars.province
			this.location.city.name=pars.cityN
			this.location.city.id=pars.city
			this.location.area.name=pars.areaN
			this.location.area.id=pars.area

			this.pannel.province.name=pars.provinceN
			this.pannel.province.id=pars.province
			this.pannel.city.name=pars.cityN
			this.pannel.city.id=pars.city
			this.pannel.area.name=pars.areaN
			this.pannel.area.id=pars.area
			
			this.detail=pars.address.replace(this.noSpacePCA,'')
      
		},
		//显示 省市区面板
    showLocation(){
      this.popupVisible=true;
		},
		hideLocation(){
      this.popupVisible=false;
		},
		//picker面板事件触发时执行
		onValuesChange(picker, values) {
			try{
				this.pannel.province.name=values[0].name || '';
				this.pannel.province.id=values[0].id || '';
				this.pannel.city.name=values[1].name || '';
				this.pannel.city.id=values[1].id || '';
				this.pannel.area.name=values[2].name || '';
				this.pannel.area.id=values[2].id || '';
			}catch(e){
				//console.log(e)
			}
			
			// this.getCitiesList(this.pannel.province.id);
			// this.getAreasList(this.pannel.city.id);
			
		},
		getProvincesList(){
			// let provinceid=id || false;
			// let url=`http://api.lingkuaiyou.com/User/GetProvincesList`
			// if(provinceid){
			// 	url+=`?id=${provinceid}`
			// }
			this.$http.get(`http://api.lingkuaiyou.com/User/GetProvincesList`).then(function(data){
				//console.log(data.body)
				if(data.body.result){//成功获取个人信息，这表明该用户登录成功
					let ds=data.body.data;
					let len=ds.length;
					for(let i=0;i<len;i++){
						let temp={
							name:'',
							id:'',
						}
						temp.name=ds[i].Province;
						temp.id=ds[i].Provinceid;
						this.slots[0].values.push(temp);
					}
				}else{
					//this.goSignIn();
				}
			}).catch(function(err){
				throw(err)
			})
		},
		getCitiesList(id){
			this.slots[1].values.splice(1)
			this.$http.get(`http://api.lingkuaiyou.com/User/GetCitiesList?id=${id}`).then(function(data){
				//console.log(data.body)
				if(data.body.result){//成功获取个人信息，这表明该用户登录成功
					let ds=data.body.data;
					let len=ds.length;
					for(let i=0;i<len;i++){
						let temp={
							name:'',
							id:'',
						}
						temp.name=ds[i].City;
						temp.id=ds[i].Cityid;
						this.slots[1].values.push(temp);
					}
				}else{
					//this.goSignIn();
				}
			}).catch(function(err){
				console.log(err)
			})
		},
		getAreasList(id){
			this.slots[2].values.splice(1)
			this.$http.get(`http://api.lingkuaiyou.com/User/GetAreasList?id=${id}`).then(function(data){
				//console.log(data.body)
				if(data.body.result){//成功获取个人信息，这表明该用户登录成功
					let ds=data.body.data;
					let len=ds.length;
					for(let i=0;i<len;i++){
						let temp={
							name:'',
							id:'',
						}
						temp.name=ds[i].Area;
						temp.id=ds[i].Areaid;
						this.slots[2].values.push(temp);
					}
				}else{
					//this.goSignIn();
				}
			}).catch(function(err){
				console.log(err)
			})
		},
		confirmPanel(){
			let validatePanel=()=>{//该验证函数验证除了exceptPro内的其他省都必须选择市和区
				let nowPro=this.pannel.province.name;
				let nowCity=this.pannel.city.name;
				let nowArea=this.pannel.area.name;
				let exceptPro=['台湾省','香港特别行政区','澳门特别行政区']
				if(exceptPro.some(function(a){return a===nowPro})){
					return 'special';
				}
				if(nowCity!=='请选择市'){
					if(nowArea!=='请选择区'){
						return true;
					}else{
						return false;
					}
				}else{
					return false;
				}
			}
			let valid=validatePanel();
			if(valid==='special'){
				this.location.province.name=this.pannel.province.name
				this.location.province.id=this.pannel.province.id
				this.popupVisible=false;
				return;
			}
			if(valid){
				this.location.province.name=this.pannel.province.name
				this.location.province.id=this.pannel.province.id

				this.location.city.name=this.pannel.city.name
				this.location.city.id=this.pannel.city.id

				this.location.area.name=this.pannel.area.name
				this.location.area.id=this.pannel.area.id
			}
			this.popupVisible=false;
		},
		submitValidate(){//提交时要验证下详细
			let table=['收件人姓名','手机号','省市区','详细地址'];
			let temp=[];
			if(this.name===''){
				temp.push('收件人姓名');
			}
			if(this.phone===''){
				temp.push('手机号');
			}
			if(this.location.province.name===''){
				temp.push('省市区');
			}
			if(this.detail===''){
				temp.push('详细地址');
			}
			let temj=temp.join(' ');
			if(temj.trim()){
				let text=temj+' 不能为空';
				MessageBox(' ', text);
				return false;
			}

			let myreg=/^1[0-9]{10}$/
			if(this.phone.length<11 || !myreg.test(this.phone)){
				MessageBox(' ', '请填写正确的手机号');
				return false;
			}
			return true;
		},
		submitTable(){

			if(!this.submitValidate()){//验证没通过 return
				return;
			}
			let token=this.getToken()
			//console.log(token)
			if(!token){//本地没token return 并跳转到登录页面
				this.goSignIn();
				return;
			}

			let combineAddress=this.noSpacePCA+this.detail;
			let changeParam=this.$route.params.id;
			let goUrl=`http://api.lingkuaiyou.com/User/EditUserAddress?token=${token}&provinceid=${this.location.province.id}&cityid=${this.location.city.id}&areaid=${this.location.area.id}&name=${this.name}&mobile=${this.phone}&details=${combineAddress}`;
			//console.log('接受到的id为'+changeParam)
			if(changeParam!=='add'){//如果本页$route的参数id不为add即表示修改地址，应在请求的地址后面加上参数id
				goUrl+=`&id=${changeParam}`
			}
			Indicator.open();
			this.$http.get(goUrl).then(function(data){
				Indicator.close();
				console.log(data.body)
				if(data.body.result){//成功获取个人信息，这表明该用户登录成功
					this.$router.replace({
						path:'/address'
					});

				}else{
					MessageBox(' ', data.body.message);
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
	  }
  },
  created(){
		this.addOrChange();
    this.getProvincesList();
  }

}

</script>

<style scoped>
.picker_top{
	padding:0 10px;
	height: 40px;
	line-height: 40px;
	font-size: 14px;
	text-align: center;
	background-color: #fff;
}
.picker_top .grey{
	width: 60px;
	color: #b2b2b2;
}
.picker_top .red{
	width: 60px;
	color: #fc0449;
}
.add_btn{
	background-color: #fc0548;
	height: 50px;
	color: #fff;
	text-align: center;
	line-height: 50px;
	font-size: 16px;
	position: fixed;
	left: 0;
	bottom:0;
	width: 100%;
	width: 100vw;
}
.form_box{
	background-color: #fff;
	padding-bottom:16px;
}
.form_box .list{
	height: 44px;
	width: 94%;
	width: 94vw;
	display: block;
	margin:0 auto;
	margin-bottom: 3px;
}
.form_box .list .input_list{
	color: #383838;
	font-size: 15px;
	height: 44px;
	line-height: 44px;
	width: 94%;
	width: 94vw;
	outline: none;
}
.form_box .text_box{
	width: 94%;
	width: 94vw;
	margin:0 auto;
	display:block;
	outline: none;
	margin-top:6px;
	resize:none;
	font-size: 15px;
	color: #383838;
	line-height:20px;
	min-height: 100px;
	border:none;
}
</style>
