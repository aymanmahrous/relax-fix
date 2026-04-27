// RELAX FIX SaaS - SELLING VERSION 🔥

const express = require("express");
const fetch = require("node-fetch");
const Stripe = require("stripe");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 10000;

// ===== ENV =====
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const BASE_URL = process.env.BASE_URL || "http://localhost:10000";

const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null;

// ===== HOME =====
app.get("/", (req, res) => {
  res.send(`
  <html>
  <head>
  <title>Relax Fix SaaS</title>
  <style>
    body{background:#0b0f1a;color:#fff;font-family:sans-serif;text-align:center;padding:20px}
    button{padding:15px 25px;margin:10px;border:none;border-radius:12px;font-size:18px;cursor:pointer}
    .b1{background:#00c6ff}
    .b2{background:#ffb347}
    .b3{background:#00ff9d}
    .card{background:#111a2e;margin:20px;padding:20px;border-radius:20px}
    input{padding:10px;width:80%;margin:5px;border-radius:8px;border:none}
    a{color:#00c6ff}
  </style>
  </head>
  <body>

  <h1>⚡ Relax Fix SaaS</h1>

  <button class="b1" onclick="location.href='/ai-ad'">AI Ads 🎨</button>
  <button class="b2" onclick="location.href='/video'">Video 🎬</button>
  <button class="b3" onclick="location.href='/checkout'">اشتراك الآن 💰</button>

  <div class="card">
    <h2>طلب خدمة</h2>
    <form action="/request" method="POST">
      <input name="name" placeholder="اسمك"><br>
      <input name="phone" placeholder="رقمك"><br>
      <input name="service" placeholder="نوع الخدمة"><br>
      <button>إرسال</button>
    </form>
  </div>

  <div class="card">
    <h2>Admin</h2>
    <a href="/admin">لوحة التحكم</a>
  </div>

  </body>
  </html>
  `);
});

// ===== REQUEST SAVE =====
app.post("/request", async (req, res) => {
  const { name, phone, service } = req.body;

  try {
    await fetch(SUPABASE_URL + "/rest/v1/requests", {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: "Bearer " + SUPABASE_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone, service }),
    });
  } catch (e) {
    console.log(e);
  }

  res.send("✅ تم إرسال الطلب");
});

// ===== ADMIN =====
app.get("/admin", async (req, res) => {
  const r = await fetch(SUPABASE_URL + "/rest/v1/requests", {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: "Bearer " + SUPABASE_KEY,
    },
  });

  const data = await r.json();

  let html = "<h1>لوحة الطلبات</h1>";
  data.forEach((x) => {
    html += `
    <div style="border:1px solid #ccc;padding:10px;margin:10px">
    👤 ${x.name}<br>
    📞 ${x.phone}<br>
    🔧 ${x.service}
    </div>`;
  });

  res.send(html);
});

// ===== STRIPE CHECKOUT =====
app.get("/checkout", async (req, res) => {
  if (!stripe) return res.send("Stripe not configured");

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
    success_url: BASE_URL + "/success",
    cancel_url: BASE_URL + "/",
  });

  res.redirect(session.url);
});

// ===== SUCCESS =====
app.get("/success", (req, res) => {
  res.send("<h1>🎉 تم الاشتراك بنجاح</h1>");
});

// ===== STRIPE WEBHOOK =====
app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  if (!stripe) return res.sendStatus(200);

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"],
      STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log("Webhook error:", err.message);
    return res.sendStatus(400);
  }

  if (event.type === "checkout.session.completed") {
    console.log("💰 New subscription");
  }

  res.sendStatus(200);
});

// ===== AI ADS =====
app.get("/ai-ad", (req, res) => {
  res.send(`
  <h1>AI Ads 🎨</h1>
  <form method="POST">
  <input name="idea" placeholder="فكرة الإعلان">
  <button>Generate</button>
  </form>
  `);
});

app.post("/ai-ad", (req, res) => {
  const { idea } = req.body;
  res.send(`<pre>🔥 إعلان:\n${idea}\nRelax Fix</pre>`);
});

// ===== VIDEO =====
app.get("/video", (req, res) => {
  res.send(`
  <h1>Video 🎬</h1>
  <form method="POST">
  <input name="idea" placeholder="فكرة الفيديو">
  <button>Generate</button>
  </form>
  `);
});

app.post("/video", (req, res) => {
  const { idea } = req.body;
  res.send(`<pre>🎬 Script:\n${idea}\nCTA: احجز الآن</pre>`);
});

// ===== START =====
app.listen(PORT, () => {
  console.log("🔥 Running on " + PORT);
});