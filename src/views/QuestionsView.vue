<!--<template>
  <body>
    <div>
      <header class="header">
        <h1>{{uiLabels.createWordExplanation}}</h1>
  
        <h3 id="word_header"> {{uiLabels.words}} </h3>
        <h3 id="explanation_header">{{uiLabels.explanation}}</h3> 
  
      </header>
        <div class="wrapper">
          {{uiLabels.words}} {{}} {{uiLabels.explanation}}

          <p>
            <label for="word">Word</label><br>
            <input class="word" type="text" v-model="word" v-for="n in word"
              v-bind:key="('word'+n)" placeholder="Put word here">
          </p>

          <p>
            <label for="explanation">Explanation</label><br>
            <input class="explanation" type="text" v-model="explanation" v-for="n in explanation"
              v-bind:key="('explanation'+n)" placeholder="Put explanation here">
          </p>

          <button class="addQstBtn" v-on:click="addQuestion">
            Add word and explanation
          </button>
        </div>
        </div>
        <router-link id="startGame" v-bind:to="('/waiting/'+lang)">Start game</router-link>
  </body>
  </template>-->

<template>
  <body>
  <div>
    {{pollId}}
    <header class="header">
        <h1>{{uiLabels.createWordExplanation}}</h1>
  
    </header>
    <div class="wrapper">
      <label for="word">Word</label><br>
      <input class="word" v-for="(_, i) in word" 
      v-model="word[i]"
      v-bind:key="'word'+i">
      <div>
        <label for="explanation">Explanation</label><br>
        <input class="explanation" v-for="(_, i) in explanation" 
               v-model="explanation[i]" 
               v-bind:key="'explanation'+i">
        <button v-on:click="addAnswer">
          Add word
        </button>
      </div>
    </div>
    <button v-on:click="addQuestion">
      Send information
    </button>
    <input type="number" v-model="questionNumber">
    <button v-on:click="runQuestion">
      Run question
    </button>
    {{data}}
    <!--<router-link id="startGame" v-bind:to="'/poll/:id'+pollId">Check result</router-link>-->
  </div>
</body>
</template>

   <script>

import io from 'socket.io-client';
  const socket = io();
  
  export default {
    //props: ['pollId'],
   name: 'QuestionsView',
   data: function () {
     return {
       lang: "",
       word: ["",""],
       explanation: ["", ""],
       questionNumber: 0,
       data: {},
       uiLabels: {},
       pollID:''
      }
    },
    created: function () {
      this.lang = this.$route.params.lang; //Hämtar info från förra viewen
      socket.emit("pageLoaded", this.lang);
      //socket.emit("addQuestion", {pollID: this.pollID, wordExplanation: [this.word, this.explanation]})
      socket.on("init", (labels) => {
        this.uiLabels = labels
      }
      )
      socket.on("dataUpdate", (data) =>
        this.data = data
      )
      socket.on("pollCreated", (data) =>
        this.data = data)

    },
    methods: {
      createPoll: function () {
        socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
      },

      printWord: function(){
        console.log(this.word);
      },

      addQuestion: function () {
        socket.emit("addQuestion", {pollId: this.pollId, q: this.word, a: this.explanation } )
        this.$router.push({
          path: '/word/:lang',
          query: {
            q: this.word, a: this.explanation
          }
        })
      },
      addAnswer: function () {
        this.word.push("");
        this.explanation.push("");
      },
      runQuestion: function () {
        socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
      }
    }
  }

 /*import io from 'socket.io-client';
  const socket = io();
   export default {
    name: 'QuestionsView',
    data: function () {
      return {
        lang: "",
        pollId: "",
        word: ["",""],
        explanation: ["", ""],
        msg: "",
        wordExplanation: ["word", "explanation"],
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
      socket.on("pollCreated", (data) =>
        this.data = data)
    },
  
    methods: {*/
  
      /*addQuestion: function () {
        this.word.push("")
        this.explanation.push("")
        let msg = {
          words: this.word, 
          explanations: this.explanation
        }
        socket.emit("msg", {pollId: this.pollId, msg } )
      },*/
        /*socket.emit("addQuestion", {pollId: this.pollId, q: this.question, a: this.answers } )*/
        /*den ovan kanske behövs senare för att koppla till resultview!
  
      runQuestion: function () {
        socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
  
      },
    }
  }*/
  
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
    margin-top: 70px;
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
  
  #startGame{
    background-color: rgb(207, 19, 53);
    font-size: 1.25rem;
    color: white;
    padding: 20px;
    margin-bottom: 100px;
    margin-top: 400px;
    position: absolute;
    right: 3%;
    transform: translateX(-50%);
    font-family: "Fjord one";
  }
  
  .wrapper{
    grid-template-columns: 5px 5px;
    margin-left: 300px;
    margin-right: 300px;
    font-family: "Fjord one";
   
  }
  
  #word_header{
    margin-right: 320px;
    margin-top: 50px; 
  }
  
  
  
  
  
  
 </style>
 