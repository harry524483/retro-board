import { Channel, eventChannel } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { actionTypes, Board, Column, CardPayload } from '@retro-board/common';
import { Socket } from 'socket.io-client';
import { PayloadAction } from '@reduxjs/toolkit';

import boardSchema from '../../features/board/schemas/boardSchema';
import {
  boardCreated,
  columnAdded,
  columnDeleted,
  columnNameUpdated,
  cardAdded,
  cardClosed,
  cardCreated,
  cardDeleted
} from '../actions';
import { NormalizedBoard } from '../types';

type Action = PayloadAction<
  | Board
  | Column
  | string
  | Pick<Column, 'id' | 'name'>
  | Pick<CardPayload, 'cardId' | 'columnId'>
  | Omit<CardPayload, 'votes'>
  | Omit<CardPayload, 'value'>
>;

type Emitter = (action: Action) => void;

const createBoardChannel = (socket: Socket) => {
  return eventChannel((emitter: Emitter) => {
    socket.once(actionTypes.BOARD_CREATED, (payload: Board) => {
      emitter({ type: actionTypes.BOARD_CREATED, payload });
    });

    socket.on(actionTypes.COLUMN_ADDED, (payload: Column) => {
      emitter({ type: actionTypes.COLUMN_ADDED, payload });
    });

    socket.on(actionTypes.COLUMN_DELETED, (payload: string) => {
      emitter({ type: actionTypes.COLUMN_DELETED, payload });
    });

    socket.on(
      actionTypes.COLUMN_NAME_UPDATED,
      (payload: Pick<Column, 'id' | 'name'>) => {
        emitter({ type: actionTypes.COLUMN_NAME_UPDATED, payload });
      }
    );

    socket.on(
      actionTypes.CARD_ADDED,
      (payload: Pick<CardPayload, 'cardId' | 'columnId'>) => {
        emitter({ type: actionTypes.CARD_ADDED, payload });
      }
    );

    socket.on(
      actionTypes.CARD_CLOSED,
      (payload: Pick<CardPayload, 'cardId' | 'columnId'>) => {
        emitter({ type: actionTypes.CARD_CLOSED, payload });
      }
    );

    socket.on(
      actionTypes.CARD_CREATED,
      (payload: Omit<CardPayload, 'votes'>) => {
        emitter({ type: actionTypes.CARD_CREATED, payload });
      }
    );

    socket.on(
      actionTypes.CARD_DELETED,
      (payload: Omit<CardPayload, 'value'>) => {
        emitter({ type: actionTypes.CARD_DELETED, payload });
      }
    );

    return () => socket.disconnect();
  });
};

function* boardEventChannel(socket: Socket) {
  const socketChannel: Channel<Socket> = yield call(createBoardChannel, socket);

  while (true) {
    const action: Action = yield take(socketChannel);

    if (action.type === actionTypes.BOARD_CREATED) {
      const normalizedBoard: NormalizedBoard = normalize(
        action.payload as Board,
        boardSchema
      );
      yield put(boardCreated(normalizedBoard));
    }

    if (action.type === actionTypes.COLUMN_ADDED) {
      yield put(columnAdded(action.payload as Column));
    }

    if (action.type === actionTypes.COLUMN_DELETED) {
      yield put(columnDeleted(action.payload as string));
    }

    if (action.type === actionTypes.COLUMN_NAME_UPDATED) {
      yield put(
        columnNameUpdated(action.payload as Pick<Column, 'id' | 'name'>)
      );
    }

    if (action.type === actionTypes.CARD_ADDED) {
      yield put(
        cardAdded(action.payload as Pick<CardPayload, 'cardId' | 'columnId'>)
      );
    }

    if (action.type === actionTypes.CARD_CLOSED) {
      yield put(
        cardClosed(action.payload as Pick<CardPayload, 'cardId' | 'columnId'>)
      );
    }

    if (action.type === actionTypes.CARD_CREATED) {
      yield put(cardCreated(action.payload as Omit<CardPayload, 'votes'>));
    }

    if (action.type === actionTypes.CARD_DELETED) {
      yield put(cardDeleted(action.payload as Omit<CardPayload, 'value'>));
    }
  }
}

export default boardEventChannel;
