import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import axios from 'axios';
import './CandlestickChart.css';

const CandlestickChart = () => {
  const chartContainerRef = useRef(null);
  const [data, setData] = useState([]);
  const [symbol, setSymbol] = useState('IBM');
  const [timeRange, setTimeRange] = useState('1day'); // Default time range
  const [symbols] = useState(['IBM', 'AAPL', 'MSFT', 'GOOGL', 'AMZN']); // List of symbols

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.alphavantage.co/query', {
          params: {
            function: 'TIME_SERIES_DAILY',
            symbol: symbol,
            outputsize: timeRange === '1day' ? 'compact' : 'full', 
            apikey: '7KMSHHSH04FYUP9P',
          },
        });

        const timeSeries = response.data['Time Series (Daily)'];
        if (timeSeries) {
          const formattedData = Object.keys(timeSeries).map((date) => {
            return {
              time: new Date(date).getTime() / 1000,
              open: parseFloat(timeSeries[date]['1. open']),
              high: parseFloat(timeSeries[date]['2. high']),
              low: parseFloat(timeSeries[date]['3. low']),
              close: parseFloat(timeSeries[date]['4. close']),
            };
          });
          setData(formattedData.reverse());
        } else {
          setData([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]);
      }
    };

    fetchData();
  }, [symbol, timeRange]); // Fetch data when symbol or timeRange changes

  useEffect(() => {
    if (data.length === 0) return;

    const chartOptions = {
      layout: {
        textColor: 'black',
        background: { type: 'solid', color: 'white' },
      },
    };
    const chart = createChart(chartContainerRef.current, chartOptions);
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    candlestickSeries.setData(data);
    chart.timeScale().fitContent();

    return () => {
      chart.remove();
    };
  }, [data]);

  const handleSymbolChange = (event) => {
    setSymbol(event.target.value);
  };

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  return (
    <div>
      <div className="chart-controls">
        <select value={symbol} onChange={handleSymbolChange}>
          {symbols.map(sym => (
            <option key={sym} value={sym}>{sym}</option>
          ))}
        </select>

        <select value={timeRange} onChange={handleTimeRangeChange}>
          <option value="1day">1 Day</option>
          <option value="1week">1 Week</option>
          <option value="1month">1 Month</option>
        </select>
      </div>

      {data.length === 0 ? (
        <div>No data available for {symbol}</div>
      ) : (
        <div ref={chartContainerRef} style={{ height: '500px' }} />
      )}
    </div>
  );
};

export default CandlestickChart;
