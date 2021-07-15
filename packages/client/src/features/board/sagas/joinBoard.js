import { take } from 'redux-saga/effects';

function* joinBoard(socket, channel) {
  while (true) {
    const { payload: boardId } = yield take(channel);

    socket.emit('join-board', boardId);
  }
}

export default joinBoard;
