/*
 * @Author: Leo
 * @Date: 2022-09-29 16:01:09
 * @LastEditors: Leo
 * @LastEditTime: 2022-09-29 16:07:11
 * @FilePath: \coding-challenge-frontend\src\App.test.js
 * @Description: 
 */
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
