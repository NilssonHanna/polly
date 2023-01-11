<template>
  <div id="background">
    <div >
      <router-link v-bind:to="'/'" id="quit">{{uiLabels.quitGame}}</router-link>
      </div>
    
    <div>
    <div id="playervote">
      <h1> {{uiLabels.voting}}</h1>
    
    </div>

    <div id="votes">
    <h2>{{uiLabels.pleaseVote}}</h2>

    <form id="options">
      <div v-for="(option, index) in allexplanations" :key="index"> 
      <input type="radio" v-bind:value="option" v-model="selectedOption"/>
      {{ option }}
      </div>
    </form>

    
  </div>

  </div>
   

    <div>
      <button v-on:click="checkResult" class="send" >{{uiLabels.send}}</button>
    </div>


  </div>
</template>
  
<script>
import io from 'socket.io-client';
import random from 'lodash.random';
const socket = io();


export default{
  name: 'VotingView',
  data: function () {
    return {
      uiLabels: {},
      pollId: "",
      lang: "en",
      
      currentQuestionIndex: 0,
      questions: "",
      currentQuestion: null,
      allexplanations: [],
      selectedOption:"",
      playerExplanations: "",
      answer: "",
      
    }
  },

  created: function () {

    this.allexplanations.sort(() => random(2) - 1)

    //socket.on('redirect', route => {
    //  this.$router.push(route)
    //})

  
  this.pollId = this.$route.params.id
  console.log("pollid i votingview,", this.pollId)
  this.lang = this.$route.params.lang
  
  socket.emit('joinPoll', this.pollId)
  socket.emit("pageLoaded", this.lang)
  socket.emit("getAllExplanations", this.pollId)
    socket.on("init", (labels) => {
      this.uiLabels = labels
    
    })


    socket.on("receiveExplanations", (questions) => {
    console.log("i votingview, questions som kommer in, ", questions)
    this.questions=questions;


    this.playerExplanations = this.questions[this.currentQuestionIndex].playerExplanations
    this.answer = this.questions[this.currentQuestionIndex].answer

    console.log("playerExplanations", this.playerExplanations)

    this.playerExplanations.push(this.answer)
    this.allexplanations=this.playerExplanations

    console.log("vår allexplanations i votingview: ", this.allexplanations)
    
    socket.on("getCurrentQuestionIndex", (currentQuestionIndex) => {
      console.log("getCurrentQuestionIndex", currentQuestionIndex);
      this.currentQuestionIndex = currentQuestionIndex;
    })

  })
  },

  methods: {

    checkResult: function() {
      
      this.$router.push({path:'/result/'+this.lang+'/'+this.pollId})
      //this.$router.push('/result/'+this.lang+'/'+this.pollId)
      
    }

  }


}


</script>
  
<style scoped>
  #background {
    background-color: rgb(244, 185, 237);
    width: 100%;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 2em auto;
  }

  #playervote{
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

#votes {
  margin-top: 30px;
  font-size: 15pt;
  font-family: "Fjord one";
  text-transform: uppercase;
  text-align: center;
  white-space: nowrap;
  margin-left: 0%;
  font-weight: bold;
}

#options {
  margin-top: 10px;
  font-size: 15pt;
  font-family: "Fjord one";
  text-transform: uppercase;
  white-space: nowrap;
  margin-left: 44%;
  text-align: left;
  padding: 15px;
  margin-left: 130px;

}

#options div {
  padding: 10px; 
}

input[type="radio"] {
  -webkit-appearance: none;
  appearance: none; 
  width: 20px;
  height: 20px;
  border: 3px solid #000000;
  background-color:red;
  border-radius: 50%;
  outline: none;
  box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.1);
  transition: 0.2s;
  cursor: pointer;
}

input[type="radio"]:hover {
  box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.3);
}

input[type="radio"]:before {
  content: "";
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 1;
  transition: 0.2s;
}

input[type="radio"]:checked {
  border: 3px solid #000000;
  background-color: #4CAF50;
}

input[type="radio"]:checked:before {
  opacity: 1;
}

.send {
    grid-area: footer;
    background-color: rgb(238, 85, 203);
    font-size: 1.25rem;
    letter-spacing: 0.1em;
    color: black;
    text-transform: uppercase;
    padding: 20px;
    bottom: 40px;
    position: absolute;
    right: 5%;
    font-family: "Fjord one";
    box-shadow: 5px 5px 5px;
    text-decoration: none;
  }
  .send:not([disabled]):focus {
  box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(233, 226, 229, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
}
.send:not([disabled]):hover {
  box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(224, 215, 219, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
}

@media screen and (max-width:50em){

  #background {
    background-color: rgb(244, 185, 237);
    width: 100%;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 2em auto;
    position: fixed;
  }

  #playervote{
    margin-top: 120px;
    font-size: 10px;
    font-family: "Fjord one";
    text-transform: uppercase;
    text-align: center;
    white-space: nowrap;
    margin-right: 800px;
  
}
#quit{
  background-color: rgb(255, 6, 52);
  font-size: 1rem;
  color: rgb(255, 255, 255);
  width:40px;
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

#votes {
  margin-top: 10px;
  font-size: 6px;
  font-family: "Fjord one";
  text-transform: uppercase;
  text-align: center;
  white-space: nowrap;
  margin-right: 800px;
  font-weight: bold;
}

#options {
  margin-top: 10px;
  font-size: 10px;
  font-family: "Fjord one";
  text-transform: uppercase;
  text-align: center;
  white-space: nowrap;
  margin-left: 0%;
  text-align: left;
  white-space: pre-line;
  padding: 15px;
}

#options div {
  padding: 5px; 
}

input[type="radio"] {
  -webkit-appearance: none;
  appearance: none; 
  width: 15px;
  height: 15px;
  border: 3px solid #000000;
  background-color:red;
  border-radius: 50%;
  outline: none;
  box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.1);
  transition: 0.2s;
  cursor: pointer;
}

input[type="radio"]:hover {
  box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.3);
}

input[type="radio"]:before {
  content: "";
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 1;
  transition: 0.2s;
}

input[type="radio"]:checked {
  border: 3px solid #000000;
  background-color: #4CAF50;
}

input[type="radio"]:checked:before {
  opacity: 1;
}

.send {
    grid-area: footer;
    background-color: rgb(238, 85, 203);
    font-size: 1.2rem;
    letter-spacing: 0.1em;
    color: black;
    text-transform: uppercase;
    padding: 10px;
    bottom: 10px;
    position: absolute;
    right: 5%;
    font-family: "Fjord one";
    box-shadow: 5px 5px 5px;
    text-decoration: none;
    position: fixed;
  }
  .send:not([disabled]):focus {
  box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(233, 226, 229, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
}
.send:not([disabled]):hover {
  box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(224, 215, 219, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
}

}
</style>