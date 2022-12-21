<template>
  <div>
    {{word}}
  </div>
  <BarsComponent v-bind:data="submittedAnswers"/>
  
  <span>{{submittedAnswers}}</span>
 </template>
  
 <script>
 // @ is an alias to /src
 import BarsComponent from '@/components/BarsComponent.vue';
 import io from 'socket.io-client';
 const socket = io();
  
 export default {
  name: 'ResultView',
  components: {
    BarsComponent
  },
  data: function () {
    return {
      word: "",
      submittedAnswers: {
      }
    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    socket.emit('joinPoll', this.pollId)
    socket.on("dataUpdate", (update) => {
      this.submittedAnswers = update.a;
      this.word = update.q;
    });
    socket.on("newQuestion", update => {
      this.word = update.q;
      this.data = {};
    })
  },
  //writeOut(){
    //console.log(word);
  //}
 }
 </script>