<template>
<div>
  <div class="title">欢迎来到猪圈圈！</div>
 
  <div class="input_box">
    <div class="list flex_betwen line_bottom">
      <div>+86</div>
      <label>
        <input type="text" class="input" placeholder="请输入您的手机号码" v-model="phone" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9]+/,'');}).call(this)" maxlength="11">
      </label>
      <div class="btn clear_btn" :class="{'active':showClearPic}" @click="clearText"></div>
    </div>
  </div>

  <div class="sign_in" @click="login" :class="{'active':canNext}">下一步</div>

</div>
</template>

<script>
import TextBar from '@/components/TextBar'
import PasswordBar from '@/components/PasswordBar'
import { MessageBox,Indicator } from 'mint-ui';

export default {
  name: 'SignIn',
  components:{
    TextBar,
    PasswordBar
  },
  data () {
    return {
      phone:''
    }
  },
  methods:{
    clearText:function(){
      this.phone='';
    },
    login:function(){
      if(!this.frontValidate()){
        return;
      }
      if(this.frontValidate2()){
        sessionStorage.setItem("registerPhoneNumber", this.phone);
        Indicator.open();
        this.$http.get(`http://api.lingkuaiyou.com/User/SendCode?mobile=${this.phone}`).then(function(data){
          Indicator.close();
          let body=JSON.parse(data.bodyText);
          if(body.result){
            this.$router.replace('/sign/signUp2');
          }else{
            MessageBox('提示', body.message);
          }
        }).catch(function(err){})
      }else{
        MessageBox('提示', '请输入正确的手机号码')
      }

    },
    frontValidate:function(){
      return this.phone;
    },
    frontValidate2:function(){
      let regex =/^1[0-9]{10}$/;
      return regex.test(this.phone);
    }
  },
  computed:{
    showClearPic(){
        return (this.phone.length>0);
    },
    canNext(){
      return (this.phone.length==11)
    }
  },
}

</script>

<style scoped>
.title{
  font-size: 20px;
  text-align: center;
  color: #333333;
  margin-top: 20px;
  margin-bottom: 40px;
}
.input_box{
  width: 96%;
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






/* 表单bar条通用样式 */
.list{
  width: 100%;
  height: 46px;
  padding: 0 8px;
  flex:1;
}
.list label{
 flex: 1;
 margin-right: 6px;
 padding-left: 10px;
}
.list .input{
  width: 100%;
  height: 46px;
  line-height: 46px;
  font-size: 15px;
  color: #383838;
  margin-right: 2vw;
  padding: 0 4px;
}
.list .btn{
  width: 46px;
  height: 46px;
}

/* 清除按钮 */
.list .clear_btn{
  background-image: url('../assets/common_close_fill_grey.png');
  background-size: 22px 22px;
  background-repeat: no-repeat;
  background-position: center -22px;
}
.list .clear_btn.active{
  background-position: center center;
}
</style>
