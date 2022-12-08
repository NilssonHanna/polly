<template>
  <body>

    <div >
      <router-link v-bind:to="'/'" id="quit">{{uiLabels.quitGame}}</router-link>
      </div>
    
    
    <div>
    <div id="gamecode">
      <h1> {{uiLabels.gamecode}}</h1>
    </div>

    <div id="input">
      <label>
        <!--Write poll id: -->
        <input type="text" v-model="pin" id="text">
      </label>
    </div>
  </div>
   
    
    <div>
      <router-link v-bind:to="('/nickname/'+lang)" id="next">{{uiLabels.next}}</router-link>
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
      socket.emit("pageLoaded", this.lang)
      this.lang = this.$route.params.lang
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



#gamecode{
  margin-top: 120px;
  font-size: 15pt;
  font-family: "Fjord one";
  text-transform: uppercase;
  text-align: center;
  white-space: nowrap;
  margin-left: 0%;
  
}

#text{
  font-size: 10pt;
  font-family: "Fjord one";
  transform: scale(2);
  margin-bottom: 100px;
}

#input{
  padding:90px; 
}

  
#next{
  background-color: rgb(90, 58, 64);
  font-size: 1.5rem;
  color: rgb(255, 255, 255);
  width:80px;
  padding: 30px;
  margin-top: -150px;
  position: absolute;
  left: 85%;
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