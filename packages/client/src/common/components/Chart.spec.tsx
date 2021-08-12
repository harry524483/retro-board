import { render, screen } from '@testing-library/react';

import Chart, { Props } from './Chart';

describe('Chart', () => {
  it('renders without error', () => {
    // Arrange
    const props: Props = {
      data: [1, 2, 3],
      labels: ['a', 'b', 'c'],
      type: 'bar'
    };

    // Act
    render(<Chart {...props} />);

    // Assert
    expect(screen.getByTestId('chart-canvas')).toBeInTheDocument();
  });
});
