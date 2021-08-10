import { fireEvent, render, screen } from '@testing-library/react';

import Timer from './Timer';

const renderTimer = ({
  isCountDownOver = true,
  onReset = jest.fn(),
  onStart = jest.fn()
} = {}) =>
  render(
    <Timer
      isCountDownOver={isCountDownOver}
      onReset={onReset}
      onStart={onStart}
    />
  );

describe('Timer', () => {
  it('renders divider component', () => {
    // Act
    renderTimer();

    // Assert
    expect(screen.getByTestId(/divider/i)).toBeInTheDocument();
  });

  describe('when isCountDownOver is true', () => {
    beforeEach(() => renderTimer());

    it('renders header with correct value', () => {
      // Assert
      expect(screen.getByRole('heading').textContent).toBe('Turn on timer');
    });

    it('renders minutes & seconds input elements', () => {
      // Assert
      expect(
        screen.getByTestId(/minutes/i).querySelector('input')
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(/seconds/i).querySelector('input')
      ).toBeInTheDocument();
    });

    it('renders start button', () => {
      // Assert
      expect(screen.getByRole('button').textContent).toBe('Start Timer');
    });
  });

  describe('when isCountDownOver is false', () => {
    beforeEach(() => renderTimer({ isCountDownOver: false }));

    it('renders header with correct value', () => {
      // Assert
      expect(screen.getByRole('heading').textContent).toBe(
        'Timer is running...'
      );
    });

    it('does not render minutes & seconds input elements', () => {
      // Assert
      expect(screen.queryByTestId(/minutes/i)).toBeNull();
      expect(screen.queryByTestId(/seconds/i)).toBeNull();
    });

    it('renders reset button', () => {
      // Assert
      expect(screen.getByRole('button').textContent).toBe('Reset Timer');
    });
  });

  describe('minutes input element', () => {
    let minInputElement: HTMLInputElement | null;

    beforeEach(() => {
      renderTimer();

      minInputElement = screen.getByTestId(/minutes/i).querySelector('input');
    });

    it('does not show error when value of minutes element is between 0 to 15', () => {
      // Act
      fireEvent.change(minInputElement!, {
        target: { value: 3, name: 'minutes' }
      });

      // Assert
      expect(minInputElement!.value).toBe('3');
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('shows error when value of minutes element is less than 0', () => {
      // Act
      fireEvent.change(minInputElement!, {
        target: { value: -1, name: 'minutes' }
      });

      // Assert
      expect(minInputElement!.value).toBe('-1');
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('shows error when value of minutes element is greater than 15', () => {
      // Act
      fireEvent.change(minInputElement!, {
        target: { value: 16, name: 'minutes' }
      });

      // Assert
      expect(minInputElement!.value).toBe('16');
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('seconds input elements', () => {
    let secInputElement: HTMLInputElement | null;

    beforeEach(() => {
      renderTimer();

      secInputElement = screen.getByTestId(/seconds/i).querySelector('input');
    });

    it('does not show error when value of seconds element is between 0 to 59', () => {
      // Act
      fireEvent.change(secInputElement!, {
        target: { value: 36, name: 'seconds' }
      });

      // Assert
      expect(secInputElement!.value).toBe('36');
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('shows error when value of seconds element is less than 0', () => {
      // Act
      fireEvent.change(secInputElement!, {
        target: { value: -1, name: 'seconds' }
      });

      // Assert
      expect(secInputElement!.value).toBe('-1');
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('shows error when value of seconds element is greater than 60', () => {
      // Act
      fireEvent.change(secInputElement!, {
        target: { value: 60, name: 'seconds' }
      });

      // Assert
      expect(secInputElement!.value).toBe('60');
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('start button', () => {
    const onStart = jest.fn();

    let minInputElement: HTMLInputElement | null;
    let secInputElement: HTMLInputElement | null;

    beforeEach(() => {
      renderTimer({ onStart });

      minInputElement = screen.getByTestId(/minutes/i).querySelector('input');
      secInputElement = screen.getByTestId(/seconds/i).querySelector('input');
    });

    it('calls onStart function with minutes and seconds when start timer is clicked', () => {
      // Arrange
      const minutes = '3';
      const seconds = '18';
      const buttonElement = screen.getByRole('button');

      // Act
      fireEvent.change(minInputElement!, { target: { value: minutes } });
      fireEvent.change(secInputElement!, { target: { value: seconds } });

      buttonElement.click();

      // Assert
      expect(onStart).toBeCalledWith(minutes, seconds);
    });

    it('does not call onStart function when there are errors', () => {
      // Arrange
      const buttonElement = screen.getByRole('button');

      // Act
      fireEvent.change(minInputElement!, { target: { value: '-1' } });

      buttonElement.click();

      // Assert
      expect(onStart).not.toBeCalled();
    });
  });

  describe('reset button', () => {
    const onReset = jest.fn();

    beforeEach(() => renderTimer({ isCountDownOver: false, onReset }));

    it('calls onReset function when reset timer is clicked', () => {
      // Arrange
      const buttonElement = screen.getByRole('button');

      // Act
      buttonElement.click();

      // Assert
      expect(onReset).toBeCalled();
    });
  });
});
