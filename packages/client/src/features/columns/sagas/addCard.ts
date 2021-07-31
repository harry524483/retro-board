import { select, take } from 'redux-saga/effects';
import { actionTypes } from '@retro-board/common';
import { Socket } from 'socket.io-client';
import { PayloadAction } from '@reduxjs/toolkit';

import { selectBoardId } from '../../board/boardSlice';

function* addCard(socket: Socket) {
  while (true) {
    const { payload: columnId }: PayloadAction<string> = yield take(
      actionTypes.ADD_CARD
    );

    const boardId: string = yield select(selectBoardId);

    socket.emit(actionTypes.ADD_CARD, boardId, columnId);
  }
}

export default addCard;
