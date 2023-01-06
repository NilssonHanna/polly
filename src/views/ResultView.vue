<template>
  <body>

   <!-- <div v-if="numPeople=== playerExplanations.length-2">-->
   <div> 
      <h1> The correct answer is... </h1>
    <h2>{{ allexplanations[allexplanations.length - 1]}}</h2>
    <p>{{message}}</p>
  </div>
 <!-- <div>
    <h1> The correct answer is... </h1>
    <h2>{{ allexplanations[allexplanations.length - 1]}}</h2>
  </div>
  <BarsComponent v-bind:data="submittedAnswers"/>
  
  <span>{{submittedAnswers}}</span>-->
</body>
 </template>
  
 <script>
 // @ is an alias to /src
 //import BarsComponent from '@/components/BarsComponent.vue';
 import io from 'socket.io-client';
 const socket = io();
  
 export default {
  name: 'ResultView',

  computed: {
    message() {
      return this.$route.query.message
    }
  },
 //components: {
   // BarsComponent
 // },
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
      numPeople: 0
    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    socket.emit('joinPoll', this.pollId)
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang)
    socket.emit("getAllExplanations", this.pollId)
    

    this.numPeople += 1
    console.log(this.numPeople)

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

    console.log("vår array", this.playerExplanations.length-2)
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
