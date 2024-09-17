import React from 'react';
import StockAnalyzer from './components/StockAnalyzer/StockAnalyzer';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">Stock Analysis App</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <StockAnalyzer />
      </main>
      <footer className="bg-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          © 2023 Stock Analysis App. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
