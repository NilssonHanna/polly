<template>
  <body>
    <div >
      <router-link v-bind:to="'/'" id="quit">{{uiLabels.quitGame}}</router-link>
    </div>

      <div>
        <div class="timer">{{timer}} s </div> 

      <div id="explanation"> 
        <h2> {{this.word}}</h2>
      </div>

      <div class="input">
        <label>
          <input
          type="text"
          v-model="playerExplanation"
          placeholder="explanation"
        />     
        </label>
      </div>
  </div>
  <div>
    <button @click.once="submit" :disabled="isDisabled" class="next">press to save your answer</button>
  </div>
</body>
</template>

<script>

import io from 'socket.io-client';
const socket = io();

export default {
name: 'WordView',
data: function () {
 return {
   counter: 20,
   lang: "",
   data: {},
   pollId:"",
   uiLabels: {},
   nicknameId: "",
   word: "",
   playerExplanation: "",
 }
},

created: function () {

this.lang = this.$route.params.lang;
this.pollId = this.$route.params.id;

const timer = setInterval(() => {
      this.counter--
      if (this.counter === 0) {
        clearInterval(timer)
        this.$router.push('/voting/'+this.lang+'/'+ this.pollId)
      }
    }, 1000)
  


 socket.emit("pageLoaded", this.lang);
 socket.emit("getCurrentWord", this.pollId);

 socket.on("init", (labels) => {
   this.uiLabels = labels
   console.log("i wordview", labels)
 })

 socket.on("getCurrentWord", (word) => {
   this.word = word;
   console.log("i wordview, currentwords", this.word);
  })

 socket.on("dataUpdate", (data) =>
   this.data = data,

 
)},
  methods: {

    getNextQuestion: function () {
          socket.emit("getNextQuestion", this.pollId);
        },
    createNickname: function () {
      socket.emit("createNickname", this.pn)
    },

    
    submit: function () {
      console.log("wordview submit playerExplanation", this.playerExplanation);
      socket.emit('submitExplanation', { pollId: this.pollId, explanation: this.playerExplanation });
      //this.$router.push('/waitinganswer/'+this.lang+'/'+this.pollId);
    }
  }
}
</script>

<style scoped>
body {
 background-color: rgb(213, 252, 162);
    width: 100%;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 2em auto;
   }

#word {
font-family: "Fjord one";
font-size: 20px;
margin-top: 200px;
}

#explanation {
font-family: "Fjord one";
font-size: 30px;
margin-top: 100px;
}
#writeNickname {
   margin-top: 120px;
   font-size: 15pt;
   font-family: "Fjord one";
   text-transform: uppercase;
   text-align: center;
   white-space: nowrap;
   margin-left: 0%;
   }
  

.input{
 padding:60px; 
 transform:scale(4);
 font-size: 10pt;
 font-family: "Fjord one";
}

  .next {
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

.timer {
  font-family: "Fjord one";
  font-size: 3rem;
  text-align: center;
	margin: auto;
	display: block;
  position: relative;
  left: 0px;
  border-radius: 100%;
  width: 100px;
  height: 100px;
  padding: 10px;
  background: rgb(0, 0, 0);
  border: 10px solid #000;
  color: rgb(255, 255, 255);

    }
     
  </style>