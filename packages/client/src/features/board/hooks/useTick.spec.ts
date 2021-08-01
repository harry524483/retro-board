import { renderHook, act } from '@testing-library/react-hooks';

import useTick, { Props } from './useTick';

describe('useTick', () => {
  beforeEach(() => jest.useFakeTimers());

  it('returns 1 min 59 sec after 1000ms when given value is 2:00 min', () => {
    // Arrange
    const props: Props = { minutes: 2, seconds: 0, onReset: jest.fn() };

    // Act
    const { result } = renderHook(() => useTick(props));
    act(() => jest.advanceTimersByTime(1000));

    // Assert
    expect(result.current).toEqual({ min: 1, sec: 59 });
    expect(props.onReset).not.toBeCalled();
  });

  it('returns 0 min 3 sec after 1000ms when given value is 4 sec', () => {
    // Arrange
    const props: Props = { minutes: 0, seconds: 4, onReset: jest.fn() };

    // Act
    const { result } = renderHook(() => useTick(props));
    act(() => jest.advanceTimersByTime(1000));

    // Assert
    expect(result.current).toEqual({ min: 0, sec: 3 });
    expect(props.onReset).not.toBeCalled();
  });

  it('calls reset method after min and sec become 0', () => {
    // Arrange
    const props: Props = { minutes: 0, seconds: 0, onReset: jest.fn() };

    // Act
    const { result } = renderHook(() => useTick(props));
    act(() => jest.advanceTimersByTime(1000));

    // Assert
    expect(result.current).toEqual({ min: 0, sec: 0 });
    expect(props.onReset).toBeCalled();
  });
});
