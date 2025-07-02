import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';

test('renders evaluation report summary and open report button', () => {
  render(<App />);
  expect(screen.getByText(/evaluation results/i)).toBeInTheDocument();
  expect(screen.getByText(/model x/i)).toBeInTheDocument();
  expect(screen.getByTestId('open-report-btn')).toBeInTheDocument();
});

test('opens modal and shows report content when open report button clicked', () => {
  render(<App />);
  fireEvent.click(screen.getByTestId('open-report-btn'));
  expect(screen.getByTestId('report-modal')).toBeInTheDocument();
  expect(screen.getByTestId('modal-full-report').textContent).toMatch(/evaluation report/i);
  expect(screen.getByTestId('download-btn')).toBeInTheDocument();
  expect(screen.getByTestId('cancel-btn')).toBeInTheDocument();
  expect(screen.getByTestId('modal-close-x')).toBeInTheDocument();
});

test('closes modal when cancel button clicked', () => {
  render(<App />);
  fireEvent.click(screen.getByTestId('open-report-btn'));
  expect(screen.getByTestId('report-modal')).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('cancel-btn'));
  expect(screen.queryByTestId('report-modal')).toBeNull();
});

test('closes modal when X button clicked', () => {
  render(<App />);
  fireEvent.click(screen.getByTestId('open-report-btn'));
  fireEvent.click(screen.getByTestId('modal-close-x'));
  expect(screen.queryByTestId('report-modal')).toBeNull();
});

// Download test (just triggers click, as browser blocks downloads in jsdom)
test('download button exists and is clickable', () => {
  render(<App />);
  fireEvent.click(screen.getByTestId('open-report-btn'));
  const downloadBtn = screen.getByTestId('download-btn');
  expect(downloadBtn).toBeInTheDocument();
  fireEvent.click(downloadBtn); // No assertion; main goal is that it does not throw error
});
