<template>
  <body>
    <button id="language" v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>

  <div id="quit">
    <router-link v-bind:to="'/'" class="link">{{uiLabels.quitGame}}</router-link>
  </div>

    <h1> {{uiLabels.gamecode}}</h1>

  <label>
    <!--Write poll id: -->
    <input type="text" v-model="pin">
  </label>

  <div id="next">
    <router-link v-bind:to="'/nickname/'+id" class="link">{{uiLabels.next}}</router-link>
  </div>
  
  <div>
  </div>
  </body>
  </template>
  
  <script>
  import io from 'socket.io-client';
  const socket = io();

  export default {
    name: 'JoinView',

    data: function () {
      return {
        uiLabels: {},
        pin: "",
        lang: "en",
      }
    },
    created: function () {
      socket.on("init", (labels) => {
        this.uiLabels = labels
      })
    },
    methods: {
      switchLanguage: function() {
        if (this.lang === "en")
          this.lang = "sv"
        else
          this.lang = "en"
        socket.emit("switchLanguage", this.lang)
      },

    }
  }
  </script>

<style scoped>
  body {
    background-color: rgb(244, 185, 237);
    width: 100%;
    min-height: 100vh;
  }

  #language {
  background-color: rgb(254, 190, 201);
  font-size: 1.5rem;
  color: black;
  padding: 25px;
  position: absolute;
  top: -20px;
  right: 0px;
  font-family: "Fjord one";
  cursor:pointer;
}

  .text {
    margin-top: 100px;
    text-transform: uppercase;
    text-align: center;
    font-size: 3rem;
    color: rgb(0, 0, 0);
    font-family: "Fjord one";
    font-weight: bold;
}

.gamecode{
  margin-top: 150px;
  font-size: 20pt;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  
}
  
#next{
  background-color: rgb(90, 58, 64);
  font-size: 1.5rem;
  color: rgb(255, 255, 255);
  padding: 30px;
  margin-top: -200px;
  position: absolute;
  left: 70%;
  top:100%;
  transform: translateX(-50%);
  font-family: "Fjord one";
}

#quit{
  background-color: rgb(230, 120, 140);
  font-size: 1.5rem;
  color: rgb(255, 255, 255);
  padding: 30px;
  top: -20px;
  left:50px;
  position: absolute;
  transform: translateX(-50%);
  font-family: "Fjord one";
}

.link{
  color: white;
}


@media screen and (max-width:50em) {
  .logo {
    font-size: 5vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hamburger::before {
    content: "☰";
  }
  .close::before {
    content: "✕";
  }
  .hide {
    left:-12em;
  }

}
</style>