<template>
  <body>
  <div>

    <header class="header">
        <h1>{{uiLabels.createWordExplanation}}</h1>
        <h3>{{pollId}}</h3>
  
    </header>
    <div class="wrapper">

      <div class="wordDesign">
      <label for="word">Word</label><br>
      <input class="word" v-for="(_, i) in word" 
              v-model="word[i]"
              v-bind:key="'word'+i">

     </div>
     <div class="explanationDesign"> 

      <label for="explanation">Explanation</label><br>
      <input class="explanation"  v-for="(_, i) in explanations" 
              v-model="explanations[i]" 
              v-bind:key="'explanation'+i">

      </div>
      <button class="addWord" @click="addAnswer"> 
        Add word
      </button>
    </div>
    <!--<button class="addQstBtn" @click="addQuestion()">
      Emit questions
    </button>-->
  
    <button v-on:click="addQuestion" id="startGame">Begin to play</button>
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
       lang: "",
       word: [""],
       pollId: '',
       explanations: [""],
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
     // createPoll: function () {
       // socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
      //},

      addQuestion: function () {
        socket.emit("addQuestion", {pollId: this.pollId, q: this.word, a: this.explanations } )
        this.$router.push('/words/'+this.lang+'/'+this.pollId)
      },

      addAnswer: function () {
        this.word.push("");
        this.explanations.push("");

      },
      //runQuestion: function () {
        //socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
      //}

      navigateToSecondView:function() {
        socket.emit("q", {pollId: this.pollId, q: this.word, a: this.explanations } )
        this.$router.push('/word/'+this.lang+'/'+this.pollId)
      }
      
    }
  }

  
  </script>
  
  <style scoped>
  .v-text-field{
    width:50px;
  }
  
 body {
    background-color: pink;
    width: 100%;
    display: grid;
    /*grid-template-columns: 50em;*/
    min-height: 100vh;
    font-family: "Fjord one";
  }
  
  .header{
    margin-top: 100px;
    margin-bottom: 30px;
    font-family: "Fjord one";
    grid-template-columns: 5px 5px;
  }
  
  .wordExplanation{
    height:20px;
    width:250px;
    margin-right: 40px;
    margin-bottom: 10px;
    font-family: "Fjord one";
  }
  
  .addQstBtn {
    margin-right: 40px;
    padding: 10px;
    background-color: rgb(255, 254, 254);
    font-size: 1rem;
    font-family: "Fjord one";
  
  }

  .addWord{
    padding: 8px;
    margin-left: 50px;
    background-color: black;
    color: white;
  }
  
  #startGame{
    background-color: turquoise;
    font-size: 1.25rem;
    color: black;
    padding: 20px;
    margin-bottom: 100px;
    margin-top: 400px;
    position: absolute;
    right: 3%;
    transform: translateX(-50%);
    font-family: "Fjord one";
  }
  
  
  .wrapper{
    
    width: 500px;
    font-family: "Fjord one";
    display: grid;
    margin-left: 400px;
    position: center;
    position: absolute;
    grid-template-columns: repeat(2, 100px);
    gap: 100px;
    grid-auto-rows: repeat(2, 100px);
    grid-template-areas: 
    "a b"
    "a b";
    align-items: start;
   
  }
  

  .explanationDesign{
    grid-area: b;
  }

  .wordExplanation{
    grid-area: a;
    margin-left: auto;
  }

  .word{
    padding: 10px;
  }

  .explanation{
    padding: 10px;
  }
  
  #word_header{
    margin-right: 320px;
    margin-top: 50px; 
  }
  
  
  
  
  
  
 </style>
 
