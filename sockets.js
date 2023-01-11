const { Socket } = require("socket.io");

function sockets(io, socket, data) {

  // UILabels---------- 

  socket.emit('init', data.getUILabels());
  
  socket.on('pageLoaded', function (lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('switchLanguage', function(lang) {
     socket.emit('init', data.getUILabels(lang));
   });

   // POLLS----------

   socket.on('createPoll', function(d) {
    socket.emit('pollCreated', data.createPoll(d.pollId, d.lang));
  });

  socket.on('startPoll', function(response) {
    data.startPoll(response.pollId, response.questions);
  });

  socket.on('joinPoll', function(pollId) {
    socket.join(pollId);
  });

  // QUESTIONS----------

  socket.on('getQuestions', function(pollId) {
    socket.emit('allQuestions', data.getAllQuestions(pollId));
   socket.emit('getCurrentQuestionIndex', data.getCurrentQuestionIndex(pollId));
  }); 

  socket.on("getCurrentWord", function (pollId) {
    socket.emit("getCurrentWord", data.getCurrentWord(pollId))
  });

  socket.on('getNextQuestionIndex', function(pollId) {
     data.setNextQuestionIndex(pollId);
  }); 

  socket.on('setNextPlayerIndex', function(pollId) {
     data.setNextPlayerIndex(pollId);
  }); 

  socket.on("zeroPlayerIndex", function(pollId){
  data.zeroPlayerIndex(pollId)
 });


  socket.on('getNextPlayerIndex', function(pollId) {
    io.to(pollId).emit('returnPlayerIndex', data.returnPlayerIndex(pollId));
  }); 

  //?
  socket.on('runQuestion', function(d) {
    io.to(d.pollId).emit('newQuestion', data.getQuestion(d.pollId, d.questionNumber));
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });

  // ANSWERS----------

  socket.on('submitExplanation', function(response) {
    data.submitExplanation(response.pollId, response.explanation);
  });


  socket.on("getAllExplanations", function (pollId) {
    io.to(pollId).emit("receiveExplanations", data.getExplanations(pollId));
});

  socket.on("allPlayersAnswered", function (pollId) {
    socket.emit("receiveExplanations", data.getExplanations(pollId));
});
  // NICKNAMES----------

  //?
  socket.on('createNickname', function(pn) {
    socket.emit('nicknameCreated', data.getNickname(pollId, pn));
  })

  //?
  socket.on('addNickname', function(d) {
    data.addNickname (d.pn, d.pollId);  
  });

  socket.on('getNickname', function (pollId) {
    const nicknames = data.getNickname(pollId);
    io.to(pollId).emit('nicknamecreated', nicknames);
  });

    // NICKNAMESVOTES----------

  socket.on('submitNicknameVotes', function(response) {
    data.submitNicknameVotes(response.pollId, response.nicknameVotes);
  });

  socket.on('getNicknameVotes', function(pollId) {
    io.to(pollId).emit('receiveNicknameVotes', data.getNicknameVotes(pollId))
  });

  socket.on('vote', function(response) {
    data.addVote(response.pollId, response.vote, response.nickname)
  });

  socket.on('getWinner', function(pollId) {
    socket.emit('returnWinner', data.getWinner(pollId));
  });


  // REDIRECT----------

  socket.on('redirect', d => {
    io.to(d.pollId).emit('redirect', d.route+'/'+d.pollId)
  });

}

module.exports = sockets;