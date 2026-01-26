import requests

def test_fetch(label, proxies=None):
    url = "https://platform.twitter.com/widgets.js"
    print(f"--- 正在测试: {label} ---")
    try:
        # timeout 设置为 5 秒，防止卡死
        response = requests.get(url, proxies=proxies, timeout=5)
        if response.status_code == 200:
            print(f"✅ 抓取成功！获取到脚本长度: {len(response.text)} 字符")
            print(f"脚本开头预览: {response.text[:50]}...")
        else:
            print(f"❌ 抓取失败。状态码: {response.status_code}")
    except Exception as e:
        print(f"❌ 发生错误: {e}")
    print("\n")

# 测试 1：直连抓取（模拟后端默认环境）
test_fetch("直连抓取 (Direct)")

# 测试 2：带代理抓取（模拟开启代理的环境）
# 注意：如果你的代理端口不是 7890，请修改下面

test_fetch("带代理抓取 (Via Proxy)")