import useTick from '../hooks/useTick';

const TimerCountDown = ({
  minutes = 0,
  seconds = 0,
  onResetTimer,
  ...props
}) => {
  const { min, sec } = useTick({ minutes, seconds, onReset: onResetTimer });

  return (
    <div {...props}>
      {`${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`}
    </div>
  );
};

export default TimerCountDown;
