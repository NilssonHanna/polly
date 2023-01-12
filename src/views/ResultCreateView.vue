<template>
  <div class="background">
    <div>
      <div v-if="playerindex === allexplanations.length - 1">
        <div id="correctExplanationHeadline">
          <h1>{{ uiLabels.correctExplanation }}</h1>
        </div>

        <div id="correctExplanation">
          <h2>{{ allexplanations[allexplanations.length - 1].text }}</h2>
        </div>

        <div id="results">
          {{ uiLabels.results }}
          <div id="round">
            {{ uiLabels.round }} {{ this.currentQuestionIndex + 1 }}:
          </div>
        </div>

        <div>
          <router-link v-bind:to="'/'" id="quit">{{
            uiLabels.quitGame
          }}</router-link>
        </div>

        <div class="wrapper">
          <div class="grid">
            <div id="explanationVotingHeadline">{{ uiLabels.explanation }}</div>
            <div
              id="explanationVoting"
              v-for="explanation in allexplanations"
              :key="explanation"
              class="grid-item"
            >
              {{ explanation.text }}
            </div>
          </div>
          <div class="grid">
            <div id="explanationVotingHeadline">{{ uiLabels.votes }}</div>
            <div
              id="explanationVoting"
              v-for="explanation in allexplanations"
              :key="explanation"
              class="grid-item"
            >
              {{ explanation.votes }}
            </div>
          </div>
        </div>

        <div>
          <button
            v-if="this.currentQuestionIndex < this.questions.length - 1"
            v-on:click="nextRound"
            id="nextRound"
          >
            {{ uiLabels.nextRound }}
          </button>

          <button
            v-if="this.currentQuestionIndex == this.questions.length - 1"
            v-on:click="winner"
            id="presentWinner"
          >
            {{ uiLabels.winner }}
          </button>
        </div>
      </div>
      <div v-else>
        <h2 id="waitingLine"> {{uiLabels.waitingCreate}} </h2>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";

const socket = io();

export default {
  name: "ResultView",

  computed: {
    message() {
      return this.$route.query.message;
    },
  },

  data: function () {
    return {
      words: "",
      lang: "",
      explanations: "",
      pollId: "",
      currentQuestion: null,
      uiLabels: {},
      currentQuestionIndex: 0,
      questions: [],
      allexplanations: [],
      playerExplanations: "",
      answer: "",
      playerindex: "",
      //labellist: [],
    };
  },
  created: function () {
    this.pollId = this.$route.params.id;
    this.lang = this.$route.params.lang;

    socket.emit("joinPoll", this.pollId);
    socket.emit("pageLoaded", this.lang);
    socket.emit("getAllExplanations", this.pollId);
    socket.emit("getNextPlayerIndex", this.pollId);
    socket.emit("getQuestions", this.pollId);

    //this.numPeople += 1

    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });

    socket.on("dataUpdate", (data) => (this.data = data));

    socket.on("returnPlayerIndex", (playerindex) => {
      this.playerindex = playerindex;
    });

    socket.on("receiveExplanations", (allexplanations) => {
      this.allexplanations = allexplanations;
    });

    socket.on("allQuestions", (questions) => {
      this.questions = questions;
    });

    socket.on("getCurrentQuestionIndex", (currentQuestionIndex) => {
      this.currentQuestionIndex = currentQuestionIndex;
      this.currentExplanation =
        this.allexplanations[this.currentExplanationIndex];
    });
  },
  methods: {
    nextRound: function () {
      this.$router.push("/words/" + this.lang + "/" + this.pollId);

      socket.emit("redirect", {
        route: "/word/" + this.lang,
        pollId: this.pollId,
      });
      socket.emit("getNextQuestionIndex", this.pollId);
      socket.emit("zeroPlayerIndex", this.pollId);
    },

    winner: function () {
      this.$router.push(
        "/winner/" + this.lang + "/" + this.pollId + "/creator"
      );
      socket.emit("redirect", {
        route: "/winner/" + this.lang,
        pollId: this.pollId,
      });
    },
  },
};
</script>

<style>
.background {
  background-color: rgb(244, 185, 237);
    width: 100%;
    min-height: 100vh;
    display: grid;
}

#correctExplanationHeadline {
  font-size: 1.25rem;
  letter-spacing: 0.1em;
  color: rgb(0, 0, 0);
  text-transform: uppercase;
  text-align: center;
  margin-top: 50px;
  font-family: "Fjord one";
}

#correctExplanation {
  font-size: 1.25rem;
  letter-spacing: 0.1em;
  color: rgb(0, 0, 0);
  text-transform: uppercase;
  font-family: "Fjord one";
  text-align: center;
  margin: 0 auto;
}

#waitingLine{
  font-size: 3rem;
  font-family: "Fjord one";
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  margin-top: 350px;
  
}

#results {
  font-size: 1.5rem;
  letter-spacing: 0.1em;
  color: rgb(0, 0, 0);
  text-align: center;
  margin: 0 auto;
  padding-top: 10px;
  font-family: "Fjord one";
  margin-top: 50px;
}

#round {
  font-size: 2rem;
  font-family: "Fjord one";
  text-transform: uppercase;
  color: rgb(149, 28, 28);
  margin-bottom: 20px;
  margin-top: 10px;
}

#explanationVoting {
  font-size: 1.25rem;
  font-family: "Fjord one";
  margin-top: 15px;
  padding-bottom: 10px;
  margin-bottom: 25px;
}

#explanationVotingHeadline {
  font-size: 1.5rem;
  font-family: "Fjord one";
  font-weight: bold;
  margin-top: 15px;
  padding-bottom: 10px;
  margin-bottom: 25px;
  text-transform: uppercase;
}

.grid {
  display: grid;
  grid-auto-rows: 50px;
}

.wrapper {
  border: 2px solid rgb(0, 0, 0);
  font-size: 1.25rem;
  font-family: "Fjord one";
  text-align: center;
  margin: 0 auto;
  width: 700px;
  display: grid;
  grid-template-areas:
    "header header"
    "left right"
    "footer footer";
  grid-column-gap: 10px;
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

#presentWinner {
  background-color: rgba(255, 22, 197, 0.825);
  color: rgb(0, 0, 0);
  font-size: 1.5rem;
  padding: 20px;
  bottom: 50px;
  right: 50px;
  letter-spacing: 0.1em;
  font-family: "Fjord one";
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
  position: absolute;
  width: 220px;
  cursor: pointer;
}

  #presentWinner:not([disabled]):focus {
    box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
  }
  #presentWinner:not([disabled]):hover {
    box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
  }

  #nextRound {
  background-color: rgba(255, 22, 197, 0.825);
  color: rgb(0, 0, 0);
  font-size: 1.5rem;
  padding: 20px;
  bottom: 50px;
  left: 600px;
  letter-spacing: 0.1em;
  font-family: "Fjord one";
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
  position: absolute;
  width: 220px;
  cursor: pointer;
}

  #nextRound:not([disabled]):focus {
    box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
  }
  #nextRound:not([disabled]):hover {
    box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
  }

@media screen and (max-width: 50em) {

  .background {
  background-color: rgb(244, 185, 237);
  width: 100%;
  min-height: 100vh;
  min-width: 100vh;
}

  #waitingLine{
  font-size: 0.5rem;
  font-family: "Fjord one";
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  margin-top: 350px;
  
}

#correctExplanationHeadline {
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  color: rgb(0, 0, 0);
  text-transform: uppercase;
  text-align: center;
  margin-top: 0px;
  font-family: "Fjord one";
}

#correctExplanation {
  font-size: 1.25rem;
  letter-spacing: 0.1em;
  color: rgb(0, 0, 0);
  text-transform: uppercase;
  font-family: "Fjord one";
  text-align: center;
  margin: 0 auto;
}

#results {
  font-size: 1.5rem;
  letter-spacing: 0.1em;
  color: rgb(0, 0, 0);
  text-align: center;
  margin: 0 auto;
  padding-top: 10px;
  font-family: "Fjord one";
  margin-top: 50px;
}

#round {
  font-size: 2rem;
  font-family: "Fjord one";
  text-transform: uppercase;
  color: rgb(149, 28, 28);
  margin-bottom: 20px;
  margin-top: 10px;
}

#explanationVoting {
  font-size: 1.25rem;
  font-family: "Fjord one";
  margin-top: 15px;
  padding-bottom: 10px;
  margin-bottom: 25px;
}

#explanationVotingHeadline {
  font-size: 1.5rem;
  font-family: "Fjord one";
  font-weight: bold;
  margin-top: 15px;
  padding-bottom: 10px;
  margin-bottom: 25px;
  text-transform: uppercase;
}

.grid {
  display: grid;
  grid-auto-rows: 50px;
}

.wrapper {
  border: 2px solid rgb(0, 0, 0);
  font-size: 1.25rem;
  font-family: "Fjord one";
  text-align: center;
  margin: 0 auto;
  width: 700px;
  display: grid;
  grid-template-areas:
    "header header"
    "left right"
    "footer footer";
  grid-column-gap: 10px;
}

#presentWinner {
  background-color: rgba(255, 22, 197, 0.825);
  color: rgb(0, 0, 0);
  font-size: 1.5rem;
  padding: 5px;
  margin-bottom: -10px;
  right: -190px;
  letter-spacing: 0.1em;
  font-family: "Fjord one";
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
  position: absolute;
  width: 300px;
  cursor: pointer;
}

  #presentWinner:not([disabled]):focus {
    box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
  }
  #presentWinner:not([disabled]):hover {
    box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
  }

  #nextRound {
  background-color: rgba(255, 22, 197, 0.825);
  color: rgb(0, 0, 0);
  font-size: 1.5rem;
  padding: 20px;
  margin-bottom: 1000px;
  left: 350px;
  letter-spacing: 0.1em;
  font-family: "Fjord one";
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
  position: fixed;
  width: 220px;
  cursor: pointer;
}

  #nextRound:not([disabled]):focus {
    box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
  }
  #nextRound:not([disabled]):hover {
    box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
  }

  #quit {
    background-color: rgb(255, 6, 52);
    font-size: 1rem;
    color: rgb(255, 255, 255);
    padding: 20px;
    top: 10px;
    left:70px;
    letter-spacing: 0.1em;
    position: absolute;
    transform: translateX(-50%);
    font-family: "Fjord one";
    text-transform: uppercase;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    font-weight: bold;
    width: 75px;
}

}


</style>
