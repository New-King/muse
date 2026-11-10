"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ChatMessage, Project } from "@/lib/api";

type Props = {
  project: Project | null;
  messages: ChatMessage[];
  sending: boolean;
  error: string | null;
  onSend: (text: string) => void;
};

export function ChatPanel({ project, messages, sending, error, onSend }: Props) {
  const [text, setText] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length, sending]);

  function submit() {
    const value = text.trim();
    if (!value || sending || !project) return;
    setText("");
    onSend(value);
  }

  return (
    <section className="flex w-[360px] shrink-0 flex-col border-l border-line bg-canvas">
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-line px-4">
        <span className="text-[13px] font-medium tracking-tight">对话</span>
        <span className="rounded-md border border-line bg-surface px-2 py-0.5 text-[11px] text-muted">
          deepseek-flash
        </span>
      </header>

      <div ref={listRef} className="flex-1 space-y-5 overflow-y-auto px-4 py-5">
        {messages.length === 0 ? (
          <p className="text-[13.5px] leading-[1.7] text-muted">
            有什么想做的？说说你想要的画面、尺寸和风格，我会给出具体建议。
          </p>
        ) : (
          messages.map((m) =>
            m.role === "user" ? (
              <div
                key={m.id}
                className="ml-auto max-w-[85%] rounded-xl border border-line bg-surface px-3 py-2 text-[13px] leading-relaxed"
              >
                {m.content}
              </div>
            ) : (
              <div key={m.id} className="prose-muse text-[13.5px] leading-[1.7] text-ink">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
              </div>
            ),
          )
        )}

        {sending && <p className="text-[13px] text-faint">思考中…</p>}
      </div>

      <div className="shrink-0 border-t border-line p-3">
        {error && <p className="mb-2 px-1 text-[11px] text-danger">{error}</p>}
        <div className="rounded-xl border border-line bg-surface transition-[border-color,box-shadow] focus-within:border-accent/40 focus-within:ring-2 focus-within:ring-accent/10">
          <textarea
            rows={2}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            placeholder={project ? "描述你想要的画面…" : "先新建一个项目"}
            disabled={!project}
            className="block w-full resize-none bg-transparent px-3 py-2.5 text-[13px] leading-relaxed outline-none placeholder:text-faint disabled:opacity-60"
          />
          <div className="flex items-center justify-between px-2 pb-2">
            <span className="text-[11px] text-faint">⏎ 发送 · ⇧⏎ 换行</span>
            <button
              type="button"
              onClick={submit}
              disabled={!project || sending || !text.trim()}
              aria-label="发送"
              className="grid size-7 place-items-center rounded-lg bg-accent text-white transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              <ArrowUp className="size-3.5" strokeWidth={2.25} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
