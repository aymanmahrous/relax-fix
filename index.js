// RELAX FIX PRO+ SaaS (Stable + AI + Dashboard + Calculator)

const http = require("http");

const PORT = process.env.PORT || 10000;
const PHONE = "971588259848";
const ADMIN_PASS = "123456";

let requests = [];
let messages = [];

// ===== Helpers =====
function html(res, body){
  res.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
  res.end(body);
}

function json(res, data){
  res.writeHead(200, {"Content-Type":"application/json"});
  res.end(JSON.stringify(data));
}

function readBody(req){
  return new Promise(resolve=>{
    let body="";
    req.on("data", chunk=> body+=chunk.toString());
    req.on("end", ()=> resolve(body));
  });
}

// ===== Calculator =====
function calcPrice(service){
  const prices = {
    "دهان": 10,
    "تكييف": 150,
    "جبسون": 90,
    "سيراميك": 120,
    "كهرباء": 80,
    "سباكة": 70
  };
  return prices[service] || 100;
}

// ===== AI =====
function aiReply(q){
  q = q.toLowerCase();

  if(q.includes("مكيف")){
    return "افحص الفلتر + الغاز + المروحة. غالباً يحتاج تنظيف أو شحن.";
  }
  if(q.includes("دهان")){
    return "حدد المساحة ونوع الدهان. السعر يعتمد على التجهيز.";
  }
  return "اكتب تفاصيل أكثر وسنساعدك فوراً.";
}

// ===== UI =====
function home(){
return `
<html dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Relax Fix</title>

<style>
body{background:#050814;color:#fff;font-family:Arial;text-align:center}
.card{background:#0f172a;margin:15px;padding:15px;border-radius:15px}
button{padding:10px;margin:5px;border:none;border-radius:10px;background:#22c55e;color:white}
input,textarea{width:80%;padding:10px;margin:5px;border-radius:10px;border:none}
</style>
</head>

<body>

<h1>🚀 Relax Fix SaaS</h1>

<div class="card">
<h2>💰 حاسبة السعر</h2>
<input id="service" placeholder="نوع الخدمة">
<button onclick="calc()">احسب</button>
<p id="price"></p>
</div>

<div class="card">
<h2>🤖 AI Assistant</h2>
<textarea id="q"></textarea>
<button onclick="ask()">اسأل</button>
<p id="a"></p>
</div>

<div class="card">
<h2>📩 طلب خدمة</h2>
<input id="name" placeholder="الاسم">
<input id="phone" placeholder="الهاتف">
<input id="srv" placeholder="الخدمة">
<button onclick="send()">إرسال</button>
<p id="msg"></p>
</div>

<a href="/admin">لوحة التحكم</a>

<script>
function calc(){
 fetch('/calc',{method:'POST',headers:{'Content-Type':'application/json'},
 body:JSON.stringify({service:service.value})})
 .then(r=>r.json()).then(d=>price.innerText=d.price+' درهم');
}

function ask(){
 fetch('/ai',{method:'POST',headers:{'Content-Type':'application/json'},
 body:JSON.stringify({q:q.value})})
 .then(r=>r.json()).then(d=>a.innerText=d.reply);
}

function send(){
 fetch('/request',{method:'POST',headers:{'Content-Type':'application/json'},
 body:JSON.stringify({
  name:name.value,
  phone:phone.value,
  service:srv.value
 })})
 .then(r=>r.json()).then(d=>msg.innerText=d.msg);
}
</script>

</body>
</html>
`;
}

// ===== Admin =====
function adminPage(){
return `
<h1>Dashboard</h1>

<table border="1">
<tr><th>اسم</th><th>هاتف</th><th>خدمة</th></tr>
${requests.map(r=>`
<tr>
<td>${r.name}</td>
<td>${r.phone}</td>
<td>${r.service}</td>
</tr>
`).join("")}
</table>

<a href="/">رجوع</a>
`;
}

// ===== Server =====
const server = http.createServer(async (req,res)=>{

const url = new URL(req.url,"http://x");

// Pages
if(req.method==="GET" && url.pathname==="/"){
  return html(res, home());
}

if(req.method==="GET" && url.pathname==="/admin"){
  return html(res, adminPage());
}

// API
if(req.method==="POST" && url.pathname==="/calc"){
  const body = JSON.parse(await readBody(req));
  return json(res,{price:calcPrice(body.service)});
}

if(req.method==="POST" && url.pathname==="/ai"){
  const body = JSON.parse(await readBody(req));
  const reply = aiReply(body.q);
  messages.push({q:body.q,reply});
  return json(res,{reply});
}

if(req.method==="POST" && url.pathname==="/request"){
  const body = JSON.parse(await readBody(req));
  requests.push(body);

  return json(res,{
    msg:"تم الإرسال",
    wa:`https://wa.me/${PHONE}?text=طلب ${body.service}`
  });
}

html(res, home());

});

server.listen(PORT,()=>{
 console.log("Running on "+PORT);
});