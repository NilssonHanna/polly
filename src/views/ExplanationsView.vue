<template>
    <body>
      <div>
        <h1> Time to present explanations! </h1>
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
      pollId: "",
      currentQuestion: null
    }
  },

  created: function () {
    this.pollId = this.$route.params.id;
    this.lang = this.$route.params.lang;

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

