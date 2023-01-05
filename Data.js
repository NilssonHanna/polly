'use strict';

const languages = ["en", "se"];

function Data() {
  this.polls = {};
}

Data.prototype.getUILabels = function (lang = "en") {
  const ui = require("./data/labels-" + lang + ".json");
  return ui;
}

// POLLS-----------------

Data.prototype.createPoll = function(pollId, lang="en") {
  if (typeof this.polls[pollId] === "undefined") {
    let poll = {};
    
    poll.lang = lang;  
    poll.questions = [];
    poll.currentQuestionIndex = 0;              
    poll.nicknameId=[];              

    this.polls[pollId] = poll;
    console.log("createPoll", poll);
  }
  return this.polls[pollId];
}

Data.prototype.startPoll = function(pollId, questions) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    poll.questions = questions;
  }
}

// QUESTIONS-----------------

Data.prototype.getAllQuestions = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    console.log("data getallquestions", poll.questions);
    return poll.questions;

  }
  return []
}

Data.prototype.getCurrentQuestionIndex = function(pollId) {
  return this.polls[pollId].currentQuestionIndex;
}

Data.prototype.getCurrentWord = function(pollId) {
  return this.polls[pollId].questions[this.polls[pollId].currentQuestionIndex].word;
}

Data.prototype.setNextQuestionIndex = function(pollId) {
  return this.polls[pollId].currentQuestionIndex += 1;
}

// NICKNAMES-----------------

Data.prototype.getNickname = function(pollId, pn) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    poll.nicknameId.push(pn)
  }
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

// ANSWERS-----------------maybe not working

Data.prototype.submitExplanation = function(pollId, explanation) {
  console.log("data submitexplanation");

  const poll = this.polls[pollId];
  const currentQuestion = poll.questions[poll.currentQuestionIndex];
  const playerExplanations = currentQuestion.playerExplanations;
  playerExplanations.push(explanation);

  console.log("data submitExplanation poll", poll);
  console.log("data submitExplanation poll playerExplanations", poll.questions[poll.currentQuestionIndex].playerExplanations);

}

//?
Data.prototype.submitAnswer = function(pollId, explanation) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    let explanations = poll.questions[poll.currentQuestionIndex];
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

//?
Data.prototype.getAnswers = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    const explanations = poll.questions[poll.currentQuestionIndex];
    if (typeof poll.questions[poll.currentQuestionIndex] !== 'undefined') {
      return {q: poll.questions[poll.currentQuestionIndex].q, a: explanations};
    }
  }
  return {}
}
module.exports = Data;



