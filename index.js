const http = require("http");

const PORT = process.env.PORT || 10000;
const PHONE = "971588259848";
const ADMIN_PASS = "123456";

// ===== STORAGE =====
let requests = [];
let users = [];
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
  if(q.includes("مكيف")) return "غالباً المشكلة فلتر أو غاز.";
  if(q.includes("دهان")) return "حدد المساحة ونوع الدهان.";
  return "اكتب تفاصيل أكثر.";
}

// ===== PRICE =====
function calc(service,area){
  const map={"دهان":12,"تكييف":150,"سيراميك":90};
  if(area) return area*(map[service]||10);
  return map[service]||100;
}

// ===== USER =====
function getUser(email){
  let u = users.find(x=>x.email===email);
  if(!u){
    u={email,coins:20};
    users.push(u);
  }
  return u;
}

// ===== PAGE =====
function page(){
return `
<html dir="rtl">
<head>
<meta charset="UTF-8">
<title>Relax Fix AI</title>
<style>
body{margin:0;font-family:Arial;background:#020617;color:white}
.hero{text-align:center;padding:80px;background:linear-gradient(135deg,#00ffc3,#0099ff)}
button{padding:12px;border-radius:10px;border:none;background:#22c55e;color:white;margin:5px}
.card{background:#111827;padding:20px;margin:20px;border-radius:15px}
input,textarea{width:100%;padding:10px;margin:5px 0;border-radius:10px;border:none}
</style>
</head>

<body>

<div class="hero">
<h1>🚀 Relax Fix AI</h1>
<p>منصة صيانة + AI + Coins</p>
</div>

<div class="card">
<h2>💰 Coins</h2>
<input id="email" placeholder="Email">
<button onclick="reg()">احصل على 20 Coins</button>
<p id="coins"></p>
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

<button onclick="openRadar()" style="position:fixed;left:20px;bottom:20px">📡</button>

<div id="radar" style="display:none;position:fixed;inset:0;background:black;color:white;padding:20px">
<button onclick="closeRadar()">X</button>
<h2>الطلبات</h2>
<div id="list"></div>
</div>

<script>

// USER
function reg(){
fetch('/user',{method:'POST',headers:{'Content-Type':'application/json'},
body:JSON.stringify({email:email.value})})
.then(r=>r.json()).then(d=>coins.innerText="Coins: "+d.coins);
}

// CALC
function calc(){
fetch('/calc',{method:'POST',headers:{'Content-Type':'application/json'},
body:JSON.stringify({service:s.value,area:a.value})})
.then(r=>r.json()).then(d=>p.innerText=d.price);
}

// AI
function ask(){
fetch('/ai',{method:'POST',headers:{'Content-Type':'application/json'},
body:JSON.stringify({q:q.value})})
.then(r=>r.json()).then(d=>r.innerText=d.reply);
}

// REQUEST
function send(){
fetch('/request',{method:'POST',headers:{'Content-Type':'application/json'},
body:JSON.stringify({name:name.value,phone:phone.value,service:service.value})})
.then(()=>alert("تم"));
}

// RADAR
function openRadar(){
fetch('/admin')
.then(r=>r.text())
.then(t=>list.innerHTML=t);
radar.style.display="block";
}
function closeRadar(){radar.style.display="none";}

</script>

</body>
</html>
`;
}

// ===== ADMIN =====
function admin(){
return requests.map(r=>`<div>${r.name} - ${r.service}</div>`).join("");
}

// ===== SERVER =====
const server = http.createServer(async (req,res)=>{

const url = new URL(req.url,"http://x");

if(req.method==="GET" && url.pathname==="/")
return html(res,page());

if(req.method==="GET" && url.pathname==="/admin")
return html(res,admin());

// USER
if(req.method==="POST" && url.pathname==="/user"){
const b=JSON.parse(await readBody(req));
const u=getUser(b.email);
return json(res,u);
}

// CALC
if(req.method==="POST" && url.pathname==="/calc"){
const b=JSON.parse(await readBody(req));
return json(res,{price:calc(b.service,b.area)});
}

// AI
if(req.method==="POST" && url.pathname==="/ai"){
const b=JSON.parse(await readBody(req));
return json(res,{reply:aiReply(b.q)});
}

// REQUEST
if(req.method==="POST" && url.pathname==="/request"){
const b=JSON.parse(await readBody(req));
requests.push(b);
return json(res,{ok:true});
}

html(res,"OK");

});

// ===== PAY BUTTON ROUTE =====
if(req.method==="GET" && url.pathname==="/pay-page"){
  res.writeHead(200,{"Content-Type":"text/html"});
  return res.end(`
    <html>
    <body style="background:#0b1220;color:white;text-align:center;padding-top:100px;font-family:sans-serif;">
      <h1>اشتراك Relax Fix PRO</h1>
      <button onclick="buy()" style="padding:15px 30px;font-size:20px;border:none;border-radius:10px;background:#00c853;color:white;">
        اشترك الآن 💰
      </button>

      <script>
      async function buy(){
        const r = await fetch("/pay",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({email:"test@email.com"})
        });
        const d = await r.json();
        window.location = d.url;
      }
      </script>
    </body>
    </html>
  `);
}
server.listen(PORT,()=>console.log("r
