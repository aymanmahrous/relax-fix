
const http = require("http");
const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.SUPABASE_URL || "https://nmzxrjdxvmmzzmajrskm.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_KEY || "sb_publishable_qXOPVaD5_f60qf1UbYrm2A_sH9c0lW5";
const PHONE = process.env.PHONE || "971588259848";
const ADMIN_PASS = process.env.ADMIN_PASS || "123456";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function sendHtml(res, html, status=200){
  res.writeHead(status, {"Content-Type":"text/html; charset=utf-8", "Cache-Control":"no-store"});
  res.end(html);
}
function sendJson(res, data, status=200){
  res.writeHead(status, {"Content-Type":"application/json; charset=utf-8", "Cache-Control":"no-store"});
  res.end(JSON.stringify(data));
}
function readBody(req){
  return new Promise(resolve=>{
    let data="";
    req.on("data", c=>data+=c.toString("utf8"));
    req.on("end", ()=>resolve(data));
  });
}
function esc(v){
  return String(v ?? "").replace(/[&<>"']/g, m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}

function layout(content, title="Relax Fix 2026"){
return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<style>
*{box-sizing:border-box}body{margin:0;font-family:Arial,Tahoma,sans-serif;background:#050814;color:#fff}a{text-decoration:none;color:inherit}.wrap{width:min(1150px,92%);margin:auto}
header{position:sticky;top:0;background:#07111f;border-bottom:1px solid #1f2937;z-index:9}.nav{min-height:72px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}.logo{font-size:24px;font-weight:900}.btn{display:inline-block;padding:12px 18px;border-radius:14px;font-weight:900;margin:5px;border:0;cursor:pointer}.green{background:#22c55e}.blue{background:#0ea5e9}.gold{background:#facc15;color:#111}.red{background:#ef4444}.dark{background:#111827}
.hero{padding:75px 0;background:radial-gradient(circle at top right,rgba(34,197,94,.25),transparent 35%),linear-gradient(135deg,#07111f,#020617)}.grid{display:grid;grid-template-columns:1.05fr .95fr;gap:28px;align-items:center}h1{font-size:clamp(38px,7vw,70px);margin:0 0 18px;line-height:1.05}h2{font-size:32px;margin:0 0 14px}.lead{font-size:19px;color:#cbd5e1;line-height:1.7}.badge{display:inline-block;background:rgba(34,197,94,.14);color:#86efac;border:1px solid rgba(34,197,94,.35);padding:9px 14px;border-radius:999px;font-weight:900;margin-bottom:15px}
.card{background:#0f172a;border:1px solid #263244;border-radius:24px;padding:24px;box-shadow:0 22px 70px rgba(0,0,0,.35)}input,textarea,select{width:100%;padding:14px;margin:8px 0;border-radius:12px;border:0;font-size:16px;background:#fff;color:#111}textarea{min-height:100px}.submit{width:100%;padding:15px;border:0;border-radius:14px;background:linear-gradient(135deg,#22c55e,#0ea5e9);color:#fff;font-weight:900;font-size:17px;cursor:pointer}
section{padding:50px 0}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.service{background:#0f172a;border:1px solid #263244;border-radius:24px;padding:22px;cursor:pointer}.service:hover{border-color:#22c55e}.icon{font-size:38px}.float-wa,.float-call{position:fixed;right:18px;color:#fff;padding:14px 18px;border-radius:999px;font-weight:900;z-index:99}.float-wa{bottom:18px;background:#25D366}.float-call{bottom:78px;background:#0ea5e9}
footer{text-align:center;background:#020617;color:#94a3b8;padding:30px;border-top:1px solid #1f2937}table{width:100%;border-collapse:collapse;margin-top:18px;background:#0f172a}th,td{border:1px solid #263244;padding:10px;text-align:right;vertical-align:top}th{background:#111827}.smallbtn{padding:7px 10px;border-radius:8px;color:#fff;margin:3px;display:inline-block;border:0;cursor:pointer}.panel{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:18px 0}.stat{background:#0f172a;border:1px solid #263244;border-radius:18px;padding:18px}.stat strong{font-size:26px;color:#22c55e}
.lang-en [data-ar]{display:none}.lang-ar [data-en]{display:none}
@media(max-width:850px){.grid,.cards,.panel{grid-template-columns:1fr}.nav,.hero{text-align:center}h1{font-size:42px}}
</style>
</head>
<body class="lang-ar">${content}
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

function homePage(){
return layout(`
<header><div class="wrap nav"><div class="logo">⚡ Relax Fix 2026</div><div><button class="btn dark" onclick="toggleLang()">🌍 عربي / EN</button><a class="btn blue" href="tel:+${PHONE}"><span data-ar>📞 اتصال</span><span data-en>📞 Call</span></a><a class="btn green" target="_blank" href="https://wa.me/${PHONE}"><span data-ar>💬 واتساب</span><span data-en>💬 WhatsApp</span></a><a class="btn gold" href="/admin">Dashboard</a></div></div></header>
<section class="hero"><div class="wrap grid"><div><div class="badge"><span data-ar>نظام SaaS حقيقي لإدارة طلبات الصيانة</span><span data-en>Real SaaS system for service requests</span></div><h1>Relax Fix 2026</h1><p class="lead"><span data-ar>موقع + Backend + قاعدة بيانات + لوحة تحكم + API لإدارة العملاء والطلبات.</span><span data-en>Website + Backend + Database + Dashboard + API to manage customers and requests.</span></p><a class="btn gold" href="#booking"><span data-ar>احجز الآن</span><span data-en>Book Now</span></a><a class="btn green" target="_blank" href="https://wa.me/${PHONE}?text=I%20need%20service"><span data-ar>طلب سعر</span><span data-en>Get Price</span></a></div>
<div class="card"><h2><span data-ar>حجز سريع</span><span data-en>Quick Booking</span></h2><form method="POST" action="/request"><input name="name" placeholder="Name / الاسم" required><input name="phone" placeholder="Phone / الهاتف" required><select name="service" required><option value="">Select Service / اختر الخدمة</option><option>AC Maintenance - صيانة مكيفات</option><option>AC Cleaning - تنظيف مكيفات</option><option>Water Tank Cleaning - تنظيف خزانات</option><option>Pest Control - مكافحة حشرات</option><option>AI Video Ad - فيديو دعائي AI</option><option>Marketing Campaign - حملة دعاية كاملة</option></select><textarea name="notes" placeholder="Details / التفاصيل"></textarea><button class="submit" type="submit">Send Request / إرسال الطلب</button></form></div></div></section>
<section><div class="wrap"><h2><span data-ar>الخدمات</span><span data-en>Services</span></h2><div class="cards"><div class="service" onclick="pick('AC Maintenance - صيانة مكيفات')"><div class="icon">❄️</div><h3>AC Maintenance / صيانة مكيفات</h3><p class="lead">Cooling, repair, cleaning / تبريد، تصليح، تنظيف.</p></div><div class="service" onclick="pick('Water Tank Cleaning - تنظيف خزانات')"><div class="icon">💧</div><h3>Tank Cleaning / تنظيف خزانات</h3><p class="lead">Cleaning and sanitizing / تنظيف وتعقيم.</p></div><div class="service" onclick="pick('Pest Control - مكافحة حشرات')"><div class="icon">🐜</div><h3>Pest Control / مكافحة حشرات</h3><p class="lead">Homes and offices / منازل ومكاتب.</p></div></div></div></section>
<section id="booking"><div class="wrap"><div class="card"><h2><span data-ar>طلب خدمة</span><span data-en>Request Service</span></h2><form method="POST" action="/request"><input name="name" placeholder="Name / الاسم" required><input name="phone" placeholder="Phone / الهاتف" required><input id="serviceInput" name="service" placeholder="Service / الخدمة" required><textarea name="notes" placeholder="Details / التفاصيل"></textarea><button class="submit" type="submit">Send Request / إرسال الطلب</button></form></div></div></section>
<a class="float-call" href="tel:+${PHONE}">📞</a><a class="float-wa" target="_blank" href="https://wa.me/${PHONE}">💬</a><footer>Relax Fix SaaS © 2026</footer><script>function pick(s){document.getElementById("serviceInput").value=s;document.getElementById("booking").scrollIntoView({behavior:"smooth"});}</script>`);
}

function adminPage(){
return layout(`
<div class="wrap" style="padding:30px"><h1>🎛️ Relax Fix Control Room</h1><p class="lead">Dashboard / لوحة التحكم</p><button class="btn dark" onclick="toggleLang()">🌍 عربي / EN</button><input id="pass" type="password" placeholder="Admin password / كلمة المرور"><button class="btn green" onclick="loadData()">Open Dashboard / فتح</button>
<div class="panel"><div class="stat"><strong id="total">0</strong><br>Total / الكل</div><div class="stat"><strong id="newCount">0</strong><br>New / جديد</div><div class="stat"><strong id="doneCount">0</strong><br>Done / تم</div><div class="stat"><strong id="todayCount">0</strong><br>Today / اليوم</div></div>
<input id="search" placeholder="Search / بحث" oninput="renderRows()"><select id="filter" onchange="renderRows()"><option value="all">All / الكل</option><option value="new">New / جديد</option><option value="done">Done / تم</option></select>
<table><thead><tr><th>Name / الاسم</th><th>Phone / الهاتف</th><th>Service / الخدمة</th><th>Notes / التفاصيل</th><th>Status / الحالة</th><th>Actions / إجراءات</th></tr></thead><tbody id="rows"></tbody></table></div>
<script>
let allData=[];
async function loadData(){const pass=document.getElementById("pass").value;const res=await fetch("/api/requests?pass="+encodeURIComponent(pass));const data=await res.json();if(data.error){alert(data.error);return;}allData=data;renderRows();}
function renderRows(){const rows=document.getElementById("rows");const q=(document.getElementById("search").value||"").toLowerCase();const f=document.getElementById("filter").value;let list=allData.filter(x=>{const text=((x.name||"")+" "+(x.phone||"")+" "+(x.service||"")+" "+(x.notes||"")).toLowerCase();return text.includes(q)&&(f==="all"||(x.status||"new")===f);});const today=new Date().toDateString();document.getElementById("total").innerText=allData.length;document.getElementById("newCount").innerText=allData.filter(x=>(x.status||"new")==="new").length;document.getElementById("doneCount").innerText=allData.filter(x=>x.status==="done").length;document.getElementById("todayCount").innerText=allData.filter(x=>x.created_at&&new Date(x.created_at).toDateString()===today).length;rows.innerHTML="";list.forEach(x=>{let phone=(x.phone||"").replace(/[^\\d]/g,"");if(phone.startsWith("0"))phone="971"+phone.substring(1);const tr=document.createElement("tr");tr.innerHTML="<td>"+(x.name||"")+"</td><td>"+(x.phone||"")+"</td><td>"+(x.service||"")+"</td><td>"+(x.notes||"")+"</td><td>"+(x.status||"new")+"</td><td><a class='smallbtn blue' href='tel:"+phone+"'>Call</a><a class='smallbtn green' target='_blank' href='https://wa.me/"+phone+"'>WhatsApp</a><button class='smallbtn gold' onclick=\\"setStatus('"+x.id+"','new')\\">New</button><button class='smallbtn green' onclick=\\"setStatus('"+x.id+"','done')\\">Done</button><button class='smallbtn red' onclick=\\"delRow('"+x.id+"')\\">Delete</button></td>";rows.appendChild(tr);});}
async function setStatus(id,status){const pass=document.getElementById("pass").value;await fetch("/api/status?pass="+encodeURIComponent(pass),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,status})});await loadData();}
async function delRow(id){if(!confirm("Delete / حذف؟"))return;const pass=document.getElementById("pass").value;await fetch("/api/delete?pass="+encodeURIComponent(pass),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id})});await loadData();}
</script>`, "Relax Fix Admin");
}

const server=http.createServer(async(req,res)=>{try{const url=new URL(req.url,"http://localhost");if(req.method==="GET"&&url.pathname==="/health")return sendJson(res,{ok:true});if(req.method==="GET"&&url.pathname.startsWith("/admin"))return sendHtml(res,adminPage());if(req.method==="GET"&&url.pathname==="/api/requests"){if(url.searchParams.get("pass")!==ADMIN_PASS)return sendJson(res,{error:"Unauthorized"},401);const{data,error}=await supabase.from("requests").select("*").order("created_at",{ascending:false});return sendJson(res,error?{error:error.message}:data);}if(req.method==="POST"&&url.pathname==="/api/status"){if(url.searchParams.get("pass")!==ADMIN_PASS)return sendJson(res,{error:"Unauthorized"},401);const p=JSON.parse(await readBody(req)||"{}");const{error}=await supabase.from("requests").update({status:p.status}).eq("id",p.id);return sendJson(res,error?{error:error.message}:{ok:true});}if(req.method==="POST"&&url.pathname==="/api/delete"){if(url.searchParams.get("pass")!==ADMIN_PASS)return sendJson(res,{error:"Unauthorized"},401);const p=JSON.parse(await readBody(req)||"{}");const{error}=await supabase.from("requests").delete().eq("id",p.id);return sendJson(res,error?{error:error.message}:{ok:true});}if(req.method==="POST"&&url.pathname==="/request"){const p=new URLSearchParams(await readBody(req));const order={name:p.get("name")||"",phone:p.get("phone")||"",service:p.get("service")||"",notes:p.get("notes")||"",status:"new"};const{error}=await supabase.from("requests").insert([order]);if(error)return sendHtml(res,layout(`<div class="wrap" style="padding:60px;text-align:center"><h1>❌ Error</h1><p>${esc(error.message)}</p><a class="btn gold" href="/">Back</a></div>`));const msg=encodeURIComponent(`طلب جديد من Relax Fix\\nName/الاسم: ${order.name}\\nPhone/الهاتف: ${order.phone}\\nService/الخدمة: ${order.service}\\nDetails/التفاصيل: ${order.notes}`);const wa="https://wa.me/"+PHONE+"?text="+msg;return sendHtml(res,layout(`<div class="wrap" style="padding:60px;text-align:center"><h1 style="color:#22c55e">✅ تم حفظ الطلب / Request Saved</h1><p class="lead">سيتم فتح واتساب / WhatsApp will open.</p><a class="btn green" target="_blank" href="${wa}">Open WhatsApp</a><br><br><a class="btn gold" href="/">Home / الرئيسية</a><script>setTimeout(()=>window.open("${wa}","_blank"),800)</script></div>`));}return sendHtml(res,homePage());}catch(err){sendHtml(res,"<pre>"+esc(err.message)+"</pre>",500);}});
server.listen(process.env.PORT||3000,()=>console.log("Relax Fix SaaS bilingual running"));
if (req.method === "POST" && req.url === "/login") {
  let body = "";
  req.on("data", c => body += c);
  req.on("end", async () => {
    const p = new URLSearchParams(body);

    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("email", p.get("email"))
      .eq("password", p.get("password"))
      .single();

    if (!data) {
      res.end("❌ Wrong login");
      return;
    }

    res.writeHead(302, {
      Location: "/dashboard?user=" + data.id
    });
    res.end();
  });
}