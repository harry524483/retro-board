import { ChangeEvent } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import useForm from './useForm';

describe('useForm', () => {
  const initialValues = {};
  const event = {
    target: { name: 'foo', value: 'bar' }
  } as ChangeEvent<HTMLInputElement>;

  it('returns default values of useForm', () => {
    // Arrange
    const errors = {};
    const validator = jest.fn().mockReturnValue(errors);

    // Act
    const { result } = renderHook(() => useForm(initialValues, validator));

    // Assert
    expect(validator).toBeCalledWith(initialValues);
    expect(result.current).toEqual({
      values: initialValues,
      errors,
      handleChange: expect.any(Function)
    });
  });

  it('updates values and errors when handleChange is called', () => {
    // Arrange
    const values = { foo: 'bar' };
    const errors = { foo: 'error in this field' };
    const validator = jest.fn().mockReturnValue(errors);

    // Act
    const { result } = renderHook(() => useForm(initialValues, validator));
    act(() => result.current.handleChange(event));

    // Assert
    expect(validator).toBeCalledWith(values);
    expect(result.current).toEqual({
      values,
      errors,
      handleChange: expect.any(Function)
    });
  });
});
