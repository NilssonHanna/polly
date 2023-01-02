<template>
    <body>
        <header class="header">
            <h1>The winning explanation</h1> 
        </header>
      <div>
        <h2 class="wait">Waiting for players to vote..</h2>
          <!--<div v-for="(wordExplanation, key) in explanations" v-bind:key="'wordExplanation'+key">
          #{{key}}: <dd>{{wordExplanation.wordExplanation}}</dd>
          </div>-->
      </div>
    </body>
  
  </template>
  
  <script>
   // @ is an alias to /src
   import io from 'socket.io-client';
   const socket = io();
    
   export default {
    name: 'WaitingVoteView',
  
    data: function () {
      return {
        lang: "en",
        uiLabels: {},
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
    background-color: rgb(150, 173, 241);
   }

  .header{
    background-color: rgb(36, 70, 196);
    color: white;
    margin-top: 200px;
    padding: 10px;
    margin-left: 300px;
    margin-right: 300px;
  }

  .wait{
    margin-left: 400px;
    margin-right: 400px;
    margin-top: 150px;
    background-color: rgb(194, 191, 191);
    padding: 20px;
  }
  
  </style>