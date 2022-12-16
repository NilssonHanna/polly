<template>
  <body>
    <div>
       <router-link v-bind:to="'/'" id="quit">{{uiLabels.quitGame}}</router-link>
     </div>

   <div id="playersjoin">
       <h1> {{uiLabels.playersjoin}}</h1>
   </div>  

   <div>
      <router-link  v-bind:to="'//'+lang">{{uiLabels.vote}}</router-link>
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
    lang: "",
    pollId: "",
    question: ["",""],
    answers: ["", ""],
    questionNumber: 0,
    data: {},
    uiLabels: {},

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
      background-color: rgb(185, 242, 244);
     width: 100%;
     min-height: 100vh;
     display: grid;
     grid-template-columns: 2em auto;
    }
  
    .playersjoin {
      text-transform: uppercase;
      position: fixed;
      letter-spacing: 0.2em;
      font-size: 4rem;
      color: rgb(0, 0, 0);
      font-family: "Fjord one";
      font-weight: bold;
      position: absolute;
      top: 150px;
      right: 200px;
      left: 200px;

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