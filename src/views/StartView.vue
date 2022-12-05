<template>
  <body>
    <div class="logo"> 
      Xplanandum 
    </div>

  <button id="language" v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>

  <div id="create">
    <router-link class="link" v-bind:to="'/create/'+lang">{{uiLabels.createPoll}}</router-link> 
  </div>

  
  <div id="join">
    <router-link class="link" v-bind:to="'/join/'+lang" >{{uiLabels.participatePoll}}</router-link> 
  </div>

</body>
</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'StartView',
  data: function () {
    return {
      uiLabels: {},
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
    background-color: rgb(161, 255, 160);
    width: 100%;
    display: grid;
    grid-template-columns: 2em auto;
    min-height: 100vh;
  }
  
  .logo {
    text-transform: uppercase;
    margin-left: 350px;
    margin-top: 120px;
    letter-spacing: 0.2em;
    font-size: 4rem;
    color: rgb(0, 0, 0);
    padding-top:0.2em;
    font-family: "Fjord one";
    font-weight: bold;
}
  

  #language {
  background-color: rgb(254, 190, 201);
  font-size: 1.5rem;
  color: black;
  padding: 25px;
  position: absolute;
  top: -10px;
  right: 0px;
  font-family: "Fjord one";
  cursor:pointer;
}

#create {
  background-color: rgb(90, 58, 64);
  font-size: 1.5rem;
  color: rgb(255, 255, 255);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 30px;
  margin-top: 300px;
  position: absolute;
  left: 40%;
  width:100px;
  transform: translateX(-50%);
  font-family: "Fjord one";

}

.link{
  color: rgb(255, 255, 255);
  text-decoration: none;
}

/*#or{
  margin-left: 530px;
  margin-top: 10px;
  font-size: 1.5rem;
  font-family: "Fjord one"; 
}

/*#pollid {
  font-family: "Fjord one";
  font-size: 1.5rem;
}*/

#join {
  background-color: rgb(90, 58, 64);
  font-size: 1.5rem;
  color: rgb(255, 255, 255);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 30px;
  margin-top: 300px;
  position: absolute;
  left: 60%;
  width:100px;
  transform: translateX(-50%);
  font-family: "Fjord one";
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
