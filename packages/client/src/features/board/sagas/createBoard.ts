import { take } from 'redux-saga/effects';
import { actionTypes, Board } from '@retro-board/common';
import { Socket } from 'socket.io-client';
import { PayloadAction } from '@reduxjs/toolkit';

function* createBoard(socket: Socket) {
  while (true) {
    const {
      payload: board
    }: PayloadAction<Omit<Board, 'id' | 'createdAt' | 'updatedAt'>> =
      yield take(actionTypes.CREATE_BOARD);

    socket.emit(actionTypes.CREATE_BOARD, board);
  }
}

export default createBoard;
