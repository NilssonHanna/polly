<template>
  <body>
    <div >
      <router-link v-bind:to="'/'" id="quit">{{uiLabels.quitGame}}</router-link>
      </div>
    
    
    <div>
    <div id="playersvote">
      <h1> {{uiLabels.vote}}</h1>
    </div>
   
    <div class="input">
      <label>
        <input type="text" v-model="pollId" class="text">
      </label>
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

  #playersvote{
  margin-top: 120px;
  font-size: 15pt;
  font-family: "Fjord one";
  text-transform: uppercase;
  text-align: center;
  white-space: nowrap;
  margin-left: 0%;
  
}
.text{
  font-size: 10pt;
  font-family: "Fjord one";
  transform: scale(2);
  margin-bottom: 100px;
}
.input{
  padding:90px; 
}
  
.send{
  background-color: rgb(48, 239, 125);
  font-size: 1.5rem;
  color: rgb(255, 255, 255);
  width:80px;
  padding: 30px;
  margin-top: -150px;
  position: absolute;
  left: 50%;
  top:100%;
  transform: translateX(-50%);
  font-family: "Fjord one";
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
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
</style>