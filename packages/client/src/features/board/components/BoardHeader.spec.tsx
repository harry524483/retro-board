import { fireEvent, render, screen } from '@testing-library/react';

import BoardHeader, { Props } from './BoardHeader';

describe('BoardHeader', () => {
  const props: Props = {
    name: 'my board',
    onAddColumn: jest.fn(),
    onDisplaySideMenu: jest.fn(),
    onResetTimer: jest.fn(),
    onStartTimer: jest.fn(),
    timer: { isOver: false, minutes: 2, seconds: 3 }
  };

  it('renders header with given name', () => {
    // Act
    render(<BoardHeader {...props} />);

    // Assert
    expect(screen.getByRole('heading')).toHaveTextContent(/my board/i);
  });

  it('renders timer count down component when isOver is false', () => {
    // Act
    render(<BoardHeader {...props} />);

    // Assert
    expect(screen.getByTestId('count-down')).toBeInTheDocument();
  });

  it('does not render timer count down component when isOver is true', () => {
    // Act
    render(<BoardHeader {...props} timer={{ ...props.timer, isOver: true }} />);

    // Assert
    expect(screen.queryByTestId('count-down')).toBeNull();
  });

  it('calls onDisplaySideMenu function on click on setting icon', () => {
    // Act
    render(<BoardHeader {...props} />);

    fireEvent.click(screen.getByTestId('setting-icon'));

    // Assert
    expect(props.onDisplaySideMenu).toBeCalledWith(true);
  });

  describe('Timer popup', () => {
    beforeEach(() => {
      render(<BoardHeader {...props} />);
    });

    it('opens timer popup when its icon is clicked', async () => {
      // Act
      fireEvent.click(screen.getByTestId('timer-icon'));

      // Assert
      expect(await screen.findByTestId('timer')).toBeInTheDocument();
    });

    it('closes timer popup when clicked outside', () => {
      // Act
      fireEvent.click(screen.getByTestId('timer-icon'));

      fireEvent.click(document);

      expect(screen.queryByTestId('timer')).toBeNull();
    });

    it('closes timer popup when its icon is clicked twice', () => {
      // Act
      fireEvent.click(screen.getByTestId('timer-icon'));

      fireEvent.click(screen.getByTestId('timer-icon'));

      expect(screen.queryByTestId('timer')).toBeNull();
    });
  });

  describe('Add column popup', () => {
    beforeEach(() => {
      render(<BoardHeader {...props} />);
    });

    it('opens add column popup when its icon is clicked', async () => {
      // Act
      fireEvent.click(screen.getByTestId('add-column-icon'));

      // Assert
      expect(await screen.findByTestId('add-column')).toBeInTheDocument();
    });

    it('closes add column popup when clicked outside', () => {
      // Act
      fireEvent.click(screen.getByTestId('add-column-icon'));

      fireEvent.click(document);

      expect(screen.queryByTestId('add-column')).toBeNull();
    });

    it('closes add column popup when its icon is clicked twice', () => {
      // Act
      fireEvent.click(screen.getByTestId('add-column-icon'));

      fireEvent.click(screen.getByTestId('add-column-icon'));

      expect(screen.queryByTestId('add-column')).toBeNull();
    });
  });
});
