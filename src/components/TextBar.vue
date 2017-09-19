<template>
  <div class="list flex_betwen line_bottom">
      <slot></slot>
      <label>
        <input type="text" class="input" :placeholder="placeholder" v-model="text" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;">
      </label>
      <div class="btn clear_btn"  @click="clearText" :class="{'active':showClearPic}"></div>
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
      text:''
    }
  },
  methods:{
    clearText:function(){
      this.text='';
    }
  },
  computed:{
      showClearPic(){
        return (this.text.length>0);
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
