<template>
  <div id="background">
 <div>
      <router-link v-bind:to="'/'" id="quit">{{uiLabels.quitGame}}</router-link>
    </div>
  
    <div>
      <header class="header">
        <h1>{{uiLabels.createWordExplanation}}</h1>
        <h3> Gamecode: {{pollId}}</h3>
      </header>
    
      <div class="wrapper">
        <div id="wordDesign">
          <label for="word">{{uiLabels.word}}</label><br>
            <input id="word" v-for="(_, i) in words" 
              v-model="words[i]"
              v-bind:key="'words'+i">
          </div>
     
      <div id="explanationDesign"> 
          <label for="explanation">{{uiLabels.explanation}}</label><br>
            <input id="explanation"  v-for="(_, i) in explanations" 
              v-model="explanations[i]" 
              v-bind:key="'explanation'+i">
      </div>
    </div>

    <button id="remove" v-on:click="removeAnswer"> 
      {{uiLabels.remove}} 
    </button>

    <button id="addWords" @click="addAnswer"> 
        <h7>{{uiLabels.addWord}}</h7>
    </button>

  
    <button v-on:click="startPoll" id="startGame" >{{uiLabels.beginToPlay}}</button>
  </div>
</div>
</template>

<script>
import io from "socket.io-client";
const socket = io();

export default {
  name: "QuestionsView",
  data: function () {
    return {
      lang: "en",
      words: [""],
      explanations: [""],
      questions: [],
      pollId: "",
      data: {},
      uiLabels: {},
    };
  },
  created: function () {
    this.lang = this.$route.params.lang;
    this.pollId = this.$route.params.id;
    socket.emit("pageLoaded", this.lang);
    socket.emit("joinPoll", this.pollId);

    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
    socket.on("dataUpdate", (data) => (this.data = data));
  },
  methods: {
    startPoll: function () {

      let hasEmptyWords = this.words.some(word => word === '');
        let hasEmptyExplanations = this.explanations.some(explanation => explanation === '');

      for (let i = 0; i < this.words.length; i++) {
        
        if (hasEmptyWords || hasEmptyExplanations) {
            console.log("man får icke ha tomt")
          }else{

        this.questions.push({
          word: this.words[i],
          answer: { text: this.explanations[i], votes: 0 },
          playerExplanations: [],
        });
      
      

      socket.emit("startPoll", {
        pollId: this.pollId,
        questions: this.questions,
      });
      this.$router.push("/words/" + this.lang + "/" + this.pollId);
      socket.emit("redirect", {
        route: "/word/" + this.lang,
        pollId: this.pollId,
      });
      }
    }
      },
    


    addAnswer: function () {
      if (this.words.length < 8) {
      this.words.push("");
      this.explanations.push("");
      }
    },

    removeAnswer: function(){
        if(this.words.length >1){
          this.words.pop("");
          this.explanations.pop("");

        }
      }

    
  },
};
</script>

<style scoped>
  
  #background {
    background-color: rgb(248, 166, 229);
    width: 100%;
    font-family: "Fjord one";   
    display: grid;
    min-height: 120vh;
    position: fixed; 
  }
  #quit { 
    background-color: rgb(255, 6, 52);
    font-size: 1.5rem;
    color: rgb(255, 255, 255);
    width:110px;
    padding: 30px;
    letter-spacing: 0.1em;
    position: absolute;
    transform: translateX(-50%);
    font-family: "Fjord one";
    text-transform: uppercase;
    cursor: pointer;
    text-decoration: none;
    left: 110px;
    top: 20px;
  }
  .wrapper {  
    
    width: 500px;
    display: grid;
    margin-left: 470px;
    grid-template-areas: 
    'left right'
    'footer footer';
    grid-column-gap: 10px;  
  }
  .header {
    grid-area: header;
    text-align: center;
    font-family: "Fjord one";
  }
    
  #explanationDesign {
    grid-area: right;
    font-family: "Fjord one";
    font-weight: bold;
  }
  
  #wordDesign {
    grid-area: left;
    margin-left: auto;
    font-family: "Fjord one";
    font-weight: bold;
  }

  #word {
    padding: 15px;
    margin: 10px;
  }
  #explanation {
    padding: 15px;
    margin: 10px;
  }
   
  #addWords {
    padding: 20px;
    background-color: black;
    color: white;
    margin-bottom: 200px;
    font-family: "Fjord one";
    font-size: 1.2rem;
    width: 200px;
    margin: 30px;
    margin-left: 5px;
  }

  #remove{
    padding: 20px;
    background-color: black;
    color: white;
    margin-bottom: 200px;
    font-family: "Fjord one";
    font-size: 1.2rem;
    width: 200px;
    margin: 30px;
  }
    
  #startGame {
    background-color: rgb(238, 85, 203);
    font-size: 1.5rem;
    letter-spacing: 0.1em;
    color: rgb(0, 0, 0);
    text-transform: uppercase;
    padding: 20px;
    bottom: 350px;
    position: absolute;
    cursor: pointer;
    right: 3%;
    font-family: "Fjord one";
    border-radius: 12px;
    box-shadow: 5px 5px 5px;  
  }
    
  #startGame:not([disabled]):focus {
    box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
  }
  #startGame:not([disabled]):hover {
    box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
  }
  @media screen and (max-width:50em) {

    #background {
    background-color: rgb(248, 166, 229);
    width: 100%;
    font-family: "Fjord one";   
    display: grid;
    min-height: 120vh;
    position: fixed;
  }
  #quit { 
    background-color: rgb(255, 6, 52);
    font-size: 1rem;
    color: rgb(255, 255, 255);
    width:75px;
    padding: 20px;
    top: 10px;
    left: 70px;
    letter-spacing: 0.1em;
    position: absolute;
    transform: translateX(-50%);
    font-family: "Fjord one";
    text-transform: uppercase;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    font-weight: bold;
  }
  .wrapper {  
    display: grid;
    grid-template-columns: repeat(2, 30%);
    grid-column-gap: 50px;  
    margin-left: 2%;
    margin-bottom: 100%;
  }
  .header {
    text-align: center;
    font-family: "Fjord one";
    align-items: center;
    justify-content:center;
    font-size: 2.5vw;
    margin-right: 25%;
    margin-top: 20%;
  }
    
  #explanationDesign {
    grid-column: 2;
    font-family: "Fjord one";
    margin-left: auto;
    font-weight: bold;
  }
  #wordDesign {
    grid-column: 1;
    margin-left: auto;
    font-family: "Fjord one";
    font-weight: bold; 
  }
  #word {
    padding: 5px;
    margin: 5px;
  }
  #explanation {
    padding: 5px;
    margin: 5px;
  }
   
  #addWords {
    padding: 10px;
    background-color: black;
    color: white;
    font-family: "Fjord one";
    font-size: 1.2rem;
    width: 150px;
    position: fixed;
    left: 210px;
    bottom: 70px;
  }

  #remove{
    padding: 10px;
    background-color: black;
    color: white;
    font-family: "Fjord one";
    font-size: 1.2rem;
    width: 150px;
    position: fixed;
    left: 5px;
    bottom: 70px;
  }
    
  #startGame {
    background-color: rgb(238, 85, 203);
    letter-spacing: 0.1em;
    color: rgb(0, 0, 0);
    text-transform: uppercase;
    padding: 20px;
    cursor: pointer;
    right: 35%;
    font-family: "Fjord one";
    border-radius: 12px;
    box-shadow: 5px 5px 5px;  
    align-items: center;
    justify-content:center;
    font-size: 2.5vw;
    display: flex;
    position: fixed;
    bottom: 10px;
  }
    
  #startGame:not([disabled]):focus {
    box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
  }
  #startGame:not([disabled]):hover {
    box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
  }
  }
  </style>