<template>
  <body>


    <div>
      <router-link v-bind:to="'/'" id="quit">{{uiLabels.quitGame}}</router-link>
    </div>

  <div class="playersjoin">
      <h1> {{uiLabels.playersjoin}}</h1>
   
      
   {{this.nicknameId}}


      

      
  </div>  

  

  
  <div>
     <router-link  v-bind:to="'/voting/'+lang">{{uiLabels.vote}}</router-link>
    </div>

   
 
  </body>
  
  </template>
 

  <script>

  //import QuestionComponent from '@/components/QuestionComponent.vue';
import io from 'socket.io-client';
const socket = io();
 export default {
  name: 'ConnectView',
  
  data: function () {
    return {
      lang: "en",
      pollId: "",
      question: ["",""],
      answers: ["", ""],
      questionNumber: 0,
      data: {},
      uiLabels: {},
      nicknameId: ""
      

    }
  },
  created: function () {
    
    this.lang = this.$route.params.lang;
    this.pollId = this.$route.params.pollId
    console.log("i connectView i created function tas följande data emot: ", this.lang, this.pollId, this.data)
    
    socket.emit("pageLoaded", this.lang);
    socket.emit('joinPoll', this.pollId);
    socket.emit("getNickname", this.pollId);
    
    
    socket.on("init", (labels) => {
      this.uiLabels = labels
      console.log("i init i UI-labels tas följande data emot: ", this.uiLabels)
    

    })

    socket.on("dataUpdate", (data) =>{
      this.data = data
      console.log("i connectView i socket-dataUpdate tas följande data emot: ", this.data)
    })
   
   
    socket.on("nicknamecreated", (nicknames) =>{
    this.nicknameId = nicknames
    console.log("i connectView i socket-nicknameCreated tas följande data emot: ", this.nicknameId)


    })
      
     

  },

  methods: {
   
 
   
  }
  
}



</script>
 
 
  <style scoped>
   body {
    background-color: rgb(185, 242, 244);
    width: 100%;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 2em auto;
   }
 
   .playersjoin {
 margin-top: 150px;
  font-size: 15pt;
  font-family: "Fjord one";
  text-transform: uppercase;
  text-align: center;
  white-space: nowrap;
  margin-left: 0%;}




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
