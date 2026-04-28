// RELAX FIX SaaS FULL (AI + Dashboard + REAL PAYMENT LINK)

const http = require("http");

const PORT = process.env.PORT || 10000;
const PHONE = "971588259848";

// 👇 حط لينك Stripe هنا
const STRIPE_LINK = "https://buy.stripe.com/PUT_YOUR_LINK_HERE";

let requests = [];

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
  return new Promise(r=>{
    let b="";
    req.on("data",c=>b+=c);
    req.on("end",()=>r(b));
  });
}

// ===== Calculator =====
function calc(service, area){
  const map = {
    "دهان": 12,
    "تكييف": 150,
    "جبسون": 90,
    "سيراميك": 120
  };
  if(area) return area * (map[service]||10);
  return map[service] || 100;
}

// ===== AI =====
function ai(q){
  q=q.toLowerCase();

  if(q.includes("مكيف"))
    return "افحص الفلتر + الغاز + المروحة. غالباً يحتاج تنظيف.";

  if(q.includes("دهان"))
    return "حدد المساحة ونوع الدهان.";

  return "اكتب تفاصيل أكثر.";
}

// ===== UI =====
function home(){
return `
<h1>🚀 Relax Fix SaaS</h1>

<div>
<h3>💰 Calculator</h3>
<input id="s">
<input id="a">
<button onclick="calc()">احسب</button>
<p id="p"></p>
</div>

<div>
<h3>🤖 AI</h3>
<textarea id="q"></textarea>
<button onclick="ask()">اسأل</button>
<p id="r"></p>
</div>

<div>
<h3>📩 Request</h3>
<input id="name">
<input id="phone">
<input id="srv">
<button onclick="send()">Send</button>
<p id="msg"></p>
</div>

<div>
<h3>💳 اشتراك</h3>
<button onclick="pay()">ادفع الآن</button>
</div>

<a href="/admin">Dashboard</a>

<script>
function calc(){
 fetch('/calc',{method:'POST',headers:{'Content-Type':'application/json'},
 body:JSON.stringify({service:s.value,area:a.value})})
 .then(r=>r.json()).then(d=>p.innerText=d.price+" درهم");
}

function ask(){
 fetch('/ai',{method:'POST',headers:{'Content-Type':'application/json'},
 body:JSON.stringify({q:q.value})})
 .then(r=>r.json()).then(d=>r.innerText=d.reply);
}

function send(){
 fetch('/request',{method:'POST',headers:{'Content-Type':'application/json'},
 body:JSON.stringify({name:name.value,phone:phone.value,service:srv.value})})
 .then(r=>r.json()).then(d=>msg.innerText=d.msg);
}

function pay(){
 window.open("${STRIPE_LINK}");
}
</script>
`;
}

// ===== Dashboard =====
function admin(){
return `
<h1>Dashboard</h1>

<table border="1">
<tr><th>اسم</th><th>هاتف</th><th>خدمة</th></tr>
${requests.map(r=>`
<tr>
<td>${r.name}</td>
<td>${r.phone}</td>
<td>${r.service}</td>
</tr>`).join("")}
</table>

<a href="/">رجوع</a>
`;
}

// ===== Server =====
const server = http.createServer(async (req,res)=>{

const url = new URL(req.url,"http://x");

if(req.method==="GET" && url.pathname==="/")
  return html(res,home());

if(req.method==="GET" && url.pathname==="/admin")
  return html(res,admin());

if(req.method==="POST" && url.pathname==="/calc"){
 const b = JSON.parse(await readBody(req));
 return json(res,{price:calc(b.service,b.area)});
}

if(req.method==="POST" && url.pathname==="/ai"){
 const b = JSON.parse(await readBody(req));
 return json(res,{reply:ai(b.q)});
}

if(req.method==="POST" && url.pathname==="/request"){
 const b = JSON.parse(await readBody(req));
 requests.push(b);

 return json(res,{
  msg:"تم الإرسال",
  wa:`https://wa.me/${PHONE}?text=طلب ${b.service}`
 });
}

html(res,home());

});

server.listen(PORT,()=>console.log("Running "+PORT));