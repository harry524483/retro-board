import express from 'express';
import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import mongoose from 'mongoose';

import Board from './models/Board';
import {
  PORT,
  CREATE_BOARD,
  BOARD_CREATED,
  ADD_COLUMN,
  COLUMN_ADDED,
  DELETE_COLUMN,
  COLUMN_DELETED,
  UPDATE_COLUMN_NAME,
  COLUMN_NAME_UPDATED,
  ADD_CARD,
  CARD_ADDED,
  CARD_CLOSED,
  CLOSE_CARD,
  CREATE_CARD,
  CARD_CREATED,
  DELETE_CARD,
  CARD_DELETED
} from './constants';

const app = express();

const server = app.listen(PORT, () => {
  console.log(`🚀  Server ready at ${PORT}`);
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

  socket.on('join-board', async (boardId) => {
    console.log('boardId', boardId);
    socket.join(boardId);

    const board = await Board.findById(boardId);

    io.in(boardId).emit(BOARD_CREATED, board);
  });

  socket.on(CREATE_BOARD, async (board) => {
    const BoardModel = new Board(board);

    const newBoard = await BoardModel.save();

    socket.emit(BOARD_CREATED, newBoard);
  });

  socket.on(ADD_COLUMN, async (boardId, column) => {
    const columnId = mongoose.Types.ObjectId();

    const result = await Board.findByIdAndUpdate(
      boardId,
      { $push: { columns: { _id: columnId, ...column } } },
      { new: true }
    );

    const newColumn = result.columns.id(columnId);

    io.in(boardId).emit(COLUMN_ADDED, newColumn);
  });

  socket.on(DELETE_COLUMN, async (boardId, columnId) => {
    const board = await Board.findById(boardId);

    board.columns.id(columnId).remove();

    await board.save();

    io.in(boardId).emit(COLUMN_DELETED, columnId);
  });

  socket.on(UPDATE_COLUMN_NAME, async (boardId, { columnId, name }) => {
    const board = await Board.findById(boardId);

    const column = board.columns.id(columnId);

    column.name = name;

    await board.save();

    io.in(boardId).emit(COLUMN_NAME_UPDATED, { columnId, name });
  });

  socket.on(ADD_CARD, async (boardId, columnId) => {
    const cardId = mongoose.Types.ObjectId();

    const board = await Board.findById(boardId);

    const column = board.columns.id(columnId);

    column.cards.push({ _id: cardId, value: '', votes: 0 });

    await board.save();

    io.in(boardId).emit(CARD_ADDED, { columnId, cardId });
  });

  socket.on(CLOSE_CARD, async (boardId, { columnId, cardId }) => {
    const board = await Board.findById(boardId);

    board.columns.id(columnId).cards.id(cardId).remove();

    await board.save();

    io.in(boardId).emit(CARD_CLOSED, { columnId, cardId });
  });

  socket.on(CREATE_CARD, async (boardId, { columnId, cardId, value }) => {
    const board = await Board.findById(boardId);

    const card = board.columns.id(columnId).cards.id(cardId);

    card.value = value;

    await board.save();

    io.in(boardId).emit(CARD_CREATED, { columnId, cardId, value });
  });

  socket.on(DELETE_CARD, async (boardId, { columnId, cardId, votes }) => {
    const board = await Board.findById(boardId);

    board.columns.id(columnId).cards.id(cardId).remove();

    await board.save();

    io.in(boardId).emit(CARD_DELETED, { columnId, cardId, votes });
  });
});

instrument(io, { auth: false });
