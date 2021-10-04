import { EntityState } from '@reduxjs/toolkit';
import { Board, Column, Card } from '@retro-board/common';

import { BoardSlice } from '../../features/board/types';
import { DashboardSlice } from '../../features/dashboard/types';

export type NormalizedColumn = Omit<Column, 'cards'> & { cards: Array<string> };

type NormalizedResult = Omit<Board, 'columns'> & { columns: Array<string> };

export type NormalizedBoard = {
  entities: {
    columns: { [key: string]: NormalizedColumn };
    cards: { [key: string]: Card };
  };
  result: NormalizedResult;
};

export type GlobalState = {
  dashboard: DashboardSlice;
  board: BoardSlice;
  columns: EntityState<NormalizedColumn>;
  cards: EntityState<Card>;
};

export type RenderOptions = {
  route?: string;
  path?: string;
  history?: any;
};
