// RELAX FIX GLOBAL SaaS - ONE FILE 🔥

const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 10000;

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

// ===== HOME UI =====
app.get("/", (req, res) => {
  res.send(`
  <html>
  <head>
  <title>Relax Fix SaaS</title>
  <style>
    body {
      background:#0b0f1a;
      color:white;
      font-family:sans-serif;
      text-align:center;
      padding:20px;
    }
    button {
      padding:15px 25px;
      margin:10px;
      border:none;
      border-radius:10px;
      cursor:pointer;
      font-size:18px;
    }
    .btn1{background:#00c6ff}
    .btn2{background:#ffb347}
    .card{
      background:#111a2e;
      margin:20px;
      padding:20px;
      border-radius:20px;
    }
  </style>
  </head>

  <body>

  <h1>⚡ Relax Fix Global SaaS</h1>

  <button class="btn1" onclick="location.href='/ai-ad'">AI Ads 🎨</button>
  <button class="btn2" onclick="location.href='/video'">Video 🎬</button>

  <div class="card">
    <h2>طلب خدمة صيانة</h2>
    <form action="/request" method="POST">
      <input name="name" placeholder="اسمك"><br><br>
      <input name="phone" placeholder="رقمك"><br><br>
      <input name="service" placeholder="نوع الخدمة"><br><br>
      <button>إرسال</button>
    </form>
  </div>

  <div class="card">
    <h2>لوحة الإدارة</h2>
    <a href="/admin">دخول الأدمن</a>
  </div>

  </body>
  </html>
  `);
});

// ===== SAVE REQUEST =====
app.post("/request", async (req, res) => {
  const { name, phone, service } = req.body;

  await fetch(SUPABASE_URL + "/rest/v1/requests", {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: "Bearer " + SUPABASE_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, phone, service }),
  });

  res.send("✅ تم إرسال الطلب");
});

// ===== ADMIN =====
app.get("/admin", async (req, res) => {
  const data = await fetch(SUPABASE_URL + "/rest/v1/requests", {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: "Bearer " + SUPABASE_KEY,
    },
  });

  const json = await data.json();

  let html = "<h1>لوحة الطلبات</h1>";

  json.forEach((r) => {
    html += `
      <div style="border:1px solid #ccc;padding:10px;margin:10px">
      👤 ${r.name}<br>
      📞 ${r.phone}<br>
      🔧 ${r.service}
      </div>
    `;
  });

  res.send(html);
});

// ===== AI ADS =====
app.get("/ai-ad", (req, res) => {
  res.send(`
    <h1>AI Ads Generator 🎨</h1>
    <form method="POST">
      <input name="idea" placeholder="اكتب فكرة الإعلان">
      <button>Generate</button>
    </form>
  `);
});

app.post("/ai-ad", (req, res) => {
  const { idea } = req.body;

  const result = `
🔥 إعلان احترافي:

${idea}

📞 احجز الآن مع Relax Fix
أفضل جودة + أسرع خدمة
`;

  res.send("<pre>" + result + "</pre>");
});

// ===== VIDEO =====
app.get("/video", (req, res) => {
  res.send(`
    <h1>Video Generator 🎬</h1>
    <form method="POST">
      <input name="idea" placeholder="فكرة الفيديو">
      <button>Generate</button>
    </form>
  `);
});

app.post("/video", (req, res) => {
  const { idea } = req.body;

  const script = `
🎬 Script:

Scene 1: ${idea}
Scene 2: عرض الخدمة
Scene 3: Call To Action

Relax Fix - احجز الآن
`;

  res.send("<pre>" + script + "</pre>");
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log("🔥 Relax Fix SaaS running on port " + PORT);
}); 