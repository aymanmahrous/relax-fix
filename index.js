const http = require("http");
const crypto = require("crypto");
const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.SUPABASE_URL || "https://nmzxrjdxvmmzzmajrskm.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_KEY || "sb_publishable_qXOPVaD5_f60qf1UbYrm2A_sH9c0lW5";
const ADMIN_PASS = process.env.ADMIN_PASS || "123456";
const PHONE = process.env.PHONE || "971588259848";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function sendHtml(res, html, status=200, headers={}) {
  res.writeHead(status, {
    "Content-Type":"text/html; charset=utf-8",
    "Cache-Control":"no-store",
    ...headers
  });
  res.end(html);
}
function sendJson(res, data, status=200) {
  res.writeHead(status, {"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"});
  res.end(JSON.stringify(data));
}
function readBody(req) {
  return new Promise(resolve => {
    let data = "";
    req.on("data", c => data += c.toString("utf8"));
    req.on("end", () => resolve(data));
  });
}
function parseCookies(req) {
  const raw = req.headers.cookie || "";
  return Object.fromEntries(raw.split(";").filter(Boolean).map(x => {
    const i = x.indexOf("=");
    return [x.slice(0,i).trim(), decodeURIComponent(x.slice(i+1))];
  }));
}
function escapeHtml(v) {
  return String(v ?? "").replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
}
function hashPassword(password) {
  return crypto.createHash("sha256").update(String(password)).digest("hex");
}
function token() {
  return crypto.randomBytes(24).toString("hex");
}
async function currentUser(req) {
  const sid = parseCookies(req).rf_session;
  if (!sid) return null;
  const { data } = await supabase.from("sessions").select("*, users(*)").eq("token", sid).single();
  if (!data || !data.users) return null;
  return data.users;
}

function layout(content, title="Relax Fix Global SaaS") {
return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<style>
:root{--bg:#050814;--panel:#0b1220;--card:#0f172a;--text:#fff;--muted:#cbd5e1;--green:#22c55e;--blue:#0ea5e9;--gold:#facc15;--red:#ef4444;--border:#263244;--violet:#8b5cf6}
*{box-sizing:border-box}body{margin:0;font-family:Arial,Tahoma,sans-serif;background:#050814;color:#fff}a{text-decoration:none;color:inherit}.wrap{width:min(1220px,92%);margin:auto}
header{position:sticky;top:0;background:rgba(2,6,23,.94);border-bottom:1px solid rgba(255,255,255,.1);z-index:9}.nav{min-height:74px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}.logo{font-size:24px;font-weight:900}.btn{display:inline-block;padding:12px 18px;border-radius:14px;font-weight:900;margin:5px;border:0;cursor:pointer}.green{background:var(--green);color:white}.blue{background:var(--blue);color:white}.gold{background:var(--gold);color:#111}.red{background:var(--red);color:white}.dark{background:#111827}.violet{background:var(--violet)}
.hero{padding:82px 0;background:radial-gradient(circle at top right,rgba(34,197,94,.26),transparent 32%),radial-gradient(circle at top left,rgba(139,92,246,.25),transparent 34%),linear-gradient(135deg,#07111f,#020617)}.grid{display:grid;grid-template-columns:1.05fr .95fr;gap:28px;align-items:center}h1{font-size:clamp(38px,7vw,74px);margin:0 0 18px;line-height:1.04}h2{font-size:clamp(28px,4vw,42px);margin:0 0 14px}.lead{font-size:19px;color:var(--muted);line-height:1.7}.badge{display:inline-block;background:rgba(34,197,94,.14);color:#86efac;border:1px solid rgba(34,197,94,.35);padding:9px 14px;border-radius:999px;font-weight:900;margin-bottom:15px}
.card{background:rgba(15,23,42,.88);border:1px solid rgba(255,255,255,.12);border-radius:26px;padding:24px;box-shadow:0 22px 70px rgba(0,0,0,.35)}input,textarea,select{width:100%;padding:14px;margin:8px 0;border-radius:12px;border:0;font-size:16px;background:#fff;color:#111}textarea{min-height:100px}.submit{width:100%;padding:15px;border:0;border-radius:14px;background:linear-gradient(135deg,#22c55e,#0ea5e9);color:#fff;font-weight:900;font-size:17px;cursor:pointer}
section{padding:54px 0}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.feature,.price,.service{background:#0f172a;border:1px solid #263244;border-radius:24px;padding:22px}.service{cursor:pointer}.service:hover{border-color:#22c55e}.icon{font-size:38px}.screen{min-height:390px;background:linear-gradient(135deg,#071827,#14213d);border-radius:22px;padding:20px;position:relative;overflow:hidden}.screen:before{content:"";position:absolute;inset:0;background:linear-gradient(120deg,transparent,rgba(255,255,255,.08),transparent);animation:shine 7s infinite}@keyframes shine{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
table{width:100%;border-collapse:collapse;margin-top:18px;background:#0f172a}th,td{border:1px solid #263244;padding:10px;text-align:right;vertical-align:top}th{background:#111827}.smallbtn{padding:7px 10px;border-radius:8px;color:#fff;margin:3px;display:inline-block;border:0;cursor:pointer}.panel{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:18px 0}.stat{background:#0f172a;border:1px solid #263244;border-radius:18px;padding:18px}.stat strong{font-size:28px;color:#22c55e}.tabs{display:flex;gap:8px;flex-wrap:wrap;margin:16px 0}.tab{padding:10px 14px;border:1px solid #263244;border-radius:999px;background:#0f172a}.float-wa,.float-call{position:fixed;right:18px;color:#fff;padding:14px 18px;border-radius:999px;font-weight:900;z-index:99}.float-wa{bottom:18px;background:#25D366}.float-call{bottom:78px;background:#0ea5e9}footer{text-align:center;background:#020617;color:#94a3b8;padding:30px;border-top:1px solid rgba(255,255,255,.08)}
.lang-en [data-ar]{display:none}.lang-ar [data-en]{display:none}
@media(max-width:900px){.grid,.cards,.panel{grid-template-columns:1fr}.nav,.hero{text-align:center}h1{font-size:42px}}
</style>
</head>
<body class="lang-ar">
${content}
<script>
function toggleLang(){
  document.body.classList.toggle("lang-en");
  document.body.classList.toggle("lang-ar");
  const en=document.body.classList.contains("lang-en");
  document.documentElement.dir=en?"ltr":"rtl";
  document.documentElement.lang=en?"en":"ar";
}
</script>
</body></html>`;
}

function nav(user=null) {
return `<header><div class="wrap nav"><div class="logo">⚡ Relax Fix Global</div><div>
<button class="btn dark" onclick="toggleLang()">🌍 عربي / EN</button>
<a class="btn blue" href="tel:+${PHONE}">📞</a>
<a class="btn green" target="_blank" href="https://wa.me/${PHONE}">💬</a>
${user ? `<a class="btn gold" href="/dashboard">Dashboard</a><a class="btn red" href="/logout">Logout</a>` : `<a class="btn gold" href="/login">Login</a><a class="btn violet" href="/signup">Start Trial</a>`}
</div></div></header>`;
}

function homePage(user=null) {
return layout(`
${nav(user)}
<section class="hero"><div class="wrap grid"><div>
<div class="badge"><span data-ar>منصة عالمية لإدارة شركات الصيانة والدعاية</span><span data-en>Global platform for maintenance and AI marketing teams</span></div>
<h1><span data-ar>حوّل أي شركة صيانة إلى SaaS ذكي</span><span data-en>Turn any maintenance business into a smart SaaS</span></h1>
<p class="lead"><span data-ar>طلبات العملاء، واتساب، لوحة تحكم، مشاريع فيديو AI، حالات الطلب، وتصدير بيانات — في نظام واحد.</span><span data-en>Customer requests, WhatsApp, dashboard, AI video projects, request status, and data export — all in one system.</span></p>
<a class="btn gold" href="/signup"><span data-ar>ابدأ تجربة مجانية</span><span data-en>Start Free Trial</span></a>
<a class="btn green" href="#pricing"><span data-ar>الأسعار</span><span data-en>Pricing</span></a>
</div><div class="card"><div class="screen"><h2>Cinematic AI Studio</h2><p class="lead">Campaign Presets • Voice Engine • Brand Kit • Timeline • Export</p><div class="tabs"><span class="tab">9:16</span><span class="tab">Voice</span><span class="tab">CTA</span><span class="tab">Brand Kit</span></div><p class="lead"><span data-ar>واجهة مستوحاة من التصميم الذي أرسلته، لكن هنا متصلة بباك إند وداشبورد حقيقي.</span><span data-en>Inspired by your reference design, but connected to a real backend and dashboard.</span></p></div></div></div></section>

<section><div class="wrap"><h2><span data-ar>مميزات النظام</span><span data-en>Platform Features</span></h2><div class="cards">
<div class="feature"><div class="icon">📋</div><h3>Leads CRM</h3><p class="lead"><span data-ar>حفظ الطلبات وإدارة الحالات.</span><span data-en>Save requests and manage status.</span></p></div>
<div class="feature"><div class="icon">💬</div><h3>WhatsApp Actions</h3><p class="lead"><span data-ar>اتصال وواتساب من الداشبورد.</span><span data-en>Call and WhatsApp from dashboard.</span></p></div>
<div class="feature"><div class="icon">🎥</div><h3>AI Campaign Projects</h3><p class="lead"><span data-ar>استقبال طلبات فيديوهات ودعاية.</span><span data-en>Capture AI video and campaign projects.</span></p></div>
</div></div></section>

<section id="pricing"><div class="wrap"><h2><span data-ar>خطط الأسعار</span><span data-en>Pricing Plans</span></h2><div class="cards">
<div class="price"><h3>Starter</h3><h2>99 AED/mo</h2><p class="lead">Requests + WhatsApp + Dashboard</p><a class="btn gold" href="/signup?plan=Starter">Start</a></div>
<div class="price"><h3>Pro</h3><h2>199 AED/mo</h2><p class="lead">AI campaigns + CRM + reports</p><a class="btn green" href="/signup?plan=Pro">Start</a></div>
<div class="price"><h3>Business</h3><h2>399 AED/mo</h2><p class="lead">Team usage + advanced dashboard</p><a class="btn blue" href="/signup?plan=Business">Start</a></div>
</div></div></section>

<section id="request"><div class="wrap"><div class="card"><h2><span data-ar>طلب خدمة تجريبي</span><span data-en>Demo Service Request</span></h2><form method="POST" action="/request"><input name="name" placeholder="Name / الاسم" required><input name="phone" placeholder="Phone / الهاتف" required><select name="service"><option>AC Maintenance - صيانة مكيفات</option><option>AI Video Ad - فيديو دعائي AI</option><option>Marketing Campaign - حملة دعاية كاملة</option></select><textarea name="notes" placeholder="Details / التفاصيل"></textarea><button class="submit">Send Request / إرسال الطلب</button></form></div></div></section>
<a class="float-call" href="tel:+${PHONE}">📞</a><a class="float-wa" target="_blank" href="https://wa.me/${PHONE}">💬</a><footer>Relax Fix Global SaaS © 2026</footer>`, "Relax Fix Global SaaS");
}

function authPage(type) {
const isSignup = type === "signup";
return layout(`${nav()}<section class="hero"><div class="wrap"><div class="card" style="max-width:560px;margin:auto"><h1>${isSignup ? "Start Trial / إنشاء حساب" : "Login / دخول"}</h1><form method="POST" action="/${type}">${isSignup ? '<input name="company" placeholder="Company Name / اسم الشركة" required>' : ''}<input name="email" type="email" placeholder="Email / البريد" required><input name="password" type="password" placeholder="Password / كلمة المرور" required>${isSignup ? '<select name="plan"><option>Starter</option><option>Pro</option><option>Business</option></select>' : ''}<button class="submit">${isSignup ? "Create Account / إنشاء حساب" : "Login / دخول"}</button></form><p class="lead">${isSignup ? '<a href="/login">Already have account?</a>' : '<a href="/signup">Create account</a>'}</p></div></div></section>`, type);
}

function dashboardPage(user) {
return layout(`${nav(user)}<div class="wrap" style="padding:30px"><h1>🎛️ Dashboard</h1><p class="lead">${escapeHtml(user.company || user.email)} — ${escapeHtml(user.plan || "Starter")}</p>
<div class="panel"><div class="stat"><strong id="total">0</strong><br>Total</div><div class="stat"><strong id="newCount">0</strong><br>New</div><div class="stat"><strong id="doneCount">0</strong><br>Done</div><div class="stat"><strong id="campaigns">0</strong><br>AI Projects</div></div>
<div class="tabs"><a class="btn gold" href="/new-request">+ Request</a><a class="btn violet" href="/new-campaign">+ AI Campaign</a><button class="btn blue" onclick="loadData()">Refresh</button></div>
<input id="search" placeholder="Search / بحث" oninput="renderRows()"><select id="filter" onchange="renderRows()"><option value="all">All</option><option value="new">New</option><option value="done">Done</option></select>
<table><thead><tr><th>Name</th><th>Phone</th><th>Service</th><th>Notes</th><th>Status</th><th>Actions</th></tr></thead><tbody id="rows"></tbody></table>
<h2 style="margin-top:35px">AI Campaign Projects</h2><table><thead><tr><th>Title</th><th>Type</th><th>Prompt</th><th>Status</th></tr></thead><tbody id="campaignRows"></tbody></table>
</div>
<script>
let allData=[];let allCampaigns=[];
async function loadData(){const r=await fetch('/api/requests');const d=await r.json();if(d.error){alert(d.error);return;}allData=d.requests||[];allCampaigns=d.campaigns||[];renderRows();renderCampaigns();}
function renderRows(){const rows=document.getElementById('rows');const q=(document.getElementById('search').value||'').toLowerCase();const f=document.getElementById('filter').value;let list=allData.filter(x=>{const text=((x.name||'')+' '+(x.phone||'')+' '+(x.service||'')+' '+(x.notes||'')).toLowerCase();return text.includes(q)&&(f==='all'||(x.status||'new')===f);});document.getElementById('total').innerText=allData.length;document.getElementById('newCount').innerText=allData.filter(x=>(x.status||'new')==='new').length;document.getElementById('doneCount').innerText=allData.filter(x=>x.status==='done').length;rows.innerHTML='';list.forEach(x=>{let phone=(x.phone||'').replace(/[^\\\\d]/g,'');if(phone.startsWith('0')) phone='971'+phone.substring(1);const tr=document.createElement('tr');tr.innerHTML='<td>'+(x.name||'')+'</td><td>'+(x.phone||'')+'</td><td>'+(x.service||'')+'</td><td>'+(x.notes||'')+'</td><td>'+(x.status||'new')+'</td><td><a class="smallbtn blue" href="tel:'+phone+'">Call</a><a class="smallbtn green" target="_blank" href="https://wa.me/'+phone+'">WhatsApp</a><button class="smallbtn gold" onclick="setStatus(\\''+x.id+'\\',\\'new\\')">New</button><button class="smallbtn green" onclick="setStatus(\\''+x.id+'\\',\\'done\\')">Done</button><button class="smallbtn red" onclick="delRow(\\''+x.id+'\\')">Delete</button></td>';rows.appendChild(tr);});}
function renderCampaigns(){document.getElementById('campaigns').innerText=allCampaigns.length;document.getElementById('campaignRows').innerHTML=allCampaigns.map(x=>'<tr><td>'+x.title+'</td><td>'+x.type+'</td><td>'+x.prompt+'</td><td>'+x.status+'</td></tr>').join('')||'<tr><td colspan="4">No campaigns</td></tr>';}
async function setStatus(id,status){await fetch('/api/status',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,status})});await loadData();}
async function delRow(id){if(!confirm('Delete?'))return;await fetch('/api/delete',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id})});await loadData();}
loadData();
</script>`, "Dashboard");
}

function requestForm(user) {
return layout(`${nav(user)}<section class="hero"><div class="wrap"><div class="card" style="max-width:650px;margin:auto"><h1>New Request / طلب جديد</h1><form method="POST" action="/request"><input name="name" placeholder="Customer name / اسم العميل" required><input name="phone" placeholder="Phone / الهاتف" required><select name="service"><option>AC Maintenance - صيانة مكيفات</option><option>Water Tank Cleaning - تنظيف خزانات</option><option>Pest Control - مكافحة حشرات</option><option>AI Video Ad - فيديو دعائي AI</option></select><textarea name="notes" placeholder="Details / التفاصيل"></textarea><button class="submit">Save Request</button></form></div></div></section>`, "New Request");
}

function campaignForm(user) {
return layout(`${nav(user)}<section class="hero"><div class="wrap"><div class="card" style="max-width:700px;margin:auto"><h1>New AI Campaign / حملة AI جديدة</h1><form method="POST" action="/campaign"><input name="title" placeholder="Campaign title / عنوان الحملة" required><select name="type"><option>Video Ad</option><option>Social Post</option><option>Brand Kit</option><option>Full Campaign</option></select><textarea name="prompt" placeholder="Prompt / فكرة الإعلان"></textarea><button class="submit">Save Campaign</button></form></div></div></section>`, "New Campaign");
}

const server = http.createServer(async (req,res)=>{
try{
const url = new URL(req.url, "http://localhost");
const user = await currentUser(req);

if(req.method==="GET" && url.pathname==="/health") return sendJson(res,{ok:true});
if(req.method==="GET" && url.pathname==="/login") return sendHtml(res, authPage("login"));
if(req.method==="GET" && url.pathname==="/signup") return sendHtml(res, authPage("signup"));
if(req.method==="GET" && url.pathname==="/logout") return sendHtml(res, `<script>document.cookie='rf_session=; Max-Age=0; path=/'; location.href='/'</script>`);
if(req.method==="GET" && url.pathname==="/dashboard") return user ? sendHtml(res, dashboardPage(user)) : sendHtml(res, authPage("login"));
if(req.method==="GET" && url.pathname==="/new-request") return user ? sendHtml(res, requestForm(user)) : sendHtml(res, authPage("login"));
if(req.method==="GET" && url.pathname==="/new-campaign") return user ? sendHtml(res, campaignForm(user)) : sendHtml(res, authPage("login"));

if(req.method==="POST" && url.pathname==="/signup"){
  const p = new URLSearchParams(await readBody(req));
  const email = p.get("email") || "";
  const password = p.get("password") || "";
  const company = p.get("company") || "";
  const plan = p.get("plan") || "Starter";
  const { data, error } = await supabase.from("users").insert([{email, password_hash:hashPassword(password), company, plan}]).select("*").single();
  if(error) return sendHtml(res, layout(`<div class="wrap" style="padding:60px"><h1>Error</h1><p>${escapeHtml(error.message)}</p><a class="btn gold" href="/signup">Back</a></div>`));
  const sid = token();
  await supabase.from("sessions").insert([{user_id:data.id, token:sid}]);
  return sendHtml(res, `<script>document.cookie='rf_session=${sid}; path=/; max-age=2592000'; location.href='/dashboard'</script>`);
}

if(req.method==="POST" && url.pathname==="/login"){
  const p = new URLSearchParams(await readBody(req));
  const email = p.get("email") || "";
  const password = p.get("password") || "";
  const { data } = await supabase.from("users").select("*").eq("email",email).eq("password_hash",hashPassword(password)).single();
  if(!data) return sendHtml(res, layout(`<div class="wrap" style="padding:60px"><h1>Wrong login</h1><a class="btn gold" href="/login">Back</a></div>`));
  const sid = token();
  await supabase.from("sessions").insert([{user_id:data.id, token:sid}]);
  return sendHtml(res, `<script>document.cookie='rf_session=${sid}; path=/; max-age=2592000'; location.href='/dashboard'</script>`);
}

if(req.method==="GET" && url.pathname==="/api/requests"){
  if(!user) return sendJson(res,{error:"Unauthorized"},401);
  const { data: requests, error } = await supabase.from("requests").select("*").eq("user_id",user.id).order("created_at",{ascending:false});
  const { data: campaigns } = await supabase.from("campaigns").select("*").eq("user_id",user.id).order("created_at",{ascending:false});
  return sendJson(res,error?{error:error.message}:{requests:requests||[],campaigns:campaigns||[]});
}

if(req.method==="POST" && url.pathname==="/api/status"){
  if(!user) return sendJson(res,{error:"Unauthorized"},401);
  const p=JSON.parse(await readBody(req)||"{}");
  const { error } = await supabase.from("requests").update({status:p.status}).eq("id",p.id).eq("user_id",user.id);
  return sendJson(res,error?{error:error.message}:{ok:true});
}

if(req.method==="POST" && url.pathname==="/api/delete"){
  if(!user) return sendJson(res,{error:"Unauthorized"},401);
  const p=JSON.parse(await readBody(req)||"{}");
  const { error } = await supabase.from("requests").delete().eq("id",p.id).eq("user_id",user.id);
  return sendJson(res,error?{error:error.message}:{ok:true});
}

if(req.method==="POST" && url.pathname==="/request"){
  const p=new URLSearchParams(await readBody(req));
  const order={user_id:user?user.id:null,name:p.get("name")||"",phone:p.get("phone")||"",service:p.get("service")||"",notes:p.get("notes")||"",status:"new"};
  const {error}=await supabase.from("requests").insert([order]);
  if(error) return sendHtml(res, layout(`<div class="wrap" style="padding:60px"><h1>Error</h1><p>${escapeHtml(error.message)}</p><a class="btn gold" href="/">Back</a></div>`));
  const msg=encodeURIComponent(`طلب جديد من Relax Fix\\nName/الاسم: ${order.name}\\nPhone/الهاتف: ${order.phone}\\nService/الخدمة: ${order.service}\\nDetails/التفاصيل: ${order.notes}`);
  const wa="https://wa.me/"+PHONE+"?text="+msg;
  return sendHtml(res, layout(`<div class="wrap" style="padding:60px;text-align:center"><h1 style="color:#22c55e">Saved / تم الحفظ</h1><a class="btn green" target="_blank" href="${wa}">WhatsApp</a><a class="btn gold" href="${user?'/dashboard':'/'}">Continue</a><script>setTimeout(()=>window.open("${wa}","_blank"),700)</script></div>`));
}

if(req.method==="POST" && url.pathname==="/campaign"){
  if(!user) return sendHtml(res, authPage("login"));
  const p=new URLSearchParams(await readBody(req));
  const { error } = await supabase.from("campaigns").insert([{user_id:user.id,title:p.get("title")||"",type:p.get("type")||"",prompt:p.get("prompt")||"",status:"draft"}]);
  if(error) return sendHtml(res, layout(`<div class="wrap" style="padding:60px"><h1>Error</h1><p>${escapeHtml(error.message)}</p></div>`));
  return sendHtml(res, `<script>location.href='/dashboard'</script>`);
}

return sendHtml(res, homePage(user));
}catch(err){sendHtml(res, "<pre>"+escapeHtml(err.message)+"</pre>", 500);}
});

server.listen(process.env.PORT || 3000,()=>console.log("Relax Fix Global SaaS running"));