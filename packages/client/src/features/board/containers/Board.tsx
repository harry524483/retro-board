import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Loader, Segment } from 'semantic-ui-react';

import {
  startTimer,
  resetTimer,
  incrementVote,
  decrementVote,
  changeOption
} from '../boardSlice';
import SideMenu from '../components/SideMenu';
import useOnClickOutside from '../../../common/hooks/useOnClickOutside';
import ColumnList from '../../columns/containers/ColumnList';
import BoardHeader from '../components/BoardHeader';
import { useParams } from 'react-router-dom';
import { addColumn, joinBoard } from '../../../common/actions';
import { GlobalState } from '../../../common/types';
import { BoardSlice } from '../types';

const Board: FC = () => {
  const [displaySideMenu, setDisplaySideMenu] = useState(false);
  const sideMenuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside<HTMLDivElement>(sideMenuRef, () =>
    setDisplaySideMenu(false)
  );
  const [toggle, setToggle] = useState(true);
  const { id } = useParams<{ id: string }>();
  const board = useSelector(({ board }: GlobalState) => board);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(joinBoard(id));
  }, [id, dispatch]);

  const onStartTimer = (minutes: number, seconds: number) =>
    dispatch(startTimer({ minutes, seconds }));
  const onResetTimer = () => dispatch(resetTimer());
  const onAddColumn = (columnName: string) => dispatch(addColumn(columnName));
  const onOptionChange = (
    key: keyof Pick<BoardSlice, 'hideCards' | 'disableVoting' | 'hideCount'>
  ) => dispatch(changeOption(key));
  const onIncrementVote = () => dispatch(incrementVote());
  const onDecrementVote = () => dispatch(decrementVote());

  if (!board.id) {
    return (
      <Segment style={{ height: '100vh' }}>
        <Loader active>Loading...</Loader>
      </Segment>
    );
  }

  return (
    <div className="board">
      {displaySideMenu && (
        <SideMenu
          innerRef={sideMenuRef}
          hideCards={board.hideCards!}
          disableVoting={board.disableVoting!}
          hideCount={board.hideCount!}
          maxVotes={board.maxVotes}
          onClose={() => setDisplaySideMenu(false)}
          onOptionChange={onOptionChange}
          onIncrementVote={onIncrementVote}
          onDecrementVote={onDecrementVote}
        />
      )}
      <BoardHeader
        name={board.name}
        timer={board.timer}
        onResetTimer={onResetTimer}
        onStartTimer={onStartTimer}
        onAddColumn={onAddColumn}
        onDisplaySideMenu={setDisplaySideMenu}
      />
      <div className="board__tracking">
        <p>2/10 members finished</p>
        <Button
          size="mini"
          color={toggle ? 'blue' : 'green'}
          basic={!!toggle}
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? 'Finished?' : "I'm finished"}
        </Button>
      </div>
      <ColumnList />
    </div>
  );
};

export default Board;
