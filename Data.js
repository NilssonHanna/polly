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
  console.log("question added to", pollId, q);
  if (typeof poll !== 'undefined') {
    poll.questions.push(q);
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
    poll.questions[index] = newQuestion;
  }
}

Data.prototype.getQuestion = function(pollId, qId=null) {
  const poll = this.polls[pollId];
  console.log("question requested for ", pollId, qId);
  if (typeof poll !== 'undefined') {
    if (qId !== null) {
      poll.currentQuestion = qId;
    }
    return poll.questions[poll.currentQuestion];
  }
  return []
}

Data.prototype.submitAnswer = function(pollId, answer) {
  const poll = this.polls[pollId];
  console.log("answer submitted for ", pollId, answer);
  if (typeof poll !== 'undefined') {
    let answers = poll.answers[poll.currentQuestion];
    if (typeof answers !== 'object') {
      answers = {};
      answers[answer] = 1;
      poll.answers.push(answers);
    }
    else if (typeof answers[answer] === 'undefined')
      answers[answer] = 1;
    else
      answers[answer] += 1
    console.log("answers looks like ", answers, typeof answers);
  }
}

Data.prototype.getAnswers = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    const answers = poll.answers[poll.currentQuestion];
    if (typeof poll.questions[poll.currentQuestion] !== 'undefined') {
      return {q: poll.questions[poll.currentQuestion].q, a: answers};
    }
  }
  return {}
}
module.exports = Data;



