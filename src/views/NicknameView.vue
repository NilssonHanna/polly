<template>
  <body>
    
     <h1> WRITE NICKNAME</h1>
   
   
   <div>
     
     <input type="text" v-model="nicknameId">
     <router-link id="connect" v-bind:to="'/connect/'+lang">{{uiLabels.createNickname}}</router-link>
   </div>
   
  </body>
   
  </template>
   
  <script>
   
  import io from 'socket.io-client';
  const socket = io();
   
  export default {
   name: 'NicknameView',
   data: function () {
     return {
       lang: "",
       data: {},
       uiLabels: {},
       nicknameId: ""
     }
   },
   
   
   created: function () {
     this.lang = this.$route.params.lang;
     socket.emit("pageLoaded", this.lang);
     socket.on("init", (labels) => {
       this.uiLabels = labels
     })
   
     socket.on("dataUpdate", (data) =>
       this.data = data,
     
       "nicknameCreated", (data) =>
       this.data = data)
   },
    methods: {
    // createNickname: function () {
    //  socket.emit("createPoll", {nicknameId: this.pollId, lang: this.lang })
    // },
    createNickname: function () {
       socket.emit("createNickname", {nicknameId: this.nicknameId, lang: this.lang })
     },
   }
   
   
   
   
  }
   
   
   
   
  </script>
   
   
  <style scoped>
  body {
     background-color: rgb(254, 175, 126);
     width: 100%;
     min-height: 100vh;
   }
   
   #connectstyle {
   
   background-color: rgb(170, 34, 59);
   font-size: 1.5rem;
   color: rgb(62, 4, 4);
   padding: 30px;
   margin-top: -200px;
   position: absolute;
   left: 40%;
   transform: translateX(-50%);
   font-family: "Fjord one";
  }
   
   
  </style>
  