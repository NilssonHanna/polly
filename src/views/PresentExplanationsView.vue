<template>
    <body>
      <div>
         <router-link v-bind:to="'/'" id="quit">{{uiLabels.quitGame}}</router-link>
       </div>
  
     <div class="playersjoin">
         <h1> {{uiLabels.xplanderPresents}}</h1>
     </div>  
  
     <div>
        <router-link  v-bind:to="'/answer/'+lang+'/'+pollId+'/'+nicknameId">{{uiLabels.vote}}</router-link>
       </div>
      
      </body>
    
  </template>
  
  <script>
  //import QuestionComponent from '@/components/QuestionComponent.vue';
  import io from 'socket.io-client';
  const socket = io();
  export default {
  name: 'PresentExplanationsView',
  data: function () {
    return {
      lang: "",
      pollId: "",
      question: ["",""],
      answers: ["", ""],
      questionNumber: 0,
      data: {},
      uiLabels: {},
      nicknameId:""
  
    }
    },
    created: function () {
      socket.on('redirect', route => {
      this.$router.push(route+'/'+this.nicknameId)
      })

      this.lang = this.$route.params.lang;
      this.pollId = this.$route.params.id;
      this.nicknameId = this.$route.params.nickname;
  
      socket.emit("pageLoaded", this.lang);
      socket.on("init", (labels) => {
        this.uiLabels = labels
      })
      socket.on("dataUpdate", (data) =>
        this.data = data
      )
      socket.on("nicknameCreated", (data) =>
        this.data = data)
    },
    methods: {
      addQuestion: function () {
        this.question.push("")
        /*socket.emit("addQuestion", {pollId: this.pollId, q: this.question, a: this.answers } )*/
        /*den ovan kanske behövs senare för att koppla till resultview!*/
      },
      addAnswer: function () {
        this.answers.push("")
      },
      runQuestion: function () {
        socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
      },
    }
  }
  </script>
     
     
     <style scoped>
      body {
      background-color: rgb(113, 255, 144);
       width: 100%;
       min-height: 100vh;
       display: grid;
       grid-template-columns: 2em auto;
      }
    
      .playersjoin {
     margin-top: 300px;
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
  