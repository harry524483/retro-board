import { render, screen, act } from '@testing-library/react';

import TimerCountDown, { Props } from './TimerCountDown';

describe('TimerCountDown', () => {
  const props: Props = {
    className: '',
    minutes: 1,
    seconds: 3,
    onResetTimer: jest.fn()
  };

  beforeEach(() => {
    jest.useFakeTimers();

    render(<TimerCountDown {...props} />);
  });

  it('renders min and seconds in correct format and updates after each 1000ms', () => {
    // Assert
    expect(screen.getByText('01:03')).toBeInTheDocument();

    // Act
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Assert
    expect(screen.getByText('01:02')).toBeInTheDocument();
  });
});
