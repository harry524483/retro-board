import { render } from '@testing-library/react';

import Header, { Props } from './Header';

it('renders without error', () => {
  // Arrange
  const children = 'I am children';
  const props: Props = { title: 'foo', label: 'bar' };

  // Act
  const { asFragment } = render(<Header {...props}>{children}</Header>);

  // Assert
  expect(asFragment()).toMatchSnapshot();
});
