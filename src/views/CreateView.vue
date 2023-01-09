
<template>  
  <body>

  <div>
    <router-link v-bind:to="'/'" id="quit">{{uiLabels.quitGame}}</router-link>
  </div>

  <div>
      
  <div class="gamecode">
    <h1> {{uiLabels.createGamecode}} </h1>
  </div>

  <div class="input">
        <label>
          <input
          type="text"
          v-model="pollId"
          :placeholder="lang === 'en' ? 'Create gamecode...' : 'Skapa gamecode...'"
        />     
        </label>
      </div>
  <div>
    <button v-on:click="createPoll" id="createwords">{{uiLabels.createWords}}</button>
  </div>

</div>

 </body>
</template>

 <script>
  
 import io from 'socket.io-client';
 const socket = io();
  
 export default {
  name: 'CreateView',
  data: function () {
    return {
      lang: "en",
      pollId: "",
      data: {},
      uiLabels: {}
    }
  },

//how to pass a game code trough a whole quiz in vue

  created: function () {
    this.lang = this.$route.params.lang;
    this.pollId = this.$route.params.id;
    
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
  
    socket.on("dataUpdate", (data) =>
      this.data = data
    )
    socket.on("pollCreated", (data) => {
      this.data = data;
    })
  },
  methods: {
   // createQuestions: function () {
   //  socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
   // },

   
    //createPoll: function () {
      //socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
    //},

    createPoll: function () {
      socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
      this.$router.push('/questions/'+this.lang+'/'+this.pollId)
    
    }
  }
}

 </script>

<style scoped>

body {
  background-color: rgb(182, 249, 239);
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 2em auto;
}
.gamecode {
  margin-top: 120px;
  font-size: 15pt;
  font-family: "Fjord one";
  text-transform: uppercase;
  text-align: center;
  white-space: nowrap;
  margin-left: 0%;
}

#quit {
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

#createwords {
  background-color: rgba(255, 22, 197, 0.825);
  font-size: 1.5rem;
  letter-spacing: 0.1em;
  color: rgb(0, 0, 0);
  width:200px;
  top: 50%;
  left: 50%;
  padding: 20px;
  margin-top: 100px;
  border-radius: 12px;
  box-shadow: 5px 5px 5px;
  transform: translateX(-50%);
  font-family: "Fjord one";
  cursor: pointer;
  position: absolute; 
  text-transform: uppercase; 
} 

#createwords:not([disabled]):focus {
  box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
}

#createwords:not([disabled]):hover {
  box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
}

.input{
 padding:100px; 
 transform:scale(3);
 font-size: 0.4rem;
 font-family: "Fjord one";
}

</style>
