<template>
  <body>
     
    
 
 
  </body>
 
 
  </template>
 
  <script>
  import io from 'socket.io-client';
  const socket = io();
 
  export default {
    name: 'ConnectView',
    data: function () {
      return {
        lang: "",
        pollId: "",
        question: "",
        answers: ["", ""],
        questionNumber: 0,
        data: {},
        uiLabels: {}
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
      createPoll: function () {
        socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
      },
      addQuestion: function () {
        socket.emit("addQuestion", {pollId: this.pollId, q: this.question, a: this.answers } )
      },
      addAnswer: function () {
        this.answers.push("");
      },
      runQuestion: function () {
        socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
      }
    }
  }
  </script>
 
 
 
  <style scoped>
   body {
      background-color: rgb(32, 88, 17);
      width: 100%;
      min-height: 100vh;
    }
 
   
 
 
 
  </style>
