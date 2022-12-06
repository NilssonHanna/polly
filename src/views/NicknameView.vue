<template>
  <body>


    <div id="nickname">
     <h1> {{uiLabels.createNickname}}</h1>
    </div>
   
    <div id="input">
      <label>
        <input type="text" v-model="nicknameId" id="text">
      </label>
    </div>

    <div>
      <router-link v-bind:to="'/connect/'+lang" id="next">{{uiLabels.next}}</router-link>
    </div>

    <div >
      <router-link v-bind:to="'/'" id="quit">{{uiLabels.quitGame}}</router-link>
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
    background-color: rgb(184, 249, 253);
    width: 100%;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 2em auto;
   }

   #nickname {
    margin-top: 120px;
    font-size: 15pt;
    font-family: "Fjord one";
    text-transform: uppercase;
    text-align: center;
    white-space: nowrap;
    margin-left: 0%;
   }
   

  #input{
  padding:90px; 
}

#next{
  background-color: rgb(90, 58, 64);
  font-size: 1.5rem;
  color: rgb(255, 255, 255);
  width:80px;
  padding: 30px;
  margin-top: -150px;
  position: absolute;
  left: 85%;
  top:100%;
  transform: translateX(-50%);
  font-family: "Fjord one";
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;

}

#text{
  font-size: 10pt;
  font-family: "Fjord one";
  transform: scale(2);
  margin-bottom: 300px;
}

#quit{
  background-color: rgb(255, 6, 52);
  font-size: 1.5rem;
  color: rgb(255, 255, 255);
  width:110px;
  padding: 30px;
  top: 0px;
  left:60px;
  letter-spacing: 0.1em;
  position: absolute;
  transform: translateX(-50%);
  font-family: "Fjord one";
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
}
   
   
  </style>
  