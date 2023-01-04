
<template>  
  <body>
  <div>
    <router-link v-bind:to="'/'" id="quit">{{uiLabels.quitGame}}</router-link>
  </div>
      
    <div id="gamecode">
      <h1> {{uiLabels.gamecode}} </h1>
    </div>

    <div id="input">
        <input type="text" v-model="pollId" id="text"/>
        <!--<button id="choice_create" v-on:click="createPollstack">Use finished words</button>-->
        <!--<button id="createCode" v-on:click="createPoll">Create gamecode</button>-->
    </div>


  <div>
    <button v-on:click="createPoll" id="choice_create">{{uiLabels.createWords}}</button>
  </div>

  <div>
    <button v-on:click="createQuestions" id="choice_finished">{{uiLabels.finishedWords}}</button>
  </div>


</body>

 </template>

 <script>
 import io from 'socket.io-client';
 const socket = io();
  
 export default {
  name: 'CreateView',
  data: function () {
    return {
      lang: "en",
      pollId: "",
      data: {},
      uiLabels: {}
    }
  },

//how to pass a game code trough a whole quiz in vue

  created: function () {
    this.lang = this.$route.params.lang;
    this.pollId = this.$route.params.id;
    
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
  
    socket.on("dataUpdate", (data) =>
      this.data = data
    )
    socket.on("pollCreated", (data) => {
      this.data = data;
    })
  },
  methods: {
   // createQuestions: function () {
   //  socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
   // },

   
    //createPoll: function () {
      //socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
    //},

    createPoll: function () {
      socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
      this.$router.push('/questions/'+this.lang+'/'+this.pollId)
    
    },

    createQuestions: function () {
      //socket.emit("createQuestions", {pollId: this.pollId, lang: this.lang })
      this.$router.push('/selectrounds/'+this.lang+'/'+this.pollId)
    
    },

    //createPollstack: function(){
      //socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
      //this.router.push({
        //path: '/wordstack/:lang/:id',
        //query: {
         // pollId: this.pollId,
         // lang: this.lang
        //}
     // })
    //},

  }
 }
 </script>
 
 <style scoped>

body {
    background-color: rgb(182, 249, 239);
    width: 100%;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 2em auto;
  }
 #gamecode{
  margin-top: 120px;
  font-size: 15pt;
  font-family: "Fjord one";
  text-transform: uppercase;
  text-align: center;
  white-space: nowrap;
  margin-left: 0%;
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
#createCode{
  margin-bottom: 1000px;
  margin-left: 500px;
}
  #choice_create {
  background-color: rgb(100,149,237);
  font-size: 1.3rem;
  color: rgb(255, 255, 255);
  width:200px;
  top: 50%;
  left: 40%;
  padding: 20px;
  margin-top: 100px;
  letter-spacing: 0.1em;
  transform: translateX(-50%);
  font-family: "Fjord one";
  cursor: pointer;
  position: absolute; 
} 
#choice_finished {
  background-color: rgb(100,149,237);
  font-size: 1.3rem;
  color: rgb(255, 255, 255);
  width:200px;
  top: 50%;
  right: 25%;
  padding: 20px;
  margin-top: 100px;
  letter-spacing: 0.1em;
  transform: translateX(-50%);
  font-family: "Fjord one";
  cursor: pointer;
  position: absolute;
}
#input {
  padding: 50px;
  }
#text{
  font-size: 10pt;
  font-family: "Fjord one";
  text-align: center;
  transform: scale(2);
  margin-bottom: 300px;
  margin-left: 600px;
  padding: 5px;
  border: double;
}
</style>
