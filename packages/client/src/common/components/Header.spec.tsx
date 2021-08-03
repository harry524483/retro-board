import { render, screen } from '@testing-library/react';

import Header, { Props } from './Header';

describe('Header', () => {
  const children = 'I am children';
  const props: Props = { title: 'foo', label: 'bar' };

  beforeEach(() => {
    render(<Header {...props}>{children}</Header>);
  });

  it('renders main header with given title and label', () => {
    expect(screen.getByTestId('main-header')).toHaveTextContent('foo');
    expect(screen.getByTestId('label')).toHaveTextContent('bar');
  });

  it('renders divider with given children', () => {
    expect(screen.getByTestId('divider')).toHaveTextContent(children);
  });
});
