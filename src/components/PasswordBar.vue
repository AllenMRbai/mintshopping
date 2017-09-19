<template>
  <div class="list flex_betwen line_bottom">
      <label>
        <input type="password" class="input" :placeholder="placeholder" v-model="text" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;">
      </label>
      <div class="btn see_btn"  @click="toggleShow" :class="{'active':needShow}"></div>
  </div>
</template>

<script>
export default {
  name: 'TextBar',
  props:{
      placeholder:{
          type:String,
          default:''
      }
  },
  data () {
    return {
      text:'',
      needShow:false
    }
  },
  methods:{
    toggleShow:function(e){
      this.needShow=!this.needShow;
      var passIn=e.target.parentNode.getElementsByClassName('input')[0];
      if(this.needShow){
          passIn.type='text';
      }else{
          passIn.type='password';
      }
      

    }
  },
  watch:{
    text:function(){
        this.$emit('text-change',this.text)
    }
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
.list .see_btn{
  background-image: url('../assets/common_hide_grey.jpg');
  background-size: 28px 28px;
  background-repeat: no-repeat;
  background-position: center center;
}
.list .see_btn.active{
  background-image: url('../assets/common_show_grey.jpg');
}
</style>
