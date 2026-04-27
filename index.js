const http = require("http");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://nmzxrjdxvmmzzmajrskm.supabase.co",
  "sb_publishable_qXOPVaD5_f60qf1UbYrm2A_sH9c0lW5"
);

const ADMIN_PASS = "123456";

// ================= SETTINGS =================
async function getSettings() {
  const { data } = await supabase.from("settings").select("*").eq("id", 1).single();
  return data || {};
}

// ================= UI =================
function layout(content, s) {
  return `<!DOCTYPE html>
<html lang="ar">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${s.site_title || "RELAX FIX"}</title>

<style>
body{
margin:0;
font-family:Arial;
background:#050914;
color:white;
background-image:url('${s.bg_url || ""}');
background-size:cover;
}

.wrap{width:90%;margin:auto;padding:20px}
.btn{padding:12px 18px;border-radius:10px;background:${s.theme_color || "#22c55e"};color:white;text-decoration:none;display:inline-block;margin:5px}
.card{background:#0f172a;padding:20px;border-radius:20px;margin:10px 0}
input,select{width:100%;padding:10px;margin:5px 0;border-radius:10px;border:none}
</style>

</head>
<body>${content}</body></html>`;
}

// ================= HOME =================
async function home() {
  const s = await getSettings();

  return layout(`
<div class="wrap">

<h1>${s.site_title || "RELAX FIX"}</h1>
<p>${s.site_desc || "Home Services UAE"}</p>

<a class="btn" target="_blank"
href="https://wa.me/${s.whatsapp || "971588259848"}">
WhatsApp
</a>

<div class="card">
<h3>Book Service</h3>

<form method="POST">
<input name="name" placeholder="Name" required>
<input name="phone" placeholder="Phone" required>
<input name="service" placeholder="Service" required>
<button class="btn">Send</button>
</form>

</div>

</div>
`, s);
}

// ================= ADMIN =================
function admin() {
  return `
<div class="wrap">

<h1>CONTROL PANEL 🔥</h1>

<input id="pass" placeholder="Password">
<button onclick="load()">Login</button>

<h2>Orders</h2>
<pre id="data"></pre>

<h2>Settings</h2>

<input id="title" placeholder="Title">
<input id="desc" placeholder="Description">
<input id="whatsapp" placeholder="WhatsApp">
<input id="color" placeholder="Color">
<input id="bg" placeholder="Background URL">

<button onclick="save()">Save</button>

<script>

async function load(){
const p=document.getElementById("pass").value;

const res=await fetch("/api/data?pass="+p);
const d=await res.json();

document.getElementById("data").innerText=JSON.stringify(d,null,2);

// 🔔 Notification
if(d.length){
alert("New Orders: "+d.length);
}
}

async function save(){
const p=document.getElementById("pass").value;

await fetch("/api/settings?pass="+p,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
title:document.getElementById("title").value,
desc:document.getElementById("desc").value,
whatsapp:document.getElementById("whatsapp").value,
color:document.getElementById("color").value,
bg:document.getElementById("bg").value
})
});

alert("Saved");
}

</script>

</div>
`;
}

// ================= SERVER =================
const server = http.createServer(async (req, res) => {

  // ADMIN
  if (req.url === "/admin") {
    res.end(admin());
    return;
  }

  // GET ORDERS
  if (req.url.startsWith("/api/data")) {
    const url = new URL(req.url, "http://x");

    if (url.searchParams.get("pass") !== ADMIN_PASS) {
      res.end("Unauthorized");
      return;
    }

    const { data } = await supabase.from("requests").select("*");
    res.end(JSON.stringify(data));
    return;
  }

  // SAVE SETTINGS
  if (req.url.startsWith("/api/settings")) {
    let body = "";

    req.on("data", c => body += c);
    req.on("end", async () => {

      const url = new URL(req.url, "http://x");

      if (url.searchParams.get("pass") !== ADMIN_PASS) {
        res.end("no");
        return;
      }

      const p = JSON.parse(body);

      await supabase.from("settings").update({
        site_title: p.title,
        site_desc: p.desc,
        whatsapp: p.whatsapp,
        theme_color: p.color,
        bg_url: p.bg
      }).eq("id", 1);

      res.end("ok");
    });

    return;
  }

  // SAVE REQUEST
  if (req.method === "POST") {
    let body = "";

    req.on("data", c => body += c);
    req.on("end", async () => {

      const p = new URLSearchParams(body);

      await supabase.from("requests").insert([{
        name: p.get("name"),
        phone: p.get("phone"),
        service: p.get("service")
      }]);

      res.end("<h1>Done ✅</h1>");
    });

    return;
  }

  res.end(await home());
});

server.listen(process.env.PORT || 3000);