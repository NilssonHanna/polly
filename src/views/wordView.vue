<template>
  <div id="background">
    <div >
      <router-link v-bind:to="'/'" id="quit">{{uiLabels.quitGame}}</router-link>
    </div>

      <div>
        
        <div class="timer">{{counter}} s </div> 

      <div id="word"> 
        <h2> {{this.word}}</h2>
      </div>

      <div class="input">
        <label>
          <input
          type="text"
          v-model="playerExplanation"
          :placeholder="lang === 'en' ? 'Write your explanation...' : 'Skriv din förklaring...'"
        />     
        </label>
      </div>
  </div>
  <div>
   <button 
  @click="submit" 
  :disabled="isDisabled" 
  :class="{ 'next-pressed': isPressed }"
  @click.once="isPressed = !isPressed"
  id="saveAnswer"
>
<span v-if="!isPressed">press to save your answer</span>
    <span v-if="isPressed">saved</span>
 
</button>
  </div>
</div>
</template>

<script>

import io from 'socket.io-client';
const socket = io();

export default {
name: 'WordView',
data: function () {
 return {
   counter: 40,
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
this.nicknameId = this.$route.params.nickname;

const timer = setInterval(() => {
      this.counter--
      if (this.counter === 0) {
        clearInterval(timer)
        this.$router.push('/PresentExplanations/'+this.lang+'/'+ this.pollId+'/'+ this.nicknameId)
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

#background {
 background-color: rgb(213, 252, 162);
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 2em auto;
  position: fixed;
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

#word {
font-family: "Fjord one";
font-size: 30px;
margin-top: 100px;
text-transform: uppercase;
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
 padding:100px; 
 transform:scale(5);
 font-size: 0.4rem;
 font-family: "Fjord one";
}

#saveAnswer {
  background-color: rgb(253, 37, 235);
  font-size: 1.5rem;
  color: rgb(0, 0, 0);
  width:300px;
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
  font-weight: bold;
  cursor: pointer;
}
  
#saveAnswer-pressed {
  background-color: rgb(255, 28, 28);
}
  
#saveAnswer:not([disabled]):focus {
  box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
}

#saveAnswer:not([disabled]):hover {
  box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
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

.timer {
  font-family: "Fjord one"; 
  text-align: center;
  margin: auto;
  display: block;
  position: relative;
  left: 0px;
  top: 60px;
  border-radius: 100%;
  padding: 10px;
  background: rgb(0, 0, 0);
  border: 10px solid #000;
  color: rgb(255, 255, 255);
  width: 100px;
  height: 100px;
  line-height: 100px;
  font-size: 50px;
  color: #fff;

  }

  @media screen and (max-width:50em) {

#quit {
  background-color: rgb(255, 6, 52);
  font-size: 1rem;
  color: rgb(255, 255, 255);
  width:40px;
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

#word {
font-family: "Fjord one";
font-size: 30px;
margin-top: 150px;
text-transform: uppercase;
margin-left:-10px;
}

#writeNickname {
  margin-top: 120px;
  font-size: 15pt;
  font-family: "Fjord one";
  text-transform: uppercase;
  text-align: center;
  white-space: nowrap;
  left:-30px;
}

.input{
 transform:scale(2);
 font-size: 0.4rem;
 margin-left: -30px;
 margin-top:-70px;
}

#saveAnswer {
  background-color: rgb(253, 37, 235);
  font-size: 1.5rem;
  color: rgb(0, 0, 0);
  width:200px;
  padding: 20px;
  margin-top: -220px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-family: "Fjord one";
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  width: 260px;
}
  
#saveAnswer-pressed {
  background-color: rgb(255, 28, 28);
}
  
#saveAnswer:not([disabled]):focus {
  box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
}

#saveAnswer:not([disabled]):hover {
  box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
}
   

.timer {
  font-family: "Fjord one"; 
    text-align: center;
    position: relative;
    top: 120px;
    border-radius: 100%;
    padding: 10px;
    background: rgb(0, 0, 0);
    border: 10px solid #000;
    color: rgb(255, 255, 255);
    width: 100px;
    height: 100px;
    line-height: 100px;
    font-size: 50px;
    color: #fff;
    align-items: center;
    justify-content:center;
    margin-left: 100px;


  }

  #content{
    margin-top: 70px;
    margin-left: -30px;
  }
  }


     
  </style>