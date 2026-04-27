const http = require("http");
const crypto = require("crypto");
const { createClient } = require("@supabase/supabase-js");

// ⚠️ تحتاج تثبيت stripe
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

// إعدادات
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const PORT = process.env.PORT || 3000;
const APP_URL = process.env.APP_URL || "";

/* ---------- helpers ---------- */
function html(res, body){
  res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
  res.end(`<!DOCTYPE html>
  <html><head><meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
  body{font-family:Arial;background:#0b1220;color:#fff;text-align:center;padding:20px}
  .card{background:#121a2b;padding:20px;margin:10px;border-radius:16px}
  input,textarea{width:92%;padding:10px;margin:6px;border-radius:10px;border:0}
  button{padding:10px 16px;border:0;border-radius:10px;background:#22c55e;color:#fff;cursor:pointer}
  .gold{background:#f59e0b;color:#111}
  .blue{background:#0ea5e9}
  .violet{background:#8b5cf6}
  </style></head><body>${body}</body></html>`);
}

function parseBody(req){
  return new Promise(resolve=>{
    let b=""; req.on("data",c=>b+=c.toString());
    req.on("end",()=>resolve(new URLSearchParams(b)));
  });
}

function token(){ return crypto.randomBytes(24).toString("hex"); }
function hash(p){ return crypto.createHash("sha256").update(p).digest("hex"); }

async function getUserId(req){
  const t = (req.headers.cookie||"").split("token=")[1];
  if(!t) return null;
  const { data } = await supabase.from("sessions").select("*").eq("token",t).single();
  return data ? data.user_id : null;
}

/* ---------- coins ---------- */
async function addCoins(uid, n){
  const { data } = await supabase.from("users").select("coins").eq("id",uid).single();
  const c = (data?.coins||0)+n;
  await supabase.from("users").update({coins:c}).eq("id",uid);
}
async function spendCoins(uid, n){
  const { data } = await supabase.from("users").select("coins").eq("id",uid).single();
  if((data?.coins||0) < n) return false;
  await supabase.from("users").update({coins:data.coins - n}).eq("id",uid);
  return true;
}

/* ---------- AI ---------- */
function aiAd(service){
  return {
    ar:`🔥 عرض على ${service} الآن — احجز فورًا`,
    en:`🔥 Offer for ${service} — Book now`
  };
}

// Mock فيديو (اربط API حقيقي لاحقًا)
function aiVideoMock(prompt){
  return {
    title: "AI Video Preview",
    scenes: [
      "Intro Hook",
      "Problem",
      "Solution",
      "Call To Action"
    ],
    note: "اربط Runway/Pika للحصول على فيديو فعلي"
  };
}

/* ---------- server ---------- */
http.createServer(async (req,res)=>{
try{

/* ---------- HOME ---------- */
if(req.url.startsWith("/")){
  const ref = new URL(req.url,"http://x").searchParams.get("ref")||"";

  html(res,`
    <h1>⚡ Relax Fix PRO</h1>

    <div class="card">
      <h3>🚀 Start Free (20 Coins)</h3>
      <form method="POST" action="/signup">
        <input name="email" placeholder="Email">
        <input name="password" type="password" placeholder="Password">
        <input type="hidden" name="ref" value="${ref}">
        <button class="gold">Start</button>
      </form>
    </div>

    <div class="card">
      <h3>🔐 Login</h3>
      <form method="POST" action="/login">
        <input name="email">
        <input name="password" type="password">
        <button>Login</button>
      </form>
    </div>
  `);
  return;
}

/* ---------- SIGNUP ---------- */
if(req.url==="/signup" && req.method==="POST"){
  const p = await parseBody(req);
  const code = Math.random().toString(36).substring(2,7);

  const { data } = await supabase.from("users").insert([{
    email:p.get("email"),
    password_hash:hash(p.get("password")),
    coins:20,
    referral_code:code,
    referred_by:p.get("ref")
  }]).select().single();

  const t = token();
  await supabase.from("sessions").insert([{user_id:data.id,token:t}]);

  res.writeHead(302,{"Set-Cookie":`token=${t}`,"Location":"/dashboard"});
  res.end();
}

/* ---------- LOGIN ---------- */
if(req.url==="/login" && req.method==="POST"){
  const p = await parseBody(req);
  const { data } = await supabase.from("users")
    .select("*")
    .eq("email",p.get("email"))
    .eq("password_hash",hash(p.get("password")))
    .single();

  if(!data) return html(res,"❌ Wrong");

  const t = token();
  await supabase.from("sessions").insert([{user_id:data.id,token:t}]);

  res.writeHead(302,{"Set-Cookie":`token=${t}`,"Location":"/dashboard"});
  res.end();
}

/* ---------- DASHBOARD ---------- */
if(req.url==="/dashboard"){
  const uid = await getUserId(req);
  if(!uid) return html(res,"Login first");

  const { data:u } = await supabase.from("users").select("*").eq("id",uid).single();

  html(res,`
    <h1>Dashboard</h1>

    💰 Coins: ${u.coins}

    <div class="card">
      🔗 Invite:
      <input value="${APP_URL}/?ref=${u.referral_code}">
      <a href="/share"><button class="blue">Share +3</button></a>
    </div>

    <div class="card">
      <h3>🎨 AI Ad (2 Coins)</h3>
      <form method="POST" action="/ai">
        <input name="service" placeholder="Service">
        <button>Generate</button>
      </form>
    </div>

    <div class="card">
      <h3>🎥 AI Video (5 Coins)</h3>
      <form method="POST" action="/video">
        <input name="prompt" placeholder="Idea">
        <button class="violet">Create Video</button>
      </form>
    </div>

    <div class="card">
      <h3>💳 Upgrade</h3>
      <a href="/checkout?plan=starter"><button>Starter</button></a>
      <a href="/checkout?plan=pro"><button>Pro</button></a>
    </div>
  `);
}

/* ---------- SHARE ---------- */
if(req.url==="/share"){
  const uid = await getUserId(req);
  await addCoins(uid,3);
  res.writeHead(302,{Location:"/dashboard"});
  res.end();
}

/* ---------- AI AD ---------- */
if(req.url==="/ai" && req.method==="POST"){
  const uid = await getUserId(req);
  if(!(await spendCoins(uid,2))) return html(res,"❌ Coins finished");

  const p = await parseBody(req);
  const ad = aiAd(p.get("service"));

  html(res,`
    <h2>${ad.ar}</h2>
    <h3>${ad.en}</h3>
    <a href="/dashboard">Back</a>
  `);
}

/* ---------- AI VIDEO ---------- */
if(req.url==="/video" && req.method==="POST"){
  const uid = await getUserId(req);
  if(!(await spendCoins(uid,5))) return html(res,"❌ Coins finished");

  const p = await parseBody(req);
  const vid = aiVideoMock(p.get("prompt"));

  html(res,`
    <h2>${vid.title}</h2>
    <p>${vid.scenes.join(" → ")}</p>
    <small>${vid.note}</small><br>
    <a href="/dashboard">Back</a>
  `);
}

/* ---------- STRIPE CHECKOUT ---------- */
if(req.url.startsWith("/checkout")){
  const uid = await getUserId(req);
  if(!uid) return html(res,"Login first");

  const plan = new URL(req.url,"http://x").searchParams.get("plan");

  const price = plan==="pro"
    ? process.env.STRIPE_PRICE_PRO
    : process.env.STRIPE_PRICE_STARTER;

  const session = await stripe.checkout.sessions.create({
    mode:"subscription",
    line_items:[{price,quantity:1}],
    success_url: APP_URL + "/dashboard",
    cancel_url: APP_URL + "/dashboard"
  });

  res.writeHead(302,{Location:session.url});
  res.end();
}

}catch(e){
  res.end(e.message);
}
}).listen(PORT,()=>console.log("PRO running"));