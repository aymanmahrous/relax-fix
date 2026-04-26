const http = require("http");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://nmzxrjdxvmmzzmajrskm.supabase.co",
  "sb_publishable_qXOPVaD5_f60qf1UbYrm2A_sH9c0lW5"
);

const WHATSAPP_NUMBER = "971588259848";
const ADMIN_PASS = "123456";

function send(res, html) {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
}

function mainPage() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Relax Fix UAE</title>
<style>
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;font-family:Arial;background:#050914;color:white}
a{text-decoration:none;color:inherit}
.container{width:min(1180px,calc(100% - 30px));margin:auto}
header{position:sticky;top:0;z-index:50;background:#030712;border-bottom:1px solid #1f2937}
.nav{min-height:74px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}
.logo{font-size:24px;font-weight:900}
.btn{display:inline-block;padding:13px 18px;border-radius:14px;font-weight:800;border:0;cursor:pointer}
.btn-main{background:linear-gradient(135deg,#00ff88,#12d6ff);color:#04130b}
.btn-wa{background:#25D366;color:white}
.btn-call{background:#1fc6ff;color:white}
.lang{background:#111827;color:white;border:1px solid #334155;padding:10px 12px;border-radius:12px;cursor:pointer}
.hero{padding:85px 0;background:radial-gradient(circle at top right,rgba(0,255,136,.18),transparent 35%),#07111f}
.hero-grid{display:grid;grid-template-columns:1fr 1fr;gap:35px;align-items:center}
h1{font-size:clamp(42px,7vw,72px);line-height:1;margin:0 0 18px}
h2{font-size:34px}
.muted{color:#b7c6d8}
.card,.service{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:26px;padding:26px}
input,textarea,select{width:100%;padding:15px;margin:7px 0;border-radius:14px;border:0;font-size:16px}
textarea{min-height:100px}
button.submit{width:100%;padding:15px;border:0;border-radius:14px;background:#00ff88;font-weight:900;font-size:16px}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.service{cursor:pointer}
.service:hover{background:#132a47}
section{padding:45px 0}
.float-wa,.float-call{position:fixed;right:18px;color:white;padding:14px 18px;border-radius:999px;font-weight:900;z-index:99}
.float-wa{bottom:18px;background:#25D366}
.float-call{bottom:78px;background:#1fc6ff}
footer{padding:35px;background:#030712;text-align:center;color:#a8bdd4}
@media(max-width:900px){.hero-grid,.grid3{grid-template-columns:1fr}.nav{text-align:center;justify-content:center}.hero{text-align:center}}
</style>
</head>
<body>

<header>
<div class="container nav">
  <div class="logo">❄️ Relax Fix UAE</div>
  <div>
    <button class="lang" onclick="setLang('en')">EN</button>
    <button class="lang" onclick="setLang('ar')">AR</button>
    <a class="btn btn-call" href="tel:+971588259848" id="callTop">📞 Call</a>
    <a class="btn btn-wa" id="topWa" target="_blank">💬 WhatsApp</a>
  </div>
</div>
</header>

<main>
<section class="hero">
<div class="container hero-grid">
  <div>
    <h1 id="title">Fast, Clean & Trusted Home Maintenance in UAE</h1>
    <p class="muted" id="subtitle">AC maintenance, tank cleaning and pest control with fast WhatsApp booking.</p>
    <a class="btn btn-main" onclick="scrollToBooking()" id="bookBtn">Book Service Now</a>
    <a class="btn btn-wa" id="heroWa" target="_blank">💬 WhatsApp</a>
  </div>

  <div class="card">
    <h2 id="quickTitle">Quick Booking</h2>
    <form method="POST" action="/">
      <input name="name" id="nameInput" placeholder="Name" required>
      <input name="phone" id="phoneInput" placeholder="Phone" required>
      <select name="service" required>
        <option value="">Select Service</option>
        <option>AC Maintenance</option>
        <option>Water Tank Cleaning</option>
        <option>Pest Control</option>
        <option>Other Maintenance</option>
      </select>
      <textarea name="message" id="messageInput" placeholder="Message"></textarea>
      <input type="hidden" name="lang" id="langInput" value="en">
      <button class="submit" type="submit" id="sendBtn">Send Request + Open WhatsApp</button>
    </form>
  </div>
</div>
</section>

<section>
<div class="container">
<h2 id="servicesTitle">Our Services</h2>
<div class="grid3">
  <div class="service" onclick="selectService('AC Maintenance')"><h3 id="acTitle">❄️ AC Maintenance</h3><p class="muted" id="acText">Repair, cleaning and weak cooling.</p></div>
  <div class="service" onclick="selectService('Water Tank Cleaning')"><h3 id="tankTitle">💧 Water Tank Cleaning</h3><p class="muted" id="tankText">Clean and hygienic tank cleaning.</p></div>
  <div class="service" onclick="selectService('Pest Control')"><h3 id="pestTitle">🐜 Pest Control</h3><p class="muted" id="pestText">Pest control for homes and businesses.</p></div>
</div>
</div>
</section>

<section id="booking">
<div class="container">
<div class="card">
<h2 id="formTitle">Book Your Service</h2>
<form method="POST" action="/">
  <input name="name" id="nameInput2" placeholder="Name" required>
  <input name="phone" id="phoneInput2" placeholder="Phone" required>
  <input name="service" id="serviceInput" placeholder="Service" required>
  <textarea name="message" id="messageInput2" placeholder="Tell us more"></textarea>
  <input type="hidden" name="lang" id="langInput2" value="en">
  <button class="submit" type="submit" id="sendBtn2">Send Request + Open WhatsApp</button>
</form>
</div>
</div>
</section>
</main>

<a class="float-call" href="tel:+971588259848">📞 Call</a>
<a class="float-wa" id="floatWa" target="_blank">💬 WhatsApp</a>

<footer>
Relax Fix UAE<br>
WhatsApp: +971 58 825 9848
</footer>

<script>
const WA="971588259848";

const text={
en:{
dir:"ltr",title:"Fast, Clean & Trusted Home Maintenance in UAE",
subtitle:"AC maintenance, tank cleaning and pest control with fast WhatsApp booking.",
bookBtn:"Book Service Now",quickTitle:"Quick Booking",servicesTitle:"Our Services",
acTitle:"❄️ AC Maintenance",acText:"Repair, cleaning and weak cooling.",
tankTitle:"💧 Water Tank Cleaning",tankText:"Clean and hygienic tank cleaning.",
pestTitle:"🐜 Pest Control",pestText:"Pest control for homes and businesses.",
formTitle:"Book Your Service",name:"Name",phone:"Phone",service:"Service",
message:"Tell us more",send:"Send Request + Open WhatsApp",
wa:"Hello, I want to book AC / tank cleaning / pest control service from Relax Fix"
},
ar:{
dir:"rtl",title:"خدمات صيانة سريعة ونظيفة وموثوقة في الإمارات",
subtitle:"صيانة تكييف، تنظيف خزانات، ومكافحة حشرات مع حجز سريع عبر واتساب.",
bookBtn:"احجز الخدمة الآن",quickTitle:"حجز سريع",servicesTitle:"خدماتنا",
acTitle:"❄️ صيانة تكييف",acText:"إصلاح وتنظيف وضعف تبريد.",
tankTitle:"💧 تنظيف خزانات",tankText:"تنظيف خزانات بطريقة نظيفة ومنظمة.",
pestTitle:"🐜 مكافحة حشرات",pestText:"مكافحة حشرات للمنازل والأعمال.",
formTitle:"احجز خدمتك",name:"الاسم",phone:"رقم الهاتف",service:"الخدمة",
message:"اكتب تفاصيل طلبك",send:"إرسال الطلب + فتح واتساب",
wa:"السلام عليكم، أريد حجز خدمة تكييف / تنظيف خزانات / مكافحة حشرات من Relax Fix"
}
};

function setLang(lang){
localStorage.setItem("lang",lang);
document.body.dir=text[lang].dir;
document.documentElement.lang=lang;
for(const k in text[lang]){
const el=document.getElementById(k);
if(el)el.innerText=text[lang][k];
}
document.getElementById("nameInput").placeholder=text[lang].name;
document.getElementById("nameInput2").placeholder=text[lang].name;
document.getElementById("phoneInput").placeholder=text[lang].phone;
document.getElementById("phoneInput2").placeholder=text[lang].phone;
document.getElementById("serviceInput").placeholder=text[lang].service;
document.getElementById("messageInput").placeholder=text[lang].message;
document.getElementById("messageInput2").placeholder=text[lang].message;
document.getElementById("sendBtn").innerText=text[lang].send;
document.getElementById("sendBtn2").innerText=text[lang].send;
document.getElementById("langInput").value=lang;
document.getElementById("langInput2").value=lang;
const wa="https://wa.me/"+WA+"?text="+encodeURIComponent(text[lang].wa);
document.getElementById("topWa").href=wa;
document.getElementById("heroWa").href=wa;
document.getElementById("floatWa").href=wa;
}

function selectService(service){
const lang=localStorage.getItem("lang")||"en";
const ar={"AC Maintenance":"صيانة تكييف","Water Tank Cleaning":"تنظيف خزانات","Pest Control":"مكافحة حشرات"};
document.getElementById("serviceInput").value=lang==="ar"?ar[service]:service;
scrollToBooking();
}

function scrollToBooking(){
document.getElementById("booking").scrollIntoView({behavior:"smooth"});
}

setLang(localStorage.getItem("lang") || "en");
</script>

</body>
</html>
`;
}

function adminPage() {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Relax Fix Dashboard</title>
<style>
body{font-family:Arial;background:#07111f;color:white;padding:20px}
input,select,button{padding:10px;border-radius:8px;border:0;margin:5px}
table{width:100%;border-collapse:collapse;margin-top:20px;background:#0b1324}
th,td{border:1px solid #263244;padding:10px;text-align:left}
th{background:#111827}
.btn{padding:7px 10px;border-radius:7px;text-decoration:none;color:white;border:0;cursor:pointer}
.call{background:#1fc6ff}
.wa{background:#25D366}
.del{background:#ef4444}
.done{background:#00ff88;color:#000}
.new{background:#facc15;color:#000}
</style>
</head>
<body>

<h1>📊 Relax Fix Dashboard</h1>

<input id="pass" placeholder="Password" type="password">
<select id="filter">
<option value="all">All</option>
<option value="new">New</option>
<option value="done">Done</option>
</select>
<button onclick="loadData()">Open Dashboard</button>

<table>
<thead>
<tr>
<th>Name</th>
<th>Phone</th>
<th>Service</th>
<th>Notes</th>
<th>Status</th>
<th>Date</th>
<th>Actions</th>
</tr>
</thead>
<tbody id="rows"></tbody>
</table>

<script>
async function loadData(){
const pass=document.getElementById("pass").value;
const filter=document.getElementById("filter").value;
const res=await fetch("/api/requests?pass="+pass);
const data=await res.json();

if(data.error){alert(data.error);return;}

const rows=document.getElementById("rows");
rows.innerHTML="";

data.filter(x=>filter==="all" || x.status===filter).forEach(item=>{
const phone=item.phone || "";
rows.innerHTML += \`
<tr>
<td>\${item.name || ""}</td>
<td>\${phone}</td>
<td>\${item.service || ""}</td>
<td>\${item.notes || ""}</td>
<td>\${item.status || "new"}</td>
<td>\${item.created_at ? new Date(item.created_at).toLocaleString() : ""}</td>
<td>
<a class="btn call" href="tel:\${phone}">Call</a>
<a class="btn wa" target="_blank" href="https://wa.me/\${phone}">WhatsApp</a>
<button class="btn done" onclick="updateStatus('\${item.id}','done')">Done</button>
<button class="btn new" onclick="updateStatus('\${item.id}','new')">New</button>
<button class="btn del" onclick="deleteRow('\${item.id}')">Delete</button>
</td>
</tr>
\`;
});
}

async function updateStatus(id,status){
const pass=document.getElementById("pass").value;
await fetch("/api/requests/status?pass="+pass,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({id,status})
});
loadData();
}

async function deleteRow(id){
if(!confirm("Delete request?"))return;
const pass=document.getElementById("pass").value;
await fetch("/api/requests/delete?pass="+pass,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({id})
});
loadData();
}
</script>

</body>
</html>
`;
}

const server = http.createServer(async (req, res) => {
  if (req.method === "GET" && req.url.startsWith("/admin")) {
    send(res, adminPage());
    return;
  }

  if (req.method === "GET" && req.url.startsWith("/api/requests")) {
    const url = new URL(req.url, "http://localhost");
    if (url.searchParams.get("pass") !== ADMIN_PASS) {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Unauthorized" }));
      return;
    }

    const { data, error } = await supabase
      .from("requests")
      .select("*")
      .order("created_at", { ascending: false });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(error ? { error: error.message } : data));
    return;
  }

  if (req.method === "POST" && req.url.startsWith("/api/requests/status")) {
    let body = "";
    req.on("data", chunk => body += chunk.toString());
    req.on("end", async () => {
      const url = new URL(req.url, "http://localhost");
      if (url.searchParams.get("pass") !== ADMIN_PASS) {
        res.writeHead(401);
        res.end("Unauthorized");
        return;
      }

      const payload = JSON.parse(body);
      await supabase.from("requests").update({ status: payload.status }).eq("id", payload.id);
      res.end("OK");
    });
    return;
  }

  if (req.method === "POST" && req.url.startsWith("/api/requests/delete")) {
    let body = "";
    req.on("data", chunk => body += chunk.toString());
    req.on("end", async () => {
      const url = new URL(req.url, "http://localhost");
      if (url.searchParams.get("pass") !== ADMIN_PASS) {
        res.writeHead(401);
        res.end("Unauthorized");
        return;
      }

      const payload = JSON.parse(body);
      await supabase.from("requests").delete().eq("id", payload.id);
      res.end("OK");
    });
    return;
  }

  if (req.method === "POST") {
    let body = "";
    req.on("data", chunk => body += chunk.toString());

    req.on("end", async () => {
      const params = new URLSearchParams(body);

      const data = {
        name: params.get("name"),
        phone: params.get("phone"),
        service: params.get("service"),
        message: params.get("message"),
        lang: params.get("lang") || "en"
      };

      const { error } = await supabase.from("requests").insert([{
        name: data.name,
        phone: data.phone,
        service: data.service,
        notes: data.message
      }]);

      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

      if (error) {
        res.end("<h1>Error saving data</h1><a href='/'>Back</a>");
        return;
      }

      const msg = data.lang === "ar"
        ? encodeURIComponent("السلام عليكم Relax Fix\\nالاسم: " + data.name + "\\nالهاتف: " + data.phone + "\\nالخدمة: " + data.service + "\\nالرسالة: " + data.message)
        : encodeURIComponent("Hello Relax Fix\\nName: " + data.name + "\\nPhone: " + data.phone + "\\nService: " + data.service + "\\nMessage: " + data.message);

      const whatsappUrl = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + msg;

      res.end(`
<html>
<head><meta charset="UTF-8"></head>
<body style="background:#07111f;color:white;text-align:center;padding:50px;font-family:Arial">
<h1 style="color:#00ff88">✅ Saved Successfully</h1>
<h2>WhatsApp will open automatically</h2>
<a href="${whatsappUrl}" target="_blank" style="background:#25D366;color:white;padding:14px 24px;border-radius:10px;text-decoration:none">Open WhatsApp</a>
<br><br>
<a href="/" style="background:#00ff88;color:black;padding:12px 20px;border-radius:10px;text-decoration:none">Back Home</a>
<script>
setTimeout(function(){window.open("${whatsappUrl}","_blank")},1000);
</script>
</body>
</html>
`);
    });

    return;
  }

  send(res, mainPage());
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Server running...");
});