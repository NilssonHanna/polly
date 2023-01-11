<template>
   <div id="background">

     <div>
       <router-link v-bind:to="'/'" id="quit">{{uiLabels.quitGame}}</router-link>
     </div>


    <div>
      <div id="writeNickname">
        <h1> {{uiLabels.createNickname}}</h1>
     
    </div>
      <div class="input">
      <label>
        <input
          type="text"
          v-model="nicknameId"
          :placeholder="lang === 'en' ? 'Enter nickname...' : 'Ange spelnamn...'"
        />
      </label>
      </div>
    </div>

    <div>
     <router-link  v-on:click="addNickname" class="next" v-bind:to="('/connect/'+lang+'/'+pollId+'/'+nicknameId)">{{uiLabels.next}}</router-link>
    </div>
   
  </div> 
  </template>
   
  <script>
   
  import io from 'socket.io-client';
  const socket = io();

  export default {
   name: 'NicknameView',
   data: function () {
     return {
       lang: "",
       pollId:"",
       data: {},
       uiLabels: {},
       nicknameId: ""
     }
   },
    
   created: function () {
     this.lang = this.$route.params.lang;
     this.pollId = this.$route.params.id
    
    socket.emit('joinPoll', this.pollId)

     socket.emit("pageLoaded", this.lang);
     socket.on("init", (labels) => {
       this.uiLabels = labels
     })

     socket.on("dataUpdate", (data) =>
       this.data = data,)   
   },
    methods: {
   addNickname(){
        socket.emit("addNickname",{pn:this.nicknameId, pollId:this.pollId})   
    }
   }
   
  }
</script>

<style scoped>

#background {
  background-color: rgb(255, 249, 172);
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 2em auto;
  position: fixed;
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
  padding:90px; 
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

.input{
 padding:100px; 
 transform:scale(3);
 font-size: 0.4rem;
 font-family: "Fjord one";
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


#writeNickname {
  margin-top: 50%;
  font-size: 13pt;
  font-family: "Fjord one";
  text-transform: uppercase;
  white-space: nowrap;
  margin-left: -20px;
}


.input{
  padding:90px; 
  
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

.input{
  padding:40px; 
 transform:scale(2);
 font-size: 5px;
 font-family: "Fjord one";
 margin-left: -20px;
}
    
#quit{
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
}
      
</style>
