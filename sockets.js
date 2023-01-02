function sockets(io, socket, data) {
  socket.emit('init', data.getUILabels());
  
  socket.on('pageLoaded', function (lang) {
    socket.emit('init', data.getUILabels(lang));
  });
  socket.on('switchLanguage', function(lang) {
     socket.emit('init', data.getUILabels(lang));
   });

   socket.on('createPoll', function(d) {
    socket.emit('pollCreated', data.createPoll(d.pollId, d.lang));
  });

  socket.on('addQuestion', function(d) {
    data.addQuestion(d.pollId, {q: d.q, a: d.a});
    socket.emit('questionAdded', data.getAllWords(d.pollId));
  });

  socket.on('createQuestion', function(q, a) {
    socket.emit('questionCreated', data.getQuestion(pollId, q, a));
  });

  socket.on('getWords', function(pollId) {
    socket.emit('allWords', data.getAllWords(pollId));
    socket.emit('setCurrentQuestion', data.getCurrentQuestion(pollId));

  }); 

  socket.on('getCurrentQuestionClient', function() {
    socket.emit('getCurrentQuestionClientServer', data.getCurrentQuestion());
  }); 

  socket.on('getNextQuestion', function(pollId) {
    socket.emit('setCurrentQuestion', data.setNextWord(pollId));
  }); 

  socket.on('editQuestion', function(d) {
    data.editQuestion(d.pollId, d.index, {q: d.q, a: d.a});
    socket.emit('questionEdited', data.getAllWords(d.pollId));
  });

  socket.on('joinPoll', function(pollId) {
    socket.join(pollId);
    socket.emit('newQuestion', data.getQuestion(pollId))
    socket.emit('dataUpdate', data.getAnswers(pollId));
  });

  socket.on('runQuestion', function(d) {
    io.to(d.pollId).emit('newQuestion', data.getQuestion(d.pollId, d.questionNumber));
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('submitAnswer', function(d) {
    data.submitAnswer(d.pollId, d.explanation);
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('addNickname', function(d) {
    data.addNickname (d.pn, d.pollId);  
  });

  socket.on('getNickname', function (pollId) {
    const nicknames = data.getNickname(pollId);
    io.to(pollId).emit('nicknamecreated', nicknames);

});

  socket.on('resetAll', () => {
    data = new Data();
    data.initializeData();
  })
 
socket.on('createNickname', function(pn) {
  socket.emit('nicknameCreated', data.getNickname(pollId, pn));
})

 socket.on('editQuestion', function(d) {
   data.editQuestion(d.pollId, d.index, {q: d.q, a: d.a});
   socket.emit('questionEdited', data.getAllQuestions(d.pollId));
 });
 socket.on('joinPoll', function(pollId) {
   socket.join(pollId);
   socket.emit('newQuestion', data.getQuestion(pollId))
   socket.emit('dataUpdate', data.getAnswers(pollId));
 });
 socket.on('runQuestion', function(d) {
   io.to(d.pollId).emit('newQuestion', data.getQuestion(d.pollId, d.questionNumber));
   io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
 });
 
 socket.on('submitAnswer', function(d) {
   data.submitAnswer(d.pollId, d.answer);
   io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
 });
 
 socket.on('resetAll', () => {
   data = new Data();
   data.initializeData();
 })

}
module.exports = sockets;