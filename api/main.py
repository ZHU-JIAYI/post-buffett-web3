from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
import threading
import time


 # 代理设置（如果你的网络能直连，可以把这两行删掉）

#os.environ['HTTP_PROXY'] = 'http://127.0.0.1:7890'

#os.environ['HTTPS_PROXY'] = 'http://127.0.0.1:7890' 


# 增强型 Session 配置
session = requests.Session()
retries = Retry(total=5, backoff_factor=1, status_forcelist=[500, 502, 503, 504])
session.mount('https://', HTTPAdapter(max_retries=retries))

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
    # 伪装请求头，防止被 API 服务器拒绝 SSL 连接
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    
    while True:
        new_data = []
        print(f">>> [{time.strftime('%H:%M:%S')}] 正在同步数据...")
        
        for symbol, display_name in TARGET_STOCKS.items():
            try:
                url = f"https://finnhub.io/api/v1/quote?symbol={symbol}&token={FINNHUB_KEY}"
                
                # --- 关键改动：使用 session 替代直接请求，并加上 headers ---
                res = session.get(url, headers=headers, timeout=10)
                d = res.json()
                
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
                    print(f"警告: {symbol} 数据异常")
            except Exception as e:
                print(f"抓取 {symbol} 出错: {e}")
        
        if new_data:
            cache_data = new_data
            print(">>> 数据已推送到缓存。")
            
        time.sleep(60) # 调成60秒一次，更稳健

# 启动后台更新线程
# 注意：在 Vercel 免费版中线程可能在闲置时挂起，但逻辑完全保留
threading.Thread(target=fetch_stock_data, daemon=True).start()

@app.get("/api/legacy-assets")
def get_legacy_assets():
    if not cache_data:
        return [{"name": "Syncing...", "price": 0, "change": 0, "status": "LOADING"}]
    return cache_data

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)