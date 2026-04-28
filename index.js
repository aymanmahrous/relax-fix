const http = require("http");

const PORT = process.env.PORT || 10000;
const PHONE = process.env.PHONE || "971588259848";
const ADMIN_PASS = process.env.ADMIN_PASS || "123456";

// اختياري للإشعارات
const TG_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TG_CHAT = process.env.TELEGRAM_CHAT_ID || "";

// تخزين مؤقت داخل السيرفر
let requests = [];
let chats = [];
let settings = {
  title: "منصة صيانة ودعاية ذكية",
  subtitle: "طلبات العملاء + حاسبة سعر + AI يرد على العملاء + Dashboard + Radar",
  music: "",
  bg: ""
};

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
    let b = "";
    req.on("data", c => b += c.toString());
    req.on("end", () => resolve(b));
  });
}

function esc(v) {
  return String(v || "").replace(/[&<>"']/g, m => ({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;",
    "'":"&#039;"
  }[m]));
}

function calcPrice(service, area) {
  const a = Number(area || 0);

  const prices = {
    "صيانة تكييف": { fixed:150, per:0 },
    "تنظيف مكيفات": { fixed:120, per:0 },
    "دهان": { fixed:0, per:12 },
    "كهرباء": { fixed:120, per:20 },
    "سباكة": { fixed:100, per:15 },
    "سيراميك": { fixed:0, per:85 },
    "جبسون بورد": { fixed:0, per:95 },
    "عزل أسطح": { fixed:0, per:55 },
    "تنظيف خزانات": { fixed:220, per:0 },
    "مكافحة حشرات": { fixed:180, per:0 },
    "صيانة مباني": { fixed:350, per:25 },
    "رخام": { fixed:0, per:140 },
    "نجارة": { fixed:180, per:20 },
    "ألمنيوم": { fixed:250, per:30 }
  };

  const r = prices[service] || { fixed:100, per:10 };
  if (r.per && a) return Math.round(a * r.per);
  return r.fixed || Math.round((a || 10) * r.per);
}

function aiReply(q) {
  q = String(q || "").toLowerCase();

  if (q.includes("مكيف") || q.includes("تكييف") || q.includes("ac")) {
    return `📌 تشخيص مبدئي للمكيف:
- هل التبريد ضعيف أم متوقف؟
- هل يوجد صوت أو تسريب ماء؟
- متى آخر تنظيف فلتر؟
غالبًا المشكلة: فلتر، نقص غاز، أو انسداد صرف.
📲 أرسل الموقع ونرتب فحص سريع.`;
  }

  if (q.includes("دهان") || q.includes("صبغ")) {
    return `🎨 بخصوص الدهان:
- كم المساحة؟
- هل يوجد تقشير أو رطوبة؟
- هل تريد دهان اقتصادي أم فاخر؟
السعر تقديري حسب المساحة وحالة الجدران.`;
  }

  if (q.includes("سيراميك") || q.includes("بلاط")) {
    return `🧱 بخصوص السيراميك:
- كم المساحة؟
- هل يوجد تكسير قديم؟
- هل المواد عليك أم علينا؟
السعر يعتمد على نوع السيراميك وحالة الأرضية.`;
  }

  if (q.includes("جبسون")) {
    return `🪟 بخصوص الجبسون بورد:
- سقف أم جدار؟
- هل تريد إضاءة مخفية؟
- كم المساحة؟
نقدر نجهز لك تقدير سريع بعد التفاصيل.`;
  }

  if (q.includes("عزل") || q.includes("تسريب")) {
    return `💧 بخصوص العزل أو التسريب:
- التسريب من السطح أم الحمام أم الخزان؟
- هل توجد صور؟
- كم المساحة؟
يفضل فحص الموقع لتحديد السبب بدقة.`;
  }

  if (q.includes("سعر") || q.includes("تكلفة") || q.includes("كم")) {
    return `💰 يمكنك استخدام حاسبة السعر في الصفحة.
اختر الخدمة واكتب المساحة، وسيظهر سعر تقديري.
السعر النهائي بعد المعاينة.`;
  }

  return `أقدر أساعدك.
اكتب نوع الخدمة + المدينة + المشكلة + المساحة إن وجدت.
بعدها نعطيك تقدير ونفتح طلب متابعة.`;
}

function aiAd(service) {
  return `🔥 إعلان جاهز للنشر

هل تحتاج ${service || "خدمة صيانة"} بسرعة واحترافية؟

Relax Fix توفر لك:
✅ استجابة سريعة
✅ أسعار واضحة
✅ فنيين موثوقين
✅ متابعة عبر واتساب

📲 احجز الآن:
https://wa.me/${PHONE}

#RelaxFix #صيانة #الإمارات #خدمات_منزلية`;
}

function aiVideo(service) {
  return `🎬 سكريبت فيديو 15 ثانية

المشهد 1:
عميل يعاني من مشكلة في ${service || "الخدمة"}

المشهد 2:
ظهور Relax Fix كحل سريع

المشهد 3:
قبل وبعد الخدمة

المشهد 4:
"خدمة أسرع. سعر أوضح. راحة أكثر."

المشهد 5:
📲 احجز الآن عبر واتساب`;
}

async function notify(text) {
  if (!TG_TOKEN || !TG_CHAT) return;

  try {
    await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({
        chat_id: TG_CHAT,
        text
      })
    });
  } catch(e) {}
}

function servicesOptions() {
  const services = [
    "صيانة تكييف",
    "تنظيف مكيفات",
    "دهان",
    "كهرباء",
    "سباكة",
    "سيراميك",
    "جبسون بورد",
    "عزل أسطح",
    "تنظيف خزانات",
    "مكافحة حشرات",
    "صيانة مباني",
    "رخام",
    "نجارة",
    "ألمنيوم"
  ];

  return services.map(s => `<option>${s}</option>`).join("");
}

function page() {
  return `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Relax Fix Pro</title>

<style>
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{
  margin:0;
  font-family:Arial,Tahoma,sans-serif;
  background:#050814;
  color:white;
}
body:before{
  content:"";
  position:fixed;
  inset:0;
  z-index:-1;
  background:
  radial-gradient(circle at 20% 20%,rgba(34,197,94,.22),transparent 35%),
  radial-gradient(circle at 80% 10%,rgba(14,165,233,.25),transparent 35%),
  radial-gradient(circle at 50% 90%,rgba(139,92,246,.18),transparent 38%),
  linear-gradient(135deg,#050814,#020617);
}
.wrap{width:min(1180px,92%);margin:auto}
nav{
  display:flex;
  justify-content:space-between;
  align-items:center;
  flex-wrap:wrap;
  gap:12px;
  padding:18px 0;
}
.logo{font-size:28px;font-weight:900}
a{text-decoration:none;color:inherit}
.btn,button{
  border:0;
  border-radius:18px;
  padding:14px 22px;
  margin:6px;
  font-size:16px;
  font-weight:900;
  cursor:pointer;
  color:white;
  background:linear-gradient(135deg,#22c55e,#0ea5e9);
}
.gold{background:linear-gradient(135deg,#facc15,#fb923c);color:#111}
.red{background:#ef4444}
.hero{text-align:center;padding:55px 0}
h1{
  font-size:clamp(42px,8vw,82px);
  margin:0 0 18px;
  background:linear-gradient(90deg,#22c55e,#0ea5e9,#8b5cf6);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}
p{color:#cbd5e1;line-height:1.8;font-size:18px}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.card{
  background:rgba(15,23,42,.86);
  border:1px solid rgba(255,255,255,.14);
  border-radius:26px;
  padding:24px;
  margin:18px 0;
  box-shadow:0 20px 60px rgba(0,0,0,.35);
}
input,textarea,select{
  width:100%;
  padding:15px;
  margin:8px 0;
  border:0;
  border-radius:14px;
  font-size:16px;
}
textarea{min-height:105px}
.result{
  white-space:pre-wrap;
  text-align:right;
  background:#020617;
  border-radius:18px;
  padding:18px;
  margin-top:15px;
  color:#e2e8f0;
}
.small{font-size:14px;color:#94a3b8}
.float{
  position:fixed;
  right:18px;
  bottom:18px;
  z-index:20;
}
@media(max-width:850px){
  .grid{grid-template-columns:1fr}
  nav,.hero{text-align:center}
  .logo{width:100%}
}
</style>
</head>

<body>

<div class="wrap">

<nav>
  <div class="logo">⚡ Relax Fix Pro</div>
  <div>
    <a class="btn" href="/">Home</a>
    <a class="btn gold" href="/admin">Admin</a>
    <a class="btn" href="#ai">AI Assistant</a>
    <a class="btn" target="_blank" href="https://wa.me/${PHONE}">WhatsApp</a>
  </div>
</nav>

<section class="hero">
  <h1>${esc(settings.title)}</h1>
  <p>${esc(settings.subtitle)}</p>
  <a class="btn gold" href="#request">ابدأ تجربة مجانية</a>
</section>

<section class="grid">
  <div class="card">
    <h2>🎁 Coins</h2>
    <p>نظام مكافآت للتجربة والمشاركة والخصومات.</p>
  </div>
  <div class="card">
    <h2>📡 Radar</h2>
    <p>كل طلب يظهر فورًا في لوحة الأدمن.</p>
  </div>
  <div class="card">
    <h2>🤖 AI Assistant</h2>
    <p>يرد على أعطال العملاء ويقترح أسئلة تشخيصية.</p>
  </div>
</section>

<section class="card">
  <h2>💰 حاسبة السعر</h2>
  <select id="svc">${servicesOptions()}</select>
  <input id="area" placeholder="المساحة أو العدد">
  <button onclick="calc()">احسب السعر</button>
  <p id="price"></p>
</section>

<section class="card">
  <h2>🎨 AI Ads</h2>
  <input id="adService" placeholder="مثال: دهان شقة في أبوظبي">
  <button onclick="makeAd()">Generate Ad</button>
  <div id="adResult" class="result"></div>
</section>

<section class="card">
  <h2>🎬 Video Generator</h2>
  <input id="videoService" placeholder="مثال: فيديو لصيانة تكييف">
  <button onclick="makeVideo()">Generate Script</button>
  <div id="videoResult" class="result"></div>
</section>

<section class="card" id="ai">
  <h2>🤖 AI Assistant للزبائن</h2>
  <textarea id="question" placeholder="اكتب سؤال العميل أو العطل"></textarea>
  <button onclick="askAI()">اسأل الذكاء الاصطناعي</button>
  <button class="gold" onclick="copyAI()">نسخ الرد</button>
  <div id="aiResult" class="result"></div>
</section>

<section class="card" id="request">
  <h2>📩 إرسال طلب خدمة</h2>
  <input id="name" placeholder="الاسم">
  <input id="phone" placeholder="الهاتف">
  <input id="city" placeholder="المدينة">
  <select id="service">${servicesOptions()}</select>
  <input id="area2" placeholder="المساحة / العدد اختياري">
  <textarea id="notes" placeholder="تفاصيل المشكلة"></textarea>
  <button class="gold" onclick="sendRequest()">إرسال + فتح واتساب</button>
  <p id="msg"></p>
</section>

<p class="small">
✅ جميع الأزرار الأساسية تعمل: Calculator / AI Ads / Video / AI Assistant / Request / Admin
</p>

</div>

<a class="btn float" target="_blank" href="https://wa.me/${PHONE}">💬</a>

<script>
function calc(){
  fetch("/api/calc",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({service:svc.value,area:area.value})
  })
  .then(r=>r.json())
  .then(d=>price.innerText="السعر التقريبي: "+d.price+" درهم");
}

function makeAd(){
  fetch("/api/ad",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({service:adService.value})
  })
  .then(r=>r.json())
  .then(d=>adResult.innerText=d.text);
}

function makeVideo(){
  fetch("/api/video",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({service:videoService.value})
  })
  .then(r=>r.json())
  .then(d=>videoResult.innerText=d.text);
}

function askAI(){
  aiResult.innerText="جارٍ تجهيز الرد...";
  fetch("/api/chat",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({q:question.value})
  })
  .then(r=>r.json())
  .then(d=>aiResult.innerText=d.reply);
}

function copyAI(){
  navigator.clipboard.writeText(aiResult.innerText || "");
  alert("تم نسخ الرد");
}

function sendRequest(){
  const data={
    name:name.value,
    phone:phone.value,
    city:city.value,
    service:service.value,
    area:area2.value,
    notes:notes.value
  };

  fetch("/api/request",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(data)
  })
  .then(r=>r.json())
  .then(d=>{
    msg.innerText=d.msg;
    if(d.wa) window.open(d.wa,"_blank");
  });
}
</script>

</body>
</html>
`;
}

function adminPage(passOk) {
  if (!passOk) {
    return `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head><meta charset="UTF-8"><title>Admin</title></head>
<body style="font-family:Arial;background:#050814;color:white;padding:20px">
<h1>🔐 Admin</h1>
<input id="p" placeholder="password" style="padding:12px;border-radius:10px">
<button onclick="go()" style="padding:12px;border-radius:10px">Open</button>
<script>
function go(){location.href="/admin?pass="+encodeURIComponent(p.value)}
</script>
</body>
</html>`;
  }

  const rows = requests.map((r,i)=>`
<tr>
<td>${esc(r.name)}</td>
<td>${esc(r.phone)}</td>
<td>${esc(r.city)}</td>
<td>${esc(r.service)}</td>
<td>${esc(r.area)}</td>
<td>${esc(r.price)}</td>
<td>${esc(r.status)}</td>
<td>${esc(r.notes)}</td>
<td>${esc(r.ai)}</td>
<td>
<a href="https://wa.me/${String(r.phone).replace(/[^0-9]/g,"")}" target="_blank">WA</a>
<button onclick="done(${i})">Done</button>
<button onclick="del(${i})">Delete</button>
</td>
</tr>
`).join("");

  return `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Admin Dashboard</title>
<style>
body{font-family:Arial;background:#050814;color:white;padding:20px}
.card{background:#0f172a;border:1px solid #263244;padding:18px;border-radius:18px;margin:14px 0}
table{width:100%;border-collapse:collapse}
td,th{border:1px solid #263244;padding:9px;font-size:14px}
input{width:100%;padding:12px;margin:8px 0;border-radius:10px;border:0}
button{background:#22c55e;border:0;border-radius:10px;padding:8px 12px;color:white;cursor:pointer}
.red{background:#ef4444}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
@media(max-width:850px){.grid{grid-template-columns:1fr}td,th{font-size:12px}}
</style>
</head>

<body>

<h1>👨‍💼 Relax Fix Admin Dashboard</h1>

<div class="grid">
  <div class="card"><h2>${requests.length}</h2><p>Total Leads</p></div>
  <div class="card"><h2>${requests.filter(x=>x.status==="new").length}</h2><p>New</p></div>
  <div class="card"><h2>${chats.length}</h2><p>AI Chats</p></div>
</div>

<div class="card">
<h2>⚙️ Settings</h2>
<input id="title" value="${esc(settings.title)}">
<input id="subtitle" value="${esc(settings.subtitle)}">
<button onclick="saveSettings()">Save Settings</button>
</div>

<div class="card">
<h2>📡 Radar الطلبات</h2>
<table>
<tr>
<th>الاسم</th>
<th>الهاتف</th>
<th>المدينة</th>
<th>الخدمة</th>
<th>المساحة</th>
<th>السعر</th>
<th>الحالة</th>
<th>التفاصيل</th>
<th>AI</th>
<th>أكشن</th>
</tr>
${rows || "<tr><td colspan='10'>لا توجد طلبات بعد</td></tr>"}
</table>
</div>

<div class="card">
<h2>🤖 AI Chats</h2>
${chats.map(c=>`
<div class="card">
<b>Q:</b> ${esc(c.q)}<br>
<b>A:</b> ${esc(c.a)}
</div>
`).join("") || "لا توجد محادثات"}
</div>

<p><a style="color:white" href="/">رجوع</a></p>

<script>
const pass = new URLSearchParams(location.search).get("pass") || "";

function done(i){
  fetch("/api/done?pass="+encodeURIComponent(pass),{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({i})
  }).then(()=>location.reload());
}

function del(i){
  fetch("/api/delete?pass="+encodeURIComponent(pass),{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({i})
  }).then(()=>location.reload());
}

function saveSettings(){
  fetch("/api/settings?pass="+encodeURIComponent(pass),{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      title:title.value,
      subtitle:subtitle.value
    })
  }).then(()=>location.reload());
}
</script>

</body>
</html>`;
}

const server = http.createServer(async (req,res)=>{
  try {
    const url = new URL(req.url,"http://x");

    if (req.method==="GET" && url.pathname==="/") {
      return html(res,page());
    }

    if (req.method==="GET" && url.pathname==="/admin") {
      return html(res,adminPage(url.searchParams.get("pass")===ADMIN_PASS));
    }

    if (req.method==="GET" && url.pathname==="/api/health") {
      return json(res,{
        ok:true,
        buttons:[
          "calculator",
          "ai ads",
          "video",
          "ai assistant",
          "request",
          "admin"
        ]
      });
    }

    if (req.method==="POST" && url.pathname==="/api/calc") {
      const b = JSON.parse(await readBody(req) || "{}");
      return json(res,{price:calcPrice(b.service,b.area)});
    }

    if (req.method==="POST" && url.pathname==="/api/ad") {
      const b = JSON.parse(await readBody(req) || "{}");
      return json(res,{text:aiAd(b.service)});
    }

    if (req.method==="POST" && url.pathname==="/api/video") {
      const b = JSON.parse(await readBody(req) || "{}");
      return json(res,{text:aiVideo(b.service)});
    }

    if (req.method==="POST" && url.pathname==="/api/chat") {
      const b = JSON.parse(await readBody(req) || "{}");
      const reply = aiReply(b.q);
      chats.unshift({q:b.q,a:reply,created_at:new Date().toISOString()});
      return json(res,{reply});
    }

    if (req.method==="POST" && url.pathname==="/api/request") {
      const b = JSON.parse(await readBody(req) || "{}");

      if (!b.name || !b.phone) {
        return json(res,{msg:"❌ الاسم والهاتف مطلوبين"});
      }

      const price = calcPrice(b.service,b.area);
      const ai = aiReply((b.notes || "") + " " + (b.service || ""));

      const item = {
        name:b.name,
        phone:b.phone,
        city:b.city || "",
        service:b.service || "",
        area:b.area || "",
        notes:b.notes || "",
        price,
        ai,
        status:"new",
        created_at:new Date().toISOString()
      };

      requests.unshift(item);

      await notify(`🔥 طلب جديد
الاسم: ${item.name}
الهاتف: ${item.phone}
المدينة: ${item.city}
الخدمة: ${item.service}
السعر: ${item.price}`);

      const wa = `https://wa.me/${PHONE}?text=${encodeURIComponent(
`طلب جديد
الاسم: ${item.name}
الهاتف: ${item.phone}
المدينة: ${item.city}
الخدمة: ${item.service}
السعر: ${item.price}
AI:
${item.ai}`
)}`;

      return json(res,{
        msg:"✅ تم إرسال الطلب بنجاح",
        wa,
        ai
      });
    }

    if (req.method==="POST" && url.pathname==="/api/done") {
      if (url.searchParams.get("pass")!==ADMIN_PASS) return json(res,{error:true});
      const b = JSON.parse(await readBody(req) || "{}");
      if (requests[b.i]) requests[b.i].status="done";
      return json(res,{ok:true});
    }

    if (req.method==="POST" && url.pathname==="/api/delete") {
      if (url.searchParams.get("pass")!==ADMIN_PASS) return json(res,{error:true});
      const b = JSON.parse(await readBody(req) || "{}");
      requests.splice(b.i,1);
      return json(res,{ok:true});
    }

    if (req.method==="POST" && url.pathname==="/api/settings") {
      if (url.searchParams.get("pass")!==ADMIN_PASS) return json(res,{error:true});
      const b = JSON.parse(await readBody(req) || "{}");
      settings.title = b.title || settings.title;
      settings.subtitle = b.subtitle || settings.subtitle;
      return json(res,{ok:true});
    }

    return html(res,page());

  } catch(e) {
    return html(res,`
      <h1>Relax Fix</h1>
      <p>حدث خطأ بسيط، السيرفر يعمل.</p>
      <pre>${esc(e.message)}</pre>
      <a href="/">رجوع</a>
    `);
  }
});

server.listen(PORT,"0.0.0.0",()=>{
  console.log("Relax Fix Pro running on "+PORT);
});