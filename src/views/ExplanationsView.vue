<template>
    <body>
    
    <div>
      <router-link v-bind:to="'/'" class="quit">{{uiLabels.quitGame}}</router-link>
    </div>

    <div id="presentExplanation">
      <h1> {{uiLabels.presentExplanation}} </h1>
    </div>
  
    <div class="explanation">
        <h2> {{currentExplanation}}</h2>
    </div>

    <div>
    
        <button @click="showNextExplanation" id="nextExplanation">  {{uiLabels.nextExplanation}}</button>
        <button v-on:click="votingtime" id="votingTime" >{{uiLabels.votingtime}}</button>
   
    </div>
  
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

<style scoped>
 
 body {
  background-color: rgb(182, 249, 239);
  width: 100%;
  min-height: 100vh;
  display: grid;
  }

  #nextExplanation {
    padding: 20px;
    background-color: black;
    color: white;
    font-family: "Fjord one";
    font-size: 1.2rem;
    width: 200px;
    margin: 150px;


  }

  #presentExplanation {
    margin-top: 160px;
    font-size: 15pt;
    font-family: "Fjord one";
    text-transform: uppercase;
    text-align: center;
    white-space: nowrap;
    margin-left: 0%;
  }

  .explanation {
    font-family: "Fjord one";
    font-size: 30px;
    margin-top: 70px;
    text-transform: uppercase;
  }

.quit {
  background-color: rgb(255, 6, 52);
  font-size: 1.5rem;
  color: rgb(255, 255, 255);
  width:110px;
  padding: 30px;
  top: 0px;
  left:60px;
  letter-spacing: 0.1em;
  position: absolute;
  transform: translateX(-50%);
  font-family: "Fjord one";
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
}

  #votingTime{
    grid-area: footer;
    background-color: rgb(238, 85, 203);
    font-size: 1.25rem;
    letter-spacing: 0.1em;
    color: black;
    text-transform: uppercase;
    padding: 20px;
    bottom: 400px;
    position: absolute;
    right: 3%;
    font-family: "Fjord one";
    box-shadow: 5px 5px 5px; 
  }
  
#votingTime:not([disabled]):focus {
  box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
}

#votingTime:not([disabled]):hover {
  box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
}

</style>

