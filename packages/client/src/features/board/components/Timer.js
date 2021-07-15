import { Divider, Button, Form } from 'semantic-ui-react';
import validateTimerForm from '../helpers/validateTimerForm';
import useForm from '../hooks/useForm';

const { Input } = Form;

const initialValues = { minutes: 5, seconds: 0 };

const Timer = ({ onStart, onReset, isCountDownOver }) => {
  const { values, errors, handleChange } = useForm(
    initialValues,
    validateTimerForm
  );

  const renderedInputs = (
    <div className="timer__input-box">
      <Input
        error={errors.minutes}
        label="Min"
        type="number"
        name="minutes"
        value={values.minutes}
        onChange={handleChange}
      />
      <Input
        error={errors.seconds}
        label="Sec"
        type="number"
        name="seconds"
        value={values.seconds}
        onChange={handleChange}
      />
    </div>
  );

  const renderedStartButton = (
    <Button
      color="facebook"
      fluid
      onClick={() =>
        Object.keys(errors).length === 0 &&
        onStart(values.minutes, values.seconds)
      }
    >
      Start Timer
    </Button>
  );

  const renderedResetButton = (
    <Button secondary fluid onClick={() => onReset()}>
      Reset Timer
    </Button>
  );

  return (
    <div className="timer">
      <h4>{isCountDownOver ? 'Turn on timer' : 'Timer is running...'}</h4>
      <Divider className="timer__divider" />
      {isCountDownOver && renderedInputs}
      <div className="timer__cta">
        {isCountDownOver ? renderedStartButton : renderedResetButton}
      </div>
    </div>
  );
};

export default Timer;
