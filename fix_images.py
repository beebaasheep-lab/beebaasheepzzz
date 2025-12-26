import os
import re
from datetime import datetime, timedelta

posts_dir = "_posts"

# 只處理最近 7 天內修改的檔案
week_ago = datetime.now() - timedelta(days=7)

for filename in os.listdir(posts_dir):
    if filename.endswith(".md"):
        filepath = os.path.join(posts_dir, filename)
        
        # 檢查檔案修改時間
        modified_time = datetime.fromtimestamp(os.path.getmtime(filepath))
        
        if modified_time < week_ago:
            continue  # 跳過舊文章
        
        # 讀取檔案內容
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 檢查是否需要替換
        if '../assets/images/' not in content and '/assets/images/' not in content:
            continue  # 跳過已經處理過的
        
        original_content = content
        
        # 替換圖片路徑
        content = re.sub(
            r'!\[([^\]]*)\]\(\.\./assets/images/',
            r'![\1]({{ site.baseurl }}/assets/images/',
            content
        )
        
        content = re.sub(
            r'!\[([^\]]*)\]\(/assets/images/',
            r'![\1]({{ site.baseurl }}/assets/images/',
            content
        )
        
        # 只有內容真的改變才寫回
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✓ 已處理: {filename}")

print("\n所有圖片路徑已修正!")