import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';

import { ForecastItem } from '.';

describe('ForecastItem', () => {
  const defaultProps = {
    item: {
      date: 1665218600,
      dt_txt: '2022-10-08 09:00:00',
      description:'clear sky',
      wind: 23,
      humidity: 71,
      icon: 800,
      feels_like: 30,
      temp_min: 28,
      temp_max: 28,
    },
    dayAfterTemp: false
  };

  it('renders correct information when dayAfterTemp is false', () => {
    render(<ForecastItem {...defaultProps}/>);
    const { item } = defaultProps;
    expect(screen.getByText(`Humidity: ${item.humidity}%`)).toBeInTheDocument();
    expect(screen.getByText(`Wind: ${item.wind}kmph`)).toBeInTheDocument();
    expect(screen.getByText(`Wind: ${item.wind}kmph`)).toBeInTheDocument();
    expect(screen.getByText(item.description)).toBeInTheDocument();
  });

  it('renders correct information when dayAfterTemp is true', () => {
    render(<ForecastItem {...{...defaultProps, dayAfterTemp: true}}/>);
    const { item } = defaultProps;
    expect(screen.getByText(`Humidity: ${item.humidity}%`)).toBeInTheDocument();
    expect(screen.getByText(`Wind: ${item.wind}kmph`)).toBeInTheDocument();
    expect(screen.getByText(`Wind: ${item.wind}kmph`)).toBeInTheDocument();
    expect(screen.getByText(item.description)).toBeInTheDocument();
    expect(screen.getByText(dayjs(item.dt_txt).format('dddd'))).toBeInTheDocument();
    expect(screen.getByText(dayjs(item.dt_txt).format('MMM D, YYYY'))).toBeInTheDocument();
  });
});
