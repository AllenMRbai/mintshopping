<template>
  <div class="list flex_betwen line_bottom">
      <slot></slot>
      <label>
        <input type="text" class="input" :placeholder="placeholder" v-model="text" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9]+/,'');}).call(this)" maxlength="6">
      </label>
      <div class="btn clear_btn"  @click="clearText" :class="{'active':showClearPic}"></div>
      <div class="repeat_btn" :class="{'active':canActive}" id="repeat_btn" @click="clickRepeat"></div>
  </div>
</template>

<script>
export default {
  name: 'TextBar',
  props:{
      placeholder:{
          type:String,
          default:''
      },
      phone:{
        type:String,
        default:''
      }
  },
  data () {
    return {
      text:'',
      canActive:true
    }
  },
  methods:{
    clearText:function(){
      this.text='';
    },
    countDown:function(second){
      var self=this;
      this.canActive=false;
      let counNo=second    
      let repeatBtn=document.getElementById('repeat_btn');
      let countWay=function(){
          counNo--;
          repeatBtn.innerText=counNo;
          if(counNo==0){
            self.canActive=true;
            repeatBtn.innerText='重发';
            clearInterval(countInterval);
          } 
      }
      repeatBtn.innerText=counNo;
      let countInterval=setInterval(countWay,1000);
    },
    clickRepeat(){
      if(!this.canActive){
        return;
      }
      this.countDown(60);
      let self=this;
      this.$http.get(`http://api.lingkuaiyou.com/User/SendCode?mobile=${self.phone}`).then(function(data){
        let body=JSON.parse(data.bodyText);
        if(body.result){
          //发送成功
        }else{
          MessageBox('提示', body.message);
        }
      }).catch(function(err){})
    }
  },
  computed:{
    showClearPic(){
      return (this.text.length>0);
    },
  },
  watch:{
    text:function(){
        this.$emit('text-change',this.text)
    }
  },
  created(){
    this.$nextTick(function () {
      this.countDown(60);
    })
   
  }
}
</script>

<style scoped>
/* 表单bar条通用样式 */
.list{
  width: 100%;
  height: 46px;
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
.list .repeat_btn{
  height: 32px;
  text-align:center;
  line-height: 32px;
  color: #fff;
  width:60px;
  border-radius: 2px;
  background-color: #e0e0e0;
  margin-left: 10px;
}
.list .repeat_btn.active{
  background-color: #ff4176;
}
</style>
