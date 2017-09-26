<template>
<div>
  <div class="input_box">
    <text-bar placeholder="请输入手机号" @text-change="getAccount"></text-bar>
    <password-bar placeholder="请输入密码" @text-change="getPassword"></password-bar>
  </div>

  <div class="sign_in" @click="login">登录</div>
  <ul class="bottom_box flex_betwen">
    <router-link tag="li" to="/sign/signUp1">新用户注册</router-link>
    <router-link tag="li" to="/sign/alter1">忘记密码</router-link>
  </ul>
</div>
</template>

<script>
import TextBar from '@/components/TextBar'
import PasswordBar from '@/components/PasswordBar'
import { md5 } from '@/assets/js/tools.js'
import { MessageBox,Indicator } from 'mint-ui';

export default {
  name: 'SignIn',
  components:{
    TextBar,
    PasswordBar
  },
  data () {
    return {
      account:'',
      password:''
    }
  },
  methods:{
    getAccount:function(text){
      this.account=text;
    },
    getPassword:function(text){
      this.password=text;
    },
    login:function(){
      if(this.frontValidate()){
        Indicator.open();
        
        let md5_password=md5(this.password);
        console.log(md5_password)
        this.$http.get(`http://api.lingkuaiyou.com/User/Login?mobile=${this.account}&password=${md5_password}`).then(function(data){
          Indicator.close();
          let body=JSON.parse(data.bodyText);
          console.log(data.bodyText)
          if(body.result){
            //MessageBox('提示', '登录成功！');
            //console.log(body.data);
            localStorage.setItem("token",body.data);
            this.$router.replace('/me');
          }else{
            MessageBox('提示', body.message);
          }
        }).catch(function(err){})

      }else{
        MessageBox('提示', '账号 或 密码不能为空');
      }
    },
    frontValidate:function(){
      return this.account && this.password;
    }
  },
  computed:{

  },
}

</script>

<style scoped>
.input_box{
  width: 96%;
  margin:0 auto
}
.sign_in{
  height: 46px;
  width: 88vw;
  margin:0 auto;
  margin-top:20px;
  border-radius: 6px;
  background-color: #fc0449;
  line-height: 46px;
  font-size: 16px;
  color: #fff;
  text-align:center;
}
.bottom_box{
  width: 96%;
  margin:10px auto;
  padding:0 4px;
}
.bottom_box li{
  font-size: 14px;
  color: #666666;
  height: 28px;
  line-height: 28px;
}
</style>
