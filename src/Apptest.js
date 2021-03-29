import React from 'react';
import { render } from '@testing-library/react';
import MainApp from './App';

test('renders learn react link', () => {
  const { getByText } = render(<MainApp />);
  const linkElement = getByText(/profile/i);
  expect(linkElement).toBeInTheDocument();
});
