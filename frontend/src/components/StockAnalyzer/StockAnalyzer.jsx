import React, { useState } from 'react';

const StockAnalyzer = () => {
  const [tickers, setTickers] = useState([]);
  const [inputTicker, setInputTicker] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);

  // Handle input change
  const handleInputChange = (e) => {
    setInputTicker(e.target.value);
  };

  // Add ticker on Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputTicker.trim() !== '') {
      setTickers([...tickers, inputTicker.trim().toUpperCase()]);
      setInputTicker('');
    }
  };

  // Remove ticker
  const removeTicker = (tickerToRemove) => {
    setTickers(tickers.filter(ticker => ticker !== tickerToRemove));
  };

  // Submit tickers and generate image
  const handleSubmit = () => {
    // For now, we'll use a static image URL
    const staticImageUrl = 'https://example.com/static-stock-image.jpg';
    setGeneratedImage(staticImageUrl);
  };

  return (
    <div className="stock-analyzer">
      <h1>Stock Analyzer</h1>
      
      {/* Input for stock tickers */}
      <input
        type="text"
        value={inputTicker}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Enter stock ticker and press Enter"
      />

      {/* Display added tickers */}
      <ul>
        {tickers.map((ticker, index) => (
          <li key={index}>
            {ticker}
            <button onClick={() => removeTicker(ticker)}>Remove</button>
          </li>
        ))}
      </ul>

      {/* Submit button */}
      <button onClick={handleSubmit} disabled={tickers.length === 0}>
        Submit
      </button>

      {/* Display generated image */}
      {generatedImage && (
        <div className="generated-image">
          <h2>Generated Image:</h2>
          <img src={generatedImage} alt="Generated Stock Analysis" />
        </div>
      )}
    </div>
  );
};

export default StockAnalyzer;