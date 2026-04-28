const http = require("http");

const PORT = process.env.PORT || 10000;
const PHONE = process.env.PHONE || "971588259848";
const ADMIN_PASS = process.env.ADMIN_PASS || "123456";

// ===== STORAGE =====
let requests = [];
let chats = [];

// ===== HELPERS =====
function html(res, body){
  res.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
  res.end(body);
}
function json(res, data){
  res.writeHead(200, {"Content-Type":"application/json"});
  res.end(JSON.stringify(data));
}
function readBody(req){
  return new Promise(r=>{
    let b="";
    req.on("data",c=>b+=c);
    req.on("end",()=>r(b));
  });
}

// ===== AI =====
function aiReply(q){
  q = (q||"").toLowerCase();

  if(q.includes("مكيف")) return "افحص الفلتر والغاز غالباً المشكلة هنا.";
  if(q.includes("دهان")) return "حدد المساحة ونوع الدهان.";
  if(q.includes("سيراميك")) return "كم المساحة؟";

  return "اكتب تفاصيل أكثر.";
}

// ===== PRICE =====
function calc(service,area){
  const map={
    "دهان":12,
    "تكييف":150,
    "سيراميك":90,
    "كهرباء":120
  };
  if(area) return area*(map[service]||10);
  return map[service]||100;
}

// ===== UI =====
function page(){
return `
<html dir="rtl">
<head>
<meta charset="UTF-8">
<title>Relax Fix AI</title>

<style>
body{
margin:0;
font-family:Arial;
background:#020617;
color:white;
}

.hero{
text-align:center;
padding:80px;
background:linear-gradient(135deg,#00ffc3,#0099ff);
}

button{
padding:12px;
border-radius:10px;
border:none;
background:#22c55e;
color:white;
margin:5px;
}

.card{
background:#111827;
padding:20px;
margin:20px;
border-radius:15px;
}

input,textarea{
width:100%;
padding:10px;
margin:5px 0;
border-radius:10px;
border:none;
}
</style>

</head>

<body>

<div class="hero">
<h1>🚀 Relax Fix AI</h1>
<p>منصة ذكية للصيانة</p>
</div>

<div class="card">
<h2>💰 حاسبة</h2>
<input id="s">
<input id="a">
<button onclick="calc()">احسب</button>
<p id="p"></p>
</div>

<div class="card">
<h2>🤖 AI</h2>
<textarea id="q"></textarea>
<button onclick="ask()">اسأل</button>
<p id="r"></p>
</div>

<div class="card">
<h2>📩 طلب</h2>
<input id="name">
<input id="phone">
<input id="service">
<button onclick="send()">ارسال</button>
</div>

<a href="/admin">Admin</a>

<script>

function calc(){
fetch('/calc',{method:'POST',headers:{'Content-Type':'application/json'},
body:JSON.stringify({service:s.value,area:a.value})})
.then(r=>r.json()).then(d=>p.innerText=d.price);
}

function ask(){
fetch('/ai',{method:'POST',headers:{'Content-Type':'application/json'},
body:JSON.stringify({q:q.value})})
.then(r=>r.json()).then(d=>r.innerText=d.reply);
}

function send(){
fetch('/request',{method:'POST',headers:{'Content-Type':'application/json'},
body:JSON.stringify({name:name.value,phone:phone.value,service:service.value})})
.then(()=>alert("تم"));
}

</script>

</body>
</html>
`;
}

// ===== ADMIN =====
function admin(){
return `
<h1>Admin</h1>
${requests.map(r=>`
<div>
${r.name} - ${r.service}
</div>`).join("")}
`;
}

// ===== SERVER =====
const server = http.createServer(async (req,res)=>{

const url = new URL(req.url,"http://x");

// home
if(req.method==="GET" && url.pathname==="/")
return html(res,page());

// admin
if(req.method==="GET" && url.pathname==="/admin")
return html(res,admin());

// calc
if(req.method==="POST" && url.pathname==="/calc"){
const b=JSON.parse(await readBody(req));
return json(res,{price:calc(b.service,b.area)});
}

// ai
if(req.method==="POST" && url.pathname==="/ai"){
const b=JSON.parse(await readBody(req));
return json(res,{reply:aiReply(b.q)});
}

// request
if(req.method==="POST" && url.pathname==="/request"){
const b=JSON.parse(await readBody(req));
requests.push(b);
return json(res,{ok:true});
}

html(res,"OK");

});

server.listen(PORT,()=>console.log("Running"));