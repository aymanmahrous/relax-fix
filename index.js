// ===== Relax Fix PRO SaaS (One File, No deps) =====
const http = require("http");
const crypto = require("crypto");

const PORT = process.env.PORT || 10000;
const PHONE = process.env.PHONE || "971588259848";
const ADMIN_PASS = process.env.ADMIN_PASS || "123456";
const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || "";

// ===== in-memory (fallback) =====
const DB = {
  users: [], // {id,email,coins,ref}
  requests: [], // {id,name,phone,service,area,city,price,notes,status,created_at}
  sessions: {} // token -> userId
};

function uid(){ return crypto.randomBytes(8).toString("hex"); }
function now(){ return new Date().toISOString(); }

// ===== helpers =====
function html(res, body){
  res.writeHead(200,{"Content-Type":"text/html; charset=utf-8"});
  res.end(body);
}
function json(res, data){
  res.writeHead(200,{"Content-Type":"application/json; charset=utf-8"});
  res.end(JSON.stringify(data));
}
function readBody(req){
  return new Promise(r=>{
    let b=""; req.on("data",c=>b+=c.toString());
    req.on("end",()=>r(b));
  });
}
function parseJSON(b){ try{return JSON.parse(b||"{}")}catch{return {}} }

// ===== simple pricing =====
function calcPrice(service, area){
  const a = Number(area||0);
  const map = {
    "دهان": 10, // درهم/متر
    "صيانة تكييف": 150,
    "جبسون بورد": 90,
    "سيراميك": 120,
    "كهرباء": 80,
    "سباكة": 70,
    "تنظيف خزانات": 200,
    "مكافحة حشرات": 180
  };
  if(!a) return map[service] || 100;
  const per = map[service] || 100;
  return Math.round(per * (a/10)); // تبسيط
}

// ===== AI (mock) =====
function aiAd(s){
  return `🔥 إعلان احترافي:
${s||"خدمة صيانة"}

✔ سرعة التنفيذ
✔ ضمان الجودة
✔ فريق محترف

📲 احجز الآن: https://wa.me/${PHONE}
#RelaxFix #UAE`;
}
function aiVideo(s){
  return `🎬 سكريبت:
مشكلة في ${s||"الخدمة"}
→ ظهور Relax Fix
→ قبل/بعد
→ CTA: احجز الآن`;
}

// ===== UI =====
function pageHome(){
return `<!DOCTYPE html><html lang="ar" dir="rtl"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Relax Fix</title>
<style>
*{box-sizing:border-box}body{margin:0;font-family:Arial;background:#050814;color:#fff}
.wrap{width:min(1100px,92%);margin:auto}
nav{display:flex;justify-content:space-between;align-items:center;padding:16px 0;flex-wrap:wrap}
.logo{font-size:26px;font-weight:900}
.btn{padding:12px 18px;border:0;border-radius:14px;cursor:pointer;margin:6px;color:#fff;background:linear-gradient(135deg,#22c55e,#0ea5e9)}
.gold{background:linear-gradient(135deg,#facc15,#fb923c);color:#111}
.card{background:#0f172a;border:1px solid #263244;border-radius:20px;padding:18px;margin:16px 0}
input,select,textarea{width:100%;padding:12px;margin:6px 0;border-radius:12px;border:0}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
@media(max-width:850px){.grid{grid-template-columns:1fr}}
.small{font-size:13px;color:#94a3b8}
.result{white-space:pre-wrap;background:#020617;border-radius:14px;padding:12px;margin-top:10px}
</style></head>
<body>
<div class="wrap">
<nav>
  <div class="logo">⚡ Relax Fix</div>
  <div>
    <a class="btn" href="/">Home</a>
    <a class="btn gold" href="/admin">Dashboard</a>
    <a class="btn" target="_blank" href="https://wa.me/${PHONE}">WhatsApp</a>
  </div>
</nav>

<div class="grid">
  <div class="card"><h3>🎁 Coins</h3><p>سجل وخد 20 Coins + شارك وخد 10</p></div>
  <div class="card"><h3>📊 Calculator</h3><p>احسب السعر فورًا</p></div>
  <div class="card"><h3>📡 Radar</h3><p>كل الطلبات تظهر في الأدمن</p></div>
</div>

<div class="card">
<h2>💰 حاسبة السعر</h2>
<select id="svc">
  <option>دهان</option><option>صيانة تكييف</option><option>جبسون بورد</option>
  <option>سيراميك</option><option>كهرباء</option><option>سباكة</option>
  <option>تنظيف خزانات</option><option>مكافحة حشرات</option>
</select>
<input id="area" placeholder="المساحة (متر)">
<button class="btn" onclick="calc()">احسب</button>
<p id="price"></p>
</div>

<div class="card">
<h2>🎨 AI Ads</h2>
<input id="adS" placeholder="نوع الخدمة">
<button class="btn" onclick="makeAd()">Generate</button>
<div id="adR" class="result"></div>
</div>

<div class="card">
<h2>🎬 Video</h2>
<input id="vdS" placeholder="نوع الخدمة">
<button class="btn" onclick="makeV()">Generate</button>
<div id="vdR" class="result"></div>
</div>

<div class="card">
<h2>📩 طلب خدمة</h2>
<input id="name" placeholder="الاسم">
<input id="phone" placeholder="الهاتف">
<input id="city" placeholder="المدينة">
<select id="service">
  <option>دهان</option><option>صيانة تكييف</option><option>جبسون بورد</option>
  <option>سيراميك</option><option>كهرباء</option><option>سباكة</option>
  <option>تنظيف خزانات</option><option>مكافحة حشرات</option>
</select>
<input id="area2" placeholder="المساحة (اختياري)">
<textarea id="notes" placeholder="تفاصيل"></textarea>
<button class="btn gold" onclick="send()">إرسال + واتساب</button>
<p id="msg"></p>
</div>

<p class="small">نسخة مستقرة — Coins/Referral مبدئيين، Dashboard متقدم للأدمن.</p>
</div>

<script>
function calc(){
  const s=document.getElementById("svc").value;
  const a=document.getElementById("area").value;
  fetch("/api/calc",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({service:s,area:a})})
  .then(r=>r.json()).then(d=>document.getElementById("price").innerText="السعر التقريبي: "+d.price+" درهم");
}
function makeAd(){
  const s=document.getElementById("adS").value;
  fetch("/api/ad",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({service:s})})
  .then(r=>r.json()).then(d=>document.getElementById("adR").innerText=d.text);
}
function makeV(){
  const s=document.getElementById("vdS").value;
  fetch("/api/video",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({service:s})})
  .then(r=>r.json()).then(d=>document.getElementById("vdR").innerText=d.text);
}
function send(){
  const data={
    name:document.getElementById("name").value,
    phone:document.getElementById("phone").value,
    city:document.getElementById("city").value,
    service:document.getElementById("service").value,
    area:document.getElementById("area2").value,
    notes:document.getElementById("notes").value
  };
  fetch("/api/request",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)})
  .then(r=>r.json()).then(d=>{
    document.getElementById("msg").innerText=d.message;
    if(d.wa) window.open(d.wa,"_blank");
  });
}
</script>
</body></html>`;
}

// ===== ADMIN UI =====
async function pageAdmin(){
  const rows = DB.requests.map(r=>`
<tr>
<td>${r.name}</td><td>${r.phone}</td><td>${r.city||""}</td>
<td>${r.service}</td><td>${r.price}</td>
<td>${r.status}</td>
<td>
  <a class="btn" href="https://wa.me/${String(r.phone).replace(/[^0-9]/g,"")}" target="_blank">WA</a>
  <button class="btn" onclick="setS('${r.id}','done')">Done</button>
</td>
</tr>`).join("");

  return `<!DOCTYPE html><html lang="ar" dir="rtl"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Admin</title>
<style>
body{background:#050814;color:#fff;font-family:Arial;padding:16px}
.card{background:#0f172a;border:1px solid #263244;border-radius:16px;padding:14px}
table{width:100%;border-collapse:collapse}td,th{border:1px solid #263244;padding:8px}
.btn{background:#22c55e;border:0;border-radius:10px;padding:6px 10px;color:#fff;cursor:pointer}
.top{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px}
</style></head>
<body>
<h1>📊 Dashboard</h1>
<div class="top">
  <input id="pass" placeholder="Admin password">
  <button class="btn" onclick="load()">Open</button>
</div>
<div class="card">
<table>
<tr><th>الاسم</th><th>الهاتف</th><th>المدينة</th><th>الخدمة</th><th>السعر</th><th>الحالة</th><th>أكشن</th></tr>
<tbody id="rows">${rows || "<tr><td colspan='7'>لا يوجد بيانات</td></tr>"}</tbody>
</table>
</div>

<script>
async function load(){
  const p=document.getElementById("pass").value;
  const r=await fetch("/api/admin?pass="+encodeURIComponent(p));
  const d=await r.json();
  if(d.error){ alert(d.error); return; }
  const rows = d.map(x=>\`
  <tr>
    <td>\${x.name}</td><td>\${x.phone}</td><td>\${x.city||""}</td>
    <td>\${x.service}</td><td>\${x.price}</td>
    <td>\${x.status}</td>
    <td>
      <a class="btn" href="https://wa.me/\${String(x.phone).replace(/[^0-9]/g,"")}" target="_blank">WA</a>
      <button class="btn" onclick="setS('\${x.id}','done')">Done</button>
    </td>
  </tr>\`).join("");
  document.getElementById("rows").innerHTML = rows;
}
async function setS(id,status){
  const p=document.getElementById("pass").value;
  await fetch("/api/status?pass="+encodeURIComponent(p),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,status})});
  load();
}
</script>
<p><a class="btn" href="/">رجوع</a></p>
</body></html>`;
}

// ===== server =====
const server = http.createServer(async (req,res)=>{
  try{
    const url = new URL(req.url, "http://x");

    if(req.method==="GET" && url.pathname==="/") return html(res, pageHome());
    if(req.method==="GET" && url.pathname==="/admin") return html(res, await pageAdmin());

    if(req.method==="POST" && url.pathname==="/api/calc"){
      const d = parseJSON(await readBody(req));
      return json(res, { price: calcPrice(d.service, d.area) });
    }

    if(req.method==="POST" && url.pathname==="/api/ad"){
      const d = parseJSON(await readBody(req));
      return json(res, { text: aiAd(d.service) });
    }

    if(req.method==="POST" && url.pathname==="/api/video"){
      const d = parseJSON(await readBody(req));
      return json(res, { text: aiVideo(d.service) });
    }

    if(req.method==="POST" && url.pathname==="/api/request"){
      const d = parseJSON(await readBody(req));
      if(!d.name || !d.phone) return json(res, { message:"❌ الاسم والهاتف مطلوبين" });

      const price = calcPrice(d.service, d.area);
      const item = { id:uid(), name:d.name, phone:d.phone, city:d.city||"", service:d.service||"", area:d.area||"", notes:d.notes||"", price, status:"new", created_at:now() };
      DB.requests.unshift(item);

      const wa = `https://wa.me/${PHONE}?text=${encodeURIComponent(
        `طلب جديد\n${item.name}\n${item.phone}\n${item.service}\nالسعر: ${item.price}\n${item.city}\n${item.notes}`
      )}`;

      return json(res, { message:"✅ تم الإرسال", wa });
    }

    if(req.method==="GET" && url.pathname==="/api/admin"){
      if(url.searchParams.get("pass") !== ADMIN_PASS) return json(res,{error:"Unauthorized"});
      return json(res, DB.requests);
    }

    if(req.method==="POST" && url.pathname==="/api/status"){
      const pass = url.searchParams.get("pass");
      if(pass !== ADMIN_PASS) return json(res,{error:"Unauthorized"});
      const d = parseJSON(await readBody(req));
      const it = DB.requests.find(x=>x.id===d.id);
      if(it) it.status = d.status || "new";
      return json(res,{ok:true});
    }

    html(res, pageHome());
  }catch(e){
    html(res, `<h1>Relax Fix</h1><p>خطأ بسيط</p><pre>${e.message}</pre><a href="/">رجوع</a>`);
  }
});

server.listen(PORT, "0.0.0.0", ()=>console.log("Running on "+PORT));