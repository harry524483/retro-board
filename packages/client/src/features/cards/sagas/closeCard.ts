import { select, take } from 'redux-saga/effects';
import { actionTypes, CardPayload } from '@retro-board/common';
import { Socket } from 'socket.io-client';
import { PayloadAction } from '@reduxjs/toolkit';

import { selectBoardId } from '../../board/boardSlice';

function* closeCard(socket: Socket) {
  while (true) {
    const {
      payload: { columnId, cardId }
    }: PayloadAction<Pick<CardPayload, 'cardId' | 'columnId'>> = yield take(
      actionTypes.CLOSE_CARD
    );

    const boardId: string = yield select(selectBoardId);

    socket.emit(actionTypes.CLOSE_CARD, boardId, { columnId, cardId });
  }
}

export default closeCard;
