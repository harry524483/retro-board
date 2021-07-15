import { useState } from 'react';
import { Divider, Icon, Popup } from 'semantic-ui-react';

import AddColumn from './AddColumn';
import Timer from './Timer';
import TimerCountDown from './TimerCountDown';

const BoardHeader = ({
  name,
  timer,
  onResetTimer,
  onStartTimer,
  onAddColumn,
  onDisplaySideMenu
}) => {
  const [displayTimer, setDisplayTimer] = useState(false);
  const [displayAddColumn, setDisplayAddColumn] = useState(false);

  return (
    <>
      <div className="board__header">
        <h2>{name}</h2>
        {!timer.isOver && (
          <TimerCountDown
            className="board__count-down"
            minutes={timer.minutes}
            seconds={timer.seconds}
            onResetTimer={onResetTimer}
          />
        )}
        <Popup
          trigger={<Icon name="time" size="big" />}
          content={
            <Timer
              onStart={(minutes, seconds) => {
                onStartTimer(minutes, seconds);
                setDisplayTimer(false);
              }}
              isCountDownOver={timer.isOver}
              onReset={() => {
                onResetTimer();
                setDisplayTimer(false);
              }}
            />
          }
          on="click"
          open={displayTimer}
          onClose={() => setDisplayTimer(false)}
          onOpen={() => setDisplayTimer(true)}
        />
        <Popup
          trigger={<Icon name="add circle" size="big" />}
          content={
            <AddColumn
              onAddColumn={(value) => {
                onAddColumn(value);
                setDisplayAddColumn(false);
              }}
            />
          }
          on="click"
          open={displayAddColumn}
          onClose={() => setDisplayAddColumn(false)}
          onOpen={() => setDisplayAddColumn(true)}
        />
        <Icon
          name="setting"
          size="big"
          onClick={() => onDisplaySideMenu(true)}
        />
      </div>
      <Divider />
    </>
  );
};

export default BoardHeader;
