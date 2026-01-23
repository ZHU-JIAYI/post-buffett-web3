from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
import threading
import time

# 代理设置（如果你的网络能直连，可以把这两行删掉）
#os.environ['HTTP_PROXY'] = 'http://127.0.0.1:7890'
#os.environ['HTTPS_PROXY'] = 'http://127.0.0.1:7890'

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 配置区 ---
FINNHUB_KEY = "d5pjmphr01qkmf6gi2cgd5pjmphr01qkmf6gi2d0" 
TARGET_STOCKS = {
    "BRK.B": "BERKSHIRE (BRK-B)",
    "KO": "COCA-COLA (KO)",
    "AAPL": "APPLE (AAPL)",
    "BAC": "BANK OF AMERICA (BAC)"
}

# 内存缓存
cache_data = []

def fetch_stock_data():
    """核心抓取逻辑"""
    global cache_data
    while True:
        new_data = []
        print(f">>> [{time.strftime('%H:%M:%S')}] 正在从 Finnhub 同步数据...")
        
        for symbol, display_name in TARGET_STOCKS.items():
            try:
                # Finnhub 的 Quote 接口非常轻量
                url = f"https://finnhub.io/api/v1/quote?symbol={symbol}&token={FINNHUB_KEY}"
                res = requests.get(url, timeout=5)
                d = res.json()
                
                # Finnhub 返回字段说明: c=当前价, dp=当日涨跌幅
                if "c" in d and d["c"] != 0:
                    price = d["c"]
                    change_pct = d.get("dp", 0)
                    
                    new_data.append({
                        "name": display_name,
                        "price": round(price, 2),
                        "change": round(change_pct, 2),
                        "status": "STAGNANT" if abs(change_pct) < 1 else "VOLATILE"
                    })
                else:
                    print(f"警告: {symbol} 未获取到有效数据")
            except Exception as e:
                print(f"抓取 {symbol} 出错: {e}")
        
        if new_data:
            cache_data = new_data
            print(">>> 数据已推送到缓存。")
            
        # 每 30 秒更新一次，Finnhub 额度管够
        time.sleep(30)

# 启动后台更新线程
threading.Thread(target=fetch_stock_data, daemon=True).start()

@app.get("/api/legacy-assets")
def get_legacy_assets():
    # 瞬间返回，不消耗 API 额度
    if not cache_data:
        return [{"name": "Syncing...", "price": 0, "change": 0, "status": "LOADING"}]
    return cache_data

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)