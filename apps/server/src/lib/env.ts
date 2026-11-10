const required = (name: string, fallback = "") => process.env[name] ?? fallback;

export const env = {
  port: Number(required("PORT", "3001")),
  webOrigin: required("WEB_ORIGIN", "http://localhost:3000"),

  supabaseUrl: required("SUPABASE_URL"),
  supabaseServiceKey: required("SUPABASE_SERVICE_ROLE_KEY"),

  // memory: 进程内存，重启即清空；supabase: 连真实数据库
  projectsStore: (required("PROJECTS_STORE", "memory") === "supabase" ? "supabase" : "memory") as
    | "supabase"
    | "memory",

  // 登录接入前的占位用户；接入 Supabase Auth 后由 token 里的 sub 取代
  devUserId: required("DEV_USER_ID", "00000000-0000-0000-0000-000000000001"),
};
