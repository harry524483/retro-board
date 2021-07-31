import { TimerValues, TimerErrors } from '../types';

const validateTimerForm = (values: TimerValues) =>
  Object.entries(values).reduce((errors, [key, value]) => {
    if (key === 'minutes' && (value < 0 || value > 15)) {
      errors[key] = '0 to 15';
    }

    if (key === 'seconds' && (value < 0 || value > 59)) {
      errors[key] = '0 to 59';
    }

    return errors;
  }, {} as TimerErrors);

export default validateTimerForm;
