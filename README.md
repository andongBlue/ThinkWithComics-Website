# Thinking with Comics - ICML 2026 Project Website (Full Version)

这是 **"Thinking with Comics: Enhancing Multimodal Reasoning through Structured Visual Storytelling"** 论文的完整版项目主页。

## 文件结构

```
ThinkWithComics-Website-Full/
├── index.html              # 主页 HTML
├── css/
│   └── style.css          # 样式文件
├── js/
│   └── main.js            # JavaScript 交互脚本
├── images/
│   ├── benchmark.png      # 顶部 benchmark 对比图
│   ├── analysis/          # 分析图片
│   │   ├── 1scaling_panel.png   # (需要添加) 面板数量缩放分析图
│   │   └── 2task_panel.png      # (需要添加) 任务难度分析图
│   └── examples/          # 示例漫画图片
│       ├── gsm8k_*.png
│       ├── math500_*.png
│       ├── mathvista_*.png
│       ├── CulturalBench_*.png
│       ├── comic_101*.png
│       └── CYB_BUBBLEGOM_T01_*_translated.png
└── README.md
```

## 合并说明

此版本合并了以下两个项目的内容：

1. **Thinking with Comics _ ICML 2026.html** - 完整的独立HTML文件
   - Benchmark 图片展示
   - Analysis over Number of Panels 部分
   - Gallery Culture QA 分类
   - 更多漫画示例

2. **ThinkWithComics-Website/** - 标准网站项目
   - 清晰的代码结构 (css/js 分离)
   - TL;DR 部分
   - 响应式移动端菜单
   - 图片点击放大功能

## 缺失图片说明

以下图片需要手动添加到相应位置：

### 分析图片 (images/analysis/)
- `1scaling_panel.png` - 面板数量与推理能力的缩放关系图
- `2task_panel.png` - 不同任务难度下生成面板数量分布图

这些图片可以从论文的 PDF 或 LaTeX 源文件中导出。

## 本地运行

1. 使用任意 HTTP 服务器运行：
   ```bash
   # Python 3
   python3 -m http.server 8080
   
   # Node.js (需要安装 http-server)
   npx http-server -p 8080
   ```

2. 在浏览器中访问 `http://localhost:8080`

## 部署

可直接部署到：
- GitHub Pages
- Vercel
- Netlify
- 任何静态网站托管服务

## 自定义

### 修改作者信息
编辑 `index.html` 中的 `.author-list` 和 `.affiliation-list` 部分。

### 添加论文链接
更新 `index.html` 中 `.hero-buttons` 的链接地址。

### 更新实验数据
修改 `index.html` 中 `.results-table` 的表格数据。

## 版权

© 2026 Thinking with Comics Authors. All rights reserved.
