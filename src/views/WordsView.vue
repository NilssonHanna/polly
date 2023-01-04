<template>
      <body>

        <div>


          <h1> Gamecode: {{this.pollId}} </h1>
          <h2> {{this.words[0].q[this.currentQuestion]}}</h2>
          <h3> Waiting for players to formulate... </h3>

          

          <div>
            <button v-on:click="getNextQuestion" id="getnextquestionbutton">uilabels.nextword</button>
          </div>
        </div>
    </body>
  </template>
   
  <script>
  import io from 'socket.io-client';
  const socket = io();
  export default {
    name: 'WordsView',  
    data: function () {
      return {
        lang: "",
        words: "",
        explanations: "",
        //{
        //  q: "",
        //  a: ""
       //},
        pollId: "inactive poll",
        submittedAnswers: {},
        currentQuestion: null
        
      }
    },

    created: function () {
      this.pollId = this.$route.params.id;
      this.lang = this.$route.params.lang;
  
      socket.emit('getWords', this.pollId)
      socket.emit('pageLoaded', this.lang)
   // socket.on("newQuestion", update => {
     // this.word = update.q;
     // this.explanations = update.a;
      //this.data = {};
  // })
  
    socket.on("allWords", (words) => {
      this.words = words;
      console.log("i wordsview,allwords", this.words)
    })

    socket.on("setCurrentQuestion", (currentQuestion) => {
      console.log("setCurrentQuestion", currentQuestion);
      this.currentQuestion = currentQuestion;
    })
  
    },
    methods: {
      //submitAnswer: function (explanation) {
      //  socket.emit("submitAnswer", {pollId: this.pollId, explanation: explanation})
      //}
    //}
      getNextQuestion: function () {
        socket.emit("getNextQuestion", this.pollId);
        

      },

      
    }}
  
   </script>
    <style>
   body {
      background-color: lightyellow;
      font-family: "Fjord one";
    }


  

   </style>
  
 