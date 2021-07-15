/* eslint-disable require-yield */
// import { fork, call, take } from 'redux-saga/effects';
import { fork, call, actionChannel } from 'redux-saga/effects';
// import { denormalize, schema } from 'normalizr';
import io from 'socket.io-client';

import createBoard from './features/board/sagas/createBoard';
import joinBoard from './features/board/sagas/joinBoard';
import { JOIN_BOARD } from './common/actions';
import boardEventChannel from './common/sagas/boardEventChannel';
import addColumn from './features/columns/sagas/addColumn';
import deleteColumn from './features/columns/sagas/deleteColumn';
import updateColumnName from './features/columns/sagas/updateColumnName';
import addCard from './features/columns/sagas/addCard';
import closeCard from './features/cards/sagas/closeCard';
import createCard from './features/cards/sagas/createCard';
import deleteCard from './features/cards/sagas/deleteCard';
// import addColumn from './features/columns/actions/addColumn';
// import { eventChannel } from 'redux-saga';

const connect = () => {
  const socket = io('http://localhost:4000/');

  return new Promise((resolve) => {
    socket.on('connect', () => {
      resolve(socket);
      console.log('Socket connected');
    });
  });
};

// function* read(socket) {
//   const channel = yield call(subscribe, socket);
//   while (true) {
//     const action = yield take(channel);
//     yield put(action);
//   }
// }

// export function* subscribe(socket) {
//   return new eventChannel((emit) => {
//     const update = (board) => {
//       console.log('board', board);
//       return emit({});
//     };
//     socket.on('get-board', update);
//     return () => {};
//   });
// }

// function* watchAndLog() {
//   yield takeEvery('*', function* logger(action) {
//     const state = yield select();

//     console.log('action', action);
//     console.log('state', state);
//   });
// }

// function* rootSaga() {
//   const socket = yield call(connect);
//   yield fork(read, socket);
//   yield fork(watchAndLog);
// }

// function createSocketChannel(socket) {
//   return eventChannel((emit) => {
//     const pingHandler = (event) => {
//       emit(event.payload);
//     };

//     const errorHandler = (errorEvent) => {
//       emit(new Error(errorEvent.reason));
//     };

//     socket.on('ping', pingHandler);
//     socket.on('error', errorHandler);

//     return () => socket.off('ping', pingHandler);
//   });
// }

// function* pong(socket) {
//   yield delay(5000);
//   yield apply(socket, socket.emit, ['pong']);
// }

// function* watchOnPings() {
//   const socket = yield call(connect);
//   const socketChannel = yield call(createSocketChannel, socket);

//   while (true) {
//     try {
//       const payload = yield take(socketChannel);
//       yield put({ type: 'INCOMING_PONG_PAYLOAD', payload });
//       yield fork(pong, socket);
//     } catch (error) {
//       console.error('socket error:', error);
//     }
//   }
// }

// function countdown(secs) {
//   return eventChannel((emitter) => {
//     const iv = setInterval(() => {
//       secs -= 1;
//       if (secs > 0) {
//         emitter(secs);
//       } else {
//         // this causes the channel to close
//         emitter(END);
//       }
//     }, 1000);

//     return () => clearInterval(iv);
//   });
// }

// function* watchRequests() {
//   const channel = yield call(countdown, 5);

//   try {
//     while (true) {
//       const seconds = yield take(channel);
//       console.log(`countdown: ${seconds}`);
//     }
//   } finally {
//     console.log('countdown terminated');
//   }
// }

// function* handleRequest(payload) {}

// function* watchRequests(action) {
//   const channel = actionChannel('dashboard/displayModal');
//   while (true) {
//     const { payload } = yield take(channel);
//     yield fork(handleRequest, payload);
//   }
// }

// function* rootSaga() {
//   yield takeEvery('*', watchOnPings);
// }

// function* writeData(socket) {
//   yield takeEvery('*', function* () {
//     const state = yield select();

//     socket.emit('update-board', state);
//   });
// }

function* rootSaga() {
  const boardActionChannel = yield actionChannel([JOIN_BOARD]);
  const socket = yield call(connect);

  yield fork(createBoard, socket);
  yield fork(joinBoard, socket, boardActionChannel);
  yield fork(addColumn, socket);
  yield fork(deleteColumn, socket);
  yield fork(updateColumnName, socket);
  yield fork(addCard, socket);
  yield fork(closeCard, socket);
  yield fork(createCard, socket);
  yield fork(deleteCard, socket);

  yield fork(boardEventChannel, socket);
}

export default rootSaga;
