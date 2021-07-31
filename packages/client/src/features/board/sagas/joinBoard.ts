import { PayloadAction } from '@reduxjs/toolkit';
import { actionTypes } from '@retro-board/common';
import { TakeableChannel } from 'redux-saga';
import { take } from 'redux-saga/effects';
import { Socket } from 'socket.io-client';

function* joinBoard(socket: Socket, channel: TakeableChannel<Socket>) {
  while (true) {
    const { payload: boardId }: PayloadAction<string> = yield take(channel);

    socket.emit(actionTypes.JOIN_BOARD, boardId);
  }
}

export default joinBoard;
