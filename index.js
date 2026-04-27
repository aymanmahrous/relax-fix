const http = require("http");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://nmzxrjdxvmmzzmajrskm.supabase.co",
  "sb_publishable_qXOPVaD5_f60qf1UbYrm2A_sH9c0lW5"
);

const ADMIN_PASS = "123456";

async function getSettings() {
  const { data } = await supabase.from("settings").select("*").eq("id", 1).single();
  return data;
}

function layout(content, title, desc, color, bg) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<style>
body{margin:0;font-family:Arial;background:#050914;color:#fff;background-image:url('${bg}');background-size:cover}
.btn{padding:12px 20px;border-radius:12px;background:${color};color:#fff;text-decoration:none}
.card{background:#0f172a;padding:20px;border-radius:20px}
.wrap{width:90%;margin:auto}
</style>
</head>
<body>${content}</body></html>`;
}

async function home() {
  const s = await getSettings();

  return layout(`
<div class="wrap">
<h1>${s.site_title}</h1>
<p>${s.site_desc}</p>

<a class="btn" href="https://wa.me/${s.whatsapp}" target="_blank">WhatsApp</a>

<form method="POST">
<input name="name" placeholder="Name"><br>
<input name="phone" placeholder="Phone"><br>
<input name="service" placeholder="Service"><br>
<button class="btn">Send</button>
</form>
</div>
`, s.site_title, s.site_desc, s.theme_color, s.bg_url);
}

function admin() {
  return `
<h1>Admin Panel</h1>
<input id="pass" placeholder="Password">
<button onclick="load()">Login</button>

<div id="data"></div>

<h2>Settings</h2>
<input id="title" placeholder="Title">
<input id="desc" placeholder="Description">
<input id="whatsapp" placeholder="WhatsApp">
<input id="color" placeholder="Color">
<input id="bg" placeholder="Background URL">

<button onclick="save()">Save</button>

<script>
async function load(){
const p=document.getElementById('pass').value;
const res=await fetch('/api/data?pass='+p);
const d=await res.json();
document.getElementById('data').innerText=JSON.stringify(d,null,2);
}

async function save(){
const p=document.getElementById('pass').value;
await fetch('/api/settings?pass='+p,{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
title:document.getElementById('title').value,
desc:document.getElementById('desc').value,
whatsapp:document.getElementById('whatsapp').value,
color:document.getElementById('color').value,
bg:document.getElementById('bg').value
})
});
alert('Saved');
}
</script>
`;
}

const server = http.createServer(async (req, res) => {

  if (req.url === "/admin") {
    res.end(admin());
    return;
  }

  if (req.url.startsWith("/api/data")) {
    const url = new URL(req.url, "http://x");
    if (url.searchParams.get("pass") !== ADMIN_PASS) {
      res.end("Unauthorized"); return;
    }
    const { data } = await supabase.from("requests").select("*");
    res.end(JSON.stringify(data));
    return;
  }

  if (req.url.startsWith("/api/settings")) {
    let body="";
    req.on("data",c=>body+=c);
    req.on("end", async ()=>{
      const url = new URL(req.url,"http://x");
      if(url.searchParams.get("pass")!==ADMIN_PASS){res.end("no");return;}
      const p=JSON.parse(body);
      await supabase.from("settings").update({
        site_title:p.title,
        site_desc:p.desc,
        whatsapp:p.whatsapp,
        theme_color:p.color,
        bg_url:p.bg
      }).eq("id",1);
      res.end("ok");
    });
    return;
  }

  if (req.method === "POST") {
    let body="";
    req.on("data",c=>body+=c);
    req.on("end", async ()=>{
      const p=new URLSearchParams(body);
      await supabase.from("requests").insert([{
        name:p.get("name"),
        phone:p.get("phone"),
        service:p.get("service")
      }]);
      res.end("<h1>Saved</h1>");
    });
    return;
  }

  res.end(await home());
});

server.listen(process.env.PORT || 3000);