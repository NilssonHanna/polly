<template>
  <div id="background">

    <div>
      <router-link v-bind:to="'/'" class="quit">{{uiLabels.quitGame}}</router-link>
    </div>

      <div class="timer">{{ counter }} s 
    </div>

    <div class="gamecode">
      <h2> Gamecode: {{pollId}} </h2>
    </div>
          
    <div class="word">
        <h2> {{this.questions[this.currentQuestionIndex].word}}</h2>
    </div>

    <div id="formulate">
        <h2> {{uiLabels.formulate}}</h2>
    </div>
       
    <div>
      <button v-on:click="nextQuestion" id="playnextword">{{uiLabels.nextWord}}</button>
    </div>

  </div>
</template>
   
  <script>
  import io from 'socket.io-client';
  const socket = io();
  export default {
    name: 'WordsView',  
    data: function () {
      return {
        counter: 120,
        lang: "en",
        questions: [],
        explanations: "",

  
        pollId: "",
        submittedAnswers: {},
        currentQuestionIndex: 0,
        uiLabels: {},

      }
    },

    created: function () {
    const timer = setInterval(() => {
      this.counter--
      if (this.counter === 0) {
        clearInterval(timer)
        this.$router.push('/explanations/'+this.lang+'/'+ this.pollId)
      }
    }, 1000)

      this.pollId = this.$route.params.id;
      this.lang = this.$route.params.lang;
  
      socket.emit('getQuestions', this.pollId)
      socket.emit('pageLoaded', this.lang)
  
    socket.on("allQuestions", (questions) => {
      this.questions = questions;
      console.log("i wordsview,allwords", this.words)
    })

    socket.on("getCurrentQuestionIndex", (currentQuestionIndex) => {
      console.log("getCurrentQuestionIndex", currentQuestionIndex);
      this.currentQuestionIndex = currentQuestionIndex;
    })

    socket.on("init", (labels) => {
   this.uiLabels = labels
 })
  
    },
    methods: {
      nextQuestion: function () {
        socket.emit("getNextQuestionIndex", this.pollId);
      },
    }}

   </script>

<style scoped>
   
  #background {
    background-color: lightyellow;
    display: grid;
    grid-template-columns: 2em auto;
    min-height: 100vh;
    width: 100%;
    position: fixed;
    }

  .timer {
    font-family: "Fjord one"; 
    text-align: center;
    margin: auto;
    display: block;
    position: relative;
    left: 0px;
    top: 60px;
    border-radius: 100%;
    padding: 10px;
    background: rgb(0, 0, 0);
    border: 10px solid #000;
    color: rgb(255, 255, 255);
    width: 100px;
    height: 100px;
    line-height: 100px;
    font-size: 50px;
    color: #fff;
    }

  .gamecode {
    font-family: "Fjord one";
    font-size: 10px;
    margin-top: 20px;
    margin-left: 685px;
    text-transform: uppercase;
    text-align: center;
    width: 100px;
  }

  .word {
    font-family: "Fjord one";
    font-size: 30px;
    text-transform: uppercase;
    margin-top: 100px;
  }
    
  #formulate {
    font-size: 15pt;
    font-family: "Fjord one";
    text-transform: uppercase;
    text-align: center;
    white-space: nowrap;
    margin-left: 400px;
    bottom: 100px;
    
  }

.quit {
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
    
  #playnextword {
    grid-area: footer;
    background-color: rgb(238, 85, 203);
    font-size: 1.25rem;
    letter-spacing: 0.1em;
    color: black;
    text-transform: uppercase;
    padding: 20px;
    bottom: 150px;
    position: absolute;
    right: 3%;
    font-family: "Fjord one";
    box-shadow: 5px 5px 5px;
  }

  #playnextword:not([disabled]):focus {
    box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
  }

  #playnextword:not([disabled]):hover {
    box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
  }


  @media screen and (max-width:50em) {

  #background {
    background-color: lightyellow;
    display: grid;
    grid-template-columns: 2em auto;
    min-height: 100vh;
    width: 100%;
    position: fixed;
    }

  .timer {
    font-family: "Fjord one"; 
    text-align: center;
    position: relative;
    top: 60px;
    border-radius: 100%;
    padding: 10px;
    background: rgb(0, 0, 0);
    border: 10px solid #000;
    color: rgb(255, 255, 255);
    width: 100px;
    height: 100px;
    line-height: 100px;
    font-size: 50px;
    color: #fff;
    align-items: center;
    justify-content:center;
    margin-left: 100px;
    }

  .gamecode {
    font-family: "Fjord one";
    font-size: 8px;
    margin-top: 30px;
    text-transform: uppercase;
    margin-left: 150px;
  }

  .word {
    font-family: "Fjord one";
    font-size: 30px;
    text-transform: uppercase;
    align-items: center;
    justify-content:center;
    margin-right: 30px;
    margin-top: 100px;
  }
    
  #formulate {
    font-size: 9px;
    font-family: "Fjord one";
    text-transform: uppercase;
    text-align: center;
    white-space: nowrap;
    align-items: center;
    margin-top: 100px;
    margin-left: 60px;
  }

.quit {
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
    
  #playnextword {
    grid-area: footer;
    background-color: rgb(238, 85, 203);
    font-size: 1.25rem;
    letter-spacing: 0.1em;
    color: black;
    text-transform: uppercase;
    padding: 20px;
    position: absolute;
    font-family: "Fjord one";
    box-shadow: 5px 5px 5px;
    align-items: center;
    justify-content:center;
    margin-right: 65px;
    bottom: 10px;
  }

  #playnextword:not([disabled]):focus {
    box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
  }

  #playnextword:not([disabled]):hover {
    box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
  }

}
  
</style>
  
 