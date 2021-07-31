import { select, take } from 'redux-saga/effects';
import { actionTypes, CardPayload } from '@retro-board/common';
import { Socket } from 'socket.io-client';
import { PayloadAction } from '@reduxjs/toolkit';

import { selectBoardId } from '../../board/boardSlice';

function* createCard(socket: Socket) {
  while (true) {
    const {
      payload: { columnId, cardId, value }
    }: PayloadAction<Omit<CardPayload, 'votes'>> = yield take(
      actionTypes.CREATE_CARD
    );

    const boardId: string = yield select(selectBoardId);

    socket.emit(actionTypes.CREATE_CARD, boardId, { columnId, cardId, value });
  }
}

export default createCard;
