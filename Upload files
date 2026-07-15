<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mid8568 | 个人主页</title>
    <style>
        :root {
            --bg-gradient: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
            --card-bg: rgba(255, 255, 255, 0.03);
            --card-border: rgba(255, 255, 255, 0.08);
            --text-primary: #f8fafc;
            --text-secondary: #94a3b8;
            --accent-color: #818cf8;
            --accent-hover: #a5b4fc;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background: var(--bg-gradient);
            color: var(--text-primary);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            overflow-x: hidden;
        }

        .container {
            width: 100%;
            max-width: 680px;
            text-align: center;
            animation: fadeIn 0.8s ease-out;
        }

        /* 头像与个人信息 */
        .profile {
            margin-bottom: 32px;
        }

        .avatar {
            width: 96px;
            height: 96px;
            border-radius: 50%;
            background: linear-gradient(45deg, #6366f1, #a855f7);
            margin: 0 auto 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            font-weight: bold;
            color: white;
            box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.4);
        }

        h1 {
            font-size: 2rem;
            font-weight: 700;
            letter-spacing: -0.025em;
            margin-bottom: 8px;
            background: linear-gradient(to right, #fff, #cbd5e1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .bio {
            color: var(--text-secondary);
            font-size: 1rem;
            max-width: 460px;
            margin: 0 auto;
            line-height: 1.5;
        }

        /* 标签栏 */
        .tags {
            display: flex;
            justify-content: center;
            gap: 8px;
            flex-wrap: wrap;
            margin-top: 16px;
        }

        .tag {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--card-border);
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.85rem;
            color: var(--text-secondary);
        }

        /* 链接/项目卡片列表 */
        .links-list {
            display: flex;
            flex-direction: column;
            gap: 16px;
            margin-top: 40px;
        }

        .card {
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 16px;
            padding: 18px 24px;
            text-decoration: none;
            color: var(--text-primary);
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
        }

        .card:hover {
            transform: translateY(-2px);
            background: rgba(255, 255, 255, 0.06);
            border-color: rgba(129, 140, 248, 0.4);
            box-shadow: 0 10px 20px -10px rgba(0, 0, 0, 0.5);
        }

        .card-content {
            text-align: left;
        }

        .card-title {
            font-size: 1.05rem;
            font-weight: 600;
            margin-bottom: 4px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .card-desc {
            font-size: 0.85rem;
            color: var(--text-secondary);
        }

        .card-arrow {
            color: var(--text-secondary);
            font-size: 1.2rem;
            transition: transform 0.2s;
        }

        .card:hover .card-arrow {
            color: var(--accent-color);
            transform: translateX(4px);
        }

        /* 页脚 */
        footer {
            margin-top: 60px;
            font-size: 0.8rem;
            color: rgba(148, 163, 184, 0.5);
        }

        /* 入场动画 */
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @media (max-width: 480px) {
            .container {
                padding: 10px;
            }
            h1 {
                font-size: 1.75rem;
            }
        }
    </style>
</head>
<body>

    <div class="container">
        <!-- 个人信息区 -->
        <header class="profile">
            <div class="avatar">M</div>
            <h1>mid8568</h1>
            <p class="bio">构建有趣、好用且优雅的数字体验。</p>
            <div class="tags">
                <span class="tag">💻 开发者</span>
                <span class="tag">🎨 设计爱好者</span>
                <span class="tag">✍️ 记录者</span>
            </div>
        </header>

        <!-- 导航与项目卡片 -->
        <main class="links-list">
            <!-- 替换 href 里的链接为你自己的地址 -->
            <a href="https://github.com/mid8568" target="_blank" class="card">
                <div class="card-content">
                    <div class="card-title">🐙 GitHub 主页</div>
                    <div class="card-desc">探索我的开源项目与代码仓库</div>
                </div>
                <div class="card-arrow">→</div>
            </a>

            <a href="#" class="card">
                <div class="card-content">
                    <div class="card-title">✍️ 个人博客</div>
                    <div class="card-desc">分享技术积累、想法与生活日常 (建设中)</div>
                </div>
                <div class="card-arrow">→</div>
            </a>

            <a href="mailto:your-email@example.com" class="card">
                <div class="card-content">
                    <div class="card-title">✉️ 保持联系</div>
                    <div class="card-desc">发送邮件与我探讨合作或交流</div>
                </div>
                <div class="card-arrow">→</div>
            </a>
        </main>

        <!-- 页脚 -->
        <footer>
            <p>© <span id="year"></span> mid8568. Powered by GitHub Pages.</p>
        </footer>
    </div>

    <script>
        // 动态更新页脚年份
        document.getElementById('year').textContent = new Date().getFullYear();
    </script>
</body>
</html>
