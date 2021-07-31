import Column from './Column';
import Options from './Options';

type Board = {
  id: string;
  name: string;
  maxVotes: number;
  hideCards: Options;
  disableVoting: Options;
  hideCount: Options;
  columns: Array<Column>;
  createdAt: string;
  updatedAt: string;
};

export default Board;
