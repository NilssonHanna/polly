<template>
    <body>

    <div  v-if="playerindex=== allexplanations.length - 1">
    <div id="correctExplanationHeadline">
      <h1> {{uiLabels.correctExplanation}} </h1>
    </div>
  
    <div id="correctExplanation">
      <h2>{{ allexplanations[allexplanations.length - 1]}} </h2>
    </div>
  
    <div id="results">
       {{uiLabels.results}} <div id="round"> {{uiLabels.round}} {{this.currentQuestionIndex+1}}: </div> 
    </div>
  
    <div>
      <router-link v-bind:to="'/'" id="quit">{{uiLabels.quitGame}}</router-link>
    </div>
  
    <div>
        <button v-on:click="nextRound" class="next" >{{uiLabels.nextRound}}</button>

    </div>
  
    <div  class="wrapper">
      <div class="grid">
        <div id="explanationVotingHeadline"> {{uiLabels.explanation}} </div>
        <div id="explanationVoting" v-for="explanation in allexplanations" :key="explanation" class="grid-item">{{ explanation }}</div>
      </div>
      <div class="grid">
        <div id="explanationVotingHeadline"> {{uiLabels.votes}} </div>
        <div id="explanationVoting" v-for="explanation in allexplanations" :key="explanation" class="grid-item">{{ explanation }}</div>
      </div>
    </div>

  </div>
  
  
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
        playerindex:""
      
      }
    },
    created: function () {
      this.pollId = this.$route.params.id;
      this.lang = this.$route.params.lang;
      
      socket.emit('joinPoll', this.pollId)
      socket.emit("pageLoaded", this.lang)
      socket.emit("getAllExplanations", this.pollId)
      socket.emit("getNextPlayerIndex", this.pollId)
  
  
      this.numPeople += 1
      console.log(this.numPeople)
  
      socket.on("init", (labels) => {
      this.uiLabels = labels })
  
      socket.on("dataUpdate", (data) =>
         this.data = data,)

  
      socket.on("returnPlayerIndex", (playerindex) => {
      this.playerindex=playerindex;})
  
      socket.on("receiveExplanations", (allexplanations) => {
      this.allexplanations=allexplanations;
      socket.emit('getQuestions', this.pollId)
    })

    socket.on("getCurrentQuestionIndex", (currentQuestionIndex) => { 
      this.currentQuestionIndex = currentQuestionIndex;
      this.currentExplanation = this.allexplanations[this.currentExplanationIndex]
      })
    },

    methods:{
      nextRound:function(){
        this.$router.push("/words/"+this.lang+"/"+this.pollId)

        socket.emit('redirect', {route: '/word/'+this.lang, pollId: this.pollId})
        socket.emit("getNextQuestionIndex", this.pollId);
        socket.emit("zeroPlayerIndex", this.pollId);  
      }
    }
   }
   </script>
  
   <style>
  body{
    background-color: rgb(196, 151, 196);
  }
  
  #correctExplanationHeadline{
    font-size: 1.25rem;
    letter-spacing: 0.1em;
    color: rgb(0, 0, 0);
    text-transform: uppercase;
    text-align: center;
    margin-top: 50px;
    font-family: "Fjord one";
    }
  
  #correctExplanation{
    font-size: 1.25rem;
    letter-spacing: 0.1em;
    color: rgb(0, 0, 0);
    text-transform: uppercase;
    font-family: "Fjord one";
    text-align: center;
    margin: 0 auto;
  }
  
  
  #results{
    font-size: 1.5rem;
    letter-spacing: 0.1em;
    color: rgb(0, 0, 0);
    text-align: center;
    margin: 0 auto;
    padding-top: 10px;
    font-family: "Fjord one";
    margin-top: 50px;
  }
  
  #round{
    font-size: 2rem;
    font-family: "Fjord one";
    text-transform: uppercase;
    color: rgb(149, 28, 28);
    margin-bottom: 20px;
    margin-top: 10px;
  }
  
  #explanationVoting{
    font-size: 1.25rem;
    font-family: "Fjord one";
    margin-top: 15px;
    padding-bottom: 10px;
    margin-bottom: 25px;
  }
  
  #explanationVotingHeadline{
    font-size: 1.5rem;
    font-family: "Fjord one";
    font-weight: bold;
    margin-top: 15px;
    padding-bottom: 10px;
    margin-bottom: 25px;
    text-transform: uppercase;
  }
  
  .grid {
    display: grid;
    grid-auto-rows: 50px; 
  }
  
  .wrapper{  
    border: 2px solid rgb(0, 0, 0);
    font-size: 1.25rem;
    font-family: "Fjord one";
    text-align: center;
    margin: 0 auto;
    width: 700px;
    display: grid;
    grid-template-areas: 
    'header header'
    'left right'
    'footer footer';
    grid-column-gap: 10px;  
    }
  
  #quit{
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
  
  .next {
    background-color: rgb(123, 102, 106);
    color: rgb(249, 249, 249);
    font-size: 1.5rem;
    padding: 20px;
    bottom: 50px; 
    right: 50px; 
    letter-spacing: 0.1em;
    font-family: "Fjord one";
    text-transform: uppercase;
    cursor: pointer;
    text-decoration: none;
    position: absolute;
    width:150px;
  }
  
  </style>