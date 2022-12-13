<template>
  <body>
    <div>
        <h1>Waiting for players..</h1>
        <div v-for="(wordExplanation, key) in explanations" v-bind:key="'wordExplanation'+key">
        #{{key}}: <dd>{{wordExplanation.wordExplanation}}</dd>
        </div>
    </div>
  </body>

</template>

<script>
 // @ is an alias to /src
 import io from 'socket.io-client';
 const socket = io();
  
 export default {
  name: 'WaitingView',

  data: function () {
    return {
      lang: "en",
      wordExplanation: null,
      submittedAnswers: {
      }
    }
  },
  created: function () {
    this.pollId = this.$route.params.id;
    socket.emit("pageLoaded", this.lang);
    socket.on("dataUpdate", (update) => {
      this.submittedAnswers = update.a;
      this.question = update.q;
    });
    socket.on("newQuestion", update => {
      this.question = update.q;
      this.data = {};
    })
  }
 }
 </script>

 <style>

body{
  background-color: lightblue;
 }

</style>