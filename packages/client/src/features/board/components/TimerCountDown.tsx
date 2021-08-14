import { FC } from 'react';

import useTick from '../hooks/useTick';

export type Props = {
  className: string;
  minutes: number;
  seconds: number;
  onResetTimer: Function;
};

const TimerCountDown: FC<Props> = ({
  minutes,
  seconds,
  onResetTimer,
  ...props
}): JSX.Element => {
  const { min, sec } = useTick({ minutes, seconds, onReset: onResetTimer });

  return (
    <div {...props}>
      {`${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`}
    </div>
  );
};

export default TimerCountDown;
