import { fireEvent, render, screen } from '@testing-library/react';

import SideMenu, { Props } from './SideMenu';

const getAllCheckboxes = () =>
  screen.getAllByRole('checkbox') as Array<HTMLInputElement>;

const getCheckboxByName = (name: string) => {
  const checkboxes = getAllCheckboxes();

  return checkboxes.find((checkbox) => checkbox.name === name);
};

describe('SideMenu', () => {
  // Arrange
  const props: Props = {
    innerRef: null,
    hideCards: { label: 'foo', checked: true },
    disableVoting: { label: 'bar', checked: true },
    hideCount: { label: 'baz', checked: true },
    maxVotes: 3,
    onClose: jest.fn(),
    onOptionChange: jest.fn(),
    onIncrementVote: jest.fn(),
    onDecrementVote: jest.fn()
  };

  beforeEach(() => {
    render(<SideMenu {...props} />);
  });

  it('calls onClose function when close icon is clicked', () => {
    // Act
    fireEvent.click(screen.getByTestId('sm-close-icon'));

    // Assert
    expect(props.onClose).toBeCalled();
  });

  it('renders header with correct value', () => {
    // Assert
    expect(
      screen.getByRole('heading', { name: /retro controls/i })
    ).toBeInTheDocument();
  });

  it('renders all checkboxes with checked true', () => {
    // Arrange
    const checkboxes = getAllCheckboxes();

    // Assert
    checkboxes.forEach((checkbox) => {
      expect(checkbox.checked).toBeTruthy();
    });
  });

  describe('calls onOptionChange', () => {
    it.each(['hideCards', 'disableVoting', 'hideCount'])(
      `when %s checkbox is clicked`,
      (name: string) => {
        // Act
        fireEvent.click(getCheckboxByName(`${name}.checked`));

        // Assert
        expect(props.onOptionChange).toBeCalledWith(name);
      }
    );
  });

  describe('max votes input element', () => {
    it('renders label correctly', () => {
      // Assert
      expect(screen.getByText(/max votes/i)).toBeInTheDocument();
    });

    it('renders disbaled input element', () => {
      // Assert
      expect(
        (screen.getByRole('textbox') as HTMLInputElement).disabled
      ).toBeTruthy();
    });

    it('renders default value as max votes count', () => {
      // Assert
      expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('3');
    });

    it('calls onIncrementVote when plus button is clicked', () => {
      // Act
      fireEvent.click(screen.getByTestId('plus-button'));

      // Assert
      expect(props.onIncrementVote).toBeCalledTimes(1);
    });

    it('calls onDecrementVote when plus button is clicked and max votes is > 1', () => {
      // Act
      fireEvent.click(screen.getByTestId('minus-button'));

      // Assert
      expect(props.onDecrementVote).toBeCalledTimes(1);
    });
  });
});
