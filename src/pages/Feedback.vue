<template>

<div>
<textarea class="feedback" placeholder="写下你需要反馈的内容吧..." v-model="message"></textarea>

<div class="sub_btn" @click="submit">提交</div>
</div>
    
</template>

<script>
import { MessageBox,Indicator } from 'mint-ui';

export default {
  name: 'Feedback',
  data () {
    return {
      message:''
    }
  },
  methods:{
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
    submit(){
      let token=this.getToken();//获取token
      if(!token){//如果没有token就直接跳到登录页面
          this.goSignIn();
          return;
      }
      Indicator.open();
      let message=encodeURIComponent(this.message)
      this.$http.get(`http://api.lingkuaiyou.com/Other/UserFeedback?content=${message}&token=${token}`).then(data=>{
        Indicator.close();
        if(data.body.result){
          MessageBox('提示', '提交成功').then(action => {
              this.message='';
          });
        }else{
          MessageBox('提示', data.body.message)
        }
      }).catch(err=>{
        Indicator.close();
        throw(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.feedback{
  margin-top: 8px;
  box-sizing: border-box;
  resize: none;
  outline: none;
  line-height: 1.3;
  width: 100%;
  height: 230px;
  height: 32vh;
  padding: 10px;
  font-size: 15px;
  color: #666;
  background-color: transparent;
  border:none
}
.sub_btn{
  background-color: #fc0449;
  color: #fff;
  font-size: 16px;
  text-align: center;
  padding: 14px 0;
  border-radius: 4px;
  width: 90%;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%)
}

</style>
