<template>
  <body>
    <div v-bind:class="['hamburger', {'close': !hideNav}]"
         v-on:click="toggleNav">
    </div>
    <div class="logo"> WELCOME TO XPLANANDUM</div>
  
   <!--<div>
      <label>
        Write poll id:
        <input type="text" v-model="id">
      </label>
        <router-link v-bind:to="'/poll/'+id">{{uiLabels.participatePoll}}</router-link>
    </div>-->
  <ResponsiveNav v-bind:hideNav="hideNav">
    <button id="language" v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
    <router-link id="create" v-bind:to="'/create/'+lang">{{uiLabels.createPoll}}</router-link>
  </ResponsiveNav>
  
  <label>
    Write poll id:
    <input type="text" v-model="id">
  </label>
  <router-link v-bind:to="'/poll/'+id">{{uiLabels.participatePoll}}</router-link>
 <label>
     Write poll id:
    <input type="text" v-model="id">
  </label>
  <router-link v-bind:to="('/nickname/'+lang)">{{uiLabels.participatePoll}}</router-link>
 </body>
 </template>
  
 <script>
 import ResponsiveNav from '@/components/ResponsiveNav.vue';
 import io from 'socket.io-client';
 const socket = io();
  
 export default {
  name: 'StartView',
  components: {
    ResponsiveNav
  },
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: "en",
      hideNav: true
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
    toggleNav: function () {
      this.hideNav = ! this.hideNav;
    }
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
    margin: 300px;
    letter-spacing: 0.1em;
    font-size: 3rem;
    color: rgb(0, 0, 0);
    padding-top:0.2em;
    font-family: "Fjord one";
    font-weight: bold;
 }
   /*.logo img {
    height:2.5rem;
    vertical-align: bottom;
    margin-right: 0.5rem;
  } */
  .hamburger {
    color:rgb(138, 246, 155);
    width:1em;
    display: flex;
    align-items: center;
    justify-content: left;
    padding:0.5rem;
    top:0;
    left:0;
    height: 2rem;
    cursor: pointer;
    font-size: 1.5rem;
  }
  
  #language {
  background-color: rgb(254, 190, 201);
  font-size: 1.5rem;
  color: black;
  padding: 25px;
  position: absolute;
  top: -10px;
  right: -10px;
  font-family: "Fjord one";
 }
  
 #create {
  background-color: rgb(90, 58, 64);
  font-size: 1.5rem;
  color: rgb(255, 255, 255);
  padding: 30px;
  margin-top: -200px;
  position: absolute;
  left: 40%;
  transform: translateX(-50%);
  font-family: "Fjord one";
 }
  
 #join {
  background-color: rgb(90, 58, 64);
  font-size: 1.5rem;
  color: rgb(255, 255, 255);
  padding: 30px;
  margin-top: -200px;
  position: absolute;
  left: 60%;
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
 