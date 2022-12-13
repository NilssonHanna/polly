<template>
<p> {{word.q}}</p>
<button v-for="a in word.a" v-on:click="explanation(a)" v-bind:key="a">
  {{ a }}
</button>
</template>
<script> 
export default {
  name: 'QuestionComponent',
  props: {
    word: Object
  },
  emits: ["explanation"],
  methods: {
    explanation: function (explanation) {
      this.$emit("explanation", explanation);
    } 
  }
}
</script>