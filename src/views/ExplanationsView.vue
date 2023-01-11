<template>
  <div id="background">
  
  <div>
    <router-link v-bind:to="'/'" id="quit">{{uiLabels.quitGame}}</router-link>
  </div>

  <div id="presentExplanation">
    <h1> {{uiLabels.presentExplanation}} </h1>
  </div>

  <div class="explanation">
      <h2> {{currentExplanation.text}}</h2>
  </div>

  <div>
      <button @click="showNextExplanation" id="nextExplanation">  {{uiLabels.nextExplanation}}</button>
      <button v-on:click="votingtime" id="votingTime" >{{uiLabels.votingtime}}</button>
 
  </div>

</div>
</template>


<script>
import io from "socket.io-client";
import random from "lodash.random";

const socket = io();
export default {
  name: "ExplanationsView",
  data: function () {
    return {
      lang: "",
      explanations: "",
      pollId: "",
      currentQuestion: null,
      uiLabels: {},
      currentQuestionIndex: 0,
      questions: "",
      allexplanations: [],
      playerExplanations: "",
      answer: "",
      currentExplanationIndex: 0,
      currentExplanation: "",
    };
  },
  created: function () {
    this.pollId = this.$route.params.id;
    this.lang = this.$route.params.lang;

    socket.emit("joinPoll", this.pollId);
    socket.emit("pageLoaded", this.lang);
    socket.emit("getAllExplanations", this.pollId);
    socket.emit("getQuestions", this.pollId);

    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
    socket.on("receiveExplanations", (allexplanations) => {
      this.allexplanations = allexplanations;
      this.allexplanations.sort(() => random(2) - 1);
      socket.emit("getQuestions", this.pollId);
    });
    socket.on("getCurrentQuestionIndex", (currentQuestionIndex) => {
      this.currentQuestionIndex = currentQuestionIndex;

      this.currentExplanation =
        this.allexplanations[this.currentExplanationIndex];
    });
  },
  methods: {
    showNextExplanation: function () {
      this.currentExplanationIndex++;
      if (this.currentExplanationIndex >= this.allexplanations.length) {
        this.currentExplanationIndex = 0;
      }
      this.currentExplanation =
        this.allexplanations[this.currentExplanationIndex];
    },
    votingtime: function () {
      this.$router.push("/resultcreate/" + this.lang + "/" + this.pollId);
      socket.emit("redirect", {
        route: "/voting/" + this.lang,
        pollId: this.pollId,
      });
    },
  },
};
</script>
<style scoped>
 
 #background{
  background-color: rgb(182, 249, 239);
  width: 100%;
  min-height: 100vh;
  display: grid;
  position:fixed;
  }

  #nextExplanation {
    padding: 20px;
    background-color: black;
    color: white;
    font-family: "Fjord one";
    font-size: 1.2rem;
    width: 200px;
    margin: 150px;
    margin-top: -100px;


  }

  #presentExplanation {
    margin-top: 40px;
    font-family: "Fjord one";
    text-transform: uppercase;
    text-align: center;
    white-space: nowrap;
    margin-left: 0%;
    font-size: 1.2rem;
    white-space: pre-line;
    padding: 20px;
    
  }

  .explanation {
    font-family: "Fjord one";
    font-size: 30px;
    margin-top: 50px;
    text-transform: uppercase;
    white-space: pre-line;
    padding: 20px;
    margin-top: -20px;
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

  #votingTime{
    grid-area: footer;
    background-color: rgb(238, 85, 203);
    font-size: 1.3rem;
    letter-spacing: 0.1em;
    color: black;
    text-transform: uppercase;
    padding: 20px;
    bottom: -400px;
    position: absolute;
    right: 620px;
    font-family: "Fjord one";
    box-shadow: 5px 5px 5px; 
    width: 200px;
    font-weight: bold;

  }
  
#votingTime:not([disabled]):focus {
  box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
}

#votingTime:not([disabled]):hover {
  box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
}

@media screen and (max-width:50em) {


  #nextExplanation {
    padding: 20px;
    background-color: black;
    color: white;
    font-family: "Fjord one";
    font-size: 1.2rem;
    width: 200px;
    margin-left: -100px;
    margin-top: -150px;
    white-space: pre-line;
    position: fixed;
  }

  #presentExplanation {
    margin-top: 10px;
    font-size: 10px;
    font-weight: bold;
    font-family: "Fjord one";
    text-transform: uppercase;
    text-align: center;
    white-space: nowrap;
  }

  .explanation {
    font-family: "Fjord one";
    font-size: 15px;
    margin-top: -150px;
    text-transform: uppercase;
    text-align: center;
    white-space: pre-line;
    padding: 20px;
  }

#quit {
  background-color: rgb(255, 6, 52);
  font-size: 1rem;
  color: rgb(255, 255, 255);
  width:75px;
  padding: 20px;
  top: 10px;
  left:50px;
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

  #votingTime{
    grid-area: footer;
    background-color: rgb(238, 85, 203);
    font-size: 1rem;
    letter-spacing: 0.1em;
    color: black;
    text-transform: uppercase;
    padding: 10px;
    position: absolute;
    font-family: "Fjord one";
    box-shadow: 5px 5px 5px; 
    margin-right: 70px; 
    margin-bottom: -40px;
    width: 200px;
    position: fixed;

  }
  
#votingTime:not([disabled]):focus {
  box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
}

#votingTime:not([disabled]):hover {
  box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
}


}

</style>