import { select, take } from 'redux-saga/effects';
import { actionTypes, CardPayload } from '@retro-board/common';
import { Socket } from 'socket.io-client';
import { PayloadAction } from '@reduxjs/toolkit';

import { selectBoardId } from '../../board/boardSlice';

function* deleteCard(socket: Socket) {
  while (true) {
    const {
      payload: { columnId, cardId, votes }
    }: PayloadAction<Omit<CardPayload, 'value'>> = yield take(
      actionTypes.DELETE_CARD
    );

    const boardId: string = yield select(selectBoardId);

    socket.emit(actionTypes.DELETE_CARD, boardId, { columnId, cardId, votes });
  }
}

export default deleteCard;
