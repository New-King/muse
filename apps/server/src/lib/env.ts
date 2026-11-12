const required = (name: string, fallback = "") => process.env[name] ?? fallback;

export const env = {
  port: Number(required("PORT", "3001")),
  webOrigins: required("WEB_ORIGIN", "http://localhost:3000,http://127.0.0.1:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),

  supabaseUrl: required("SUPABASE_URL"),
  supabaseServiceKey: required("SUPABASE_SERVICE_ROLE_KEY"),

  // memory: 进程内存，重启即清空；supabase: 连真实数据库
  projectsStore: (required("PROJECTS_STORE", "supabase") === "supabase" ? "supabase" : "memory") as
    | "supabase"
    | "memory",
};