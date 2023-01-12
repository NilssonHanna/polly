<template>
  <div id="background">

    <div>
      <div id="gamecode">
        <h1>{{ uiLabels.enterGamecode }}</h1>
      </div>

      <div class="input">
        <label>
          <input
            type="text"
            v-model="pollId"
            :placeholder="
              lang === 'en' ? 'Enter gamecode...' : 'Ange gamecode...'
            "
          />
        </label>
      </div>
    </div>

    <div>
      <router-link v-bind:to="'/'" id="quit">{{ uiLabels.quitGame }}</router-link>
   </div>

    <div>
      <router-link
        v-bind:to="'/nickname/' + lang + '/' + pollId"
        class="next"
        >{{ uiLabels.next }}</router-link
      >
    </div>
  </div>
</template>
<script>
import io from "socket.io-client";
const socket = io();
export default {
  data: function () {
    return {
      uiLabels: {},
      pollId: "",
      lang: "en",
    };
  },

  created: function () {
    this.pollId = this.$route.params.pollId;
    this.lang = this.$route.params.lang;
    socket.emit("joinPoll", this.pollId);
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
  },
};
</script>

<style scoped>
  #background {
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
  margin-left: 500px;;
}
.input{
 padding:100px; 
 transform:scale(3);
 font-size: 0.4rem;
 font-family: "Fjord one";
 margin-left: 390px;
}
  
.next{
  width:80px;
  padding: 30px;
  margin-top: -150px;
  position: absolute;
  left: 85%;
  top:100%;
  cursor: pointer;
  background-color: rgba(255, 22, 197, 0.825);
  font-size: 1.5rem;
  color: rgb(0, 0, 0);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  position: absolute;
  transform: translateX(-50%);
  font-family: "Fjord one";
  text-decoration: none;
  border-radius: 12px;
  box-shadow: 5px 5px 5px;
}
.next:not([disabled]):focus {
  box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
}
.next:not([disabled]):hover {
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
@media screen and (max-width:50em) {
#background {
  background-color: rgb(244, 185, 237);
  width: 100%;
  min-height: 100vh;
  position: fixed;
  display: grid;
  grid-template-columns: 2em auto;
}
#gamecode{
    font-family: "Fjord one";
    text-transform: uppercase;
    text-align: center;
    align-items: center;
    justify-content:center;
    font-size: 3vw;
    display: flex;
    margin-top: 200px;
    margin-left: 180px;
}
.input{
    padding:100px; 
    transform:scale(2);
    margin-left: -35px;
    font-size: 0.4rem;
    font-family: "Fjord one";
    text-align: center;
    align-items: center;
    justify-content:center;
    display: flex;
    margin-left: 100px;
}
.next{
width:200px;
height: auto;
padding: 30px;
position: absolute;
left: 50%;
top:80%;
cursor: pointer;
background-color: rgba(255, 22, 197, 0.825);
font-size: 1.5rem;
color: rgb(0, 0, 0);
letter-spacing: 0.1em;
text-transform: uppercase;
position: absolute;
transform: translateX(-50%);
font-family: "Fjord one";
text-decoration: none;
border-radius: 12px;
box-shadow: 5px 5px 5px;
}
.next:not([disabled]):focus {
box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
}
.next:not([disabled]):hover {
box-shadow: 0 0 2rem rgba(255, 255, 255, 0.812), -.125rem -.125rem 2rem rgba(255, 97, 171, 0.929), .125rem .125rem 2rem rgba(255, 77, 148, 0.437);
}
#quit{
  background-color: rgb(255, 6, 52);
  font-size: 1rem;
  color: rgb(255, 255, 255);
  width:75px;
  padding: 20px;
  top: 10px;
  left:70px;
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
}
</style>