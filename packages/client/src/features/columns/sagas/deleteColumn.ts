import { select, take } from 'redux-saga/effects';
import { actionTypes } from '@retro-board/common';
import { Socket } from 'socket.io-client';
import { PayloadAction } from '@reduxjs/toolkit';

import { selectBoardId } from '../../board/boardSlice';

function* deleteColumn(socket: Socket) {
  while (true) {
    const { payload: columnId }: PayloadAction<string> = yield take(
      actionTypes.DELETE_COLUMN
    );

    const boardId: string = yield select(selectBoardId);

    socket.emit(actionTypes.DELETE_COLUMN, boardId, columnId);
  }
}

export default deleteColumn;
