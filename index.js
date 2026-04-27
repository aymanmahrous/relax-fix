const http = require("http");
const { createClient } = require("@supabase/supabase-js");

// ✅ مهم: خليه كده (مش تحط key هنا تاني)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  try {
    // الصفحة الرئيسية
    if (req.method === "GET") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`
        <h1>🚀 Relax Fix SaaS شغال</h1>
        <p>Backend + Database Connected ✅</p>
      `);
      return;
    }

    // إرسال طلب
    if (req.method === "POST") {
      let body = "";
      req.on("data", c => body += c.toString());

      req.on("end", async () => {
        const data = JSON.parse(body || "{}");

        const { error } = await supabase.from("requests").insert([
          {
            name: data.name,
            phone: data.phone,
            service: data.service
          }
        ]);

        if (error) {
          res.end("Error: " + error.message);
          return;
        }

        res.end("Saved ✅");
      });

      return;
    }

  } catch (e) {
    res.end("Server Error: " + e.message);
  }
});

server.listen(PORT, () => {
  console.log("🚀 Running on port " + PORT);
});