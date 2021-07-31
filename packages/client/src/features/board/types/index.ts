import { Options } from '@retro-board/common';

export type TimerValues = {
  minutes: number;
  seconds: number;
  isOver: boolean;
};

export type TimerErrors = { minutes: string; seconds: string };

export type BoardSlice = {
  id?: string;
  timer: TimerValues;
  name?: string;
  maxVotes: number;
  hideCards?: Options;
  disableVoting?: Options;
  hideCount?: Options;
  columns?: Array<string>;
  createdAt?: string;
  updatedAt?: string;
  remainingVotes: number;
};
