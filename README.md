# 白敬俊 · AI 应用工程作品集

单页静态站点，用于对外展示 GitHub 公开仓库。没有构建步骤、没有第三方脚本、没有追踪，直接放到 GitHub Pages 即可。

页面只收录**公开仓库**。私有仓库（RAG-bench-dev、ResuMatch、agent-copilot）不在展示范围内。

## 本地预览

在本目录下起一个静态服务器：

```powershell
python -m http.server 8080
```

浏览器打开 `http://localhost:8080/`。

直接双击 `index.html` 也能看，但用 `file://` 打开时浏览器对字体和锚点的处理会略有差异，建议用上面的方式。

## 部署到 GitHub Pages

### 方案 A：用户主页（推荐）

地址形如 `https://jubai123.github.io/`。

1. 新建一个**公开**仓库，名字必须是 `jubai123.github.io`。
2. 把本目录的全部文件推到该仓库的 `main` 分支（`.nojekyll` 也要推）。
3. 仓库 Settings → Pages → Build and deployment → Source 选 `Deploy from a branch`，Branch 选 `main`、目录选 `/ (root)`，保存。
4. 一两分钟后访问 `https://jubai123.github.io/`。

### 方案 B：项目页

推到任意仓库，Pages 同样选 `main` / root，地址是 `https://jubai123.github.io/<仓库名>/`。站内资源都用相对路径，子路径部署可以直接用。

如果不想让 GitHub Pages 跑 Jekyll，根目录的 `.nojekyll` 已经处理好了。

## 内容来源

- 5 个公开仓库的定位、架构、数字与结论，取自各仓库 README，抓取时间为 2026-11-25。
- 语言占比（Python 96.9%）与代码体量（约 3.0 MB）来自 GitHub Languages API 的字节统计。
- 提交数 252 为 5 个公开仓库的提交总和；ERP Agent Copilot 单个仓库 246 次提交。
- 唯一的截图来自 `LangGraph-DeepResearch` 仓库的 `app.png`，裁掉了浏览器滚动条。

数据更新后，可以用 `gh` 重新核对：

```powershell
gh repo list jubai123 --limit 100 --json name,description,isPrivate,primaryLanguage,pushedAt
gh api repos/jubai123/<repo> --jq '{language, pushed_at, topics}'
```

## 需要你确认的地方

页面里以下几处是我按公开信息推断的，发布前请核对：

1. **邮箱**：`baijingjun@stu.xjtu.edu.cn` 来自 GitHub 公开资料。不想公开就替换 `index.html` 里的 `mailto:` 和关于区的邮箱。
2. **身份**：页面没有写学校、专业和年级，避免推断错误。想加就在「关于」段落里补一句。
3. **头衔**：现在写的是「AI 应用工程」。如果求职方向变了，改 hero 的 eyebrow 和 `<title>`。
4. **域名**：`<link rel="canonical">` 与 JSON-LD 里写的是 `https://jubai123.github.io/`，换成实际域名。
5. **更新日期**：页脚写的是 2026 年 11 月 25 日，改数据时一起改。

## 改内容

- 文案与结构：`index.html`
- 样式：`assets/css/style.css`（颜色、字号、断点都在文件开头的变量和后面的 `@media` 里）
- 交互：`assets/js/main.js`（项目展开、索引跳转、入场动效、导航高亮）
- 新增项目：复制一个 `<li class="project" data-project>` 区块，改 `id`、`aria-controls` 和对应 `body-*`，再在顶部索引面板加一行。

首页四个统计数字在 `.index-foot` 里，直接改文本即可。

## 设计说明

- 视觉方向是「技术档案 / 仪器面板」：细网格、发丝线、等宽数字、单一强调色 `#F0522B`。
- 深色单主题，直角体系，全站一套圆角规则（0）。
- 拉丁字体自托管（Space Grotesk、JetBrains Mono），中文回退到系统黑体，避免为中文加载几 MB 字体。
- 动效只有入场淡入和手风琴展开，全部走 `IntersectionObserver` 与 CSS，`prefers-reduced-motion` 下关闭。
- 语义结构、键盘焦点、`aria-expanded` / `aria-controls`、跳转链接都已处理。

## 目录

```text
index.html                 页面
assets/css/style.css       样式
assets/js/main.js          交互
assets/fonts/*.woff2       自托管字体
assets/img/*.webp          项目截图
.nojekyll                  关闭 GitHub Pages 的 Jekyll 处理
```
