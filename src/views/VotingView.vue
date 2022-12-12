<template>
  <body>


    <div>
      <router-link v-bind:to="'/'" id="quit">{{uiLabels.quitGame}}</router-link>
    </div>

  <div class="playersjoin">
      <h1> {{uiLabels.vote}}</h1>
  </div>  



  </body>

  </template>

  <script>

</script>


<style>

body {
  background-color: rgb(255, 142, 142);
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 2em auto;
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

</style>