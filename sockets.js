const { Socket } = require("socket.io");

function sockets(io, socket, data) {

  // UILabels---------- (alla verkar göra samma)

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
    console.log("server startpoll response", response);
    data.startPoll(response.pollId, response.questions);
  });

  socket.on('joinPoll', function(pollId) {
    socket.join(pollId);
    socket.emit('dataUpdate', data.getAnswers(pollId));
  });

  // QUESTIONS----------

  socket.on('getQuestions', function(pollId) {
    socket.emit('allQuestions', data.getAllQuestions(pollId));
    socket.emit('getCurrentQuestionIndex', data.getCurrentQuestionIndex(pollId));
  }); 

  socket.on("getCurrentWord", function (pollId) {
    socket.emit("getCurrentWord", data.getCurrentWord(pollId))
    console.log("i sockets, skcikas till currentword", data.getCurrentWord(pollId))
  });

  socket.on('getNextQuestionIndex', function(pollId) {
    socket.emit('getCurrentQuestionIndex', data.setNextQuestionIndex(pollId));
  }); 

  socket.on('getNextPlayerIndex', function(pollId) {
    socket.emit('getCurrentPlayerIndex', data.setNextPlayerIndex(pollId));
  }); 

  //?
  socket.on('runQuestion', function(d) {
    io.to(d.pollId).emit('newQuestion', data.getQuestion(d.pollId, d.questionNumber));
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });

  // ANSWERS----------

  socket.on('submitExplanation', function(response) {
    console.log("server submitExplanation");
    data.submitExplanation(response.pollId, response.explanation);
  });

  //?
  socket.on('submitAnswer', function(d) {
    data.submitAnswer(d.pollId, d.explanation);
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on("getAllExplanations", function (pollId) {
    console.log("i socket, kommer vi till getAllexplanations")
    console.log("vårt pollid", pollId)
    console.log("i socket, vad skcikar vi till explanationsview?", data.getExplanations(pollId) )
 // io.to(pollId).emit("receiveExplanations", data.getExplanations(pollId));
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
}

module.exports = sockets;