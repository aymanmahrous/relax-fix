const http = require("http");
const { createClient } = require("@supabase/supabase-js");

// ✅ خليه ENV مش ثابت
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// ✅ أهم سطر في حياتك 😄
const PORT = process.env.PORT || 10000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`
    <h1>🚀 Relax Fix SaaS شغال 100%</h1>
    <p>Server Running on PORT ${PORT}</p>
  `);
});

// ✅ لازم يسمع على 0.0.0.0
server.listen(PORT, "0.0.0.0", () => {
  console.log("🔥 Server running on port " + PORT);
});