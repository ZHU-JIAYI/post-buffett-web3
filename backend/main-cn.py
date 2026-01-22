from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import akshare as ak
import pandas as pd

app = FastAPI()

# 关键：允许你的 Next.js (localhost:3000) 访问这个 API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

# 配置你想要监控的美股中文名与对应的赛博标签
TARGET_STOCKS = {
    "波希尔哈撒韦-A": "BRK.A (BUFFETT)",
    "苹果": "APPLE (AAPL)",
    "可口可乐": "COCA-COLA (KO)",
    "特斯拉": "TESLA (TSLA)"
}

@app.get("/api/legacy-assets")
def get_legacy_assets():
    try:
        # 1. 直接通过 akshare 获取美股行情快照
        df = ak.stock_us_spot_em()
        
        # 2. 过滤我们关注的股票
        mask = df['名称'].isin(TARGET_STOCKS.keys())
        filtered_df = df[mask]
        
        # 3. 构造符合前端格式的 JSON
        results = []
        for _, row in filtered_df.iterrows():
            results.append({
                "name": TARGET_STOCKS[row['名称']],
                "price": float(row['最新价']),
                "change": float(row['涨跌幅']),
                "status": "STAGNANT" if abs(row['涨跌幅']) < 1 else "VOLATILE"
            })
        
        return results
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    # 启动在 8000 端口
    uvicorn.run(app, host="127.0.0.1", port=8000)