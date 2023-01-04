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
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    poll.nicknameId.push(pn)
  }
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

    this.polls[pollId] = poll;
    console.log("createPoll", poll.currentQuestion);
  }
  return this.polls[pollId];
}

Data.prototype.addQuestion = function(pollId, q) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    poll.words.push(q);
  }
}

Data.prototype.getCurrentQuestion = function(pollId) {
  return this.polls[pollId].currentQuestion;
}

Data.prototype.getCurrentWord = function(pollId) {
  console.log("det jag vill undersöka just nu, ", this.polls[pollId].words[this.polls[pollId].currentQuestion])
  return this.polls[pollId].words[this.polls[pollId].currentQuestion]

}

Data.prototype.setNextWord = function(pollId) {
  return this.polls[pollId].currentQuestion += 1;
}

Data.prototype.addNickname=function(pn, pollId){      
  const poll = this.polls[pollId];
  let playerId=0;
  if (typeof poll !== 'undefined' && pollId !=='') {
    if (pn==='') {
      poll.nicknameId.push(pn);
      playerId=poll.nicknameId.indexOf(pn)+1;
      pn="User "+playerId;
      poll.nicknameId.pop(pn);
      poll.nicknameId.push(pn);
    }else{
      poll.nicknameId.push(pn)  
    }
  }

}

Data.prototype.getNickname=function (pollId){
  const poll = this.polls[pollId];
  
if (typeof poll !== 'undefined') {

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
  if (typeof poll !== 'undefined') {
    //poll.word.push(q)
    //poll.explanations.push(a)
  }
}

Data.prototype.getAllWords = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    return poll.words

  }
  return []
}


Data.prototype.submitAnswer = function(pollId, explanation) {
  const poll = this.polls[pollId];
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



