from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import threading
import time
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry


 # 代理设置（如果你的网络能直连，可以把这两行删掉）

#os.environ['HTTP_PROXY'] = 'http://127.0.0.1:7890'

#os.environ['HTTPS_PROXY'] = 'http://127.0.0.1:7890' 

try:
    test = requests.get("https://google.com", timeout=5)
    print("网络已打通，Google 返回状态码:", test.status_code)
except:
    print("网络仍处于封闭状态，请检查代理设置或服务器位置。")


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

# --- 内存缓存 (独立化) ---
cache_stock_data = []    # 专门存美股
cache_crypto_data = {}   # 专门存加密货币
cache_tweet_data = [] # 专门存推文


# --- 通用请求辅助函数 ---
def get_with_retry(url):
    """带重试和伪装头的请求函数"""
    session = requests.Session()
    # 定义重试逻辑：如果失败，重试3次
    retries = Retry(total=3, backoff_factor=1, status_forcelist=[500, 502, 503, 504])
    session.mount('https://', HTTPAdapter(max_retries=retries))
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "Accept": "application/json"
    }
    
    # 如果你在本地运行，可能需要配置代理(如 Clash)
    # proxies = {"http": "http://127.0.0.1:7890", "https": "http://127.0.0.1:7890"}
    # return session.get(url, headers=headers, proxies=proxies, timeout=10)
    
    return session.get(url, headers=headers, timeout=10)


def fetch_stock_data():
    """美股抓取模块"""
    global cache_stock_data
    headers = {"User-Agent": "Mozilla/5.0 ..."} # 建议保留 headers
    while True:
        new_data = []
        for symbol, display_name in TARGET_STOCKS.items():
            try:
                url = f"https://finnhub.io/api/v1/quote?symbol={symbol}&token={FINNHUB_KEY}"
                res = session.get(url, timeout=10)
                d = res.json()
                if "c" in d and d["c"] != 0:
                    new_data.append({
                        "name": display_name,
                        "price": round(d["c"], 2),
                        "change": round(d.get("dp", 0), 2),
                        "status": "STAGNANT" if abs(d.get("dp", 0)) < 1 else "VOLATILE"
                    })
            except Exception as e:
                print(f"美股 {symbol} 抓取失败: {e}")
        
        if new_data:
            cache_stock_data = new_data
        time.sleep(60)


def fetch_crypto_data():
    global cache_crypto_data
    url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin,monero&vs_currencies=usd&include_24hr_change=true"
    while True:
        try:
            response = get_with_retry(url)
            if response.status_code == 200:
                cache_crypto_data = response.json()
                print(">>> Crypto data synced.")
            else:
                print(f"!!! Crypto API Error: {response.status_code}")
        except Exception as e:
            print(f"!!! Crypto Sync Failed: {e}")
        time.sleep(60) # 延长到60秒，避免被封IP


"""
def fetch_tweet_data():
    global cache_tweet_data
    
    # 尝试加载上次保存到硬盘的推文（如果有的话）
    '''if os.path.exists(CACHE_FILE):
        try:
            with open(CACHE_FILE, 'r', encoding='utf-8') as f:
                cache_tweet_data = json.load(f)
                print(">>> 已从本地缓存加载历史推文数据。")
        except: pass'''

    # 备用节点列表（rsshub.app 经常挂，多备几个）
    nodes = [
        "https://platform.twitter.com/widgets.js",
        "https://rsshub.moeyy.cn/twitter/user/elonmusk.json",
        "https://rss.dragonegg.zip/twitter/user/elonmusk.json",
        "https://rsshub.app/twitter/user/elonmusk.json"
    ]

    while True:
        success = False
        for url in nodes:
            try:
                print(f">>> 正在尝试卫星链路节点: {url}")
                # 伪装浏览器，减少被屏蔽概率
                headers = {"User-Agent": "Mozilla/5.0"}
                res = requests.get(url, headers=headers, timeout=15)
                
                if res.status_code == 200:
                    data = res.json()
                    items = data.get('items', [])
                    if items:
                        processed = []
                        for item in items[:8]: # 抓8条
                            processed.append({
                                "id": item.get('id'),
                                "text": item.get('summary') or item.get('title'),
                                "url": item.get('url'),
                                "date": item.get('date_published', '')[:10],
                                "author": "Elon Musk (@elonmusk)"
                            })
                        
                        cache_tweet_data = processed
                        '''# 成功抓取后，立刻存入硬盘，防止重启丢失
                        with open(CACHE_FILE, 'w', encoding='utf-8') as f:
                            json.dump(processed, f)'''
                        
                        print(f">>> 链路同步成功！获取到 {len(processed)} 条推文。")
                        success = True
                        break  # 成功了就跳出节点循环
            except Exception as e:
                print(f"!!! 节点 {url} 连接失败: {e}")
                continue
        
        if not success:
            print("!!! 所有推特同步节点均无响应，等待下一轮重试。")
            
        time.sleep(600) # 10分钟同步一次，别太频繁"""


# 启动双后台线程
threading.Thread(target=fetch_stock_data, daemon=True).start()
threading.Thread(target=fetch_crypto_data, daemon=True).start()
#threading.Thread(target=fetch_tweet_data, daemon=True).start()


# --- 接口模块 (独立化) ---
@app.get("/api/legacy-assets")
def get_legacy_assets():
    """原有的美股接口"""
    if not cache_stock_data:
        return [{"name": "Syncing...", "price": 0, "change": 0, "status": "LOADING"}]
    return cache_stock_data

@app.get("/api/crypto-assets")
def get_crypto_assets():
    """新开辟的加密货币接口"""
    # 如果缓存为空，返回空对象防止前端 map 报错
    return cache_crypto_data if cache_crypto_data else {}

@app.get("/api/tweets-proxy")
def get_tweets_proxy():
    return cache_tweet_data


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)