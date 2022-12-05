<template>
      <body>
        
        <!--<router-link id="create" v-bind:to="'/create/'+lang">{{uiLabels.createPoll}}</router-link> -->
      
      <button id="language" v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>

      <div class="square">
            <div class="text">
            {{uiLabels.winnerAnn}}
            Bamse
            <!--okej så här lär det vara en sån {{}} och inuti ska det vara svaret på 
                  en funktion som har räknat ihop vem som fått flest poäng-->
            </div>
      </div>
    
      <div>
        <router-link id="quit" v-bind:to="'/'">{{uiLabels.quitGame}}</router-link> 
      </div>
    
    
    </body>
</template>
    
<script>
    import io from 'socket.io-client';
    const socket = io();
    
    export default {
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
      }
    }
/*vore ju skoj att lägga in animationer om möjligt. typ en så att det regnar konfetti
och en så att man måste klicka för att få fram vinnaren (det sista borde ju va ezzz)*/
</script>

<style scoped>
      body {
        background-color: rgb(255, 224, 110);
        width: 100%;
        display: grid;
        grid-template-columns: 2em auto;
        min-height: 100vh;
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
            cursor: pointer;
       }

       .square{
            width:400px;
            height:250px;
            margin-left:440px;
            margin-top:100px;
            background-color: gold;
            color:white;
            font-family: "Fjord one";
            font-size: 3rem;
       }

       .text{
            margin-top:20px;
       }

       #quit {
            background-color: rgb(90, 58, 64);
            font-size: 1.5rem;
            color: rgb(255, 255, 255);
            padding: 30px;
            margin-top: 400px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            font-family: "Fjord one";
       }
      
    
    
 /*   @media screen and (max-width:50em) {
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
    
    }*/
</style>