const http = require("http");
const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.SUPABASE_URL || "https://nmzxrjdxvmmzzmajrskm.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_KEY || "sb_publishable_qXOPVaD5_f60qf1UbYrm2A_sH9c0lW5";
const PHONE = process.env.PHONE || "971588259848";
const ADMIN_PASS = process.env.ADMIN_PASS || "123456";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function sendHtml(res, content, status = 200) {
  res.writeHead(status, {"Content-Type":"text/html;charset=utf-8"});
  res.end(content);
}
function sendJson(res, data, status = 200) {
  res.writeHead(status, {"Content-Type":"application/json;charset=utf-8"});
  res.end(JSON.stringify(data));
}
function readBody(req) {
  return new Promise(resolve => {
    let data = "";
    req.on("data", chunk => data += chunk.toString());
    req.on("end", () => resolve(data));
  });
}
function escapeHtml(v) {
  return String(v ?? "").replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
}

function layout(content, title="Relax Fix SaaS") {
return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<style>
:root{--bg:#050814;--card:#0f172a;--text:#fff;--muted:#cbd5e1;--green:#22c55e;--blue:#0ea5e9;--gold:#facc15;--red:#ef4444;--border:#263244}
*{box-sizing:border-box}body{margin:0;font-family:Arial,Tahoma,sans-serif;background:#050814;color:#fff}a{text-decoration:none;color:inherit}.wrap{width:min(1180px,92%);margin:auto}
header{position:sticky;top:0;background:rgba(2,6,23,.9);border-bottom:1px solid rgba(255,255,255,.1);z-index:9}.nav{min-height:72px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}.logo{font-size:25px;font-weight:900}.btn{display:inline-block;padding:12px 18px;border-radius:14px;font-weight:900;margin:5px;border:0;cursor:pointer}.green{background:var(--green);color:white}.blue{background:var(--blue);color:white}.gold{background:var(--gold);color:#111}.red{background:var(--red);color:white}.dark{background:#111827;color:white}
.hero{padding:80px 0;background:radial-gradient(circle at top right,rgba(34,197,94,.28),transparent 32%),linear-gradient(135deg,#07111f,#020617)}.grid{display:grid;grid-template-columns:1.1fr .9fr;gap:28px;align-items:center}h1{font-size:clamp(38px,7vw,72px);line-height:1;margin:0 0 18px}h2{font-size:34px;margin:0 0 14px}.lead{font-size:19px;color:var(--muted);line-height:1.7}.badge{display:inline-block;background:rgba(34,197,94,.14);color:#86efac;border:1px solid rgba(34,197,94,.35);padding:9px 14px;border-radius:999px;font-weight:900;margin-bottom:15px}
.card{background:rgba(15,23,42,.86);border:1px solid rgba(255,255,255,.12);border-radius:26px;padding:24px;box-shadow:0 22px 70px rgba(0,0,0,.35)}
input,textarea,select{width:100%;padding:14px;margin:8px 0;border-radius:12px;border:0;font-size:16px;background:#fff;color:#111}textarea{min-height:100px}button.submit{width:100%;padding:15px;border:0;border-radius:14px;background:linear-gradient(135deg,#22c55e,#0ea5e9);color:#fff;font-weight:900;font-size:17px;cursor:pointer}
section{padding:52px 0}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.service,.feature{background:#0f172a;border:1px solid #263244;border-radius:24px;padding:22px}.service{cursor:pointer}.service:hover{border-color:#22c55e}.icon{font-size:38px}
.float-wa,.float-call{position:fixed;right:18px;color:#fff;padding:14px 18px;border-radius:999px;font-weight:900;z-index:99}.float-wa{bottom:18px;background:#25D366}.float-call{bottom:78px;background:#0ea5e9}
footer{text-align:center;background:#020617;color:#94a3b8;padding:30px;border-top:1px solid rgba(255,255,255,.08)}
table{width:100%;border-collapse:collapse;margin-top:18px;background:#0f172a}th,td{border:1px solid #263244;padding:10px;text-align:right;vertical-align:top}th{background:#111827}.smallbtn{padding:7px 10px;border-radius:8px;color:#fff;margin:3px;display:inline-block;border:0;cursor:pointer}.panel{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:18px 0}.stat{background:#0f172a;border:1px solid #263244;border-radius:18px;padding:18px}.stat strong{font-size:26px;color:#22c55e}
@media(max-width:850px){.grid,.cards,.panel{grid-template-columns:1fr}.nav,.hero{text-align:center}h1{font-size:42px}}
</style>
</head>
<body>${content}</body></html>`;
}

function homePage() {
return layout(`
<header><div class="wrap nav"><div class="logo">â¡ Relax Fix SaaS</div><div><a class="btn blue" href="tel:+${PHONE}">ð Ø§ØªØµØ§Ù</a><a class="btn green" target="_blank" href="https://wa.me/${PHONE}?text=Hello%20Relax%20Fix">ð¬ ÙØ§ØªØ³Ø§Ø¨</a><a class="btn gold" href="/admin">Dashboard</a></div></div></header>
<section class="hero"><div class="wrap grid"><div><div class="badge">SaaS Ø­ÙÙÙÙ ÙØ¥Ø¯Ø§Ø±Ø© Ø·ÙØ¨Ø§Øª Ø§ÙØµÙØ§ÙØ©</div><h1>Relax Fix 2026</h1><p class="lead">ÙÙÙØ¹ + Backend + Database + Dashboard + API ÙØ¥Ø¯Ø§Ø±Ø© Ø§ÙØ¹ÙÙØ§Ø¡ ÙØ§ÙØ·ÙØ¨Ø§Øª.</p><a class="btn gold" href="#booking">Ø§Ø­Ø¬Ø² Ø§ÙØ¢Ù</a><a class="btn green" target="_blank" href="https://wa.me/${PHONE}?text=I%20need%20service">Ø·ÙØ¨ Ø³Ø¹Ø±</a></div>
<div class="card"><h2>Ø­Ø¬Ø² Ø³Ø±ÙØ¹</h2><form method="POST" action="/request"><input name="name" placeholder="Ø§ÙØ§Ø³Ù" required><input name="phone" placeholder="Ø§ÙÙØ§ØªÙ" required><select name="service" required><option value="">Ø§Ø®ØªØ± Ø§ÙØ®Ø¯ÙØ©</option><option>ØµÙØ§ÙØ© ÙÙÙÙØ§Øª</option><option>ØªÙØ¸ÙÙ ÙÙÙÙØ§Øª</option><option>ØªÙØ¸ÙÙ Ø®Ø²Ø§ÙØ§Øª</option><option>ÙÙØ§ÙØ­Ø© Ø­Ø´Ø±Ø§Øª</option><option>ÙÙØ¯ÙÙ Ø¯Ø¹Ø§Ø¦Ù AI</option><option>Ø­ÙÙØ© Ø¯Ø¹Ø§ÙØ© ÙØ§ÙÙØ©</option></select><textarea name="notes" placeholder="Ø§ÙØªÙØ§ØµÙÙ / Ø§ÙÙÙÙØ¹ / Ø§ÙÙÙØ¹Ø¯"></textarea><button class="submit" type="submit">Ø¥Ø±Ø³Ø§Ù Ø§ÙØ·ÙØ¨ + ÙØªØ­ ÙØ§ØªØ³Ø§Ø¨</button></form></div></div></section>
<section><div class="wrap"><h2>Ø§ÙØ®Ø¯ÙØ§Øª</h2><div class="cards"><div class="service" onclick="pick('ØµÙØ§ÙØ© ÙÙÙÙØ§Øª')"><div class="icon">âï¸</div><h3>ØµÙØ§ÙØ© ÙÙÙÙØ§Øª</h3><p class="lead">ÙØ­ØµØ ØªÙØ¸ÙÙØ ØªØµÙÙØ­Ø Ø¶Ø¹Ù ØªØ¨Ø±ÙØ¯.</p></div><div class="service" onclick="pick('ØªÙØ¸ÙÙ Ø®Ø²Ø§ÙØ§Øª')"><div class="icon">ð§</div><h3>ØªÙØ¸ÙÙ Ø®Ø²Ø§ÙØ§Øª</h3><p class="lead">ØªÙØ¸ÙÙ ÙØªØ¹ÙÙÙ Ø®Ø²Ø§ÙØ§Øª.</p></div><div class="service" onclick="pick('ÙÙØ§ÙØ­Ø© Ø­Ø´Ø±Ø§Øª')"><div class="icon">ð</div><h3>ÙÙØ§ÙØ­Ø© Ø­Ø´Ø±Ø§Øª</h3><p class="lead">ÙÙØ§Ø²Ù ÙÙÙØ§ØªØ¨ ÙØ´Ø±ÙØ§Øª.</p></div></div></div></section>
<section id="booking"><div class="wrap"><div class="card"><h2>Ø·ÙØ¨ Ø®Ø¯ÙØ©</h2><form method="POST" action="/request"><input name="name" placeholder="Ø§ÙØ§Ø³Ù" required><input name="phone" placeholder="Ø§ÙÙØ§ØªÙ" required><input id="serviceInput" name="service" placeholder="Ø§ÙØ®Ø¯ÙØ©" required><textarea name="notes" placeholder="Ø§ÙØªÙØ§ØµÙÙ"></textarea><button class="submit" type="submit">Ø¥Ø±Ø³Ø§Ù Ø§ÙØ·ÙØ¨</button></form></div></div></section>
<a class="float-call" href="tel:+${PHONE}">ð Ø§ØªØµØ§Ù</a><a class="float-wa" target="_blank" href="https://wa.me/${PHONE}">ð¬ ÙØ§ØªØ³Ø§Ø¨</a><footer>Relax Fix SaaS Â© 2026</footer><script>function pick(s){document.getElementById("serviceInput").value=s;document.getElementById("booking").scrollIntoView({behavior:"smooth"});}</script>`);
}

function adminPage() {
return layout(`
<div class="wrap" style="padding:30px"><h1>ðï¸ Relax Fix Control Room</h1><p class="lead">Ø¥Ø¯Ø§Ø±Ø© Ø§ÙØ·ÙØ¨Ø§Øª ÙØ§ÙØ¹ÙÙØ§Ø¡ ÙØ§ÙØ­Ø§ÙØ§Øª.</p><input id="pass" type="password" placeholder="Admin password"><button class="btn green" onclick="loadData()">ÙØªØ­ Dashboard</button><button class="btn blue" onclick="alert('Notifications ready â')">Ø§Ø®ØªØ¨Ø§Ø± Ø¥Ø´Ø¹Ø§Ø±</button>
<div class="panel"><div class="stat"><strong id="total">0</strong><br>ÙÙ Ø§ÙØ·ÙØ¨Ø§Øª</div><div class="stat"><strong id="newCount">0</strong><br>Ø¬Ø¯ÙØ¯</div><div class="stat"><strong id="doneCount">0</strong><br>ØªÙ</div><div class="stat"><strong id="todayCount">0</strong><br>Ø§ÙÙÙÙ</div></div>
<input id="search" placeholder="Ø¨Ø­Ø«..." oninput="renderRows()"><select id="filter" onchange="renderRows()"><option value="all">Ø§ÙÙÙ</option><option value="new">Ø¬Ø¯ÙØ¯</option><option value="done">ØªÙ</option></select>
<table><thead><tr><th>Ø§ÙØ§Ø³Ù</th><th>Ø§ÙÙØ§ØªÙ</th><th>Ø§ÙØ®Ø¯ÙØ©</th><th>Ø§ÙØªÙØ§ØµÙÙ</th><th>Ø§ÙØ­Ø§ÙØ©</th><th>Ø¥Ø¬Ø±Ø§Ø¡Ø§Øª</th></tr></thead><tbody id="rows"></tbody></table></div>
<script>
let allData=[];
async function loadData(){const pass=document.getElementById("pass").value;const res=await fetch("/api/requests?pass="+encodeURIComponent(pass));const data=await res.json();if(data.error){alert(data.error);return;}allData=data;renderRows();}
function renderRows(){const rows=document.getElementById("rows");const q=(document.getElementById("search").value||"").toLowerCase();const f=document.getElementById("filter").value;let list=allData.filter(x=>{const text=((x.name||"")+" "+(x.phone||"")+" "+(x.service||"")+" "+(x.notes||"")).toLowerCase();return text.includes(q)&&(f==="all"||(x.status||"new")===f);});const today=new Date().toDateString();document.getElementById("total").innerText=allData.length;document.getElementById("newCount").innerText=allData.filter(x=>(x.status||"new")==="new").length;document.getElementById("doneCount").innerText=allData.filter(x=>x.status==="done").length;document.getElementById("todayCount").innerText=allData.filter(x=>x.created_at&&new Date(x.created_at).toDateString()===today).length;rows.innerHTML="";list.forEach(x=>{let phone=(x.phone||"").replace(/[^\d]/g,"");if(phone.startsWith("0"))phone="971"+phone.substring(1);const tr=document.createElement("tr");tr.innerHTML="<td>"+(x.name||"")+"</td><td>"+(x.phone||"")+"</td><td>"+(x.service||"")+"</td><td>"+(x.notes||"")+"</td><td>"+(x.status||"new")+"</td><td><a class='smallbtn blue' href='tel:"+phone+"'>Call</a><a class='smallbtn green' target='_blank' href='https://wa.me/"+phone+"'>WhatsApp</a><button class='smallbtn gold' onclick=\"setStatus('"+x.id+"','new')\">New</button><button class='smallbtn green' onclick=\"setStatus('"+x.id+"','done')\">Done</button><button class='smallbtn red' onclick=\"delRow('"+x.id+"')\">Delete</button></td>";rows.appendChild(tr);});}
async function setStatus(id,status){const pass=document.getElementById("pass").value;await fetch("/api/status?pass="+encodeURIComponent(pass),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,status})});await loadData();}
async function delRow(id){if(!confirm("Ø­Ø°Ù Ø§ÙØ·ÙØ¨Ø"))return;const pass=document.getElementById("pass").value;await fetch("/api/delete?pass="+encodeURIComponent(pass),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id})});await loadData();}
</script>`, "Relax Fix Admin");
}

const server = http.createServer(async (req,res)=>{
try{
const url = new URL(req.url, "http://localhost");
if(req.method==="GET" && url.pathname==="/health") return sendJson(res,{ok:true});
if(req.method==="GET" && url.pathname.startsWith("/admin")) return sendHtml(res,adminPage());
if(req.method==="GET" && url.pathname==="/api/requests"){
 if(url.searchParams.get("pass")!==ADMIN_PASS) return sendJson(res,{error:"Unauthorized"},401);
 const {data,error}=await supabase.from("requests").select("*").order("created_at",{ascending:false});
 return sendJson(res,error?{error:error.message}:data);
}
if(req.method==="POST" && url.pathname==="/api/status"){
 if(url.searchParams.get("pass")!==ADMIN_PASS) return sendJson(res,{error:"Unauthorized"},401);
 const p=JSON.parse(await readBody(req)||"{}");
 const {error}=await supabase.from("requests").update({status:p.status}).eq("id",p.id);
 return sendJson(res,error?{error:error.message}:{ok:true});
}
if(req.method==="POST" && url.pathname==="/api/delete"){
 if(url.searchParams.get("pass")!==ADMIN_PASS) return sendJson(res,{error:"Unauthorized"},401);
 const p=JSON.parse(await readBody(req)||"{}");
 const {error}=await supabase.from("requests").delete().eq("id",p.id);
 return sendJson(res,error?{error:error.message}:{ok:true});
}
if(req.method==="POST" && url.pathname==="/request"){
 const p=new URLSearchParams(await readBody(req));
 const order={name:p.get("name")||"",phone:p.get("phone")||"",service:p.get("service")||"",notes:p.get("notes")||"",status:"new"};
 const {error}=await supabase.from("requests").insert([order]);
 if(error) return sendHtml(res,layout(`<div class="wrap" style="padding:60px;text-align:center"><h1>â Error</h1><p>${escapeHtml(error.message)}</p><a class="btn gold" href="/">Back</a></div>`));
 const msg=encodeURIComponent(`Ø·ÙØ¨ Ø¬Ø¯ÙØ¯ ÙÙ Relax Fix\nØ§ÙØ§Ø³Ù: ${order.name}\nØ§ÙÙØ§ØªÙ: ${order.phone}\nØ§ÙØ®Ø¯ÙØ©: ${order.service}\nØ§ÙØªÙØ§ØµÙÙ: ${order.notes}`);
 const wa="https://wa.me/"+PHONE+"?text="+msg;
 return sendHtml(res,layout(`<div class="wrap" style="padding:60px;text-align:center"><h1 style="color:#22c55e">â ØªÙ Ø­ÙØ¸ Ø§ÙØ·ÙØ¨</h1><p class="lead">Ø³ÙØªÙ ÙØªØ­ ÙØ§ØªØ³Ø§Ø¨.</p><a class="btn green" target="_blank" href="${wa}">ÙØªØ­ ÙØ§ØªØ³Ø§Ø¨</a><br><br><a class="btn gold" href="/">Ø§ÙØ±Ø¦ÙØ³ÙØ©</a><script>setTimeout(()=>window.open("${wa}","_blank"),800)</script></div>`));
}
return sendHtml(res,homePage());
}catch(err){sendHtml(res,"<pre>"+escapeHtml(err.message)+"</pre>",500);}
});
server.listen(process.env.PORT || 3000,()=>console.log("Relax Fix SaaS running"));