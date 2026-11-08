# Muse

**AI 设计画布。** 左边画布，右边对话。用自然语言描述，AI 生成图像并直接落到画布上。

代码从零实现；产品形态受 [Loomic](https://github.com/fancyboi999/Loomic) 启发，未复用其源码。

## 状态

早期搭建中，路线见 [`docs/PLAN.md`](docs/PLAN.md)，视觉规范见 [`docs/DESIGN.md`](docs/DESIGN.md)。

## 技术栈

- 前端：Next.js (App Router) · React · Tailwind CSS · shadcn/ui · Excalidraw
- 后端：Fastify · WebSocket
- 数据：Supabase (Postgres · Auth · Storage)
- AI：OpenAI SDK + 自建 Agent loop
- 工程：pnpm workspace · Turborepo · Vitest · Biome

## 开发

```bash
pnpm install
pnpm dev
```
