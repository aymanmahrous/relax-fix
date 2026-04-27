const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ====== SAFE ENV ======
const SUPABASE_URL = process.env.SUPABASE_URL || null;
const SUPABASE_KEY = process.env.SUPABASE_KEY || null;

let supabase = null;

if (SUPABASE_URL && SUPABASE_KEY) {
  const { createClient } = require("@supabase/supabase-js");
  supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  console.log("✅ Supabase connected");
} else {
  console.log("⚠️ Running WITHOUT Supabase");
}

// ====== HOME PAGE ======
app.get("/", (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="ar">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Relax Fix SaaS</title>
    <style>
      body {
        margin:0;
        font-family:Arial;
        background:#0b1220;
        color:#fff;
        text-align:center;
      }
      .btn {
        padding:12px 20px;
        margin:10px;
        border-radius:10px;
        border:none;
        font-size:16px;
        cursor:pointer;
      }
      .home {background:#00c6ff;}
      .start {background:#f9a825;}
      .login {background:#00e676;}
      .box {
        background:#111b2e;
        margin:20px;
        padding:20px;
        border-radius:15px;
      }
      input {
        width:80%;
        padding:10px;
        border-radius:10px;
        border:none;
        margin:10px;
      }
    </style>
  </head>

  <body>

    <h1>⚡ Relax Fix SaaS</h1>

    <button class="btn home">Home</button>
    <button class="btn start">Start Trial</button>
    <button class="btn login">Login</button>

    <div class="box">
      <h2>📊 Dashboard</h2>
      <p>إدارة الطلبات والعملاء</p>
    </div>

    <div class="box">
      <h2>🎨 AI Generator</h2>
      <input id="prompt" placeholder="مثال: صيانة تكييف"/>
      <br/>
      <button class="btn start" onclick="generate()">Generate</button>
      <p id="result"></p>
    </div>

    <div class="box">
      <h2>📩 إرسال طلب خدمة</h2>
      <input id="name" placeholder="الاسم"/>
      <input id="phone" placeholder="رقم الهاتف"/>
      <input id="service" placeholder="الخدمة"/>
      <br/>
      <button class="btn login" onclick="send()">إرسال</button>
      <p id="msg"></p>
    </div>

    <script>
      async function send(){
        let res = await fetch('/api/request',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            name:document.getElementById('name').value,
            phone:document.getElementById('phone').value,
            service:document.getElementById('service').value
          })
        });

        let data = await res.json();
        document.getElementById('msg').innerText = data.message;
      }

      function generate(){
        let text = document.getElementById('prompt').value;
        document.getElementById('result').innerText =
          "🔥 إعلان جاهز: " + text + " - أفضل خدمة في الإمارات!";
      }
    </script>

  </body>
  </html>
  `);
});

// ====== API ======
app.post("/api/request", async (req, res) => {
  const { name, phone, service } = req.body;

  if (!name || !phone) {
    return res.json({ message: "❌ بيانات ناقصة" });
  }

  if (!supabase) {
    return res.json({
      message: "⚠️ تم الاستلام (بدون قاعدة بيانات حالياً)"
    });
  }

  try {
    await supabase.from("requests").insert([
      { name, phone, service }
    ]);

    res.json({ message: "✅ تم إرسال الطلب بنجاح" });

  } catch (err) {
    res.json({ message: "❌ خطأ في التخزين" });
  }
});

// ====== PORT FIX ======
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Server running on port " + PORT);
});