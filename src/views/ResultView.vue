<template>
  <body>
  <div>
    <h1> The correct answer is... </h1>
    {{ allexplanations[allexplanations.length - 1]}}
  </div>
  <BarsComponent v-bind:data="submittedAnswers"/>
  
  <span>{{submittedAnswers}}</span>
</body>
 </template>
  
 <script>
 // @ is an alias to /src
 import BarsComponent from '@/components/BarsComponent.vue';
 import io from 'socket.io-client';
 const socket = io();
  
 export default {
  name: 'ResultView',
  components: {
    BarsComponent
  },
  data: function () {
    return {
      words: "",
      lang: "",
      explanations: "",
      pollId: "",
      currentQuestion: null,
      uiLabels: {},
      currentQuestionIndex: 0,
      questions: "",
      allexplanations: [],
      playerExplanations: "",
      answer: "",
    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    socket.emit('joinPoll', this.pollId)
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang)
    socket.emit("getAllExplanations", this.pollId)

    socket.on("init", (labels) => {
    this.uiLabels = labels })

    socket.on("dataUpdate", (update) => {
      this.submittedAnswers = update.a;
      this.word = update.q;


    socket.on("receiveExplanations", (questions) => {
    this.questions=questions;


    this.playerExplanations = this.questions[this.currentQuestionIndex].playerExplanations
    this.answer = this.questions[this.currentQuestionIndex].answer

    this.playerExplanations.push(this.answer)
    this.allexplanations=this.playerExplanations

    console.log("vår allexplanations: ", this.allexplanations)


    socket.on("getCurrentQuestionIndex", (currentQuestionIndex) => {
      console.log("getCurrentQuestionIndex", currentQuestionIndex);
      this.currentQuestionIndex = currentQuestionIndex;
    })

 
    })

    });

    
  },
  //writeOut(){
    //console.log(word);
  //}
 }
 </script>

 <style>
body{
  background-color: rgb(205, 151, 205);
}

</style>