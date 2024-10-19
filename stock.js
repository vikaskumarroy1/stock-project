async function fetchStockPrice() {
    const apiKey = 'UVXICSVTKD1M5JHX';
    const symbol = 'IBM';
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;

    try {
      // Fetch data from Alpha Vantage API
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Error fetching stock data');
      }

     
      const data = await response.json();
      const timeSeries = data["Time Series (5min)"];

      if (!timeSeries) {
        throw new Error('Invalid data format from API');
      }

      const latestTime = Object.keys(timeSeries)[0];
      const latestData = timeSeries[latestTime];

      const latestPrice = latestData['4. close'];

     
      document.getElementById('stock-info').innerHTML = `
        <p>Latest Price for <strong>${symbol}</strong>: <span class="price">$${latestPrice}</span></p>
        <p>Data Timestamp: ${latestTime}</p>
      `;

    } catch (error) {
      document.getElementById('stock-info').innerHTML = `<p class="error">Failed to fetch stock price: ${error.message}</p>`;
    }
  }

  
  fetchStockPrice();