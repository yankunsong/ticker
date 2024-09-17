import React, { useState } from "react";

const StockAnalyzer = () => {
  const [tickers, setTickers] = useState([]);
  const [inputTicker, setInputTicker] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    setInputTicker(e.target.value);
  };

  // Add ticker on Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputTicker.trim() !== "") {
      setTickers([...tickers, inputTicker.trim().toUpperCase()]);
      setInputTicker("");
    }
  };

  // Remove ticker
  const removeTicker = (tickerToRemove) => {
    setTickers(tickers.filter((ticker) => ticker !== tickerToRemove));
  };

  // Submit tickers and generate image
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tickers }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to generate chart: ${errorText}`);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setGeneratedImage(imageUrl);
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Analyze Stocks</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <input
            type="text"
            value={inputTicker}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter stock ticker and press Enter"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {tickers.length > 0 && (
          <ul className="mb-4 space-y-2">
            {tickers.map((ticker, index) => (
              <li key={index} className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-md">
                <span className="font-medium">{ticker}</span>
                <button
                  onClick={() => removeTicker(ticker)}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={handleSubmit}
          disabled={tickers.length === 0 || isLoading}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Stocks'}
        </button>
      </div>

      {generatedImage && (
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Analysis Result:</h2>
          <img src={generatedImage} alt="Generated Stock Analysis" className="w-full rounded-md shadow-md" />
        </div>
      )}
    </div>
  );
};

export default StockAnalyzer;
