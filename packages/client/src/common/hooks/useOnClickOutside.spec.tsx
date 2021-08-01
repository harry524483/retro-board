import { createRef } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { fireEvent, render, screen } from '@testing-library/react';

import useOnClickOutside from './useOnClickOutside';

describe('useOnClickOutside', () => {
  it('calls handler when click is outside element', () => {
    // Arrange
    const handler = jest.fn();
    const ref = createRef<HTMLDivElement>();
    render(<div ref={ref}></div>);

    // Act
    renderHook(() => useOnClickOutside(ref, handler));
    fireEvent.click(document);

    // Assert
    expect(handler).toBeCalledTimes(1);
  });

  it(`doesn't calls handler when click is within element`, () => {
    // Arrange
    const handler = jest.fn();
    const ref = createRef<HTMLDivElement>();
    render(<div ref={ref} data-testid="element-testid"></div>);

    // Act
    renderHook(() => useOnClickOutside(ref, handler));
    fireEvent.click(screen.getByTestId('element-testid'));

    //  Assert
    expect(handler).not.toBeCalled();
  });
});
