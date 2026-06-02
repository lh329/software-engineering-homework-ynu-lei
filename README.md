# AI Resume Generator

一个基于 Next.js 构建的智能简历生成器，集成 AI 优化、JD 匹配分析和职业规划建议功能。

## ✨ 功能特性

### 🎨 简历编辑器
- **基本信息** - 姓名、职位、联系方式、个人简介
- **教育背景** - 学校、学历、专业、GPA、时间线
- **工作经历** - 公司、职位、职责描述、量化成就
- **项目经验** - 项目名称、角色、技术栈、成果展示
- **技能特长** - 分类管理、熟练度评级
- **奖项荣誉** - 奖项名称、颁发机构、获得时间
- **证书认证** - 证书名称、颁发机构、证书编号
- **语言能力** - 语言名称、熟练度

### 🤖 AI 助手
- **智能优化** - 使用 AI 优化简历内容（个人简介、工作经历、项目经验）
- **JD 匹配分析** - 解析职位描述，计算匹配度，识别所需技能
- **职业规划建议** - 根据工作经验和技能提供职业发展建议

### 📊 简历评分
- **多维度评分** - 完整性、工作经验、项目经验、技能水平、教育背景
- **实时反馈** - 即时显示评分和改进建议
- **等级评定** - 根据综合评分给出等级（S/A/B/C/D）

### 🎯 主题系统
- **多种主题** - Modern、Professional、Creative、Minimal
- **自定义配色** - 支持多种配色方案
- **布局切换** - 单栏/双栏布局

### 💾 数据管理
- **本地存储** - 自动保存到 localStorage
- **导入导出** - 支持 JSON 格式导入导出
- **PDF 导出** - 一键导出高质量 PDF

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **状态管理**: Zustand
- **样式**: Tailwind CSS 3
- **图标**: Lucide React
- **PDF 导出**: html2canvas + jsPDF
- **AI 接口**: OpenAI API

## 🚀 快速开始

### 安装依赖

```bash
npm install
# 或
pnpm install
```

### 配置环境变量

复制 `.env.example` 并创建 `.env.local`：

```bash
cp .env.example .env.local
```

配置 OpenAI API Key：

```env
OPENAI_API_KEY=your-api-key-here
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
npm run build
```

## 📁 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── api/                # API 路由
│   │   ├── optimize/       # AI 优化接口
│   │   ├── jd/analyze/     # JD 分析接口
│   │   ├── career/         # 职业建议接口
│   │   └── summary/        # 生成简介接口
│   ├── page.tsx            # 主页面
│   ├── layout.tsx          # 根布局
│   └── globals.css         # 全局样式
├── components/             # React 组件
│   ├── Editor/             # 编辑器组件
│   │   ├── EditorLayout.tsx
│   │   ├── PersonalInfoEditor.tsx
│   │   ├── EducationEditor.tsx
│   │   ├── ExperienceEditor.tsx
│   │   ├── ProjectEditor.tsx
│   │   ├── SkillsEditor.tsx
│   │   ├── AwardsEditor.tsx
│   │   ├── CertificationsEditor.tsx
│   │   └── LanguagesEditor.tsx
│   ├── Resume/             # 简历预览组件
│   │   └── ResumePreview.tsx
│   ├── AIPanel.tsx         # AI 助手面板
│   ├── ScorePanel.tsx      # 评分面板
│   ├── ThemeSelector.tsx   # 主题选择器
│   └── ResumeActions.tsx   # 简历操作按钮
├── data/                   # 静态数据
│   └── themes.ts           # 主题配置
├── lib/                    # 工具函数
│   └── openai.ts           # OpenAI API 封装
├── store/                  # 状态管理
│   └── resumeStore.ts      # Zustand Store
├── types/                  # 类型定义
│   └── resume.ts           # 简历数据类型
└── utils/                  # 通用工具
    └── storage.ts          # 本地存储工具
```

## 📝 使用指南

### 1. 编辑简历

在左侧编辑器中填写各项信息：
- 基本信息：姓名、职位目标、联系方式等
- 教育背景：添加学历信息
- 工作经历：填写工作经验，建议添加量化成就
- 项目经验：描述项目背景、技术栈和成果
- 技能特长：分类管理技能和熟练度
- 奖项荣誉：添加获得的奖项
- 证书认证：添加专业证书
- 语言能力：添加语言掌握程度

### 2. 使用 AI 优化

点击右侧面板的「AI助手」标签：
- 选择要优化的内容类型（个人简介/工作经历/项目经验）
- 点击「智能优化」按钮
- 查看优化结果和说明

### 3. JD 匹配分析

在 AI 助手中选择「JD匹配」：
- 粘贴职位描述
- 点击「分析JD并匹配」
- 查看匹配度和所需技能

### 4. 查看评分

点击右侧面板的「评分」标签：
- 查看各维度评分
- 获取改进建议

### 5. 选择主题

点击右侧面板的「主题」标签：
- 选择喜欢的主题风格
- 切换单栏/双栏布局

### 6. 导出简历

点击顶部的「导出PDF」按钮导出简历。

## 🔧 API 接口

### POST /api/optimize

优化简历内容

**请求体**:
```json
{
  "content": "要优化的内容",
  "section": "summary|experience|project"
}
```

**响应**:
```json
{
  "success": true,
  "optimized": "优化后的内容",
  "explanation": "优化说明"
}
```

### POST /api/jd/analyze

分析职位描述并匹配简历

**请求体**:
```json
{
  "jdContent": "职位描述内容",
  "resumeData": { ... }
}
```

### POST /api/career

获取职业规划建议

**请求体**:
```json
{
  "experience": "工作经历描述",
  "skills": "技能列表"
}
```

### POST /api/summary

生成职业简介

**请求体**:
```json
{
  "experience": "工作经历描述",
  "skills": "技能列表"
}
```

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**使用 AI 驱动的智能简历生成器，打造完美简历！** 🎉
