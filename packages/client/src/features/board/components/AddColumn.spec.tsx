import { fireEvent, render, screen } from '@testing-library/react';

import AddColumn, { Props } from './AddColumn';

describe('AddColumn', () => {
  const props: Props = { onAddColumn: jest.fn() };

  beforeEach(() => render(<AddColumn {...props} />));

  it('renders header element', () => {
    expect(
      screen.getByRole('heading', { name: /add new column/i })
    ).toBeInTheDocument();
  });

  it('renders divider component', () => {
    expect(screen.getByTestId('divider')).toBeInTheDocument();
  });

  it('renders input element', () => {
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders button element', () => {
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('sets focus on input element on initial render', () => {
    //Act
    const inputElement = screen.getByRole('textbox');

    // Assert
    expect(inputElement).toHaveFocus();
  });

  it('updates value in input element on change event', () => {
    //Act
    const inputElement = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: 'foo' } });

    // Assert
    expect(inputElement.value).toBe('foo');
  });

  it('does not call onAddColumn when input value is empty and button is clicked', () => {
    //Act
    const buttonElement = screen.getByRole('button', { name: /add/i });

    fireEvent.click(buttonElement);

    // Assert
    expect(props.onAddColumn).not.toHaveBeenCalled();
  });

  it('calls onAddColumn when input is provided and Add button is clicked', () => {
    // Act
    const inputElement = screen.getByRole('textbox');
    const buttonElement = screen.getByRole('button', { name: /add/i });

    fireEvent.change(inputElement, { target: { value: 'foo' } });
    fireEvent.click(buttonElement);

    // Assert
    expect(props.onAddColumn).toHaveBeenCalledTimes(1);
  });

  it('calls onAddColumn when input is provided and enter key is pressed', () => {
    // Act
    const inputElement = screen.getByRole('textbox');
    const formElement = screen.getByTestId('form');

    fireEvent.change(inputElement, { target: { value: 'foo' } });
    fireEvent.submit(formElement);

    // Assert
    expect(props.onAddColumn).toHaveBeenCalledTimes(1);
  });
});
