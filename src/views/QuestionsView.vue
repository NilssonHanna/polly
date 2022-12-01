<template>
  <body>
    <div>
      <header class="header">
        <h1>{{uiLabels.createWordExplanation}}</h1>

        <h3 id="word_header"> {{uiLabels.words}} </h3> 
      <!-- <h3 id="explanation_header">{{uiLabels.explanation}}</h3> -->

      </header>
        <div class="wrapper">
          <!--{{uiLabels.words}} {{}} {{uiLabels.explanation}}-->
          <input class="wordExplanation" type="text" v-for="(_, i) in wordExplanation"
              v-bind:key="'wordExplanation'+i">
          <button class="addQstBtn" v-on:click="addQuestion">
            Add word and explanation
          </button>
        </div>
        </div>
        <router-link id="startGame" v-bind:to="('/waiting/'+lang)">Start game</router-link>
  </body>
  </template>
  
  <script>
import io from 'socket.io-client';
  const socket = io();
  
  export default {
    name: 'QuestionsView',
    data: function () {
      return {
        lang: "",
        pollId: "",
        wordExplanation: ["word","explanation"],
        question: ["",""],
        answers: ["", ""],
        questionNumber: 0,
        data: {},
        uiLabels: {},
      }
    },
    created: function () {
      this.lang = this.$route.params.lang;
      socket.emit("pageLoaded", this.lang);
      socket.on("init", (labels) => {
        this.uiLabels = labels
      })
      socket.on("dataUpdate", (data) =>
        this.data = data
      )
      socket.on("pollCreated", (data) =>
        this.data = data)
    },

    methods: {

      addQuestion: function () {
        this.wordExplanation.push("")
        this.wordExplanation.push("")
      },
        /*socket.emit("addQuestion", {pollId: this.pollId, q: this.question, a: this.answers } )*/
        /*den ovan kanske behövs senare för att koppla till resultview!*/ 

      runQuestion: function () {
        socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})

      },
    }
  }

  </script>

  <style scoped>
  .v-text-field{
    width:50px;
  }

body {
    background-color: pink;
    width: 100%;
    display: grid;
    /*grid-template-columns: 50em;*/
    min-height: 100vh;
    font-family: "Fjord one";
  }

  .header{
    margin-top: 70px;
    margin-bottom: 30px;
    font-family: "Fjord one";
    grid-template-columns: 5px 5px;
  }

  .wordExplanation{
    height:20px; 
    width:250px;
    margin-right: 40px; 
    margin-bottom: 10px;
    font-family: "Fjord one"; 
  }

  .addQstBtn {
    margin-right: 40px;
    padding: 10px;
    background-color: rgb(255, 254, 254);
    font-size: 1rem;
    font-family: "Fjord one";

  }

  #startGame{
    background-color: rgb(207, 19, 53);
    font-size: 1.25rem;
    color: white;
    padding: 20px;
    margin-bottom: 100px;
    margin-top: 550px;
    position: absolute;
    right: 3%;
    transform: translateX(-50%);
    font-family: "Fjord one";
  }

  .wrapper{
    grid-template-columns: 5px 5px;
    margin-left: 200px;
    margin-right: 200px;
    font-family: "Fjord one";
    
  }

  #word_header{
    margin-right: 320px;
    margin-top: 50px;  
  }






</style>
  