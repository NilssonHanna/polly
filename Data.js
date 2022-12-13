'use strict';

const languages = ["en", "se"];

// Store data in an object to keep the global namespace clean
function Data() {
  this.polls = {};
}

/***********************************************
For performance reasons, methods are added to the
prototype of the Data object/class
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
***********************************************/

Data.prototype.getUILabels = function (lang = "en") {
  const ui = require("./data/labels-" + lang + ".json");
  return ui;
}

Data.prototype.createPoll = function(pollId, lang="en") {
  if (typeof this.polls[pollId] === "undefined") {
    let poll = {};
    poll.lang = lang;  
    poll.words = [];
    poll.explanations = [];
    poll.currentQuestion = 0;              
    this.polls[pollId] = poll;
    console.log("poll created", pollId, poll);
  }
  return this.polls[pollId];
}

Data.prototype.addQuestion = function(pollId, q) {
  const poll = this.polls[pollId];
  console.log("word added to", pollId, q);
  if (typeof poll !== 'undefined') {
    poll.word.push(q);
  }
}

Data.prototype.editQuestion = function(pollId, index, newQuestion) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    poll.words[index] = newQuestion;
  }
}

Data.prototype.getQuestion = function(pollId, qId=null) {
  const poll = this.polls[pollId];
  console.log("word requested for ", pollId, qId);
  if (typeof poll !== 'undefined') {
    if (qId !== null) {
      poll.currentQuestion = qId;
    }
    return poll.words[poll.currentQuestion];
  }
  return []
}

Data.prototype.submitAnswer = function(pollId, explanation) {
  const poll = this.polls[pollId];
  console.log("explanation submitted for ", pollId, explanation);
  if (typeof poll !== 'undefined') {
    let explanations = poll.explanations[poll.currentQuestion];
    if (typeof explanations !== 'object') {
      explanations = {};
      explanations[explanation] = 1;
      poll.explanations.push(explanations);
    }
    else if (typeof explanations[explanation] === 'undefined')
    explanations[explanation] = 1;
    else
    explanations[explanation] += 1
    console.log("explanations looks like ", explanations, typeof explanations);
  }
}

Data.prototype.getAnswers = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    const explanations = poll.explanations[poll.currentQuestion];
    if (typeof poll.words[poll.currentQuestion] !== 'undefined') {
      return {q: poll.words[poll.currentQuestion].q, a: explanations};
    }
  }
  return {}
}
module.exports = Data;



