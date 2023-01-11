<template>
  <div class="background">
    <div>
      <router-link v-bind:to="'/'" id="quit">{{uiLabels.quitGame}}</router-link>
    </div>
    <div class="playersjoin">
        <h1 class="playersjoin1"> {{uiLabels.playersjoin}} </h1> <h1 class="playersjoin2"> {{uiLabels.playersjoin2}}</h1>
        <div v-for="player in nicknames" :key="player" id="players">
          {{ player }}
        </div>
    </div>  
  </div>
  </template>

<script>
import io from "socket.io-client";
const socket = io();
export default {
  name: "ConnectView",

  data: function () {
    return {
      lang: "en",
      pollId: "",
      data: {},
      uiLabels: {},
      nicknameId: "",
      nicknames: "",
    };
  },
  created: function () {
    this.lang = this.$route.params.lang;
    this.pollId = this.$route.params.id;
    this.nicknameId = this.$route.params.nickname;

    socket.emit("pageLoaded", this.lang);
    socket.emit("joinPoll", this.pollId);
    socket.emit("getNickname", this.pollId);

    socket.on("redirect", (route) => {
      this.$router.push(route + "/" + this.nicknameId);
    });

    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
    socket.on("dataUpdate", (data) => {
      this.data = data;
    });

    socket.on("nicknamecreated", (nicknames) => {
      this.nicknames = nicknames;
    });

    socket.on("newUrl", (newGameURL) => {
      window.location = newGameURL;
    });
  },
  methods: {},
};
</script>
<style scoped>
  .background {
   background-color: rgb(185, 242, 244);
   width: 100%;
   min-height: 100vh;
   display: grid;
   grid-template-columns: 2em auto;
   position: fixed;
  }

  .playersjoin {
 margin-top: 150px;
 font-size: 15pt;
 font-family: "Fjord one";
 text-transform: uppercase;
 white-space: nowrap;
 margin-left: 0%;
}
.playersjoin1 {
 margin-left: -350px;
 margin-top:-20px;
}
.playersjoin2 {
 margin-left: 437px;
 margin-top: -73px;
}
 #players{
   padding: 5px;
   background-color: rgb(197, 139, 251);
   width: 300px;
   margin-left: 37%;
   margin-top: 15px;
   border-radius: 5px;
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

 @media screen and (max-width:50em) {

  .playersjoin {
margin-top: 150px;
 font-size: 10pt;
 font-family: "Fjord one";
 text-transform: uppercase;
 text-align: center;
 white-space: nowrap;
 margin-left: 0%;
 line-break: auto;
}
.playersjoin1 {
 margin-left: -40px;
 margin-bottom: 70px;
 margin-top: 0px;
}
.playersjoin2 {
 margin-left: -10px;
}
 #players{
   padding: 5px;
   background-color: rgb(197, 139, 251);
   width: 300px;
   margin-left: 0%;
   margin-top: 5px;
   border-radius: 5px;
 }
#quit{
 background-color: rgb(255, 6, 52);
 font-size: 1rem;
 color: rgb(255, 255, 255);
 width: 75px;
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
 }

 </style>