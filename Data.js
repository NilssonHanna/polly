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
 // if (!languages.includes(lang)){

   // lang="en"
 // }

  const ui = require("./data/labels-" + lang + ".json");
  return ui;
}

// Lagt in denna kod nu för att testa skicka vidare nickname

Data.prototype.getNickname = function(pollId, pn) {
  console.log("nickname")
  const poll = this.polls[pollId];
  console.log(this.polls[pollId]);
  if (typeof poll !== 'undefined') {
    poll.nicknameId.push(pn)
  }
  console.log(pn)
}

Data.prototype.createPoll = function(pollId, lang="en") {
  if (typeof this.polls[pollId] === "undefined") {
    let poll = {};
    poll.lang = lang;  

    poll.words = [];
    poll.explanations = [];
    poll.currentQuestion = 0;              

    poll.questions = [];
    poll.answers = [];
    poll.nicknameId=[];
    poll.currentQuestion = 0;
    poll.currentName=0;              

    this.polls[pollId] = poll;
    console.log("poll created", pollId, poll);
  }
  return this.polls[pollId];
}

Data.prototype.addQuestion = function(pollId, q) {
  const poll = this.polls[pollId];
  console.log("word added to", pollId, q);
  if (typeof poll !== 'undefined') {
    poll.words.push(q);
  }
}

Data.prototype.addNickname=function(pn, pollId){

const poll = this.polls[pollId];
console.log("i Data.js, funktionen getNickname, pollId, pn, this.polls är följande: ", pollId, pn, this.polls)
if (typeof poll !== 'undefined') {
  poll.nicknameId.push(pn)  
  console.log("i data.j i addNickname har nu följande namn lagts till: ", poll.nicknameId)
}

}

Data.prototype.getNickname=function (pollId){
  const poll = this.polls[pollId];
  
if (typeof poll !== 'undefined') {
  console.log("i data i getNickname får vi ut följande nickname: ", poll.nicknameId)
  return poll.nicknameId
  
}


}

Data.prototype.editQuestion = function(pollId, index, newQuestion) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    poll.words[index] = newQuestion;
  }
}

Data.prototype.getQuestion = function(pollId, q, a) {
  const poll = this.polls[pollId];
  console.log("word requested for ", pollId, q, a);
  if (typeof poll !== 'undefined') {
    console.log("undefined word")
    //poll.word.push(q)
    //poll.explanations.push(a)
  }
  console.log(q,)
}

Data.prototype.getAllWords = function(pollId) {
  const poll = this.polls[pollId];
  console.log("all words requested for ", pollId);
  if (typeof poll !== 'undefined') {
    console.log(poll.words)
    return poll.words

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



