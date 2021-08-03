import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import Modal, { Props } from './Modal';

describe('Modal', () => {
  const onClose = jest.fn();
  const children = <p>Child Element</p>;
  const props: Props = { isOpen: true, onClose, title: 'foo' };

  beforeEach(() => render(<Modal {...props}>{children}</Modal>));

  afterEach(() => cleanup());

  it('renders with given title', () => {
    expect(screen.getByTestId('modal-header')).toHaveTextContent('foo');
  });

  it('renders cancel button', () => {
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders content with given children', () => {
    expect(screen.getByText(/child element/i)).toBeInTheDocument();
  });

  it('calls onClose method when cancel button is clicked', () => {
    // Act
    fireEvent.click(screen.getByRole('button'));

    // Assert
    expect(onClose).toBeCalledTimes(1);
  });
});
