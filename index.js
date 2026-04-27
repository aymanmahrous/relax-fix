// ================== RELAX FIX 2026 PRO ==================
const http = require("http");
const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const PORT = process.env.PORT || 10000;
const ADMIN_PASS = "123456";

// ======== Helpers ========
function html(content){
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Relax Fix 2026</title>
<style>
body{margin:0;font-family:Arial;background:#071326;color:#fff}
.container{padding:20px;max-width:1000px;margin:auto}
.btn{padding:12px 20px;border-radius:10px;border:none;cursor:pointer}
.green{background:#22c55e;color:#fff}
.blue{background:#0ea5e9;color:#fff}
.yellow{background:#facc15;color:#000}
.card{background:#0f172a;padding:20px;border-radius:15px;margin-top:20px}
input,select,textarea{width:100%;padding:10px;margin:5px 0;border-radius:8px;border:none}
h1,h2{margin:10px 0}
a{color:#0ea5e9;text-decoration:none}
</style>
</head>
<body>
<div class="container">${content}</div>
</body>
</html>`;
}

// ======== Home Page ========
function home(){
return html(`
<h1>RELAX FIX 2026 🔥</h1>

<button class="btn green" onclick="location.href='/whatsapp'">واتساب</button>
<button class="btn blue" onclick="location.href='tel:0588259848'">اتصال</button>
<button class="btn yellow" onclick="location.href='/pricing'">الاشتراكات</button>

<div class="card">
<h2>طلب خدمة</h2>
<form method="POST" action="/submit">
<input name="name" placeholder="الاسم" required>
<input name="phone" placeholder="رقم الهاتف" required>
<select name="service">
<option>صيانة تكييف</option>
<option>تنظيف</option>
<option>تبريد خزانات</option>
<option>مكافحة حشرات</option>
</select>
<textarea name="notes" placeholder="ملاحظات"></textarea>
<button class="btn green">إرسال</button>
</form>
</div>

<div class="card">
<h2>🎨 Design Studio</h2>
<form method="POST" action="/generate">
<input name="service" placeholder="الخدمة">
<input name="price" placeholder="السعر">
<input name="city" placeholder="المدينة">
<button class="btn blue">توليد إعلان</button>
</form>
</div>

<a href="/admin">لوحة التحكم</a>
`);
}

// ======== Pricing ========
function pricing(){
return html(`
<h1>الاشتراكات</h1>

<div class="card">
<h2>Starter - 99 AED</h2>
<a href="/pay?plan=starter" class="btn green">اشترك</a>
</div>

<div class="card">
<h2>Pro - 199 AED</h2>
<a href="/pay?plan=pro" class="btn blue">اشترك</a>
</div>

<div class="card">
<h2>Business - 399 AED</h2>
<a href="/pay?plan=business" class="btn yellow">اشترك</a>
</div>
`);
}

// ======== Admin ========
async function admin(){
let { data } = await supabase.from("requests").select("*");

let rows = data.map(r=>`
<tr>
<td>${r.name}</td>
<td>${r.phone}</td>
<td>${r.service}</td>
<td>${r.status}</td>
<td>
<a href="/done?id=${r.id}">تم</a> |
<a href="/delete?id=${r.id}">حذف</a>
</td>
</tr>
`).join("");

return html(`
<h1>Admin Dashboard</h1>

<table border="1" width="100%">
<tr><th>اسم</th><th>هاتف</th><th>خدمة</th><th>حالة</th><th>تحكم</th></tr>
${rows}
</table>
`);
}

// ======== Server ========
const server = http.createServer(async (req,res)=>{

// ===== GET =====
if(req.method==="GET"){

if(req.url==="/") return res.end(home());
if(req.url==="/pricing") return res.end(pricing());

if(req.url.startsWith("/admin")){
return res.end(await admin());
}

// change status
if(req.url.startsWith("/done")){
let id = new URL(req.url,"http://x").searchParams.get("id");
await supabase.from("requests").update({status:"done"}).eq("id",id);
res.writeHead(302,{Location:"/admin"});return res.end();
}

// delete
if(req.url.startsWith("/delete")){
let id = new URL(req.url,"http://x").searchParams.get("id");
await supabase.from("requests").delete().eq("id",id);
res.writeHead(302,{Location:"/admin"});return res.end();
}

// whatsapp
if(req.url==="/whatsapp"){
res.writeHead(302,{Location:"https://wa.me/971588259848"});
return res.end();
}

}

// ===== POST =====
if(req.method==="POST"){

let body="";
req.on("data",c=>body+=c);

req.on("end", async ()=>{

let params = new URLSearchParams(body);

// ===== submit request =====
if(req.url==="/submit"){

let order = {
name: params.get("name"),
phone: params.get("phone"),
service: params.get("service"),
notes: params.get("notes")
};

await supabase.from("requests").insert([order]);

return res.end(html(`
<h1>تم حفظ الطلب ✅</h1>
<a href="/whatsapp" class="btn green">فتح واتساب</a>
`));
}

// ===== generate design =====
if(req.url==="/generate"){

let service = params.get("service");
let price = params.get("price");
let city = params.get("city");

return res.end(html(`
<h1>📢 إعلان جاهز</h1>
<p>🔥 عرض ${service} في ${city} بسعر ${price} درهم!</p>
<p>📞 احجز الآن عبر واتساب: 0588259848</p>
<a href="/whatsapp" class="btn green">إرسال واتساب</a>
`));
}

});
}

});

server.listen(PORT, ()=> console.log("Relax Fix PRO running"));