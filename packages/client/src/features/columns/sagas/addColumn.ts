import { take, select } from 'redux-saga/effects';
import { actionTypes, Column } from '@retro-board/common';
import { Socket } from 'socket.io-client';
import { PayloadAction } from '@reduxjs/toolkit';

import { colors } from '../../../common/constants';
import { selectBoardId } from '../../board/boardSlice';
import { selectTotalColumns } from '../columnsSlice';

function* addColumn(socket: Socket) {
  while (true) {
    const { payload: name }: PayloadAction<string> = yield take(
      actionTypes.ADD_COLUMN
    );

    const boardId: string = yield select(selectBoardId);

    const totalColumns: number = yield select(selectTotalColumns);
    const color = colors[totalColumns];

    const column: Omit<Column, 'id'> = { name, color, cards: [] };

    socket.emit(actionTypes.ADD_COLUMN, boardId, column);
  }
}

export default addColumn;
