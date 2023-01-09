<template>
    <div id="background">

        <div id="waitingVote">
            <h1>{{ uiLabels.waitingVote }}</h1> 
        </div>
    
    </div>
  
  </template>
  
  <script>
   // @ is an alias to /src
   import io from 'socket.io-client';
   const socket = io();
    
   export default {
    name: 'WaitingVoteView',
  
    data: function () {
      return {
        pollId: "",
        lang: "en",
        uiLabels: {},
        wordExplanation: null,
        submittedAnswers: {
        }
      }
    },
    created: function () {
      this.pollId = this.$route.params.id;
      this.lang = this.$route.params.lang;
      socket.emit("pageLoaded", this.lang);
      socket.on("dataUpdate", (update) => {
        this.submittedAnswers = update.a;
        this.question = update.q;
      });
      socket.on("newQuestion", update => {
        this.question = update.q;
        this.data = {};
      })
      socket.on("init", (labels) => {
        this.uiLabels = labels
      })
    }
   }
   </script>
  
   <style scoped>
  
  #background {
    background-color: rgb(150, 173, 241);
    width: 100%;
    display: grid;
    min-height: 100vh;
  }
  #waitingVote {
    background-color: rgb(36, 70, 196);
    color: white;
    margin-top: 200px;
    padding: 10px;
    margin-left: 300px;
    margin-right: 300px;
    height: 100px;
    text-align: center;
    font-size: 15pt;
    font-family: "Fjord one";
    text-transform: uppercase;
    text-align: center;
    white-space: nowrap;
  }

  @media screen and (max-width:50em) {

    #background {
    background-color: rgb(150, 173, 241);
    width: 100%;
    display: grid;
    min-height: 100vh;
    position: fixed;
  }
  #waitingVote {
    background-color: rgb(36, 70, 196);
    color: white;
    margin-top: 300px;
    padding: 10px;
    margin-left: 25px;
    margin-right: 35px;
    height: 50px;
    text-align: center;
    font-size: 8px;
    font-family: "Fjord one";
    text-transform: uppercase;
    text-align: center;
    white-space: nowrap;
  }

  }
  
  </style>