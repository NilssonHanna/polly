<template>
      <body>

        <div>
          <div class="timer">{{ timer }} s </div>

          <h1> Gamecode: {{this.pollId}} </h1>
          <h2> {{this.words[0].q[this.currentQuestion]}}</h2>
          <h3> {{uiLabels.formulate}} </h3>

          

          <div>
            <button v-on:click="getNextQuestion" id="getnextword">{{uiLabels.nextWord}}</button>
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
        timer: 60,
        lang: "en",
        words: "",
        explanations: "",
        //{
        //  q: "",
        //  a: ""
       //},
        pollId: "inactive poll",
        submittedAnswers: {},
        currentQuestion: null,
        uiLabels: {},

        
      }
    },

    created: function () {
      setInterval(() => {
      this.$router.push('/explanations/'+this.lang+'/'+this.pollId)
    }, 60000)

    setInterval(() => {
      this.timer--
    }, 1000)

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

  .timer {
    font-family: "Fjord one";
    font-size: 3rem;
    text-align: center;
    margin: auto;
    display: block;
    position: relative;
    left: 0px;
    top: 60px;
    border-radius: 100%;
    width: 100px;
    height: 100px;
    padding: 10px;
    background: rgb(0, 0, 0);
    border: 10px solid #000;
    color: rgb(255, 255, 255);

    }

    #getnextword {
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
  
 