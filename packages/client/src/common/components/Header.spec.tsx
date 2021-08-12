import { render, screen } from '@testing-library/react';

import Header, { Props } from './Header';

describe('Header', () => {
  const children = 'I am children';
  const props: Props = { title: 'foo', label: 'bar' };

  beforeEach(() => render(<Header {...props}>{children}</Header>));

  it('renders main header with given title and label', () => {
    // Assert
    expect(
      screen.getByRole('heading', { name: /foo bar/i })
    ).toBeInTheDocument();
  });

  it('renders sub header with given children', () => {
    // Assert
    expect(
      screen.getByRole('heading', { name: /i am children/i })
    ).toBeInTheDocument();
  });
});
