const http = require("http");
const crypto = require("crypto");
const { createClient } = require("@supabase/supabase-js");

const PORT = process.env.PORT || 10000;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY;
const ADMIN_PASS = process.env.ADMIN_PASS || "123456";
const PHONE = process.env.PHONE || "971588259848";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function esc(x=""){return String(x).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
function hash(x){return crypto.createHash("sha256").update(String(x)).digest("hex");}
function token(){return crypto.randomBytes(24).toString("hex");}
function refCode(){return Math.random().toString(36).slice(2,8).toUpperCase();}
function parseCookies(req){let o={};(req.headers.cookie||"").split(";").forEach(p=>{let [k,v]=p.trim().split("=");if(k)o[k]=decodeURIComponent(v||"")});return o;}
function readBody(req){return new Promise(r=>{let b="";req.on("data",c=>b+=c);req.on("end",()=>r(new URLSearchParams(b)))})}

async function currentUser(req){
  const t=parseCookies(req).rf_token;
  if(!t)return null;
  const {data}=await supabase.from("sessions").select("*,users(*)").eq("token",t).single();
  return data?.users || null;
}

async function addCoins(id,n){
  const {data}=await supabase.from("users").select("coins").eq("id",id).single();
  await supabase.from("users").update({coins:(data?.coins||0)+n}).eq("id",id);
}

async function spendCoins(id,n){
  const {data}=await supabase.from("users").select("coins").eq("id",id).single();
  const coins=data?.coins||0;
  if(coins<n)return false;
  await supabase.from("users").update({coins:coins-n}).eq("id",id);
  return true;
}

function page(content,title="Relax Fix SaaS"){
return `<!DOCTYPE html><html lang="ar" dir="rtl"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<style>
body{margin:0;font-family:Arial,Tahoma;background:#050814;color:white}
a{text-decoration:none;color:inherit}
.wrap{width:min(1100px,92%);margin:auto}
.nav{display:flex;justify-content:space-between;align-items:center;padding:18px;background:#020617;position:sticky;top:0}
.logo{font-size:24px;font-weight:900}
.btn,button{background:linear-gradient(135deg,#22c55e,#0ea5e9);color:white;border:0;border-radius:14px;padding:12px 18px;margin:5px;font-weight:900;cursor:pointer}
.gold{background:linear-gradient(135deg,#facc15,#fb923c);color:#111}
.red{background:#ef4444}
.card{background:#0f172a;border:1px solid #263244;border-radius:22px;padding:22px;margin:18px 0}
.hero{text-align:center;padding:70px 20px}
h1{font-size:clamp(36px,7vw,72px);margin:0 0 15px;background:linear-gradient(90deg,#22c55e,#0ea5e9,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
p{color:#cbd5e1;line-height:1.7}
input,textarea,select{width:100%;padding:14px;margin:8px 0;border-radius:12px;border:0;font-size:16px}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:15px}
table{width:100%;border-collapse:collapse;background:#020617}
td,th{border:1px solid #263244;padding:10px}
@media(max-width:800px){.grid{grid-template-columns:1fr}.nav{flex-wrap:wrap}}
</style></head><body>${content}</body></html>`;
}

function nav(u){
return `<div class="nav"><div class="logo">⚡ Relax Fix SaaS</div><div>
<a class="btn" href="/">Home</a>
${u?`<a class="btn gold" href="/dashboard">Dashboard</a><a class="btn red" href="/logout">Logout</a>`:`<a class="btn gold" href="/signup">Start Trial</a><a class="btn" href="/login">Login</a>`}
</div></div>`;
}

function home(u){
return page(`${nav(u)}
<section class="hero"><div class="wrap">
<h1>حوّل شركتك إلى SaaS ذكي</h1>
<p>طلبات العملاء + لوحة تحكم + Coins + Referral + AI Ads + Video Generator</p>
<a class="btn gold" href="/signup">ابدأ مجانًا 20 Coins</a>
<a class="btn" href="#demo">جرب AI الآن</a>
</div></section>

<div class="wrap">
<div class="grid">
<div class="card"><h2>🎨 AI Ads</h2><p>توليد إعلانات عربية وإنجليزية.</p></div>
<div class="card"><h2>🎬 Video Generator</h2><p>سكريبت فيديو دعائي جاهز.</p></div>
<div class="card"><h2>📊 Dashboard</h2><p>إدارة الطلبات والعملاء.</p></div>
</div>

<div class="card" id="demo">
<h2>جرّب إعلان AI مجاني</h2>
<form method="POST" action="/public-ai">
<input name="service" placeholder="مثال: صيانة تكييف">
<button>Generate</button>
</form>
</div>

<div class="card">
<h2>إرسال طلب خدمة</h2>
<form method="POST" action="/request">
<input name="name" placeholder="الاسم" required>
<input name="phone" placeholder="رقم الهاتف" required>
<input name="service" placeholder="الخدمة" required>
<textarea name="notes" placeholder="التفاصيل"></textarea>
<button>إرسال</button>
</form>
</div>
</div>`);
}

function auth(type){
const is=type==="signup";
return page(`${nav()}
<div class="wrap"><div class="card">
<h1>${is?"إنشاء حساب":"تسجيل دخول"}</h1>
<form method="POST" action="/${type}">
${is?`<input name="company" placeholder="اسم الشركة">`:``}
<input name="email" type="email" placeholder="Email" required>
<input name="password" type="password" placeholder="Password" required>
${is?`<input name="ref" placeholder="Referral Code اختياري">`:``}
<button>${is?"Start Trial":"Login"}</button>
</form>
</div></div>`);
}

function aiAd(service){
return {
ar:`🔥 إعلان قوي لخدمة ${service}: احجز الآن واستقبل عملاء أكثر اليوم. تواصل معنا عبر واتساب.`,
en:`🔥 Powerful ad for ${service}: Book now and get more customers today. Contact us on WhatsApp.`,
hashtags:"#RelaxFix #AIAds #UAE #Maintenance"
};
}

function videoPlan(prompt){
return [
`1. Hook: مشكلة العميل - ${prompt}`,
"2. عرض الألم: تأخير / تكلفة / قلق",
"3. الحل: Relax Fix يظهر بسرعة",
"4. قبل وبعد",
"5. CTA: احجز الآن على واتساب"
];
}

async function dashboard(u){
const {data:reqs}=await supabase.from("requests").select("*").eq("user_id",u.id).order("created_at",{ascending:false});
const {data:camps}=await supabase.from("campaigns").select("*").eq("user_id",u.id).order("created_at",{ascending:false});

return page(`${nav(u)}<div class="wrap">
<h1>Dashboard</h1>
<div class="grid">
<div class="card"><h2>${u.coins||0}</h2><p>Coins</p></div>
<div class="card"><h2>${(reqs||[]).length}</h2><p>Requests</p></div>
<div class="card"><h2>${(camps||[]).length}</h2><p>AI Projects</p></div>
</div>

<div class="card">
<h2>Referral Link</h2>
<input readonly value="${(process.env.APP_URL||"")}/signup?ref=${u.referral_code}">
<a class="btn gold" href="/share">Share +3 Coins</a>
</div>

<div class="card">
<h2>New Request</h2>
<form method="POST" action="/request">
<input name="name" placeholder="Customer name">
<input name="phone" placeholder="Phone">
<input name="service" placeholder="Service">
<textarea name="notes" placeholder="Notes"></textarea>
<button>Save</button>
</form>
</div>

<div class="card">
<h2>AI Ads - 2 Coins</h2>
<form method="POST" action="/ai">
<input name="service" placeholder="Service">
<button>Generate Ad</button>
</form>
</div>

<div class="card">
<h2>Video Generator - 5 Coins</h2>
<form method="POST" action="/video">
<textarea name="prompt" placeholder="Video idea"></textarea>
<button>Generate Video Plan</button>
</form>
</div>

<div class="card">
<h2>Requests</h2>
<table><tr><th>Name</th><th>Phone</th><th>Service</th><th>Status</th><th>Action</th></tr>
${(reqs||[]).map(r=>`<tr><td>${esc(r.name)}</td><td>${esc(r.phone)}</td><td>${esc(r.service)}</td><td>${esc(r.status||"new")}</td><td><a class="btn" href="https://wa.me/${esc(r.phone)}">WhatsApp</a></td></tr>`).join("")}
</table>
</div>
</div>`);
}

async function handle(req,res){
try{
const url=new URL(req.url,"http://x");
const u=await currentUser(req);

if(req.method==="GET"&&url.pathname==="/")return html(res,home(u));
if(req.method==="GET"&&url.pathname==="/signup")return html(res,auth("signup"));
if(req.method==="GET"&&url.pathname==="/login")return html(res,auth("login"));
if(req.method==="GET"&&url.pathname==="/logout"){
res.writeHead(302,{"Set-Cookie":"rf_token=; Max-Age=0; Path=/","Location":"/"});
return res.end();
}

if(req.method==="POST"&&url.pathname==="/signup"){
const p=await readBody(req);
const referral_code=refCode();
const {data,error}=await supabase.from("users").insert([{
email:p.get("email"),
password_hash:hash(p.get("password")),
company:p.get("company")||"",
coins:20,
referral_code,
referred_by:p.get("ref")||null
}]).select("*").single();
if(error)return html(res,page(`<div class="wrap"><div class="card"><h1>Error</h1><p>${esc(error.message)}</p></div></div>`));
if(p.get("ref")){
const {data:owner}=await supabase.from("users").select("*").eq("referral_code",p.get("ref")).single();
if(owner){await addCoins(owner.id,5);await addCoins(data.id,5);}
}
const t=token();
await supabase.from("sessions").insert([{user_id:data.id,token:t}]);
res.writeHead(302,{"Set-Cookie":`rf_token=${t}; Path=/; Max-Age=2592000`,"Location":"/dashboard"});
return res.end();
}

if(req.method==="POST"&&url.pathname==="/login"){
const p=await readBody(req);
const {data}=await supabase.from("users").select("*").eq("email",p.get("email")).eq("password_hash",hash(p.get("password"))).single();
if(!data)return html(res,page(`<div class="wrap"><div class="card"><h1>Wrong Login</h1></div></div>`));
const t=token();
await supabase.from("sessions").insert([{user_id:data.id,token:t}]);
res.writeHead(302,{"Set-Cookie":`rf_token=${t}; Path=/; Max-Age=2592000`,"Location":"/dashboard"});
return res.end();
}

if(req.method==="GET"&&url.pathname==="/dashboard"){
if(!u)return html(res,auth("login"));
return html(res,await dashboard(u));
}

if(req.method==="GET"&&url.pathname==="/share"){
if(!u)return html(res,auth("login"));
await addCoins(u.id,3);
res.writeHead(302,{Location:"/dashboard"});
return res.end();
}

if(req.method==="POST"&&url.pathname==="/request"){
const p=await readBody(req);
await supabase.from("requests").insert([{
user_id:u?u.id:null,
name:p.get("name"),
phone:p.get("phone"),
service:p.get("service"),
notes:p.get("notes"),
status:"new"
}]);
return html(res,page(`<div class="wrap"><div class="card"><h1>✅ تم حفظ الطلب</h1><a class="btn gold" href="${u?"/dashboard":"/"}">رجوع</a></div></div>`));
}

if(req.method==="POST"&&url.pathname==="/ai"){
if(!u)return html(res,auth("login"));
if(!(await spendCoins(u.id,2)))return html(res,page(`<h1>Coins خلصت</h1>`));
const p=await readBody(req);
const ad=aiAd(p.get("service"));
await supabase.from("campaigns").insert([{user_id:u.id,title:"AI Ad",type:"ad",prompt:p.get("service"),result:JSON.stringify(ad)}]);
return html(res,page(`<div class="wrap"><div class="card"><h1>AI Ad</h1><p>${ad.ar}</p><hr><p>${ad.en}</p><p>${ad.hashtags}</p><a class="btn gold" href="/dashboard">Back</a></div></div>`));
}

if(req.method==="POST"&&url.pathname==="/video"){
if(!u)return html(res,auth("login"));
if(!(await spendCoins(u.id,5)))return html(res,page(`<h1>Coins خلصت</h1>`));
const p=await readBody(req);
const plan=videoPlan(p.get("prompt"));
await supabase.from("campaigns").insert([{user_id:u.id,title:"AI Video",type:"video",prompt:p.get("prompt"),result:JSON.stringify(plan)}]);
return html(res,page(`<div class="wrap"><div class="card"><h1>Video Plan</h1>${plan.map(x=>`<p>${esc(x)}</p>`).join("")}<a class="btn gold" href="/dashboard">Back</a></div></div>`));
}

if(req.method==="POST"&&url.pathname==="/public-ai"){
const p=await readBody(req);
const ad=aiAd(p.get("service"));
return html(res,page(`<div class="wrap"><div class="card"><h1>AI Demo</h1><p>${ad.ar}</p><p>${ad.en}</p><a class="btn gold" href="/signup">Start Free</a></div></div>`));
}

return html(res,home(u));
}catch(e){
return html(res,page(`<div class="wrap"><div class="card"><h1>Server Error</h1><p>${esc(e.message)}</p></div></div>`));
}
}

function html(res,content){
res.writeHead(200,{"Content-Type":"text/html; charset=utf-8"});
res.end(content);
}

const server=http.createServer(handle);

server.listen(PORT,"0.0.0.0",()=>{
console.log("Relax Fix SaaS running on port "+PORT);
});