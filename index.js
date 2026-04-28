// ===== RELAX FIX SAAS - STABLE CORE =====
const http = require("http");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const PORT = process.env.PORT || 3000;
const PHONE = "971588259848";
const ADMIN_PASS = "123456";

// ---------- UI ----------
function page(c){
return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>RELAX FIX</title>
<style>
body{margin:0;font-family:Arial;background:#071326;color:#fff}
.wrap{max-width:900px;margin:auto;padding:20px}
.card{background:#0f172a;padding:20px;border-radius:12px;margin-top:15px}
.btn{padding:12px 18px;border:none;border-radius:10px;cursor:pointer}
.green{background:#22c55e;color:#fff}
.blue{background:#0ea5e9;color:#fff}
.gold{background:#facc15;color:#000}
input,select{width:100%;padding:10px;margin:5px 0;border-radius:8px;border:none}
</style>
</head>
<body>
<div class="wrap">${c}</div>
</body>
</html>`;
}

// ---------- HOME ----------
function home(){
return page(`
<h1>🔥 RELAX FIX</h1>

<button class="btn green" onclick="location.href='/wa'">واتساب</button>
<button class="btn blue" onclick="location.href='/plans'">اشتراك</button>

<div class="card">
<h2>طلب خدمة</h2>
<form method="POST" action="/order">
<input name="name" placeholder="الاسم" required>
<input name="phone" placeholder="الهاتف" required>
<select name="service">
<option>صيانة تكييف</option>
<option>تنظيف</option>
<option>مكافحة حشرات</option>
</select>
<button class="btn green">إرسال</button>
</form>
</div>

<div class="card">
<h2>🎨 إعلان تلقائي</h2>
<form method="POST" action="/ai">
<input name="service" placeholder="الخدمة">
<input name="price" placeholder="السعر">
<input name="city" placeholder="المدينة">
<button class="btn blue">توليد</button>
</form>
</div>

<a href="/admin">لوحة التحكم</a>
`);
}

// ---------- PLANS ----------
function plans(){
return page(`
<h1>💳 الباقات</h1>

<div class="card">
<h3>Starter</h3>
<p>99 AED</p>
<button class="btn green" onclick="location.href='/wa'">اطلب</button>
</div>

<div class="card">
<h3>Pro</h3>
<p>199 AED</p>
<button class="btn blue" onclick="location.href='/wa'">اطلب</button>
</div>

<div class="card">
<h3>Business</h3>
<p>399 AED</p>
<button class="btn gold" onclick="location.href='/wa'">اطلب</button>
</div>
`);
}

// ---------- ADMIN ----------
async function admin(){
let { data } = await supabase.from("requests").select("*").order("id",{ascending:false});

let rows = (data||[]).map(r=>`
<tr>
<td>${r.name||""}</td>
<td>${r.phone||""}</td>
<td>${r.service||""}</td>
</tr>
`).join("");

return page(`
<h1>📊 Dashboard</h1>
<table border="1" width="100%">
<tr><th>اسم</th><th>هاتف</th><th>خدمة</th></tr>
${rows}
</table>
`);
}

// ---------- SERVER ----------
const server = http.createServer(async (req,res)=>{

// GET
if(req.method==="GET"){

if(req.url==="/") return res.end(home());
if(req.url==="/plans") return res.end(plans());
if(req.url==="/admin") return res.end(await admin());

if(req.url==="/wa"){
res.writeHead(302,{Location:"https://wa.me/"+PHONE});
return res.end();
}

}

// POST
if(req.method==="POST"){
let body="";
req.on("data",c=>body+=c);

req.on("end", async ()=>{
let p=new URLSearchParams(body);

// save order
if(req.url==="/order"){
await supabase.from("requests").insert([{
name:p.get("name"),
phone:p.get("phone"),
service:p.get("service")
}]);

return res.end(page("<h1>تم الإرسال ✅</h1><a href='/wa'>واتساب</a>"));
}

// AI ad
if(req.url==="/ai"){
return res.end(page(`
<h1>📢 إعلان</h1>
<p>🔥 عرض ${p.get("service")} في ${p.get("city")} بسعر ${p.get("price")} درهم</p>
<p>📞 احجز الآن: ${PHONE}</p>
`));
}

});
}

});

server.listen(PORT,()=>console.log("RUNNING"));