@echo off
chcp 65001 >nul
echo ========================================
echo 修正圖片路徑並上傳到 GitHub
echo ========================================
echo.

echo [1/4] 修正圖片路徑...
python fix_images.py
if errorlevel 1 (
    echo Python 腳本執行失敗!
    pause
    exit /b 1
)
echo.

echo [2/4] 加入所有變更...
git add .
echo.

echo [3/4] 提交變更...
set /p message=請輸入提交訊息 (直接按Enter使用預設): 
if "%message%"=="" set message=更新文章
git commit -m "%message%"
echo.

echo [4/4] 上傳到 GitHub...
git push
echo.

echo ========================================
echo 完成! 請等待 1-2 分鐘後查看網站
echo ========================================
pause