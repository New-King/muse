# 工作交接

> 给接手的人（或 AI agent）：先读这一页，再动手。项目只有一个人维护，很多取舍是"够用就好"，不要按大厂标准重构。

## 一句话状态

一个 AI 创作画布的首页 + 工作台：**登录是真的，项目数据落在 Postgres，画布和对话还在内存里，AI 还不会生成任何东西**。

## 怎么跑

```bash
pnpm install
pnpm dev        # web http://localhost:3000 · api http://127.0.0.1:3001
```

需要两份环境变量文件（都被 `.gitignore` 挡住，不在仓库里）：

- `/.env.local` —— 服务端用：`SUPABASE_URL`、`SUPABASE_SERVICE_ROLE_KEY`、`OPENAI_*`、`PROJECTS_STORE=supabase`
- `/apps/web/.env.local` —— 浏览器用：`NEXT_PUBLIC_SUPABASE_URL`、`NEXT_PUBLIC_SUPABASE_ANON_KEY`、`NEXT_PUBLIC_SERVER_BASE_URL`

找项目拥有者要这两份文件的内容，不要自己新建 Supabase 项目。

## 外部资源

| 东西 | 值 |
|---|---|
| Supabase 项目 | `mylovart`，ref `nhelcyxvexelkomsggab`，东京区 |
| 管理员账号 | `newking@example.com`（密码不在仓库；要登录就去 Supabase Dashboard 重置） |
| 大模型 | DeepSeek，OpenAI 兼容接口，走 `OPENAI_API_KEY` / `OPENAI_API_BASE` |
| 仓库 | https://github.com/New-King/my-lovart （`main`） |

## 架构

```
apps/web        Next.js 15 (App Router) + Tailwind 4 + Excalidraw
apps/server     Fastify 5，路由薄、业务在 features、数据在 db
packages/shared 共用类型（目前几乎没用上）
supabase        migrations
```

路由：

| 路径 | 说明 |
|---|---|
| `/` | 首页：左标题 + 创作流程轨道动画，右侧登录卡 |
| `/app` | 工作台：左项目栏、中 Excalidraw 画布、右对话 |
| `/login` | 旧链接，301 到 `/` |

## 已实现

- **登录**：Supabase Auth 邮箱密码。前端 `signInWithPassword`，会话存浏览器；服务端每个接口用 service key 调 `auth.getUser(token)`，没 token 返回 401。**不开放注册**
- **项目**：`projects` 表，RLS 按 `user_id` 隔离；服务端走 service_role、查询显式带 `user_id`。草稿逻辑在前端（新建先不落库，产生内容才建）
- **画布**：Excalidraw 可用，改动 600ms 防抖后 `PUT /workspace/:id/canvas`
- **对话**：`POST /workspace/:id/messages` 调 DeepSeek，回复用 Markdown 渲染
- **首页**：中性冷色调，流程轨道动画（rare-ui rail-toc + 本地 `autoLoop` 参数）

## 未实现（按优先级）

1. **AI 不会出图/出视频**。没有任何 `generate_image` 之类的工具，Agent 只能在对话里给建议。这是产品最缺的一块，接了才算完整
2. **画布和对话不持久**。`workspace.store.ts` 是内存 Map，服务重启清空。表已经建好（`canvases`、`sessions`、`messages`），接上即可
3. 首页承诺了"图像、视频、版式"，但工作台只有对话
4. 没有测试；`pnpm lint` 没跑过
5. 部署没做（Dockerfile 没有）

## 关键文件

| 文件 | 作用 |
|---|---|
| `apps/web/src/app/page.tsx` | 首页 |
| `apps/web/src/components/workspace.tsx` | 工作台状态（项目切换、草稿、发消息） |
| `apps/web/src/lib/auth.ts` | 浏览器端 Supabase 登录 |
| `apps/web/src/lib/api.ts` | 调服务端，自动带 Bearer token |
| `apps/server/src/lib/auth.ts` | 服务端校验 JWT |
| `apps/server/src/features/projects/` | 项目：service + 两套 repository（supabase / memory） |
| `apps/server/src/features/workspace/` | 画布与对话（内存） |
| `apps/server/src/lib/llm.ts` | DeepSeek 调用 |
| `supabase/migrations/0001_init.sql` | 建表 + RLS |
| `docs/DESIGN.md` | 视觉规范，改界面前必读 |

## 踩过的坑（别再踩）

1. **不要一边跑 `next dev` 一边跑 `next build`**。两者共用 `.next`，build 会把 dev 的产物覆盖，CSS 变成 404，页面只剩两个黑块。要验证构建就先停 dev，或者只跑 `tsc --noEmit`
2. **Excalidraw 主题要改全**：只改 `--color-primary` 不够，紫味来自 `--color-surface-low/mid/high`、`--color-brand-hover/active`，见 `globals.css`
3. **无障碍变量不要混用**：Web 的 `lib/utils.ts` 里 `cn()` 是给第三方组件（rail-toc）用的，别删
4. **栅格行会被拉伸**：`grid` 默认 `align-content: stretch`，`min-h-dvh` 下自动行会吃掉剩余高度，看起来像"间距很大"。移动端用 `content-start`
5. **自定义 class 的 `position` 会压过 Tailwind**：`.assemble { position: relative }` 这类未分层规则优先级高于 `absolute` 工具类，需要的话套一层 wrapper
6. **标题与登录卡对齐**靠 `calc((100dvh - 595px)/2 - 28px)`，改卡片高度或页面留白要同步改这个数

## 工作方式

- 小步提交，别一次改十几个文件
- **不要 force push**，除非明确要求
- 界面改动先给截图，别口头描述"已经调好了"
- 提交信息用中文，一句话说清改了什么

## 历史

`git log` 里能看到完整的界面迭代过程（暖色版 → 中性版 → 各种动效试验 → 回退 → 接入真实登录）。有几条提交被 `reset --hard` 掉了，现在的历史是从 `c6e4e4d` 之后重新长出来的。
