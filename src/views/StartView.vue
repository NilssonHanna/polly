<template>
  <div id="background">

    <div id="logo">

        <div id="dialog-1"> {{uiLabels.startword}}
          <div id="left-point"> </div>
        </div>

        <div id="dialog-2"> {{uiLabels.startexplanation}}
          <div id="right-point"> </div>
        </div>

    </div>

    <div id="logoname"> 
      Xplanandum 
    </div>


    <button id="language" v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>

    <div>

     <router-link class="create" v-bind:to="'/create/'+lang">{{uiLabels.createPoll}}</router-link> 
     <router-link class="join" v-bind:to="'/join/'+lang" >{{uiLabels.participatePoll}}</router-link> 

    </div>

<div id="gamerules" v-on:click="isHidden = !isHidden">
      <span>
    {{uiLabels.gamerules}}
      </span>
    </div>
  

<div id="howtoplay" v-show="!isHidden">
    <h1> {{uiLabels.howtoplay1}} </h1> 
        <h2>{{uiLabels.howtoplay2}}</h2>
    <h1> {{uiLabels.howtoplay3}}</h1> 
        <h2> {{uiLabels.howtoplay4}}</h2>
        <h2>{{uiLabels.howtoplay5}}</h2>
        <h2> {{uiLabels.howtoplay6}}</h2>       
</div>

</div>

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
   isHidden: true
  }
},
created: function () {
    socket.emit("pageLoaded", this.lang)
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
   console.log(this.lang)
 },
}
}

</script>

<style scoped>

#background {
  background-color: rgb(178, 255, 252);
  width: 100%;
  display: grid;
  grid-template-columns: 2em auto;
  min-height: 100vh;
}

#logoname {
  text-transform: uppercase;
  position: fixed;
  letter-spacing: 0.2em;
  font-size: 4rem;
  color: rgb(0, 0, 0);
  font-family: "Fjord one";
  font-weight: bold;
  position: absolute;
  top: 300px;
  right: 200px;
  left: 200px;
}

#language {
  background-color: rgb(0, 0, 0);
  font-size: 1.5rem;
  color: rgb(255, 255, 255);
  padding: 25px;
  position: absolute;
  font-family: "Fjord one";
  cursor:pointer;
  font-weight: bold;
  right: 0%;
}
.create {
  background-color: rgba(255, 22, 197, 0.825);
  font-size: 1.5rem;
  color: rgb(255, 255, 255);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 30px;
  margin-top: 420px;
  position: absolute;
  left: 43%;
  width:100px;
  transform: translateX(-50%);
  font-family: "Fjord one";
  text-decoration: none;
  border-radius: 12px;
  box-shadow: 5px 5px 5px;
}

.create:not([disabled]):focus {
  box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
}

.create:not([disabled]):hover {
  box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
}

.join {
  background-color: rgba(255, 22, 197, 0.825);
  font-size: 1.5rem;
  color: rgb(255, 255, 255);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 30px;
  margin-top:420px;
  position: absolute;
  left: 58%;
  width:100px;
  transform: translateX(-50%);
  font-family: "Fjord one";
  text-decoration: none;
  border-radius: 12px;
  box-shadow: 5px 5px 5px;
}

.join:not([disabled]):focus {
  box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
}

.join:not([disabled]):hover {
  box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
}

#logo {
  font-family: "Fjord one";
  font-size: 0.8rem;
  width: 40vh;
	height: 40vh;
	margin: auto;
	display: block;
  position: absolute;
  left: 550px;
  top: 160px;
}

#dialog-1 {
  background-color: #ffffff;
  height: 20%;
  width: 40%;
  position: absolute;
  border-radius: 10%;
  margin-top: 10px;
  color: #000000;
  font-family: "Fjord one";
  font-weight: bold;
  padding: 10px;
  vertical-align:middle;
  text-align: center;
  vertical-align: middle;
  line-height: 50px;   
}

#left-point {
	width: 0;
	height: 0;
	border-left: 2vh solid transparent;
	border-right: 2vh solid transparent;
	border-top: 10vh solid #ffffff;
	position: absolute;
	top: 45%;
	left: -10%;
	transform: rotate(60deg);
}

#dialog-2 {
  background-color: #000000;
  height: 20%;
  width: 40%;
  position: absolute;
  border-radius: 10%;
  right: 0;
  color: #ffffff;
  font-family: "Fjord one";
  font-weight: bold;
  padding: 10px;
  text-align: center;
  vertical-align: middle;
  line-height: 30px;   
}

#right-point {
	width: 0;
	height: 0;
	border-left: 2vh solid transparent;
	border-right: 2vh solid transparent;
	border-top: 10vh solid #000000 ;
	position: absolute;
	top: 45%;
	right: -10%;
	transform: rotate(-60deg);
}

#gamerules {
  font-size: 2rem; 
  font-family: "Fjord one";
  font-weight: bold;
  color:rgb(0, 0, 0);
  width: 160px;
  height:30px;
  cursor:pointer;
  background-color: rgb(0, 0, 0);
  font-size: 1.5rem;
  color: rgb(255, 255, 255);
  padding: 25px;
  position: absolute;
  left: 3px;
  top: 3px;
}

#howtoplay {
  font-size: 0.5rem;
  padding: 15px;
  background-color: rgb(255, 255, 255);
  font-family: "Fjord one";
  font-size: 10px;
  width:300px;
  height: 520px;
  border-radius: 20px;
  margin-left: 0px;
  margin-top: 100px;
  letter-spacing: 0.1em;
}

@media screen and (max-width:50em) {


#logoname {
  text-transform: uppercase;
  position: fixed;
  color: rgb(0, 0, 0);
  font-family: "Fjord one";
  font-weight: bold;
  position: absolute;
  align-items: center;
  justify-content: center;
  font-size: 7vw;
  display: flex;
}

#language {
  background-color: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  padding: 25px;
  position: absolute;
  font-family: "Fjord one";
  cursor:pointer;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  font-size: 5vw;
  display: flex;
}
.create {
  background-color: rgba(255, 22, 197, 0.825);
  font-size: 1.5rem;
  color: rgb(255, 255, 255);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 30px;
  margin-top: 420px;
  position: absolute;
  left: 43%;
  width:100px;
  transform: translateX(-50%);
  font-family: "Fjord one";
  text-decoration: none;
  border-radius: 12px;
  box-shadow: 5px 5px 5px;
  align-items: center;
  justify-content: center;
}

.create:not([disabled]):focus {
  box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
}

.create:not([disabled]):hover {
  box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
}

.join {
  background-color: rgba(255, 22, 197, 0.825);
  font-size: 1.5rem;
  color: rgb(255, 255, 255);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 30px;
  margin-top:420px;
  position: absolute;
  left: 58%;
  width:100px;
  transform: translateX(-50%);
  font-family: "Fjord one";
  text-decoration: none;
  border-radius: 12px;
  box-shadow: 5px 5px 5px;
  align-items: center;
  justify-content: center;
}

.join:not([disabled]):focus {
  box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
}

.join:not([disabled]):hover {
  box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
}

#logo {
  font-family: "Fjord one";
  font-size: 0.8rem;
  width: 40vh;
	height: 40vh;
	margin: auto;
	display: block;
  position: absolute;
  left: 550px;
  top: 160px;
  align-items: center;
  justify-content: center;
}

#dialog-1 {
  background-color: #ffffff;
  height: 20%;
  width: 40%;
  position: absolute;
  border-radius: 10%;
  margin-top: 10px;
  color: #000000;
  font-family: "Fjord one";
  font-weight: bold;
  padding: 10px;
  vertical-align:middle;
  text-align: center;
  vertical-align: middle;
  line-height: 50px;  
  align-items: center;
  justify-content: center; 
}

#left-point {
	width: 0;
	height: 0;
	border-left: 2vh solid transparent;
	border-right: 2vh solid transparent;
	border-top: 10vh solid #ffffff;
	position: absolute;
	top: 45%;
	left: -10%;
	transform: rotate(60deg);
}

#dialog-2 {
  background-color: #000000;
  height: 20%;
  width: 40%;
  position: absolute;
  border-radius: 10%;
  right: 0;
  color: #ffffff;
  font-family: "Fjord one";
  font-weight: bold;
  padding: 10px;
  text-align: center;
  vertical-align: middle;
  line-height: 30px;   
  align-items: center;
  justify-content: center;
}

#right-point {
	width: 0;
	height: 0;
	border-left: 2vh solid transparent;
	border-right: 2vh solid transparent;
	border-top: 10vh solid #000000 ;
	position: absolute;
	top: 45%;
	right: -10%;
	transform: rotate(-60deg);
  align-items: center;
  justify-content: center;
}

#gamerules {
  font-size: 2rem; 
  font-family: "Fjord one";
  font-weight: bold;
  color:rgb(0, 0, 0);
  width: 160px;
  height:30px;
  cursor:pointer;
  background-color: rgb(0, 0, 0);
  font-size: 1.5rem;
  color: rgb(255, 255, 255);
  padding: 25px;
  position: absolute;
  left: 3px;
  top: 3px;
}

#howtoplay {
  font-size: 0.5rem;
  padding: 15px;
  background-color: rgb(255, 255, 255);
  font-family: "Fjord one";
  font-size: 10px;
  width:300px;
  height: 520px;
  border-radius: 20px;
  margin-left: 0px;
  margin-top: 100px;
  letter-spacing: 0.1em;
  align-items: center;
  justify-content: center;
  
}
}

</style>