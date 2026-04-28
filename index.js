// RELAX FIX PRODUCTION (Supabase + Stripe + AI + Dashboard) — single file

const http = require("http");

// ===== ENV =====
const PORT = process.env.PORT || 10000;
const PHONE = process.env.PHONE || "971588259848";
const ADMIN_PASS = process.env.ADMIN_PASS || "123456";

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || "";

const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY || "";
const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID || "";
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

// ===== HELPERS =====
function html(res, body){
  res.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
  res.end(body);
}
function json(res, data){
  res.writeHead(200, {"Content-Type":"application/json; charset=utf-8"});
  res.end(JSON.stringify(data));
}
function readBody(req){
  return new Promise(r=>{
    let b=""; req.on("data",c=>b+=c); req.on("end",()=>r(b));
  });
}
function esc(v){ return String(v||"").replace(/[&<>"']/g, m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m])); }

// ===== SUPABASE =====
async function dbInsert(table, data){
  if(!SUPABASE_URL || !SUPABASE_KEY) return {ok:false};
  return fetch(`${SUPABASE_URL}/rest/v1/${table}`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "apikey":SUPABASE_KEY,
      "Authorization":"Bearer "+SUPABASE_KEY,
      "Prefer":"return=minimal"
    },
    body:JSON.stringify(data)
  });
}
async function dbSelect(table, query="*"){
  if(!SUPABASE_URL || !SUPABASE_KEY) return [];
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=${query}`,{
    headers:{ "apikey":SUPABASE_KEY, "Authorization":"Bearer "+SUPABASE_KEY }
  });
  try{ return await r.json(); }catch{ return []; }
}
async function dbUpdateUserByEmail(email, patch){
  return fetch(`${SUPABASE_URL}/rest/v1/users?email=eq.${encodeURIComponent(email)}`,{
    method:"PATCH",
    headers:{
      "Content-Type":"application/json",
      "apikey":SUPABASE_KEY,
      "Authorization":"Bearer "+SUPABASE_KEY
    },
    body:JSON.stringify(patch)
  });
}

// ===== PRICING =====
function calcPrice(service, area){
  const a = Number(area||0);
  const map = {
    "صيانة تكييف":{fixed:150,per:0},
    "تنظيف مكيفات":{fixed:120,per:0},
    "دهان":{fixed:0,per:12},
    "كهرباء":{fixed:120,per:20},
    "سباكة":{fixed:100,per:15},
    "سيراميك":{fixed:0,per:85},
    "جبسون بورد":{fixed:0,per:95},
    "عزل أسطح":{fixed:0,per:55}
  };
  const r = map[service] || {fixed:120, per:10};
  if(r.per && a) return Math.round(a*r.per);
  return r.fixed || Math.round((a||10)*r.per);
}

// ===== AI (local fast) =====
function aiReply(q){
  q = (q||"").toLowerCase();
  if(q.includes("مكيف")) return "افحص الفلتر + الغاز + المروحة. غالبًا يحتاج تنظيف أو شحن.";
  if(q.includes("دهان")) return "حدد المساحة ونوع الدهان. هل يوجد تقشير أو رطوبة؟";
  return "اكتب تفاصيل أكثر لنساعدك بدقة.";
}

// ===== UI =====
function servicesOptions(){
  const s = ["صيانة تكييف","تنظيف مكيفات","دهان","كهرباء","سباكة","سيراميك","جبسون بورد","عزل أسطح"];
  return s.map(x=>`<option>${x}</option>`).join("");
}

function home(){
return `<!DOCTYPE html><html lang="ar" dir="rtl"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Relax Fix Pro</title>
<style>
body{margin:0;font-family:Arial;background:#050814;color:#fff}
.wrap{width:min(1000px,92%);margin:auto}
.card{background:#0f172a;border:1px solid #263244;border-radius:16px;padding:14px;margin:12px 0}
input,select,textarea{width:100%;padding:12px;margin:6px 0;border-radius:10px;border:0}
button{padding:10px 14px;border:0;border-radius:12px;background:#22c55e;color:#fff;margin:6px;cursor:pointer}
.gold{background:#f59e0b;color:#111}
</style></head><body>
<div class="wrap">
<h1>🚀 Relax Fix</h1>

<div class="card">
<h3>💰 حاسبة السعر</h3>
<select id="svc">${servicesOptions()}</select>
<input id="area" placeholder="المساحة">
<button onclick="calc()">احسب</button>
<p id="price"></p>
</div>

<div class="card">
<h3>🤖 AI</h3>
<textarea id="q"></textarea>
<button onclick="ask()">اسأل</button>
<p id="a"></p>
</div>

<div class="card">
<h3>📩 طلب خدمة</h3>
<input id="email" placeholder="Email">
<input id="name" placeholder="الاسم">
<input id="phone" placeholder="الهاتف">
<input id="city" placeholder="المدينة">
<select id="service">${servicesOptions()}</select>
<input id="area2" placeholder="المساحة">
<textarea id="notes" placeholder="تفاصيل"></textarea>
<button class="gold" onclick="send()">إرسال</button>
<p id="msg"></p>
</div>

<div class="card">
<h3>💳 اشتراك</h3>
<button onclick="pay()">ادفع الآن</button>
</div>

<a href="/admin">Admin</a>
</div>

<script>
function calc(){
 fetch('/api/calc',{method:'POST',headers:{'Content-Type':'application/json'},
 body:JSON.stringify({service:svc.value,area:area.value})})
 .then(r=>r.json()).then(d=>price.innerText=d.price+" درهم");
}
function ask(){
 fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},
 body:JSON.stringify({q:q.value})})
 .then(r=>r.json()).then(d=>a.innerText=d.reply);
}
function send(){
 fetch('/api/request',{method:'POST',headers:{'Content-Type':'application/json'},
 body:JSON.stringify({
  email:email.value,name:name.value,phone:phone.value,city:city.value,
  service:service.value,area:area2.value,notes:notes.value
 })})
 .then(r=>r.json()).then(d=>msg.innerText=d.msg);
}
function pay(){
 fetch('/create-checkout-session',{method:'POST'})
 .then(r=>r.json()).then(d=>{ if(d.url) location=d.url; else alert("error");});
}
</script>

</body></html>`;
}

async function adminPage(passOk){
  if(!passOk) return `<h1>🔐 Admin</h1><input id=p><button onclick="go()">Open</button><script>function go(){location='/?admin='+p.value}</script>`;
  const rows = await dbSelect("requests");
  return `<h1>👨‍💼 Admin</h1>
  <p>Requests: ${rows.length}</p>
  ${rows.map(r=>`<div>${esc(r.service)} - ${esc(r.phone)}</div>`).join("")}
  <p><a href="/">Home</a></p>`;
}

// ===== SERVER =====
const server = http.createServer(async (req,res)=>{
  const url = new URL(req.url,"http://x");

  // pages
  if(req.method==="GET" && url.pathname==="/") return html(res,home());
  if(req.method==="GET" && url.pathname==="/admin") return html(res,await adminPage(url.searchParams.get("pass")===ADMIN_PASS));

  // calc
  if(req.method==="POST" && url.pathname==="/api/calc"){
    const b = JSON.parse(await readBody(req)||"{}");
    return json(res,{price:calcPrice(b.service,b.area)});
  }

  // ai
  if(req.method==="POST" && url.pathname==="/api/chat"){
    const b = JSON.parse(await readBody(req)||"{}");
    return json(res,{reply:aiReply(b.q)});
  }

  // save request
  if(req.method==="POST" && url.pathname==="/api/request"){
    const b = JSON.parse(await readBody(req)||"{}");

    const price = calcPrice(b.service,b.area);
    const ai = aiReply((b.notes||"")+" "+(b.service||""));

    await dbInsert("requests",{
      email:b.email,name:b.name,phone:b.phone,city:b.city,
      service:b.service,area:b.area,notes:b.notes,
      price,ai,status:"new"
    });

    // ensure user exists
    if(b.email){
      await dbInsert("users",{ email:b.email, plan:"FREE", coins:20 });
    }

    return json(res,{msg:"✅ تم حفظ الطلب"});
  }

  // stripe checkout (server-side)
  if(req.method==="POST" && url.pathname==="/create-checkout-session"){
    try{
      const stripe = require("stripe")(STRIPE_SECRET);
      const session = await stripe.checkout.sessions.create({
        mode:"subscription",
        payment_method_types:["card"],
        line_items:[{price:STRIPE_PRICE_ID, quantity:1}],
        success_url: BASE_URL + "/?paid=1",
        cancel_url: BASE_URL + "/?canceled=1"
      });
      return json(res,{url:session.url});
    }catch(e){
      return json(res,{error:e.message});
    }
  }

  // webhook
  if(req.method==="POST" && url.pathname==="/webhook"){
    let body = await readBody(req);
    try{
      const event = JSON.parse(body);
      if(event.type==="checkout.session.completed"){
        const email = event.data.object.customer_details?.email;
        if(email){
          await dbUpdateUserByEmail(email,{plan:"PRO", coins:100});
        }
      }
    }catch(e){}
    res.end("ok");
    return;
  }

  html(res,"OK");
});

server.listen(PORT,"0.0.0.0",()=>console.log("Running "+PORT));