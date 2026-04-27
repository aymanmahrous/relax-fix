const http = require("http");
const { createClient } = require("@supabase/supabase-js");
const Stripe = require("stripe");

const supabase = createClient(
  "https://nmzxrjdxvmmzzmajrskm.supabase.co",
  "sb_publishable_qXOPVaD5_f60qf1UbYrm2A_sH9c0lW5"
);

const stripe = process.env.STRIPE_SECRET_KEY ? Stripe(process.env.STRIPE_SECRET_KEY) : null;

const ADMIN_PASS = "123456";
const PHONE = "971588259848";
const SITE_URL = process.env.SITE_URL || "https://relax-fix.onrender.com";

const PRICES = {
  ac: process.env.STRIPE_PRICE_AC || "",
  cleaning: process.env.STRIPE_PRICE_CLEANING || "",
  visit: process.env.STRIPE_PRICE_VISIT || "",
  starter: process.env.STRIPE_PRICE_STARTER || "",
  pro: process.env.STRIPE_PRICE_PRO || "",
  business: process.env.STRIPE_PRICE_BUSINESS || ""
};

function esc(v = "") {
  return String(v).replace(/[&<>"']/g, m => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[m]));
}

function layout(content, title = "RELAX FIX 2026") {
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="RELAX FIX Abu Dhabi - AC maintenance, home services, pricing, subscriptions and smart booking.">
<style>
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;font-family:Arial,Tahoma,sans-serif;background:#050914;color:white}
a{text-decoration:none;color:inherit}.wrap{width:min(1180px,92%);margin:auto}
header{position:sticky;top:0;z-index:50;background:#020617ee;border-bottom:1px solid #1e293b}
nav{min-height:74px;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}
.logo{font-size:24px;font-weight:900}.btn{display:inline-block;padding:13px 18px;border-radius:15px;font-weight:900;margin:5px;border:0;cursor:pointer}
.green{background:#22c55e;color:white}.blue{background:#0ea5e9;color:white}.gold{background:#facc15;color:#111}.red{background:#ef4444;color:white}.dark{background:#111827;color:white}
.hero{padding:85px 0;background:radial-gradient(circle at top right,#22c55e55,transparent 35%),radial-gradient(circle at top left,#0ea5e955,transparent 35%),#07111f}
.grid{display:grid;grid-template-columns:1.1fr .9fr;gap:28px;align-items:center}
h1{font-size:clamp(40px,7vw,76px);line-height:1;margin:0 0 18px}h2{font-size:clamp(28px,4vw,42px)}
.lead{font-size:20px;color:#cbd5e1;line-height:1.7}.badge{display:inline-block;background:#22c55e22;color:#86efac;border:1px solid #22c55e66;padding:10px 16px;border-radius:999px;font-weight:900;margin-bottom:16px}
.card,.service,.stat{background:#0f172a;border:1px solid #263244;border-radius:28px;padding:26px;box-shadow:0 20px 60px #0006}
input,textarea,select{width:100%;padding:15px;margin:8px 0;border-radius:14px;border:0;font-size:16px}
textarea{min-height:100px}button.submit{width:100%;padding:15px;border:0;border-radius:14px;background:linear-gradient(135deg,#22c55e,#0ea5e9);color:white;font-weight:900;font-size:17px}
section{padding:52px 0}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.service{cursor:pointer;transition:.2s}.service:hover{transform:translateY(-5px);border-color:#22c55e}
.icon{font-size:42px}.offer{background:linear-gradient(135deg,#22c55e,#0ea5e9);color:#02140b;border-radius:30px;padding:40px;text-align:center;font-weight:900}
.float-wa,.float-call{position:fixed;right:18px;color:white;padding:15px 20px;border-radius:999px;font-weight:900;z-index:99}
.float-wa{bottom:18px;background:#25D366}.float-call{bottom:82px;background:#0ea5e9}
footer{text-align:center;background:#020617;color:#94a3b8;padding:35px}
table{width:100%;border-collapse:collapse;margin-top:20px;background:#0f172a}th,td{border:1px solid #263244;padding:10px;text-align:right;vertical-align:top}th{background:#111827}
.smallbtn{padding:7px 10px;border-radius:8px;color:white;margin:3px;display:inline-block;border:0;cursor:pointer}
.panel{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:20px 0}.stat strong{font-size:26px;color:#22c55e}
@media(max-width:850px){.grid,.cards,.panel{grid-template-columns:1fr}nav,.hero{text-align:center}h1{font-size:42px}}
</style>
</head>
<body>${content}</body>
</html>`;
}

function homePage() {
  return layout(`
<header><div class="wrap"><nav>
<div class="logo">🔥 RELAX FIX 2026</div>
<div>
<a class="btn blue" href="tel:+${PHONE}">📞 اتصال</a>
<a class="btn green" target="_blank" href="https://wa.me/${PHONE}?text=${encodeURIComponent("السلام عليكم، أريد حجز خدمة من RELAX FIX")}">💬 واتساب</a>
<a class="btn gold" href="#plans">الاشتراكات</a>
</div>
</nav></div></header>

<section class="hero"><div class="wrap grid">
<div>
<div class="badge">خدمة في أبوظبي — حجز سريع عبر واتساب</div>
<h1>صيانة تكييف وخدمات منزلية في أبوظبي</h1>
<p class="lead">صيانة تكييف، تنظيف مكيفات، تبريد خزانات، تنظيف منازل، مكافحة حشرات، سباكة وكهرباء. احجز خلال دقيقة.</p>
<a class="btn gold" href="#booking">احجز الآن</a>
<a class="btn green" href="#pricing">شوف الأسعار</a>
<a class="btn blue" href="#designs">قسم التصميمات</a>
</div>

<div class="card">
<h2>حجز سريع</h2>
<p class="lead">الطلب يتحفظ في لوحة التحكم ويفتح واتساب تلقائيًا.</p>
<form method="POST">
<input name="name" placeholder="الاسم" required>
<input name="phone" placeholder="رقم الهاتف" required>
<select name="service" required>
<option value="">اختر الخدمة</option>
<option>صيانة التكييف</option><option>تنظيف المكيفات</option><option>تبريد خزانات المياه</option>
<option>تنظيف المنازل</option><option>مكافحة الحشرات</option><option>سباكة وكهرباء</option>
</select>
<textarea name="message" placeholder="الموقع / الملاحظات / الوقت المناسب"></textarea>
<button class="submit" type="submit">إرسال + فتح واتساب</button>
</form>
</div>
</div></section>

<section><div class="wrap">
<h2>خدمات RELAX FIX</h2>
<div class="cards">
<div class="service" onclick="pick('صيانة التكييف')"><div class="icon">❄️</div><h3>صيانة التكييف</h3><p class="lead">إصلاح، ضعف تبريد، تنظيف وفحص.</p></div>
<div class="service" onclick="pick('تنظيف المكيفات')"><div class="icon">🧼</div><h3>تنظيف المكيفات</h3><p class="lead">تنظيف فلاتر ووحدات وتحسين الهواء.</p></div>
<div class="service" onclick="pick('تبريد خزانات المياه')"><div class="icon">💧</div><h3>تبريد الخزانات</h3><p class="lead">حلول مناسبة للمياه في الصيف.</p></div>
<div class="service" onclick="pick('تنظيف المنازل')"><div class="icon">🏠</div><h3>تنظيف المنازل</h3><p class="lead">تنظيف عام وعميق.</p></div>
<div class="service" onclick="pick('مكافحة الحشرات')"><div class="icon">🪳</div><h3>مكافحة الحشرات</h3><p class="lead">خدمة للمنازل والفلل.</p></div>
<div class="service" onclick="pick('سباكة وكهرباء')"><div class="icon">🔧</div><h3>سباكة وكهرباء</h3><p class="lead">أعمال منزلية سريعة.</p></div>
</div></div></section>

<section id="pricing"><div class="wrap">
<h2>💰 الأسعار</h2>
<div class="cards">
<div class="service"><h3>❄️ صيانة التكييف</h3><p class="lead">150 AED</p><a class="btn green" href="/pay/ac">ادفع الآن</a></div>
<div class="service"><h3>🧼 تنظيف المكيفات</h3><p class="lead">100 AED</p><a class="btn green" href="/pay/cleaning">ادفع الآن</a></div>
<div class="service"><h3>🔍 زيارة فنية</h3><p class="lead">50 AED</p><a class="btn gold" href="/pay/visit">ادفع الآن</a></div>
</div></div></section>

<section id="plans"><div class="wrap">
<h2>💳 الاشتراكات الشهرية</h2>
<div class="cards">
<div class="service"><h3>Starter</h3><p class="lead">99 AED / month</p><p>طلبات + واتساب + صفحة بيع</p><a class="btn green" href="/pay/starter">اشترك</a></div>
<div class="service"><h3>Pro</h3><p class="lead">199 AED / month</p><p>Dashboard + تصميمات + دعم أسرع</p><a class="btn gold" href="/pay/pro">اشترك</a></div>
<div class="service"><h3>Business</h3><p class="lead">399 AED / month</p><p>إعلانات + CRM + تقارير + أولوية</p><a class="btn blue" href="/pay/business">اشترك</a></div>
</div></div></section>

<section id="designs"><div class="wrap">
<h2>🎨 قسم التصميمات</h2>
<p class="lead">تصميمات جاهزة للإعلانات والواتساب والإنستجرام.</p>
<div class="cards">
<div class="service"><h3>تصميم إعلان تكييف</h3><p>نص جاهز + شكل سريع للنشر</p><a class="btn green" target="_blank" href="https://wa.me/${PHONE}?text=${encodeURIComponent("أريد تصميم إعلان صيانة تكييف")}">اطلب التصميم</a></div>
<div class="service"><h3>تصميم عرض تنظيف</h3><p>بوست عرض سعر لجذب العملاء</p><a class="btn green" target="_blank" href="https://wa.me/${PHONE}?text=${encodeURIComponent("أريد تصميم عرض تنظيف")}">اطلب التصميم</a></div>
<div class="service"><h3>تصميم واتساب بزنس</h3><p>رسالة ترحيب + كتالوج خدمات</p><a class="btn green" target="_blank" href="https://wa.me/${PHONE}?text=${encodeURIComponent("أريد تصميم واتساب بزنس")}">اطلب التصميم</a></div>
</div>
</div></section>

<section><div class="wrap offer">
<h2>🎁 استشارة مجانية</h2>
<p>قبل الحجز، أرسل المشكلة وسنرد عليك بالسعر المتوقع.</p>
<a class="btn dark" target="_blank" href="https://wa.me/${PHONE}?text=${encodeURIComponent("أريد استشارة مجانية من RELAX FIX")}">جرب مجاناً</a>
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

<a class="float-call" href="tel:+${PHONE}">📞</a>
<a class="float-wa" target="_blank" href="https://wa.me/${PHONE}?text=${encodeURIComponent("السلام عليكم، أريد خدمة من RELAX FIX")}">💬</a>
<footer>RELAX FIX 2026<br>Abu Dhabi Home Services<br>0588259848</footer>

<script>
function pick(service){
document.getElementById("serviceInput").value=service;
document.getElementById("booking").scrollIntoView({behavior:"smooth"});
}
</script>
`);
}

function adminPage() {
  return layout(`
<div class="wrap" style="padding:30px">
<h1>🎛️ RELAX FIX Admin</h1>
<input id="pass" type="password" placeholder="Password">
<button class="btn green" onclick="loadData()">فتح لوحة التحكم</button>
<input id="search" placeholder="بحث..." oninput="renderRows()">

<div class="panel">
<div class="stat"><strong id="total">0</strong><br>Total</div>
<div class="stat"><strong id="newCount">0</strong><br>New</div>
<div class="stat"><strong id="doneCount">0</strong><br>Done</div>
<div class="stat"><strong id="todayCount">0</strong><br>Today</div>
</div>

<table>
<thead><tr><th>Name</th><th>Phone</th><th>Service</th><th>Notes</th><th>Status</th><th>Actions</th></tr></thead>
<tbody id="rows"></tbody>
</table>
</div>

<script>
let allData=[];
async function loadData(){
const pass=document.getElementById("pass").value;
const res=await fetch("/api/requests?pass="+encodeURIComponent(pass));
const data=await res.json();
if(data.error){alert(data.error);return}
allData=data;renderRows();
}
function renderRows(){
const q=(document.getElementById("search").value||"").toLowerCase();
const today=new Date().toDateString();
total.innerText=allData.length;
newCount.innerText=allData.filter(x=>(x.status||"new")==="new").length;
doneCount.innerText=allData.filter(x=>x.status==="done").length;
todayCount.innerText=allData.filter(x=>x.created_at&&new Date(x.created_at).toDateString()===today).length;
rows.innerHTML="";
allData.filter(x=>((x.name||"")+" "+(x.phone||"")+" "+(x.service||"")+" "+(x.notes||"")).toLowerCase().includes(q)).forEach(x=>{
rows.innerHTML+="<tr><td>"+(x.name||"")+"</td><td>"+(x.phone||"")+"</td><td>"+(x.service||"")+"</td><td>"+(x.notes||"")+"</td><td>"+(x.status||"new")+"</td><td><a class='smallbtn blue' href='tel:"+x.phone+"'>Call</a><a class='smallbtn green' target='_blank' href='https://wa.me/"+x.phone+"'>WhatsApp</a><button class='smallbtn green' onclick=\\"setStatus('"+x.id+"','done')\\">Done</button><button class='smallbtn red' onclick=\\"delRow('"+x.id+"')\\">Delete</button></td></tr>";
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
`);
}

async function sendWhatsApp(text) {
  if (!process.env.WHATSAPP_TOKEN || !process.env.WHATSAPP_PHONE_ID) return;
  try {
    await fetch("https://graph.facebook.com/v20.0/" + process.env.WHATSAPP_PHONE_ID + "/messages", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.WHATSAPP_TOKEN,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: PHONE,
        type: "text",
        text: { body: text }
      })
    });
  } catch (e) {
    console.log("WhatsApp API error:", e.message);
  }
}

async function createCheckout(res, key) {
  if (!stripe) {
    res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
    res.end(layout("<div class='wrap'><h1>Stripe not configured</h1><p>ضع STRIPE_SECRET_KEY في Render Environment.</p><a class='btn gold' href='/'>رجوع</a></div>"));
    return;
  }

  const price = PRICES[key];
  if (!price) {
    res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
    res.end(layout("<div class='wrap'><h1>Price ID missing</h1><p>أضف Price ID الخاص بهذه الخدمة في Render.</p><a class='btn gold' href='/'>رجوع</a></div>"));
    return;
  }

  const session = await stripe.checkout.sessions.create({
    mode: ["starter","pro","business"].includes(key) ? "subscription" : "payment",
    line_items: [{ price, quantity: 1 }],
    success_url: SITE_URL + "/success",
    cancel_url: SITE_URL + "/cancel"
  });

  res.writeHead(302, { Location: session.url });
  res.end();
}

const server=http.createServer(async(req,res)=>{
try{
  if(req.method==="GET" && req.url==="/admin"){res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});res.end(adminPage());return;}

  if(req.method==="GET" && req.url.startsWith("/pay/")){
    const key=req.url.split("/pay/")[1].split("?")[0];
    await createCheckout(res,key);
    return;
  }

  if(req.method==="GET" && req.url==="/success"){res.end(layout("<div class='wrap'><h1 style='color:#22c55e'>✅ تم الدفع بنجاح</h1><a class='btn green' href='/'>العودة للموقع</a></div>"));return;}
  if(req.method==="GET" && req.url==="/cancel"){res.end(layout("<div class='wrap'><h1>تم إلغاء الدفع</h1><a class='btn gold' href='/'>رجوع</a></div>"));return;}

  if(req.method==="GET" && req.url.startsWith("/api/requests")){
    const url=new URL(req.url,"http://x");
    if(url.searchParams.get("pass")!==ADMIN_PASS){res.writeHead(401,{"Content-Type":"application/json"});res.end(JSON.stringify({error:"Unauthorized"}));return;}
    const {data,error}=await supabase.from("requests").select("*").order("created_at",{ascending:false});
    res.writeHead(200,{"Content-Type":"application/json"});
    res.end(JSON.stringify(error?{error:error.message}:data));
    return;
  }

  if(req.method==="POST" && req.url.startsWith("/api/status")){
    let body="";req.on("data",c=>body+=c.toString());
    req.on("end",async()=>{
      const url=new URL(req.url,"http://x");
      if(url.searchParams.get("pass")!==ADMIN_PASS){res.writeHead(401);res.end("Unauthorized");return;}
      const p=JSON.parse(body||"{}");
      await supabase.from("requests").update({status:p.status}).eq("id",p.id);
      res.end("OK");
    });return;
  }

  if(req.method==="POST" && req.url.startsWith("/api/delete")){
    let body="";req.on("data",c=>body+=c.toString());
    req.on("end",async()=>{
      const url=new URL(req.url,"http://x");
      if(url.searchParams.get("pass")!==ADMIN_PASS){res.writeHead(401);res.end("Unauthorized");return;}
      const p=JSON.parse(body||"{}");
      await supabase.from("requests").delete().eq("id",p.id);
      res.end("OK");
    });return;
  }

  if(req.method==="POST"){
    let body="";req.on("data",c=>body+=c.toString());
    req.on("end",async()=>{
      const p=new URLSearchParams(body);
      const order={name:p.get("name")||"",phone:p.get("phone")||"",service:p.get("service")||"",notes:p.get("message")||""};
      const {error}=await supabase.from("requests").insert([order]);
      if(!error){await sendWhatsApp("طلب جديد RELAX FIX\\nالاسم: "+order.name+"\\nالهاتف: "+order.phone+"\\nالخدمة: "+order.service+"\\nملاحظات: "+order.notes);}
      const msg=encodeURIComponent("السلام عليكم RELAX FIX\\nالاسم: "+order.name+"\\nالهاتف: "+order.phone+"\\nالخدمة: "+order.service+"\\nملاحظات: "+order.notes);
      const wa="https://wa.me/"+PHONE+"?text="+msg;
      res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
      res.end(layout("<div class='wrap' style='padding:60px;text-align:center'><h1 style='color:#22c55e'>✅ تم حفظ الطلب</h1><p class='lead'>سيتم فتح واتساب برسالة جاهزة.</p><a class='btn green' target='_blank' href='"+wa+"'>فتح واتساب</a><br><br><a class='btn gold' href='/'>رجوع</a><script>setTimeout(function(){window.open('"+wa+"','_blank')},1000)</script></div>"));
    });return;
  }

  res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
  res.end(homePage());
}catch(e){
  res.writeHead(500,{"Content-Type":"text/plain;charset=utf-8"});
  res.end(e.message);
}
});

server.listen(process.env.PORT||3000,()=>console.log("RELAX FIX commercial system running"));