

<template>
  <body>
  <div>
    <h1>Hej och välkommen</h1>
    {{pollId}}
    <QuestionComponent v-bind:question="question"
              v-on:answer="submitAnswer($event)"/>

              <span>{{submittedAnswers}}</span>
  </div>
</body>
</template>
  
 <script>
 // @ is an alias to /src
 import QuestionComponent from '@/components/QuestionComponent.vue';
import io from 'socket.io-client';
const socket = io();
export default {
  name: 'PollView',
  components: {
    QuestionComponent
  },
  
  data: function () {
    return {
      word: {
        q: "",
        a: []
      },
      pollId: "inactive poll",
      submittedAnswers: {}
    }
  },

    // @ is an alias to /src
  created: function () {
    this.pollId = this.$route.params.id
    socket.emit('joinPoll', this.pollId)
    socket.on("newQuestion", q =>
      this.word = q
    )
    socket.on("dataUpdate", explanations =>
      this.submittedAnswers = explanations
    )
  },
  methods: {
    submitAnswer: function (explanation) {
      socket.emit("submitAnswer", {pollId: this.pollId, explanation: explanation})
    }
  }
  }
 
 </script>

 <style>

body {
    background-color: lightyellow;
    font-family: "Fjord one";
  }

</style>
 