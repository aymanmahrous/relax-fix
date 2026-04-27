const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 10000;

// ENV
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// ======= UI =======
app.get("/", (req, res) => {
  res.send(`
  <html>
  <head>
  <title>Relax Fix Global SaaS</title>
  <style>
    body{font-family:sans-serif;background:#0b0f2a;color:white;text-align:center;padding:20px}
    button{padding:10px 20px;margin:10px;border:none;border-radius:10px;cursor:pointer}
    .btn{background:orange}
    input{padding:10px;border-radius:10px;border:none;margin:5px}
  </style>
  </head>
  <body>

  <h1>🚀 Relax Fix SaaS</h1>

  <h2>تسجيل / Login</h2>
  <input id="email" placeholder="Email">
  <input id="pass" placeholder="Password">
  <br>
  <button class="btn" onclick="register()">Register</button>
  <button onclick="login()">Login</button>

  <h2>🎨 AI Ads</h2>
  <input id="ad" placeholder="اكتب اعلان">
  <button onclick="generateAd()">Generate</button>
  <p id="adResult"></p>

  <h2>🎬 Video Script</h2>
  <input id="video" placeholder="وصف الفيديو">
  <button onclick="video()">Generate</button>
  <p id="videoResult"></p>

  <h2>📩 طلب خدمة</h2>
  <input id="name" placeholder="اسمك">
  <input id="phone" placeholder="رقمك">
  <input id="service" placeholder="نوع الخدمة">
  <button onclick="send()">Send</button>

  <script>
    async function register(){
      const r = await fetch("/register",{method:"POST",headers:{'Content-Type':'application/json'},
      body:JSON.stringify({email:email.value,password:pass.value})})
      alert(await r.text())
    }

    async function login(){
      const r = await fetch("/login",{method:"POST",headers:{'Content-Type':'application/json'},
      body:JSON.stringify({email:email.value,password:pass.value})})
      alert(await r.text())
    }

    async function generateAd(){
      const r = await fetch("/ai-ad",{method:"POST",headers:{'Content-Type':'application/json'},
      body:JSON.stringify({text:ad.value})})
      document.getElementById("adResult").innerText = await r.text()
    }

    async function video(){
      const r = await fetch("/video",{method:"POST",headers:{'Content-Type':'application/json'},
      body:JSON.stringify({text:video.value})})
      document.getElementById("videoResult").innerText = await r.text()
    }

    async function send(){
      const r = await fetch("/request",{method:"POST",headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        name:name.value,
        phone:phone.value,
        service:service.value
      })})
      alert("تم ارسال الطلب")
    }
  </script>

  </body>
  </html>
  `);
});

// ======= AUTH =======
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) return res.send(error.message);
  res.send("تم التسجيل");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return res.send(error.message);
  res.send("تم تسجيل الدخول");
});

// ======= REQUESTS =======
app.post("/request", async (req, res) => {
  const { name, phone, service } = req.body;

  await supabase.from("requests").insert([
    { name, phone, service }
  ]);

  res.send("ok");
});

// ======= AI ADS =======
app.post("/ai-ad", (req, res) => {
  const text = req.body.text;

  res.send(`
🔥 إعلان احترافي:
"${text}"

✨ عرض خاص اليوم!
📞 احجز الآن
🚀 Relax Fix
`);
});

// ======= VIDEO =======
app.post("/video", (req, res) => {
  const text = req.body.text;

  res.send(`
🎬 سكريبت فيديو:

مشهد 1: مشكلة
${text}

مشهد 2: الحل
Relax Fix

مشهد 3: CTA
اتصل الآن
`);
});

// ======= SERVER =======
app.listen(PORT, () => {
  console.log("🔥 SaaS Running on " + PORT);
});