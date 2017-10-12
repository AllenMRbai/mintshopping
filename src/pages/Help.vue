<template>

<div
v-infinite-scroll="loadMore"
infinite-scroll-disabled="loading"
infinite-scroll-distance="10">

  <div class="cell flex_betwen" v-for="(list,index) in lists" :key="index" @click="goHelp(list)">
    <p>{{ list.Question }}</p>
    <div class="pic"><img src="../assets/common_rightarrow_black.png"></div>
  </div>

</div>
    
</template>

<script>

export default {
  name: 'Help',
  data () {
    return {
      lists:[],
      loading:false,
      pageIndex:1
    }
  },
  methods:{
    loadMore() {
      this.loading = true;
      this.$http.get(`http://api.lingkuaiyou.com/Other/GetHelpInfoList?pageIndex=${this.pageIndex}`).then(data=>{
        console.log(data)
        if(data.body.result){
          let lts=data.body.data.DataList
          let len=lts.length
          if(len>0){
            for(let i=0;i<len;i++){
              this.lists.push(lts[i])
            }
            this.loading=false;
            this.pageIndex+=1;
          }
        }else{
          console.log(data.body.message)
        }
      }).catch(err=>{
        throw(err)
      })
    },
    goHelp(list){
      let question=encodeURIComponent(list.Question) 
      let answer=encodeURIComponent(list.Answer) 
      this.$router.push({
        path:`/theOther/helpContent/${question}/${answer}`
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cell{
  background-color: #fff;
  margin-bottom: 1px;
  padding: 15px 10px;
  flex:1;
}
.cell p{
  flex:1;
  margin-right: 28px;
}
.cell .pic{
  width: 20px;
  height: 20px;
}
</style>
