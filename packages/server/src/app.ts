import express from 'express';
import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import mongoose from 'mongoose';
import {
  constants,
  actionTypes,
  Board,
  Column,
  CardPayload
} from '@retro-board/common';

import BoardModel from './models/BoardModel';

const app = express();

const server = app.listen(constants.PORT, () => {
  console.log(`🚀  Server ready at ${constants.PORT}`);
  mongoose
    .connect(`mongodb://localhost:27017/retro-board`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log(`🚀  connected to mongodb`);
    });
});

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'https://admin.socket.io'],
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log(`🚀  connected to socket`);

  socket.on(actionTypes.JOIN_BOARD, async (boardId: string) => {
    console.log('boardId', boardId);
    socket.join(boardId);

    const board = await BoardModel.findById(boardId);

    io.in(boardId).emit(actionTypes.BOARD_CREATED, board);
  });

  socket.on(
    actionTypes.CREATE_BOARD,
    async (board: Omit<Board, 'id' | 'createdAt' | 'updatedAt'>) => {
      const Model = new BoardModel(board);

      const newBoard = await Model.save();

      socket.emit(actionTypes.BOARD_CREATED, newBoard);
    }
  );

  socket.on(
    actionTypes.ADD_COLUMN,
    async (boardId: string, column: Omit<Column, 'id'>) => {
      const columnId = mongoose.Types.ObjectId();

      const result = await BoardModel.findByIdAndUpdate(
        boardId,
        { $push: { columns: { _id: columnId, ...column } } },
        { new: true }
      );

      if (result) {
        const newColumn = result.columns.id(columnId);

        io.in(boardId).emit(actionTypes.COLUMN_ADDED, newColumn);
      }
    }
  );

  socket.on(
    actionTypes.DELETE_COLUMN,
    async (boardId: string, columnId: string) => {
      const board = await BoardModel.findById(boardId);

      if (board) {
        board.columns.id(columnId)!.remove();

        await board.save();

        io.in(boardId).emit(actionTypes.COLUMN_DELETED, columnId);
      }
    }
  );

  socket.on(
    actionTypes.UPDATE_COLUMN_NAME,
    async (boardId, { id: columnId, name }: Pick<Column, 'id' | 'name'>) => {
      const board = await BoardModel.findById(boardId);

      if (board) {
        const column = board.columns.id(columnId);

        column!.name = name;

        await board.save();

        io.in(boardId).emit(actionTypes.COLUMN_NAME_UPDATED, {
          id: columnId,
          name
        });
      }
    }
  );

  socket.on(actionTypes.ADD_CARD, async (boardId: string, columnId: string) => {
    const cardId = mongoose.Types.ObjectId();

    const board = await BoardModel.findById(boardId);

    if (board) {
      const column = board.columns.id(columnId);

      column!.cards.push({ _id: cardId, value: '', votes: 0 });

      await board.save();

      io.in(boardId).emit(actionTypes.CARD_ADDED, { columnId, cardId });
    }
  });

  socket.on(
    actionTypes.CLOSE_CARD,
    async (
      boardId,
      { columnId, cardId }: Pick<CardPayload, 'columnId' | 'cardId'>
    ) => {
      const board = await BoardModel.findById(boardId);

      if (board) {
        board.columns.id(columnId)!.cards.id(cardId)!.remove();

        await board.save();

        io.in(boardId).emit(actionTypes.CARD_CLOSED, { columnId, cardId });
      }
    }
  );

  socket.on(
    actionTypes.CREATE_CARD,
    async (
      boardId,
      { columnId, cardId, value }: Omit<CardPayload, 'votes'>
    ) => {
      const board = await BoardModel.findById(boardId);

      if (board) {
        const card = board.columns.id(columnId)!.cards.id(cardId);

        card!.value = value;

        await board.save();

        io.in(boardId).emit(actionTypes.CARD_CREATED, {
          columnId,
          cardId,
          value
        });
      }
    }
  );

  socket.on(
    actionTypes.DELETE_CARD,
    async (
      boardId,
      { columnId, cardId, votes }: Omit<CardPayload, 'value'>
    ) => {
      const board = await BoardModel.findById(boardId);

      if (board) {
        board.columns.id(columnId)!.cards.id(cardId)!.remove();

        await board.save();

        io.in(boardId).emit(actionTypes.CARD_DELETED, {
          columnId,
          cardId,
          votes
        });
      }
    }
  );
});

instrument(io, { auth: false });
