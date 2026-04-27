// ===== Relax Fix SaaS FULL VERSION (Stable Render Build) =====

const http = require("http");

// ENV (اختياري Supabase)
const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || "";

const PORT = process.env.PORT || 10000;

// ===== HTML UI =====
const html = `
<!DOCTYPE html>
<html lang="ar">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Relax Fix Global SaaS</title>

<style>
body{
  margin:0;
  font-family:sans-serif;
  background:#0b0f2a;
  color:white;
  text-align:center;
}
h1{margin-top:30px}
.container{padding:20px}

button{
  padding:12px 20px;
  margin:10px;
  border:none;
  border-radius:12px;
  cursor:pointer;
  font-size:16px;
}

.primary{background:#ff9800;color:black}
.secondary{background:#00c2ff;color:white}
.green{background:#00d084}

input{
  padding:10px;
  margin:5px;
  border-radius:10px;
  border:none;
  width:200px;
}

.card{
  background:#11183a;
  margin:20px;
  padding:20px;
  border-radius:20px;
}
</style>
</head>

<body>

<h1>🚀 Relax Fix SaaS</h1>

<div class="container">

<div class="card">
<h2>🔐 تسجيل / دخول</h2>
<input id="email" placeholder="Email">
<input id="pass" placeholder="Password"><br>
<button class="primary" onclick="register()">Register</button>
<button class="secondary" onclick="login()">Login</button>
</div>

<div class="card">
<h2>🎨 AI Ads</h2>
<input id="ad" placeholder="اكتب اعلان">
<button class="primary" onclick="aiAd()">Generate</button>
<p id="adResult"></p>
</div>

<div class="card">
<h2>🎬 Video Generator</h2>
<input id="video" placeholder="وصف الفيديو">
<button class="secondary" onclick="video()">Generate</button>
<p id="videoResult"></p>
</div>

<div class="card">
<h2>📩 طلب خدمة</h2>
<input id="name" placeholder="اسمك">
<input id="phone" placeholder="رقمك">
<input id="service" placeholder="نوع الخدمة"><br>
<button class="green" onclick="send()">Send Request</button>
</div>

<div class="card">
<h2>💰 الاشتراكات</h2>
<button class="primary">Starter</button>
<button class="secondary">Pro</button>
<button class="green">Business</button>
</div>

</div>

<script>

async function register(){
 alert("تم التسجيل (نسخة تجريبية)");
}

async function login(){
 alert("تم تسجيل الدخول");
}

async function aiAd(){
 const text = document.getElementById("ad").value;
 document.getElementById("adResult").innerText =
 "🔥 اعلان احترافي:\\n" + text + "\\n📞 احجز الآن";
}

async function video(){
 const text = document.getElementById("video").value;
 document.getElementById("videoResult").innerText =
 "🎬 سكريبت فيديو:\\n" + text + "\\n🚀 Relax Fix";
}

async function send(){
 alert("تم ارسال الطلب بنجاح");
}

</script>

</body>
</html>
`;

// ===== SERVER =====
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
});

server.listen(PORT, () => {
  console.log("🚀 Relax Fix SaaS Running on port " + PORT);
});