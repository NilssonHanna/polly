<template>
  <body>
    <div id="questionDesign">
        <h1>{{uiLabels.createQuestions}}</h1>
      <div>
        <div id="newQst">
          {{uiLabels.question}}:
          <input type="text" v-for="(_, i) in question"
              v-model="question[i]"
              v-bind:key="'question'+i">
          <button class="addQstBtn" v-on:click="addQuestion">
            Add question
          </button>
        </div>
        <div>
          Answers:
          <input v-for="(_, i) in answers" 
                 v-model="answers[i]" 
                 v-bind:key="'answer'+i">
          <button v-on:click="addAnswer">
            Add answer
          </button>
        </div>
      </div>
      <input type="number" v-model="questionNumber">
      <button class="runQstBtn" v-on:click="runQuestion">
        Run question
      </button>
      {{data}}
      <router-link v-bind:to="'/result/'+pollId">Check result</router-link>
    </div>
  </body>
  </template>
  
  <script>
  //import QuestionComponent from '@/components/QuestionComponent.vue';
import io from 'socket.io-client';
  const socket = io();
   export default {
    name: 'QuestionsView',
    data: function () {
      return {
        lang: "",
        pollId: "",
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
        this.question.push("")
        /*socket.emit("addQuestion", {pollId: this.pollId, q: this.question, a: this.answers } )*/
        /*den ovan kanske behövs senare för att koppla till resultview!*/ 
      },
      addAnswer: function () {
        this.answers.push("")
      },
      runQuestion: function () {
        socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
      },
    }
  }
  
  </script>

  <style>

body {
    background-color: pink;
    width: 100%;
    display: grid;
    grid-template-columns: 30em auto;
    min-height: 100vh;
  }


  #questionDesign{
    font-family: "Fjord one" ;

  }

  

</style>
  