from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf
import os

os.environ['HTTP_PROXY'] = 'http://127.0.0.1:7890'
os.environ['HTTPS_PROXY'] = 'http://127.0.0.1:7890'


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# yfinance 使用标准的股票代码
TARGET_STOCKS = {
    "BRK-A": "BRK.A (BUFFETT)",
    "AAPL": "APPLE (AAPL)",
    "KO": "COCA-COLA (KO)",
    "TSLA": "TESLA (TSLA)"
}

@app.get("/api/legacy-assets")
def get_legacy_assets():
    try:
        # 一次性获取所有股票的行情数据
        symbols = list(TARGET_STOCKS.keys())
        tickers = yf.Tickers(' '.join(symbols))
        
        results = []
        for sym in symbols:
            # 获取实时价格快照
            info = tickers.tickers[sym].fast_info
            
            # 计算涨跌幅 (当前价 / 昨日收盘价 - 1) * 100
            current_price = info.last_price
            prev_close = info.previous_close
            change_pct = ((current_price / prev_close) - 1) * 100
            
            results.append({
                "name": TARGET_STOCKS[sym],
                "price": round(current_price, 2),
                "change": round(change_pct, 2),
                "status": "STAGNANT" if abs(change_pct) < 1 else "VOLATILE"
            })
        
        return results
    except Exception as e:
        print(f"Error: {e}")
        return {"error": "Global Signal Lost"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)