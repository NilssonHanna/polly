<template>
    <div>
      Poll link: 
      <input type="text" v-model="pollId">
      <button v-on:click="createPoll">
        Create poll
      </button>
      <!--Fixa nickname!!-->
      <!--<button v-on:click="createQuestions">Create questions</button>-->
      <router-link id="result" v-bind:to="'/result/'+lang">{{uiLabels.createPoll}}</router-link>
    </div>
  </template>
  
  <script>
  import io from 'socket.io-client';
  const socket = io();
  
  export default {
    name: 'WaitingView',
    data: function () {
      return {
        lang: "",
        pollId: "",
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
     // createQuestions: function () {
     //  socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
     // }, 
      createPoll: function () {
        socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
      },
    }
  }
  </script>
  