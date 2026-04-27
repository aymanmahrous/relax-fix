const http = require("http");

const PORT = process.env.PORT || 10000;
const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || "";
const PHONE = process.env.PHONE || "971588259848";

const memoryRequests = [];

function html(res, body) {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(body);
}

function json(res, data) {
  res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise(resolve => {
    let body = "";
    req.on("data", c => body += c.toString());
    req.on("end", () => resolve(body));
  });
}

async function saveRequest(data) {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    memoryRequests.unshift({ ...data, created_at: new Date().toISOString() });
    return { ok: true, mode: "memory" };
  }

  const r = await fetch(`${SUPABASE_URL}/rest/v1/requests`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    },
    body: JSON.stringify(data)
  });

  if (!r.ok) {
    memoryRequests.unshift({ ...data, created_at: new Date().toISOString() });
    return { ok: true, mode: "memory-fallback" };
  }

  return { ok: true, mode: "supabase" };
}

async function getRequests() {
  if (!SUPABASE_URL || !SUPABASE_KEY) return memoryRequests;

  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/requests?select=*&order=created_at.desc`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    });

    if (!r.ok) return memoryRequests;
    return await r.json();
  } catch {
    return memoryRequests;
  }
}

function aiAd(service) {
  const s = service || "خدمة صيانة";
  return `🔥 إعلان جاهز:

هل تحتاج ${s} بسرعة واحترافية؟

Relax Fix يوفر لك خدمة موثوقة داخل الإمارات:
✅ استجابة سريعة
✅ أسعار واضحة
✅ متابعة عبر واتساب
✅ فريق محترف

📲 احجز الآن:
https://wa.me/${PHONE}

#RelaxFix #صيانة #الإمارات #خدمات_منزلية`;
}

function videoScript(service) {
  const s = service || "خدمة صيانة";
  return `🎬 سكريبت فيديو قصير:

المشهد 1:
عميل يعاني من مشكلة في ${s}

المشهد 2:
ظهور Relax Fix كحل سريع وذكي

المشهد 3:
قبل وبعد الخدمة

المشهد 4:
رسالة قوية:
"لا تضيع وقتك — احجز الآن"

CTA:
📲 تواصل واتساب الآن`;
}

function page() {
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Relax Fix Global SaaS</title>
<style>
*{box-sizing:border-box}
body{margin:0;font-family:Arial,Tahoma,sans-serif;background:#050814;color:#fff}
body:before{content:"";position:fixed;inset:0;z-index:-1;background:
radial-gradient(circle at 20% 20%,rgba(34,197,94,.22),transparent 35%),
radial-gradient(circle at 80% 10%,rgba(14,165,233,.24),transparent 35%),
linear-gradient(135deg,#050814,#020617)}
.wrap{width:min(1100px,92%);margin:auto}
nav{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;padding:18px 0}
.logo{font-size:28px;font-weight:900}
.btn,button{border:0;border-radius:18px;padding:14px 22px;margin:6px;font-size:16px;font-weight:900;cursor:pointer;color:#fff;background:linear-gradient(135deg,#22c55e,#0ea5e9)}
.gold{background:linear-gradient(135deg,#facc15,#fb923c);color:#111}
.red{background:#ef4444}
.hero{text-align:center;padding:55px 0}
h1{font-size:clamp(42px,8vw,82px);margin:0 0 18px;background:linear-gradient(90deg,#22c55e,#0ea5e9,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
p{color:#cbd5e1;line-height:1.8;font-size:18px}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.card{background:rgba(15,23,42,.86);border:1px solid rgba(255,255,255,.14);border-radius:26px;padding:24px;margin:18px 0;box-shadow:0 20px 60px rgba(0,0,0,.35)}
input,textarea,select{width:100%;padding:15px;margin:8px 0;border:0;border-radius:14px;font-size:16px}
textarea{min-height:100px}
.result{white-space:pre-wrap;text-align:right;background:#020617;border-radius:18px;padding:18px;margin-top:15px;color:#e2e8f0}
table{width:100%;border-collapse:collapse;margin-top:15px}
td,th{border:1px solid #263244;padding:10px;text-align:right}
.small{font-size:14px;color:#94a3b8}
@media(max-width:850px){.grid{grid-template-columns:1fr}nav,.hero{text-align:center}.logo{width:100%}}
</style>
</head>
<body>
<div class="wrap">
<nav>
  <div class="logo">⚡ Relax Fix Global SaaS</div>
  <div>
    <a class="btn" href="/">Home</a>
    <a class="btn gold" href="/admin">Dashboard</a>
    <a class="btn" href="https://wa.me/${PHONE}" target="_blank">WhatsApp</a>
  </div>
</nav>

<section class="hero">
  <h1>منصة صيانة ودعاية ذكية</h1>
  <p>طلبات العملاء + توليد إعلانات + سكريبت فيديو + لوحة تحكم — نسخة ثابتة جاهزة للتجربة.</p>
  <a class="btn gold" href="#request">ابدأ تجربة مجانية</a>
</section>

<section class="grid">
  <div class="card"><h2>📊 Dashboard</h2><p>إدارة الطلبات والعملاء بشكل واضح.</p></div>
  <div class="card"><h2>🎨 AI Ads</h2><p>توليد إعلان تسويقي جاهز للنشر.</p></div>
  <div class="card"><h2>🎬 Video Generator</h2><p>سكريبت فيديو دعائي سريع.</p></div>
</section>

<section class="card">
  <h2>🎨 جرّب إعلان AI</h2>
  <input id="adService" placeholder="مثال: صيانة تكييف / دهان / تنظيف خزانات">
  <button onclick="makeAd()">Generate Ad</button>
  <div id="adResult" class="result"></div>
</section>

<section class="card">
  <h2>🎬 جرّب سكريبت فيديو</h2>
  <input id="videoService" placeholder="مثال: شركة صيانة في أبوظبي">
  <button onclick="makeVideo()">Generate Video Script</button>
  <div id="videoResult" class="result"></div>
</section>

<section class="card" id="request">
  <h2>📩 إرسال طلب خدمة</h2>
  <input id="name" placeholder="الاسم">
  <input id="phone" placeholder="رقم الهاتف">
  <select id="service">
    <option>صيانة تكييف</option>
    <option>دهان</option>
    <option>كهرباء</option>
    <option>سباكة</option>
    <option>سيراميك</option>
    <option>جبسون بورد</option>
    <option>عزل أسطح</option>
    <option>تنظيف خزانات</option>
    <option>مكافحة حشرات</option>
  </select>
  <textarea id="notes" placeholder="اكتب التفاصيل أو المنطقة"></textarea>
  <button onclick="sendRequest()">إرسال الطلب</button>
  <p id="msg"></p>
</section>

<p class="small">Status: يعمل حتى لو قاعدة البيانات غير متصلة. عند ربط Supabase سيتم التخزين تلقائيًا.</p>
</div>

<script>
function makeAd(){
  const s=document.getElementById("adService").value;
  fetch("/api/ad",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({service:s})})
  .then(r=>r.json()).then(d=>document.getElementById("adResult").innerText=d.text);
}
function makeVideo(){
  const s=document.getElementById("videoService").value;
  fetch("/api/video",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({service:s})})
  .then(r=>r.json()).then(d=>document.getElementById("videoResult").innerText=d.text);
}
function sendRequest(){
  const data={
    name:document.getElementById("name").value,
    phone:document.getElementById("phone").value,
    service:document.getElementById("service").value,
    notes:document.getElementById("notes").value
  };
  fetch("/api/request",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)})
  .then(r=>r.json()).then(d=>{
    document.getElementById("msg").innerText=d.message;
    if(d.whatsapp) window.open(d.whatsapp,"_blank");
  });
}
</script>
</body>
</html>`;
}

async function adminPage() {
  const requests = await getRequests();
  const rows = requests.map(r => `
<tr>
<td>${r.name || ""}</td>
<td>${r.phone || ""}</td>
<td>${r.service || ""}</td>
<td>${r.notes || ""}</td>
<td><a class="btn" href="https://wa.me/${String(r.phone||"").replace(/[^0-9]/g,"")}" target="_blank">WhatsApp</a></td>
</tr>`).join("");

  return `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Admin</title>
<style>body{font-family:Arial;background:#050814;color:white;padding:20px}.card{background:#0f172a;padding:20px;border-radius:20px}table{width:100%;border-collapse:collapse}td,th{border:1px solid #263244;padding:10px}a{color:white}.btn{background:#22c55e;padding:8px 12px;border-radius:10px;text-decoration:none}</style></head>
<body><h1>📊 Relax Fix Admin</h1><div class="card"><table><tr><th>الاسم</th><th>الهاتف</th><th>الخدمة</th><th>التفاصيل</th><th>تواصل</th></tr>${rows || "<tr><td colspan='5'>لا توجد طلبات بعد</td></tr>"}</table></div><p><a class="btn" href="/">رجوع</a></p></body></html>`;
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://localhost");

    if (req.method === "GET" && url.pathname === "/") return html(res, page());
    if (req.method === "GET" && url.pathname === "/admin") return html(res, await adminPage());

    if (req.method === "POST" && url.pathname === "/api/ad") {
      const data = JSON.parse(await readBody(req) || "{}");
      return json(res, { text: aiAd(data.service) });
    }

    if (req.method === "POST" && url.pathname === "/api/video") {
      const data = JSON.parse(await readBody(req) || "{}");
      return json(res, { text: videoScript(data.service) });
    }

    if (req.method === "POST" && url.pathname === "/api/request") {
      const data = JSON.parse(await readBody(req) || "{}");
      if (!data.name || !data.phone) return json(res, { message: "❌ اكتب الاسم ورقم الهاتف" });

      await saveRequest(data);

      const waText = encodeURIComponent(
        `طلب جديد من Relax Fix\nالاسم: ${data.name}\nالهاتف: ${data.phone}\nالخدمة: ${data.service}\nالتفاصيل: ${data.notes || ""}`
      );

      return json(res, {
        message: "✅ تم إرسال الطلب بنجاح",
        whatsapp: `https://wa.me/${PHONE}?text=${waText}`
      });
    }

    html(res, page());
  } catch (e) {
    html(res, `<h1>Relax Fix</h1><p>حدث خطأ بسيط، لكن السيرفر يعمل.</p><pre>${e.message}</pre><a href="/">رجوع</a>`);
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("Relax Fix Global SaaS running on port " + PORT);
});