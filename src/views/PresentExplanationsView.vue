<template>
  <div id="background">
    <div>
       <router-link v-bind:to="'/'" id="quit">{{uiLabels.quitGame}}</router-link>
     </div>

   <div class="playersjoin">
       <h1> {{uiLabels.xplanderPresents}}</h1>
   </div>  

   <div>
      <router-link  v-bind:to="'/answer/'+lang">{{uiLabels.vote}}</router-link>
     </div>
    
    </div>
  
</template>

<script>
import io from "socket.io-client";
const socket = io();
export default {
  name: "PresentExplanationsView",
  data: function () {
    return {
      lang: "",
      pollId: "",
      data: {},
      uiLabels: {},
      nicknameId: "",
    };
  },
  created: function () {
    this.lang = this.$route.params.lang;
    this.pollId = this.$route.params.id;
    this.nicknameId = this.$route.params.nickname;

    socket.emit("pageLoaded", this.lang);

    socket.on("redirect", (route) => {
      this.$router.push(route + "/" + this.nicknameId);
    });

    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
    socket.on("dataUpdate", (data) => (this.data = data));
    socket.on("nicknameCreated", (data) => (this.data = data));
  },
};
</script>

   
<style scoped>
  #background {
  background-color: rgb(113, 255, 144);
   width: 100%;
   min-height: 100vh;
   display: grid;
   grid-template-columns: 2em auto;
  }

  .playersjoin {
 margin-top: 300px;
 font-size: 15pt;
 font-family: "Fjord one";
 text-transform: uppercase;
 text-align: center;
 white-space: nowrap;
 margin-left: 0%;}

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
#quit{
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
.playersjoin {
margin-top: 300px;
font-size: 12pt;
letter-spacing: 0.2rem;
text-align: center;
font-family: "Fjord one";
text-transform: uppercase;
text-align: center;
white-space: nowrap;
margin-left: -30px;
white-space: pre-line;
}
}

</style>
