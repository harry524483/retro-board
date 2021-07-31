import { select, take } from 'redux-saga/effects';
import { actionTypes, Column } from '@retro-board/common';
import { Socket } from 'socket.io-client';
import { PayloadAction } from '@reduxjs/toolkit';

import { selectBoardId } from '../../board/boardSlice';

function* updateColumnName(socket: Socket) {
  while (true) {
    const {
      payload: { id, name }
    }: PayloadAction<Pick<Column, 'id' | 'name'>> = yield take(
      actionTypes.UPDATE_COLUMN_NAME
    );

    const boardId: string = yield select(selectBoardId);

    socket.emit(actionTypes.UPDATE_COLUMN_NAME, boardId, { id, name });
  }
}

export default updateColumnName;
