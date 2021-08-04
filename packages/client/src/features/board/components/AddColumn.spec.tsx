import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import AddColumn, { Props } from './AddColumn';

describe('AddColumn', () => {
  const props: Props = { onAddColumn: jest.fn() };

  beforeEach(() => render(<AddColumn {...props} />));

  afterEach(() => cleanup());

  it('renders header element', () => {
    expect(screen.getByRole('heading').textContent).toBe('Add new column');
  });

  it('renders divider component', () => {
    expect(screen.getByTestId('divider')).toBeInTheDocument();
  });

  it('renders input element', () => {
    expect(screen.getByPlaceholderText('Column name')).toBeInTheDocument();
  });

  it('renders button element', () => {
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('sets focus on input element on initial render', () => {
    //Act
    const inputElement = screen.getByPlaceholderText(
      'Column name'
    ) as HTMLInputElement;

    // Assert
    expect(inputElement).toHaveFocus();
  });

  it('updates value in input element on change event', () => {
    //Act
    const inputElement = screen.getByPlaceholderText(
      'Column name'
    ) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'foo' } });

    // Assert
    expect(inputElement.value).toBe('foo');
  });

  it('does not call onAddColumn when input value is empty and button is clicked', () => {
    //Act
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    // Assert
    expect(props.onAddColumn).not.toHaveBeenCalled();
  });

  it('calls onAddColumn when input is provided and Add button is clicked', () => {
    // Act
    const inputElement = screen.getByPlaceholderText('Column name');
    fireEvent.change(inputElement, { target: { value: 'foo' } });

    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    // Assert
    expect(props.onAddColumn).toHaveBeenCalledTimes(1);
  });

  it('calls onAddColumn when input is provided and enter key is pressed', () => {
    // Act
    const inputElement = screen.getByPlaceholderText('Column name');
    fireEvent.change(inputElement, { target: { value: 'foo' } });
    fireEvent.keyPress(inputElement, { key: 'Enter', keyCode: 13 });

    // Assert
    expect(props.onAddColumn).toHaveBeenCalledTimes(1);
  });
});
