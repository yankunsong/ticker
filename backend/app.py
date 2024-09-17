from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import yfinance as yf
import matplotlib.pyplot as plt
import io
import os
from tempfile import NamedTemporaryFile
import logging

app = Flask(__name__)
CORS(app, resources={r"/analyze": {"origins": "http://localhost:3000"}})
logging.basicConfig(level=logging.DEBUG)

def generate_stock_chart(tickers):
    plt.figure(figsize=(12, 6))
    
    for ticker in tickers:
        try:
            stock = yf.Ticker(ticker)
            hist = stock.history(period="1mo")
            plt.plot(hist.index, hist['Close'], label=ticker)
        except Exception as e:
            logging.error(f"Error fetching data for {ticker}: {str(e)}")
            raise

    plt.title("Stock Price Over Last Month")
    plt.xlabel("Date")
    plt.ylabel("Closing Price")
    plt.legend()
    
    img_buffer = io.BytesIO()
    plt.savefig(img_buffer, format='png')
    img_buffer.seek(0)
    plt.close()
    return img_buffer

@app.route('/analyze', methods=['POST'])
def analyze_stocks():
    tickers = request.json.get('tickers', [])
    if not tickers:
        return jsonify({'error': 'No tickers provided'}), 400

    try:
        img_buffer = generate_stock_chart(tickers)
        return send_file(img_buffer, mimetype='image/png')
    except Exception as e:
        logging.exception("Error generating stock chart")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)