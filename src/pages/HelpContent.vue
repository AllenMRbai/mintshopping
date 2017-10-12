<template>

<div>
<div class="question">{{ question }}</div>
<div class="answer">{{ answer }}</div>
</div>
    
</template>

<script>

export default {
  name: 'Help',
  data () {
    return {
      question:'',
      answer:''
    }
  },
  methods:{
    getMessage(){
        this.question=decodeURIComponent(this.$route.params.question);
        this.answer=decodeURIComponent(this.$route.params.answer);
    }
  },
  created(){
      this.getMessage()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.question{
    padding:10px;
    font-size: 18px;
    line-height: 26px;
    color: #333333;
}
.answer{
    padding: 0 10px;
    color: #666;
}
</style>
