<template>
  <body>
    <div >
      <router-link v-bind:to="'/'" id="quit">{{uiLabels.quitGame}}</router-link>
      </div>
    
    <div>
    <div id="playervote">
      <h1> {{uiLabels.voting}}</h1>
    </div>
  </div>
   

    <div>
      <router-link v-bind:to="('/waitingexplanation/'+lang+'/'+pollId)" class="send">{{uiLabels.send}}</router-link>
    </div>
  </body>
</template>
  
<script>
import io from 'socket.io-client';
const socket = io();

export default{
  name: 'VotingView',
  data: function () {
    return {
      uiLabels: {},
      pollId: "",
      lang: "en",
    }
  },

  created: function () {

  this.pollId = this.$route.params.pollId
  this.lang = this.$route.params.lang
  socket.emit('joinPoll', this.pollId)
  socket.emit("pageLoaded", this.lang)
    socket.on("init", (labels) => {
      this.uiLabels = labels
    
    })
  }


}


</script>
  
<style scoped>
  body {
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

.send{
    grid-area: footer;
    background-color: rgb(238, 85, 203);
    font-size: 1.25rem;
    letter-spacing: 0.1em;
    color: black;
    text-transform: uppercase;
    padding: 20px;
    bottom: 150px;
    position: absolute;
    right: 45%;
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
</style>