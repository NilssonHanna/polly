<template>
  <body>
      <h1> waiting for players to join</h1>
    <!--<h1>{{uiLabels.connectPoll}}</h1>-->

   
 
  </body>
  
  </template>
 

  <script>
  //import QuestionComponent from '@/components/QuestionComponent.vue';
import io from 'socket.io-client';
const socket = io();
 export default {
  name: 'ConnectView',
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
    socket.on("nicknameCreated", (data) =>
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
 
 
  <style scoped>
   body {
      background-color: rgb(93, 131, 83);
      width: 100%;
      min-height: 100vh;
    }
 
   
 
 
 
  </style>
