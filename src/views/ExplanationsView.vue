<template>
    <body>

      <div>
    <h1> {{uiLabels.presentExplanation}} </h1>
    <h2> {{currentExplanation}} </h2>
    <button @click="showNextExplanation">Show next explanation</button>
    <button v-on:click="votingtime" class="votingtime" >{{uiLabels.votingtime}}</button>
  </div>
      <!--<div>
        <h1> {{uiLabels.presentExplanation}} </h1>
       <h2> {{this.questions[this.currentQuestionIndex].answer}}</h2>
        <h2> {{this.questions[this.currentQuestionIndex].playerExplanations}}</h2>
        <h2> {{this.allexplanations}}</h2>
      </div>-->
  </body>
</template>
 
<script>
import io from 'socket.io-client';
const socket = io();
export default {
  name: 'ExplanationsView',  
  data: function () {
    return {
      lang: "",
      words: "",
      explanations: "",
      pollId: "",
      currentQuestion: null,
      uiLabels: {},
      currentQuestionIndex: 0,
      questions: "",
      allexplanations: [],
      playerExplanations: "",
      answer: "",
      currentExplanationIndex: 0,
      currentExplanation: ''
     
    }
  },

  created: function () {
    this.pollId = this.$route.params.id;
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang)
    socket.emit("getAllExplanations", this.pollId)
  
    socket.on("init", (labels) => {
    this.uiLabels = labels })


    socket.on("receiveExplanations", (questions) => {
    console.log("i explanationview, ", questions)
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

    this.currentExplanation = this.allexplanations[this.currentExplanationIndex]

 
    })

  },
  methods: {

    showNextExplanation: function () {
      this.currentExplanationIndex++
      if (this.currentExplanationIndex >= this.allexplanations.length) {
        this.currentExplanationIndex = 0
      }
      this.currentExplanation = this.allexplanations[this.currentExplanationIndex]
    },

    votingtime: function (){
      
      this.$router.push('/waitingvote/'+this.lang+'/'+this.pollId)
      socket.emit('redirect','/voting/'+this.lang+'/'+this.pollId)
        
    }
  }



  }

 </script>
  <style>
 body {
    background-color: pink;
    font-family: "Fjord one";
  }

  .votingtime{
    grid-area: footer;
    background-color: rgb(238, 85, 203);
    font-size: 1.25rem;
    letter-spacing: 0.1em;
    color: black;
    text-transform: uppercase;
    padding: 20px;
    bottom: 350px;
    position: absolute;
    right: 3%;
    font-family: "Fjord one";
    box-shadow: 5px 5px 5px;

  }
 </style>

