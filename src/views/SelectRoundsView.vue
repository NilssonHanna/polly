<template>
  <body>
    <div>
      <router-link v-bind:to="'/'" id="quit">{{uiLabels.quitGame}}  </router-link>
    </div>
      
      <div id="header">
        <h1> {{uiLabels.enterNumber}} Enter number of words </h1>
      </div>

      <div id="header">
        <h2> Gamecode: {{this.pollId}} </h2>
      </div>

      <select id="select" v-model="selected">
        <option disabled value="">Select a number</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>10</option>
      </select>
    
    <div>
      <button v-on:click="startGame" id="startgame"> Start Game! </button>
    </div>

  
  </body>

</template>

 <script>
  // @ is an alias to /src
  import io from 'socket.io-client';
  const socket = io('http://localhost:8080');
   
  export default {
   name: 'WordStackView',

   data: function () {
     return {
       lang: "en",
       word: ["",""],
       pollId: '',
       question: "",
       submittedAnswers: {
       },
       uiLabels: {},
     }
   },

   created: function () {
      this.pollId = this.$route.params.id
      this.lang = this.$route.params.lang
      console.log("pollid", this.pollId);
      

      socket.emit('joinPoll', this.pollId);
      socket.emit("pageLoaded", this.lang);

      socket.on('my-eventserver)', (message) => {
      console.log(message);
});

     socket.on("init", (labels) => {
        this.uiLabels = labels
      })
     
     socket.on("dataUpdate", (update) => {
       this.submittedAnswers = update.a;
       this.question = update.q;
       
     });

     socket.on("newQuestion", update => {
       this.question = update.q;
       this.data = {};
     })
   },
    methods: {
      startGame: function () {
        //socket.emit("startGame", {pollId: this.pollId, lang: this.lang })
        this.$router.push('/words/'+this.lang+'/'+this.pollId)
      
      }
    }
}
   // methods: {
   // createQuestions: function () {
   //  socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
   // },
    
    /* 
    
    createPoll: function () {
      console.log("hej createPoll", this.pollId, this.lang)
      socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
    },
  },

  mounted () {
    console.log("hej!")
    socket.on('my-event', (message) => {
  console.log('hej', message, 'received');
}); }

 }
 */

  </script>
 <style scoped>

body {
    background-color: rgb(244, 185, 237);
    width: 100%;
    min-height: 100vh;
    display: grid;
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

#header{
  margin-top: 20px;
  font-size: 15pt;
  font-family: "Fjord one";
  text-transform: uppercase;
  text-align: center;
  white-space: nowrap;
  margin-left: 0%;
}

#startgame {
  background-color: rgb(145, 145, 145);
  font-size: 1.3rem;
  color: rgb(255, 255, 255);
  width:200px;
  padding: 20px;
  letter-spacing: 0.1em;
  font-family: "Fjord one";

}

#select {
  font-family: "Fjord one";
  font-size: 1.3rem;
  width: 150px;
  height: 75px; 
  margin-left: 45%; 
  margin-top: 20px; 
}

</style>
