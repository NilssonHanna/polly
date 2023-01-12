<template>
  <div id="background">

    <div>
      <router-link v-bind:to="'/'" id="quit">{{uiLabels.quitGame}}</router-link>
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
       

  </div>
</template>

<script>
import io from "socket.io-client";
const socket = io();
export default {
  name: "WordsView",
  data: function () {
    return {
      counter: 40,
      lang: "en",
      questions: [],
      explanations: "",
      pollId: "inactive poll",
      submittedAnswers: {},
      currentQuestionIndex: 0,
      uiLabels: {},
      
    };
  },

  created: function () {
    this.pollId = this.$route.params.id;
    this.lang = this.$route.params.lang;

    socket.emit("getQuestions", this.pollId);
    socket.emit("pageLoaded", this.lang);
    socket.emit("joinPoll", this.pollId);

    const timer = setInterval(() => {
      this.counter--;
      if (this.counter === 0) {
        clearInterval(timer);
        this.$router.push("/explanations/" + this.lang + "/" + this.pollId);
      }
    }, 1000);

    socket.on("allQuestions", (questions) => {
      this.questions = questions;
    });

    socket.on("getCurrentQuestionIndex", (currentQuestionIndex) => {
      this.currentQuestionIndex = currentQuestionIndex;
    });
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
  },
  methods: {
    nextQuestion: function () {
      socket.emit("getNextQuestionIndex", this.pollId);
    },
  },
};
</script>

<style scoped>
   
  #background {
    background-color: rgb(128, 211, 255);
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
    margin-top: 70px;
    margin-left: 685px;
    text-transform: uppercase;
    text-align: center;
    width: 100px;
  }
  .word {
    font-family: "Fjord one";
    font-size: 30px;
    text-transform: uppercase;
    margin-top: 150px;
  }
    
  #formulate {
    font-size: 15pt;
    font-family: "Fjord one";
    text-transform: uppercase;
    text-align: center;
    white-space: nowrap;
    margin-left: 400px;
    margin-bottom: 150px;
    
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
    background-color: rgb(147, 217, 255);
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
    top: 80px;
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
    margin-top: 80px;
    text-transform: uppercase;
    margin-left: 150px;
  }
  .word {
    font-family: "Fjord one";
    font-size: 15px;
    text-transform: uppercase;
    align-items: center;
    justify-content:center;
    margin-right: 30px;
    margin-top: 150px;
  }
    
  #formulate {
    font-size: 9px;
    font-family: "Fjord one";
    text-transform: uppercase;
    text-align: center;
    white-space: nowrap;
    align-items: center;
    margin-top: 50px;
    margin-left: 50px;
  }
#quit {
  background-color: rgb(255, 6, 52);
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