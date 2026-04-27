// ===== RELAX FIX SaaS - WORKING VERSION (ONE FILE) =====
const http = require("http");
const crypto = require("crypto");

const PORT = process.env.PORT || 10000;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

function hash(x){return crypto.createHash("sha256").update(String(x)).digest("hex");}
function token(){return crypto.randomBytes(24).toString("hex");}
function parseCookies(req){
  const out={}; (req.headers.cookie||"").split(";").forEach(p=>{
    const [k,v]=p.trim().split("="); if(k) out[k]=decodeURIComponent(v||"");
  }); return out;
}
function readBody(req){
  return new Promise(r=>{
    let b=""; req.on("data",c=>b+=c);
    req.on("end",()=>r(new URLSearchParams(b)));
  });
}
function html(res,content){
  res.writeHead(200,{"Content-Type":"text/html; charset=utf-8"});
  res.end(content);
}

// ===== Supabase helpers via fetch =====
async function sbInsert(table, body){
  await fetch(SUPABASE_URL+"/rest/v1/"+table,{
    method:"POST",
    headers:{
      apikey:SUPABASE_KEY,
      Authorization:"Bearer "+SUPABASE_KEY,
      "Content-Type":"application/json"
    },
    body:JSON.stringify(body)
  });
}
async function sbSelect(query){
  const r = await fetch(SUPABASE_URL+"/rest/v1/"+query,{
    headers:{
      apikey:SUPABASE_KEY,
      Authorization:"Bearer "+SUPABASE_KEY
    }
  });
  return await r.json();
}
async function currentUser(req){
  const t=parseCookies(req).rf_token;
  if(!t) return null;
  const s=await sbSelect(`sessions?token=eq.${t}&select=*`);
  if(!s[0]) return null;
  const u=await sbSelect(`users?id=eq.${s[0].user_id}&select=*`);
  return u[0]||null;
}

// ===== UI =====
function page(content){
return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Relax Fix SaaS</title>
<style>
body{margin:0;font-family:system-ui;background:#0b0f2a;color:#fff;text-align:center}
.wrap{max-width:900px;margin:auto;padding:20px}
.card{background:#11183a;padding:20px;margin:15px;border-radius:18px}
button{padding:12px 18px;margin:8px;border:none;border-radius:12px;cursor:pointer}
.b1{background:#ff9800;color:#111}.b2{background:#00c2ff}.b3{background:#00d084}
input,textarea{padding:10px;margin:6px;border-radius:10px;border:none;width:80%;max-width:320px}
a{color:#8bdcff}
</style>
</head><body><div class="wrap">${content}</div></body></html>`;
}

function home(u){
return page(`
<h1>🚀 Relax Fix SaaS</h1>

${u?`<p>أهلاً ${u.email}</p>
<a href="/dashboard">📊 Dashboard</a> | <a href="/logout">Logout</a>
`:`<a href="/signup">Start Free</a> | <a href="/login">Login</a>`}

<div class="card">
<h2>🎨 AI Ads</h2>
<form method="POST" action="/ai">
<input name="idea" placeholder="فكرة الإعلان">
<button class="b1">Generate</button>
</form>
</div>

<div class="card">
<h2>🎬 Video</h2>
<form method="POST" action="/video">
<input name="idea" placeholder="فكرة الفيديو">
<button class="b2">Generate</button>
</form>
</div>

<div class="card">
<h2>📩 طلب خدمة</h2>
<form method="POST" action="/request">
<input name="name" placeholder="اسمك">
<input name="phone" placeholder="رقمك">
<input name="service" placeholder="الخدمة">
<textarea name="notes" placeholder="تفاصيل"></textarea>
<button class="b3">Send</button>
</form>
</div>
`);
}

function auth(type){
return page(`
<h1>${type==="signup"?"إنشاء حساب":"تسجيل دخول"}</h1>
<form method="POST" action="/${type}">
<input name="email" type="email" placeholder="Email" required>
<input name="password" type="password" placeholder="Password" required>
<button>${type==="signup"?"Sign Up":"Login"}</button>
</form>
`);
}

async function dashboard(u){
const reqs=await sbSelect(`requests?user_id=eq.${u.id}&order=created_at.desc`);
return page(`
<h1>Dashboard</h1>
<a href="/">Home</a> | <a href="/logout">Logout</a>

<div class="card">
<h2>طلباتك</h2>
${(reqs||[]).map(r=>`
<div style="border:1px solid #333;margin:8px;padding:8px">
👤 ${r.name}<br>📞 ${r.phone}<br>🔧 ${r.service}
</div>`).join("")}
</div>
`);
}

// ===== SERVER =====
const server = http.createServer(async (req,res)=>{
try{
const url=new URL(req.url,"http://x");
const u=await currentUser(req);

// صفحات
if(req.method==="GET"&&url.pathname==="/") return html(res,home(u));
if(req.method==="GET"&&url.pathname==="/signup") return html(res,auth("signup"));
if(req.method==="GET"&&url.pathname==="/login") return html(res,auth("login"));
if(req.method==="GET"&&url.pathname==="/dashboard"){
  if(!u) return html(res,auth("login"));
  return html(res,await dashboard(u));
}
if(req.method==="GET"&&url.pathname==="/logout"){
  res.writeHead(302,{"Set-Cookie":"rf_token=; Max-Age=0; Path=/","Location":"/"});
  return res.end();
}

// تسجيل
if(req.method==="POST"&&url.pathname==="/signup"){
  const p=await readBody(req);
  const {email,password}=Object.fromEntries(p);
  const users=await sbSelect(`users?email=eq.${email}`);
  if(users.length) return html(res,page("<h1>Email مستخدم</h1>"));
  await sbInsert("users",{email,password_hash:hash(password)});
  return html(res,page("<h1>تم التسجيل ✔</h1><a href='/login'>Login</a>"));
}

// دخول
if(req.method==="POST"&&url.pathname==="/login"){
  const p=await readBody(req);
  const {email,password}=Object.fromEntries(p);
  const u=await sbSelect(`users?email=eq.${email}&password_hash=eq.${hash(password)}`);
  if(!u[0]) return html(res,page("<h1>خطأ في البيانات</h1>"));
  const t=token();
  await sbInsert("sessions",{user_id:u[0].id,token:t});
  res.writeHead(302,{"Set-Cookie":`rf_token=${t}; Path=/; Max-Age=2592000`,"Location":"/dashboard"});
  return res.end();
}

// طلب
if(req.method==="POST"&&url.pathname==="/request"){
  const p=await readBody(req);
  const d=Object.fromEntries(p);
  await sbInsert("requests",{user_id:u?u.id:null,...d});
  return html(res,page("<h1>تم الإرسال ✔</h1><a href='/'>رجوع</a>"));
}

// AI
if(req.method==="POST"&&url.pathname==="/ai"){
  const p=await readBody(req);
  return html(res,page(`<pre>🔥 إعلان:\n${p.get("idea")}\nRelax Fix</pre>`));
}
if(req.method==="POST"&&url.pathname==="/video"){
  const p=await readBody(req);
  return html(res,page(`<pre>🎬 فيديو:\n${p.get("idea")}\nCTA: احجز الآن</pre>`));
}

return html(res,home(u));
}catch(e){
  html(res,page("<h1>Server Error</h1><p>"+e.message+"</p>"));
}
});

server.listen(PORT,"0.0.0.0",()=>{
  console.log("Running on "+PORT);
});