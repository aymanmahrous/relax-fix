const http = require("http");
const { createClient } = require("@supabase/supabase-js");

// ENV (حط القيم في Render)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const ADMIN_PASS = "123456";

function page(content){
return `
<!DOCTYPE html>
<html lang="ar">
<head>
<meta charset="UTF-8">
<title>Relax Fix Global</title>
<style>
body{font-family:Arial;background:#0b1220;color:#fff;text-align:center;padding:20px}
input,button{padding:10px;margin:5px;border-radius:10px;border:0}
button{background:#22c55e;color:#fff;cursor:pointer}
.card{background:#111827;padding:20px;border-radius:20px;margin:10px}
</style>
</head>
<body>
${content}
</body>
</html>`;
}

// الصفحة الرئيسية
function home(){
return page(`
<h1>🌍 Relax Fix Global</h1>

<form method="POST">
<input name="name" placeholder="الاسم / Name"><br>
<input name="phone" placeholder="الموبايل / Phone"><br>
<input name="service" placeholder="الخدمة / Service"><br>
<button>إرسال الطلب</button>
</form>

<a href="/admin">🔐 Admin</a>
`);
}

// لوحة التحكم
function admin(){
return page(`
<h1>لوحة التحكم</h1>

<input id="pass" placeholder="password">
<button onclick="load()">دخول</button>

<div id="data"></div>

<script>
async function load(){
let pass=document.getElementById("pass").value;
let r=await fetch("/api?pass="+pass);
let d=await r.json();

if(d.error){alert(d.error);return;}

let html="";
d.forEach(x=>{
html+=\`
<div class="card">
<b>\${x.name}</b><br>
\${x.phone}<br>
\${x.service}<br>
<button onclick="del('\${x.id}')">حذف</button>
</div>
\`;
});
document.getElementById("data").innerHTML=html;
}

async function del(id){
let pass=document.getElementById("pass").value;
await fetch("/delete?pass="+pass,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({id})
});
load();
}
</script>
`);
}

// السيرفر
const server = http.createServer(async (req,res)=>{

// Admin
if(req.url==="/admin"){
res.end(admin());
return;
}

// API
if(req.url.startsWith("/api")){
let pass=new URL(req.url,"http://x").searchParams.get("pass");
if(pass!==ADMIN_PASS){
res.end(JSON.stringify({error:"Unauthorized"}));
return;
}
let {data}=await supabase.from("requests").select("*");
res.end(JSON.stringify(data));
return;
}

// Delete
if(req.url.startsWith("/delete")){
let body="";
req.on("data",c=>body+=c);
req.on("end",async ()=>{
let pass=new URL(req.url,"http://x").searchParams.get("pass");
if(pass!==ADMIN_PASS){res.end("no");return;}
let {id}=JSON.parse(body);
await supabase.from("requests").delete().eq("id",id);
res.end("ok");
});
return;
}

// إضافة طلب
if(req.method==="POST"){
let body="";
req.on("data",c=>body+=c);
req.on("end",async ()=>{
let p=new URLSearchParams(body);

await supabase.from("requests").insert([{
name:p.get("name"),
phone:p.get("phone"),
service:p.get("service")
}]);

res.end(page("<h1>✅ تم الإرسال</h1><a href='/'>رجوع</a>"));
});
return;
}

// الصفحة الرئيسية
res.end(home());

});

server.listen(process.env.PORT || 3000);
