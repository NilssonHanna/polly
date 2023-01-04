<template>
    <body>
      <div>
        <h1> {{uiLabels.presentExplanation}} </h1>
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
    }
  },

  created: function () {
    this.pollId = this.$route.params.id;
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang)
    socket.on("init", (labels) => {
    this.uiLabels = labels
  })

  },
  methods: {

  }}

 </script>
  <style>
 body {
    background-color: pink;
    font-family: "Fjord one";
  }
 </style>

