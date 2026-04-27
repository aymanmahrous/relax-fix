const http = require("http");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://nmzxrjdxvmmzzmajrskm.supabase.co",
  "sb_publishable_qXOPVaD5_f60qf1UbYrm2A_sH9c0lW5"
);

const ADMIN_PASS = "123456";
const DEFAULT_WHATSAPP = "971588259848";

function esc(v = "") {
  return String(v).replace(/[&<>"']/g, m => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[m]));
}

async function getSettings() {
  const { data } = await supabase.from("settings").select("*").eq("id", 1).single();
  return data || {
    site_title: "RELAX FIX",
    site_desc: "صيانة تكييف وخدمات منزلية في أبوظبي",
    whatsapp: DEFAULT_WHATSAPP,
    theme_color: "#22c55e",
    bg_url: ""
  };
}

function layout(content, s = {}) {
  const title = esc(s.site_title || "RELAX FIX");
  const desc = esc(s.site_desc || "صيانة تكييف وخدمات منزلية في أبوظبي");
  const color = esc(s.theme_color || "#22c55e");
  const bg = esc(s.bg_url || "");

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<style>
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;font-family:Arial,Tahoma,sans-serif;background:#050914;color:#fff;background-image:linear-gradient(rgba(5,9,20,.88),rgba(5,9,20,.95)),url('${bg}');background-size:cover;background-position:center}
a{text-decoration:none;color:inherit}
.wrap{width:min(1150px,92%);margin:auto}
header{position:sticky;top:0;z-index:50;background:#020617ee;border-bottom:1px solid #1e293b}
nav{min-height:74px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}
.logo{font-size:25px;font-weight:900}
.btn{display:inline-block;padding:13px 18px;border-radius:16px;font-weight:900;margin:5px;border:0;cursor:pointer}
.green{background:${color};color:#fff}.blue{background:#0ea5e9;color:#fff}.gold{background:#facc15;color:#111}.red{background:#ef4444;color:#fff}.dark{background:#111827;color:#fff}
.hero{padding:85px 0;background:radial-gradient(circle at top right,${color}55,transparent 35%),radial-gradient(circle at top left,#0ea5e955,transparent 35%)}
.grid{display:grid;grid-template-columns:1.1fr .9fr;gap:28px;align-items:center}
h1{font-size:clamp(40px,7vw,76px);line-height:1;margin:0 0 18px}
h2{font-size:clamp(28px,4vw,42px)}
.lead{font-size:20px;color:#cbd5e1;line-height:1.7}
.badge{display:inline-block;background:${color}22;color:#d1fae5;border:1px solid ${color}66;padding:10px 16px;border-radius:999px;font-weight:900;margin-bottom:16px}
.card,.service,.stat{background:#0f172a;border:1px solid #263244;border-radius:28px;padding:26px;box-shadow:0 20px 60px #0006}
input,textarea,select{width:100%;padding:15px;margin:8px 0;border-radius:14px;border:0;font-size:16px}
textarea{min-height:100px}
button.submit{width:100%;padding:15px;border:0;border-radius:14px;background:linear-gradient(135deg,${color},#0ea5e9);color:#fff;font-weight:900;font-size:17px}
section{padding:52px 0}
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.service{cursor:pointer;transition:.2s}.service:hover{transform:translateY(-5px);border-color:${color}}
.icon{font-size:42px}
.offer{background:linear-gradient(135deg,${color},#0ea5e9);color:#02140b;border-radius:30px;padding:40px;text-align:center;font-weight:900}
.float-wa,.float-call{position:fixed;right:18px;color:white;padding:15px 20px;border-radius:999px;font-weight:900;z-index:99}
.float-wa{bottom:18px;background:#25D366}.float-call{bottom:82px;background:#0ea5e9}
footer{text-align:center;background:#020617;color:#94a3b8;padding:35px}
table{width:100%;border-collapse:collapse;margin-top:20px;background:#0f172a}
th,td{border:1px solid #263244;padding:10px;text-align:right;vertical-align:top}
th{background:#111827}
.smallbtn{padding:7px 10px;border-radius:8px;color:white;margin:3px;display:inline-block;border:0;cursor:pointer}
.panel{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:20px 0}
.stat strong{font-size:26px;color:${color}}
@media(max-width:850px){.grid,.cards,.panel{grid-template-columns:1fr}nav,.hero{text-align:center}h1{font-size:42px}}
</style>
</head>
<body>${content}</body>
</html>`;
}

async function homePage() {
  const s = await getSettings();
  const phone = s.whatsapp || DEFAULT_WHATSAPP;

  return layout(`
<header><div class="wrap"><nav>
<div class="logo">🔥 ${esc(s.site_title || "RELAX FIX")}</div>
<div>
<a class="btn blue" href="tel:+${phone}">📞 اتصال</a>
<a class="btn green" target="_blank" href="https://wa.me/${phone}?text=${encodeURIComponent("السلام عليكم، أريد حجز خدمة من RELAX FIX")}">💬 واتساب</a>
</div>
</nav></div></header>

<section class="hero"><div class="wrap grid">
<div>
<div class="badge">خدمة في أبوظبي — حجز سريع عبر واتساب</div>
<h1>${esc(s.site_desc || "صيانة تكييف وخدمات منزلية في أبوظبي")}</h1>
<p class="lead">صيانة تكييف، تنظيف مكيفات، تبريد خزانات، تنظيف منازل، مكافحة حشرات، سباكة وكهرباء. احجز خلال دقيقة.</p>
<a class="btn gold" href="#booking">احجز الآن</a>
<a class="btn green" target="_blank" href="https://wa.me/${phone}?text=${encodeURIComponent("أريد معرفة السعر وحجز خدمة اليوم")}">اعرف السعر</a>
</div>

<div class="card">
<h2>حجز سريع</h2>
<p class="lead">املأ البيانات. الطلب يتحفظ في لوحة التحكم ويفتح واتساب تلقائيًا.</p>
<form method="POST">
<input name="name" placeholder="الاسم" required>
<input name="phone" placeholder="رقم الهاتف" required>
<select name="service" required>
<option value="">اختر الخدمة</option>
<option>صيانة التكييف</option>
<option>تنظيف المكيفات</option>
<option>تبريد خزانات المياه</option>
<option>تنظيف المنازل</option>
<option>مكافحة الحشرات</option>
<option>سباكة وكهرباء</option>
</select>
<textarea name="message" placeholder="الموقع / الملاحظات / الوقت المناسب"></textarea>
<button class="submit" type="submit">إرسال + فتح واتساب</button>
</form>
</div>
</div></section>

<section><div class="wrap">
<h2>خدماتنا</h2>
<div class="cards">
<div class="service" onclick="pick('صيانة التكييف')"><div class="icon">❄️</div><h3>صيانة التكييف</h3><p class="lead">إصلاح، ضعف تبريد، تنظيف وفحص.</p></div>
<div class="service" onclick="pick('تنظيف المكيفات')"><div class="icon">🧼</div><h3>تنظيف المكيفات</h3><p class="lead">تنظيف فلاتر ووحدات وتحسين الهواء.</p></div>
<div class="service" onclick="pick('تبريد خزانات المياه')"><div class="icon">💧</div><h3>تبريد الخزانات</h3><p class="lead">حلول مناسبة للمياه في الصيف.</p></div>
<div class="service" onclick="pick('تنظيف المنازل')"><div class="icon">🏠</div><h3>تنظيف المنازل</h3><p class="lead">تنظيف عام وعميق.</p></div>
<div class="service" onclick="pick('مكافحة الحشرات')"><div class="icon">🪳</div><h3>مكافحة الحشرات</h3><p class="lead">خدمة للمنازل والفلل.</p></div>
<div class="service" onclick="pick('سباكة وكهرباء')"><div class="icon">🔧</div><h3>سباكة وكهرباء</h3><p class="lead">أعمال منزلية سريعة.</p></div>
</div></div></section>

<section><div class="wrap offer">
<h2>جاهز للإعلانات وجذب العملاء</h2>
<p>الرابط مناسب لواتساب بزنس، إنستجرام، إعلانات ممولة، وبايو الحساب.</p>
<a class="btn dark" target="_blank" href="https://wa.me/${phone}?text=${encodeURIComponent("أريد خدمة اليوم في أبوظبي")}">💬 اطلب الآن</a>
</div></section>

<section id="booking"><div class="wrap"><div class="card">
<h2>اطلب الخدمة الآن</h2>
<form method="POST">
<input name="name" placeholder="الاسم" required>
<input name="phone" placeholder="رقم الهاتف" required>
<input id="serviceInput" name="service" placeholder="الخدمة" required>
<textarea name="message" placeholder="ملاحظات"></textarea>
<button class="submit" type="submit">إرسال الطلب عبر واتساب</button>
</form>
</div></div></section>

<a class="float-call" href="tel:+${phone}">📞</a>
<a class="float-wa" target="_blank" href="https://wa.me/${phone}?text=${encodeURIComponent("السلام عليكم، أريد خدمة من RELAX FIX")}">💬</a>

<footer>${esc(s.site_title || "RELAX FIX")}<br>Abu Dhabi Home Services<br>${phone}</footer>

<script>
function pick(service){
document.getElementById("serviceInput").value=service;
document.getElementById("booking").scrollIntoView({behavior:"smooth"});
}
</script>
`, s);
}

function adminPage() {
  return layout(`
<div class="wrap" style="padding:30px">
<h1>🎛️ غرفة تحكم RELAX FIX</h1>
<input id="pass" type="password" placeholder="Password">
<button class="btn green" onclick="loadAll()">فتح لوحة التحكم</button>

<div class="panel">
<div class="stat"><strong id="total">0</strong><br>Total</div>
<div class="stat"><strong id="newCount">0</strong><br>New</div>
<div class="stat"><strong id="doneCount">0</strong><br>Done</div>
<div class="stat"><strong id="todayCount">0</strong><br>Today</div>
</div>

<h2>إعدادات الموقع</h2>
<input id="site_title" placeholder="اسم الموقع">
<input id="site_desc" placeholder="وصف الموقع">
<input id="whatsapp" placeholder="رقم واتساب بدون +">
<input id="theme_color" placeholder="لون مثل #22c55e">
<input id="bg_url" placeholder="رابط صورة خلفية">
<button class="btn blue" onclick="saveSettings()">حفظ الإعدادات</button>

<h2>الطلبات</h2>
<input id="search" placeholder="بحث..." oninput="renderRows()">
<table>
<thead><tr><th>Name</th><th>Phone</th><th>Service</th><th>Notes</th><th>Status</th><th>Actions</th></tr></thead>
<tbody id="rows"></tbody>
</table>
</div>

<script>
let allData=[];

async function loadAll(){
  await loadSettings();
  await loadData();
}

async function loadSettings(){
  const pass=document.getElementById("pass").value;
  const res=await fetch("/api/settings?pass="+encodeURIComponent(pass));
  const s=await res.json();
  if(s.error){alert(s.error);return}
  site_title.value=s.site_title||"";
  site_desc.value=s.site_desc||"";
  whatsapp.value=s.whatsapp||"";
  theme_color.value=s.theme_color||"";
  bg_url.value=s.bg_url||"";
}

async function saveSettings(){
  const pass=document.getElementById("pass").value;
  await fetch("/api/settings?pass="+encodeURIComponent(pass),{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      site_title:site_title.value,
      site_desc:site_desc.value,
      whatsapp:whatsapp.value,
      theme_color:theme_color.value,
      bg_url:bg_url.value
    })
  });
  alert("تم حفظ الإعدادات");
}

async function loadData(){
  const pass=document.getElementById("pass").value;
  const res=await fetch("/api/requests?pass="+encodeURIComponent(pass));
  const data=await res.json();
  if(data.error){alert(data.error);return}
  allData=data;
  renderRows();
}

function renderRows(){
  const q=(search.value||"").toLowerCase();
  const today=new Date().toDateString();
  total.innerText=allData.length;
  newCount.innerText=allData.filter(x=>(x.status||"new")==="new").length;
  doneCount.innerText=allData.filter(x=>x.status==="done").length;
  todayCount.innerText=allData.filter(x=>x.created_at&&new Date(x.created_at).toDateString()===today).length;

  rows.innerHTML="";
  allData.filter(x=>((x.name||"")+" "+(x.phone||"")+" "+(x.service||"")+" "+(x.notes||"")).toLowerCase().includes(q)).forEach(x=>{
    rows.innerHTML += "<tr><td>"+(x.name||"")+"</td><td>"+(x.phone||"")+"</td><td>"+(x.service||"")+"</td><td>"+(x.notes||"")+"</td><td>"+(x.status||"new")+"</td><td><a class='smallbtn blue' href='tel:"+x.phone+"'>Call</a><a class='smallbtn green' target='_blank' href='https://wa.me/"+x.phone+"'>WhatsApp</a><button class='smallbtn green' onclick=\\"setStatus('"+x.id+"','done')\\">Done</button><button class='smallbtn red' onclick=\\"delRow('"+x.id+"')\\">Delete</button></td></tr>";
  });
}

async function setStatus(id,status){
  const pass=document.getElementById("pass").value;
  await fetch("/api/status?pass="+encodeURIComponent(pass),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,status})});
  loadData();
}

async function delRow(id){
  if(!confirm("Delete?"))return;
  const pass=document.getElementById("pass").value;
  await fetch("/api/delete?pass="+encodeURIComponent(pass),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id})});
  loadData();
}
</script>
`, { site_title:"RELAX FIX Admin", site_desc:"Admin", theme_color:"#22c55e" });
}

const server=http.createServer(async(req,res)=>{
try{
  if(req.method==="GET" && req.url.startsWith("/admin")){
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    res.end(adminPage());
    return;
  }

  if(req.method==="GET" && req.url.startsWith("/api/settings")){
    const url=new URL(req.url,"http://x");
    if(url.searchParams.get("pass")!==ADMIN_PASS){res.writeHead(401,{"Content-Type":"application/json"});res.end(JSON.stringify({error:"Unauthorized"}));return;}
    const s=await getSettings();
    res.writeHead(200,{"Content-Type":"application/json"});
    res.end(JSON.stringify(s));
    return;
  }

  if(req.method==="POST" && req.url.startsWith("/api/settings")){
    let body="";
    req.on("data",c=>body+=c.toString());
    req.on("end",async()=>{
      const url=new URL(req.url,"http://x");
      if(url.searchParams.get("pass")!==ADMIN_PASS){res.writeHead(401);res.end("Unauthorized");return;}
      const p=JSON.parse(body||"{}");
      await supabase.from("settings").update(p).eq("id",1);
      res.end("OK");
    });
    return;
  }

  if(req.method==="GET" && req.url.startsWith("/api/requests")){
    const url=new URL(req.url,"http://x");
    if(url.searchParams.get("pass")!==ADMIN_PASS){res.writeHead(401,{"Content-Type":"application/json"});res.end(JSON.stringify({error:"Unauthorized"}));return;}
    const {data,error}=await supabase.from("requests").select("*").order("created_at",{ascending:false});
    res.writeHead(200,{"Content-Type":"application/json"});
    res.end(JSON.stringify(error?{error:error.message}:data));
    return;
  }

  if(req.method==="POST" && req.url.startsWith("/api/status")){
    let body="";
    req.on("data",c=>body+=c.toString());
    req.on("end",async()=>{
      const url=new URL(req.url,"http://x");
      if(url.searchParams.get("pass")!==ADMIN_PASS){res.writeHead(401);res.end("Unauthorized");return;}
      const p=JSON.parse(body||"{}");
      await supabase.from("requests").update({status:p.status}).eq("id",p.id);
      res.end("OK");
    });
    return;
  }

  if(req.method==="POST" && req.url.startsWith("/api/delete")){
    let body="";
    req.on("data",c=>body+=c.toString());
    req.on("end",async()=>{
      const url=new URL(req.url,"http://x");
      if(url.searchParams.get("pass")!==ADMIN_PASS){res.writeHead(401);res.end("Unauthorized");return;}
      const p=JSON.parse(body||"{}");
      await supabase.from("requests").delete().eq("id",p.id);
      res.end("OK");
    });
    return;
  }

  if(req.method==="POST"){
    let body="";
    req.on("data",c=>body+=c.toString());
    req.on("end",async()=>{
      const p=new URLSearchParams(body);
      const order={name:p.get("name")||"",phone:p.get("phone")||"",service:p.get("service")||"",notes:p.get("message")||""};
      const {error}=await supabase.from("requests").insert([order]);
      const s=await getSettings();
      const phone=s.whatsapp||DEFAULT_WHATSAPP;

      if(error){res.end(layout("<div class='wrap'><h1>خطأ</h1><p>"+esc(error.message)+"</p></div>",s));return;}

      const msg=encodeURIComponent("السلام عليكم RELAX FIX\\nالاسم: "+order.name+"\\nالهاتف: "+order.phone+"\\nالخدمة: "+order.service+"\\nملاحظات: "+order.notes);
      const wa="https://wa.me/"+phone+"?text="+msg;
      res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
      res.end(layout("<div class='wrap' style='padding:60px;text-align:center'><h1 style='color:#22c55e'>✅ تم حفظ الطلب</h1><p class='lead'>سيتم فتح واتساب برسالة جاهزة.</p><a class='btn green' target='_blank' href='"+wa+"'>فتح واتساب</a><br><br><a class='btn gold' href='/'>رجوع</a><script>setTimeout(function(){window.open('"+wa+"','_blank')},1000)</script></div>",s));
    });
    return;
  }

  res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
  res.end(await homePage());
}catch(e){
  res.writeHead(500,{"Content-Type":"text/plain;charset=utf-8"});
  res.end(e.message);
}
});

server.listen(process.env.PORT||3000,()=>console.log("RELAX FIX Company System running"));