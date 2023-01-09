<template>
  <body>
    <div>
    <router-link v-bind:to="'/'" id="quit">{{uiLabels.quitGame}}</router-link>
  </div>
  <div>
    <header class="header">
        <h1>{{uiLabels.createWordExplanation}}</h1>
        <h3>{{pollId}}</h3>
    </header>
    <div class="wrapper">

      <div class="wordDesign">
      <label for="word">{{uiLabels.word}}</label><br>
      <input class="word" v-for="(_, i) in words" 
              v-model="words[i]"
              v-bind:key="'words'+i">
     </div>
     
     <div class="explanationDesign"> 
      <label for="explanation">{{uiLabels.explanation}}</label><br>
      <input class="explanation"  v-for="(_, i) in explanations" 
              v-model="explanations[i]" 
              v-bind:key="'explanation'+i">
      </div>


    </div>

    <button class="addWords" @click="addAnswer"> 
        <h7>{{uiLabels.addWord}}</h7>
      </button>

  
    <button v-on:click="startPoll" class="startGame" >{{uiLabels.beginToPlay}}</button>
  </div>
</body>
</template>

   <script>
import io from 'socket.io-client';
  const socket = io();
  
  export default {
   name: 'QuestionsView',
   data: function () {
     return {
       lang: "en",

       words: [""],
       explanations: [""],

       questions: [],
       pollId: '',
       questionNumber: 0,
       data: {},
       uiLabels: {},
      }
    },
    created: function () {
      this.lang = this.$route.params.lang; //Hämtar info från förra viewen
      this.pollId = this.$route.params.id;
      socket.emit("pageLoaded", this.lang);
      socket.emit('joinPoll', this.pollId)
      //socket.emit("addQuestion", {pollID: this.pollID, wordExplanation: [this.word, this.explanation]})
      socket.on("init", (labels) => {
        this.uiLabels = labels
      })
      socket.on("dataUpdate", (data) =>
        this.data = data
      )
      
    },
    methods: {
      startPoll: function () {
        for (let i = 0; i < this.words.length; i++) {
          console.log("i", i);
          this.questions.push({ word: this.words[i], answer: this.explanations[i], playerExplanations: []})
        }
        
        socket.emit("startPoll", {pollId: this.pollId, questions: this.questions} );
        this.$router.push('/words/'+this.lang+'/'+this.pollId)
        socket.emit('redirect', {route: '/Word/'+this.lang, pollId: this.pollId})
        
      },

      addAnswer: function () {
        this.words.push("");
        this.explanations.push("");
  
      },
    }
  }
  
  </script>
  
  <style scoped>
  
 body {
  background-color: rgb(248, 166, 229);
  width: 100%;
  font-family: "Fjord one";   
  display: grid;
  min-height: 120vh;
  }
  #quit{ 
  background-color: rgb(255, 6, 52);
  font-size: 1.5rem;
  color: rgb(255, 255, 255);
  width:160px;
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

  .start {
    grid-area: footer;
    background-color: rgb(238, 85, 203);
    font-size: 1.25rem;
    letter-spacing: 0.1em;
    color: black;
    text-transform: uppercase;
    padding: 20px;
    bottom: 350px;
    position: absolute;
    right: 50%;
    font-family: "Fjord one";
    box-shadow: 5px 5px 5px;

  }

  
  * {
  box-sizing: border-box;
  }
  
  .wrapper{  
    width: 500px;
    display: grid;
    margin-left: 470px;
    grid-template-areas: 
    'header header'
    'left right'
    'footer footer';
    grid-column-gap: 10px;  
  }
  .head{
    padding: 10px;
    height: 200px;
  }
  .header{
    grid-area: header;
    text-align: center;
    /*margin-bottom: 400px;*/
    font-family: "Fjord one";
    /*grid-template-columns: 5px 5px;*/
  }
  .left,
  .right{
    padding: 10px;
    height: 300px;
  }
  .explanationDesign{
    grid-area: right;
    font-family: "Fjord one";
    font-weight: bold;
    
  }
  .wordDesign{
    grid-area: left;
    margin-left: auto;
    font-family: "Fjord one";
    font-weight: bold;
  }
  .word{
    padding: 10px;
  }
  .explanation{
    padding: 10px;
  }
  .addWords{
    grid-area: footer;
    padding: 10px;
    background-color: black;
    color: white;
    margin-bottom: 300px;
    font-family: "Fjord one";
    font-size: 1.2rem;
    width: 200px;
    
  }
  
  .startGame{
    grid-area: footer;
    background-color: rgb(238, 85, 203);
    font-size: 1.25rem;
    letter-spacing: 0.1em;
    color: black;
    text-transform: uppercase;
    padding: 20px;
    bottom: 350px;
    position: absolute;
    right: 3%;
    font-family: "Fjord one";
    box-shadow: 5px 5px 5px;
  }
  .startGame:not([disabled]):focus {
  box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(233, 226, 229, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
}
.startGame:not([disabled]):hover {
  box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(224, 215, 219, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
}
  
  
  
  
  
  
 </style>
