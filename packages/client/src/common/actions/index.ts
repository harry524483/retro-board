import { actionTypes, Board, Column, CardPayload } from '@retro-board/common';
import { NormalizedBoard } from '../types';

export const createBoard = (
  payload: Omit<Board, 'id' | 'createdAt' | 'updatedAt'>
) => ({
  type: actionTypes.CREATE_BOARD,
  payload
});
export const boardCreated = (payload: NormalizedBoard) => ({
  type: actionTypes.BOARD_CREATED,
  payload
});
export const joinBoard = (id: string) => ({
  type: actionTypes.JOIN_BOARD,
  payload: id
});
export const addColumn = (name: string) => ({
  type: actionTypes.ADD_COLUMN,
  payload: name
});
export const columnAdded = (payload: Column) => ({
  type: actionTypes.COLUMN_ADDED,
  payload
});
export const deleteColumn = (id: string) => ({
  type: actionTypes.DELETE_COLUMN,
  payload: id
});
export const columnDeleted = (id: string) => ({
  type: actionTypes.COLUMN_DELETED,
  payload: id
});
export const updateColumnName = (payload: Pick<Column, 'id' | 'name'>) => ({
  type: actionTypes.UPDATE_COLUMN_NAME,
  payload
});
export const columnNameUpdated = (payload: Pick<Column, 'id' | 'name'>) => ({
  type: actionTypes.COLUMN_NAME_UPDATED,
  payload
});
export const addCard = (columnId: string) => ({
  type: actionTypes.ADD_CARD,
  payload: columnId
});
export const cardAdded = (
  payload: Pick<CardPayload, 'cardId' | 'columnId'>
) => ({
  type: actionTypes.CARD_ADDED,
  payload
});
export const closeCard = (
  payload: Pick<CardPayload, 'columnId' | 'cardId'>
) => ({
  type: actionTypes.CLOSE_CARD,
  payload
});
export const cardClosed = (
  payload: Pick<CardPayload, 'columnId' | 'cardId'>
) => ({
  type: actionTypes.CARD_CLOSED,
  payload
});
export const createCard = (payload: Omit<CardPayload, 'votes'>) => ({
  type: actionTypes.CREATE_CARD,
  payload
});
export const cardCreated = (payload: Omit<CardPayload, 'votes'>) => ({
  type: actionTypes.CARD_CREATED,
  payload
});
export const deleteCard = (payload: Omit<CardPayload, 'value'>) => ({
  type: actionTypes.DELETE_CARD,
  payload
});
export const cardDeleted = (payload: Omit<CardPayload, 'value'>) => ({
  type: actionTypes.CARD_DELETED,
  payload
});
