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
    poll.playerindex=0;              
    poll.nicknameId=[];  
    poll.points = {};

    poll.nicknameVotes = [];            
   
    this.polls[pollId] = poll;
 
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


Data.prototype.setNextPlayerIndex = function(pollId) {
   this.polls[pollId].playerindex += 1;
}

Data.prototype.zeroPlayerIndex = function(pollId) {
 this.polls[pollId].playerindex=0;
}


Data.prototype.returnPlayerIndex = function(pollId) {
  return this.polls[pollId].playerindex;
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


Data.prototype.submitNicknameVotes=function (pollId, nicknameVotes){
  const poll = this.polls[pollId];
  
  if (typeof poll !== 'undefined') {
    poll.nicknameVotes.push(nicknameVotes);


  }

}


Data.prototype.getNicknameVotes = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    return poll.nicknameVotes;
  }
  return []
}


// ANSWERS-----------------

Data.prototype.submitExplanation = function(pollId, explanation) {

  const poll = this.polls[pollId];
  const currentQuestion = poll.questions[poll.currentQuestionIndex];
  const playerExplanations = currentQuestion.playerExplanations;
  playerExplanations.push(explanation);

}

Data.prototype.getExplanations=function (pollId){
  const poll = this.polls[pollId];



  if (typeof poll !== 'undefined') {
    const playerExplanations = poll.questions[poll.currentQuestionIndex].playerExplanations

    let allExplanations = [];
    
    return [...playerExplanations, poll.questions[poll.currentQuestionIndex].answer]
  }
}




// VOTES -----------

Data.prototype.addVote = function(pollId, vote, nickname) {
  const poll = this.polls[pollId];
  const playerExplanations = poll.questions[poll.currentQuestionIndex].playerExplanations;

  if (vote.text === poll.questions[poll.currentQuestionIndex].answer.text)
  {
    
    poll.questions[poll.currentQuestionIndex].answer.votes += 1;
    if (poll.points[nickname] > 0) {
      poll.points[nickname] += 2;
    }
    else {
      poll.points[nickname] = 2;
    }
  }
  else
  {

    for (let e in playerExplanations) {
      if (playerExplanations[e].player === vote.player)
      {
        playerExplanations[e].votes += 1;
        if (poll.points[vote.player] > 0) {
          poll.points[vote.player] += 1;
        }
        else {
          poll.points[vote.player] = 1;
        }
      }
    }
  }

}

Data.prototype.getWinner = function(pollId) {
  const poll = this.polls[pollId];

  const winner = Object.keys(poll.points).reduce((a, b) => poll.points[a] > poll.points[b] ? a : b); //källa: stackoverflow (https://stackoverflow.com/questions/27376295/getting-key-with-the-highest-value-from-object)
  console.log("winner", winner)

  return winner;
}


module.exports = Data;