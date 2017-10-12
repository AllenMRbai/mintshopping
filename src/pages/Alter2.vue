<template>
<div>
  <div class="title">验证码已发送至</div>
  <div class="title2">+86 <span>{{ ChangePasswordPhone }}</span></div>
 
  <div class="input_box">
    <validation-bar placeholder="验证码" @text-change="getVerifyCode" :phone="ChangePasswordPhone"></validation-bar>
    <password-bar placeholder="输入新密码" @text-change="getPassword"></password-bar>
  </div>

  <div class="sign_in" @click="login" :class="{'active':canNext}">完成</div>

</div>
</template>

<script>
import ValidationBar from '@/components/ValidationBar'
import PasswordBar from '@/components/PasswordBar'
import { MessageBox,Indicator } from 'mint-ui';
import { md5 } from '@/assets/js/tools.js'

export default {
  name: 'Alter2',
  components:{
    ValidationBar,
    PasswordBar
  },
  data () {
    return {
      password:'',
      verifyCode:''
    }
  },
  methods:{
    getPassword:function(text){
      this.password=text;
    },
    getVerifyCode:function(text){
      this.verifyCode=text;
    },
    login:function(){
      if(!this.canNext){
        return;
      }
      var wrongMessage=this.frontValidate()
      if(!wrongMessage){
        let md5_password=md5(this.password);
        //console.log(md5_password);
        this.$http.get(`http://api.lingkuaiyou.com/User/FindPassword?mobile=${this.ChangePasswordPhone}&code=${this.verifyCode}&password=${md5_password}`).then(function(data){
          let body=JSON.parse(data.bodyText);
          if(body.result){
            //发送成功
            localStorage.setItem("token",body.data);
            this.$router.replace('/me');
          }else{
            MessageBox('提示', body.message);
          }
        }).catch(function(err){
          throw(err)
        })
        
      }else{
        MessageBox('提示',wrongMessage);
      }
    },
    frontValidate:function(){
      var message=[];
      if(this.verifyCode.length<6){
        message.push("请填写完整验证码");
      }
      if(this.password.length<6){
        message.push("密码长度不能小于6位");
      }
      return message.join("，");
    }
  },
  computed:{
    canNext(){
      return this.password && this.verifyCode; 
    },
    ChangePasswordPhone(){
      var reg=sessionStorage.getItem('ChangePasswordPhone');
      if(reg===null){
        this.$router.replace('/sign/alter1');
      }
      return reg;
    }
  }
}

</script>

<style scoped>
.title{
  font-size: 20px;
  text-align: center;
  color: #333333;
  margin-top: 20px;
 
}
.title2{
  margin-top:8px;
  font-size: 16px;
  color: #333333;
  text-align: center;
  margin-bottom: 40px;
}
.input_box{
  width: 94%;
  margin:20px auto
}
.sign_in{
  height: 46px;
  width: 88vw;
  margin:0 auto;
  margin-top:60px;
  border-radius: 6px;
  background-color: #feb3c8;
  line-height: 46px;
  font-size: 16px;
  color: #fff;
  text-align:center;
}
.sign_in.active{
  background-color: #fc0449;
}

</style>
