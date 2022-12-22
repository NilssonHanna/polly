<template>
    <body>
    <div>
      <h1>Hej och välkommen WORDVIEW</h1>
      {{this.pollId}}
      {{this.words}}
      
    </div>
  </body>
  </template>
    
   <script>
   // @ is an alias to /src
  import io from 'socket.io-client';
  const socket = io();
  export default {
    name: 'WordView',   
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
        submittedAnswers: {}
      }
    },
  
      // @ is an alias to /src
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
     console.log("kommer till questionCreated", this.words)
    })

    },
    methods: {
      //submitAnswer: function (explanation) {
      //  socket.emit("submitAnswer", {pollId: this.pollId, explanation: explanation})
      //}
    //}
    }}
   
   </script>
  
   <style>
  
  body {
      background-color: lightyellow;
      font-family: "Fjord one";
    }
  
  </style>
   