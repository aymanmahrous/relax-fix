const http = require("http");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://nmzxrjdxvmmzzmajrskm.supabase.co",
  "sb_publishable_qXOPVaD5_f60qf1UbYrm2A_sH9c0lW5"
);

const PHONE = "971588259848";
const ADMIN_PASS = "123456";

function layout(content) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Relax Fix UAE</title>
<style>
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;font-family:Arial;background:#050914;color:white}
a{text-decoration:none;color:inherit}
.wrap{width:min(1150px,92%);margin:auto}
header{background:#020617;border-bottom:1px solid #1f2937;position:sticky;top:0;z-index:10}
nav{display:flex;justify-content:space-between;align-items:center;padding:16px 0;gap:10px;flex-wrap:wrap}
.logo{font-size:24px;font-weight:900}
.btn{display:inline-block;padding:13px 20px;border-radius:14px;font-weight:900;margin:5px}
.green{background:#22c55e;color:white}.blue{background:#0ea5e9;color:white}.gold{background:#facc15;color:#111}
.hero{padding:80px 0;background:radial-gradient(circle at top right,#22c55e55,transparent 35%),linear-gradient(135deg,#08111f,#020617)}
.grid{display:grid;grid-template-columns:1.1fr .9fr;gap:28px;align-items:center}
h1{font-size:clamp(40px,7vw,72px);line-height:1;margin:0 0 18px}
.lead{font-size:20px;color:#cbd5e1}
.card{background:#0f172a;border:1px solid #263244;border-radius:28px;padding:28px;box-shadow:0 20px 60px #0008}
input,textarea,select{width:100%;padding:15px;margin:8px 0;border-radius:14px;border:0;font-size:16px}
textarea{min-height:100px}
button{width:100%;padding:15px;border:0;border-radius:14px;background:#22c55e;color:white;font-weight:900;font-size:17px}
section{padding:50px 0}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.service{cursor:pointer;transition:.2s}.service:hover{transform:translateY(-5px)}
.float-wa,.float-call{position:fixed;right:18px;color:white;padding:15px 20px;border-radius:999px;font-weight:900;z-index:99}
.float-wa{bottom:18px;background:#25D366}.float-call{bottom:82px;background:#0ea5e9}
footer{text-align:center;background:#020617;color:#94a3b8;padding:35px}
table{width:100%;border-collapse:collapse;margin-top:20px;background:#0f172a}
th,td{border:1px solid #263244;padding:10px;text-align:left}
th{background:#111827}
.smallbtn{padding:7px 10px;border-radius:7px;color:white;margin:3px;display:inline-block}
.red{background:#ef4444}
@media(max-width:850px){.grid,.cards{grid-template-columns:1fr}nav,.hero{text-align:center}h1{font-size:40px}}
</style>
</head>
<body>${content}</body>
</html>`;
}

function homePage() {
  return layout(`
<header><div class="wrap"><nav>
<div class="logo">🔥 Relax Fix UAE</div>
<div>
<a class="btn blue" href="tel:+${PHONE}">📞 Call Now</a>
<a class="btn green" target="_blank" href="https://wa.me/${PHONE}?text=Hello%20I%20want%20to%20book%20a%20service%20from%20Relax%20Fix">💬 WhatsApp</a>
</div>
</nav></div></header>

<section class="hero"><div class="wrap grid">
<div>
<h1>Fast Home Maintenance That Customers Trust</h1>
<p class="lead">AC Maintenance • Water Tank Cleaning • Pest Control across UAE.</p>
<a class="btn gold" href="#booking">Book Service Now</a>
<a class="btn green" target="_blank" href="https://wa.me/${PHONE}?text=I%20need%20urgent%20maintenance%20service">Get Price on WhatsApp</a>
</div>

<div class="card">
<h2>Quick Booking</h2>
<p class="lead">Send your request. WhatsApp opens with your details.</p>
<form method="POST">
<input name="name" placeholder="Name" required>
<input name="phone" placeholder="Phone" required>
<select name="service" required>
<option value="">Select Service</option>
<option>AC Maintenance</option>
<option>Water Tank Cleaning</option>
<option>Pest Control</option>
<option>Other Maintenance</option>
</select>
<textarea name="message" placeholder="Your problem / location"></textarea>
<button type="submit">Send Request + Open WhatsApp</button>
</form>
</div>
</div></section>

<section><div class="wrap">
<h2>Choose Your Service</h2>
<div class="cards">
<div class="card service" onclick="pick('AC Maintenance')"><h2>❄️ AC Maintenance</h2><p>Weak cooling, cleaning, repair and inspection.</p></div>
<div class="card service" onclick="pick('Water Tank Cleaning')"><h2>💧 Tank Cleaning</h2><p>Clean water tanks for villas and apartments.</p></div>
<div class="card service" onclick="pick('Pest Control')"><h2>🐜 Pest Control</h2><p>Pest control for homes and small businesses.</p></div>
</div></div></section>

<section id="booking"><div class="wrap"><div class="card">
<h2>Book Your Service</h2>
<form method="POST">
<input name="name" placeholder="Name" required>
<input name="phone" placeholder="Phone" required>
<input id="serviceInput" name="service" placeholder="Service" required>
<textarea name="message" placeholder="Describe your request / location"></textarea>
<button type="submit">Send Request + Open WhatsApp</button>
</form>
</div></div></section>

<a class="float-call" href="tel:+${PHONE}">📞 Call</a>
<a class="float-wa" target="_blank" href="https://wa.me/${PHONE}?text=Hello%20Relax%20Fix%2C%20I%20need%20service">💬 WhatsApp</a>

<footer>Relax Fix UAE<br>AC Maintenance • Tank Cleaning • Pest Control<br>+971 58 825 9848</footer>

<script>
function pick(service){
  document.getElementById("serviceInput").value = service;
  document.getElementById("booking").scrollIntoView({behavior:"smooth"});
}
</script>
`);
}

function adminPage() {
  return layout(`
<div class="wrap" style="padding:30px">
<h1>📊 Relax Fix Dashboard</h1>
<input id="pass" type="password" placeholder="Password">
<button onclick="loadData()">Open Dashboard</button>

<table>
<thead>
<tr><th>Name</th><th>Phone</th><th>Service</th><th>Notes</th><th>Status</th><th>Actions</th></tr>
</thead>
<tbody id="rows"></tbody>
</table>
</div>

<script>
async function loadData(){
  const pass = document.getElementById("pass").value;
  const res = await fetch("/api/requests?pass=" + pass);
  const data = await res.json();

  if(data.error){ alert(data.error); return; }

  rows.innerHTML = "";
  data.forEach(x => {
    rows.innerHTML += \`
      <tr>
        <td>\${x.name || ""}</td>
        <td>\${x.phone || ""}</td>
        <td>\${x.service || ""}</td>
        <td>\${x.notes || ""}</td>
        <td>\${x.status || "new"}</td>
        <td>
          <a class="smallbtn blue" href="tel:\${x.phone}">Call</a>
          <a class="smallbtn green" target="_blank" href="https://wa.me/\${x.phone}">WhatsApp</a>
          <button onclick="setStatus('\${x.id}','done')">Done</button>
          <button onclick="setStatus('\${x.id}','new')">New</button>
          <button class="red" onclick="delRow('\${x.id}')">Delete</button>
        </td>
      </tr>
    \`;
  });
}

async function setStatus(id,status){
  const pass = document.getElementById("pass").value;
  await fetch("/api/status?pass=" + pass, {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({id,status})
  });
  loadData();
}

async function delRow(id){
  if(!confirm("Delete this request?")) return;
  const pass = document.getElementById("pass").value;
  await fetch("/api/delete?pass=" + pass, {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({id})
  });
  loadData();
}
</script>
`);
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "GET" && req.url.startsWith("/admin")) {
      res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
      res.end(adminPage());
      return;
    }

    if (req.method === "GET" && req.url.startsWith("/api/requests")) {
      const url = new URL(req.url, "http://localhost");
      if (url.searchParams.get("pass") !== ADMIN_PASS) {
        res.writeHead(401, {"Content-Type":"application/json"});
        res.end(JSON.stringify({error:"Unauthorized"}));
        return;
      }

      const { data, error } = await supabase
        .from("requests")
        .select("*")
        .order("created_at", { ascending:false });

      res.writeHead(200, {"Content-Type":"application/json"});
      res.end(JSON.stringify(error ? {error:error.message} : data));
      return;
    }

    if (req.method === "POST" && req.url.startsWith("/api/status")) {
      let body = "";
      req.on("data", c => body += c.toString());
      req.on("end", async () => {
        const url = new URL(req.url, "http://localhost");
        if (url.searchParams.get("pass") !== ADMIN_PASS) {
          res.writeHead(401);
          res.end("Unauthorized");
          return;
        }

        const p = JSON.parse(body);
        await supabase.from("requests").update({status:p.status}).eq("id", p.id);
        res.end("OK");
      });
      return;
    }

    if (req.method === "POST" && req.url.startsWith("/api/delete")) {
      let body = "";
      req.on("data", c => body += c.toString());
      req.on("end", async () => {
        const url = new URL(req.url, "http://localhost");
        if (url.searchParams.get("pass") !== ADMIN_PASS) {
          res.writeHead(401);
          res.end("Unauthorized");
          return;
        }

        const p = JSON.parse(body);
        await supabase.from("requests").delete().eq("id", p.id);
        res.end("OK");
      });
      return;
    }

    if (req.method === "POST") {
      let body = "";
      req.on("data", c => body += c.toString());
      req.on("end", async () => {
        const p = new URLSearchParams(body);

        const order = {
          name: p.get("name") || "",
          phone: p.get("phone") || "",
          service: p.get("service") || "",
          notes: p.get("message") || ""
        };

        const { error } = await supabase.from("requests").insert([order]);

        if (error) {
          res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
          res.end(layout(`<div class="wrap" style="padding:60px;text-align:center"><h1>❌ Error</h1><p>${error.message}</p><a class="btn gold" href="/">Back</a></div>`));
          return;
        }

        const msg = encodeURIComponent(
          "Hello Relax Fix\\nName: " + order.name +
          "\\nPhone: " + order.phone +
          "\\nService: " + order.service +
          "\\nMessage: " + order.notes
        );

        const wa = "https://wa.me/" + PHONE + "?text=" + msg;

        res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
        res.end(layout(`
          <div class="wrap" style="padding:60px;text-align:center">
            <h1 style="color:#22c55e">✅ Request Saved</h1>
            <p>WhatsApp will open with your details.</p>
            <a class="btn green" target="_blank" href="${wa}">Open WhatsApp</a>
            <br><br>
            <a class="btn gold" href="/">Back Home</a>
            <script>setTimeout(()=>window.open("${wa}","_blank"),1000)</script>
          </div>
        `));
      });
      return;
    }

    res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
    res.end(homePage());
  } catch (err) {
    res.writeHead(500, {"Content-Type":"text/plain;charset=utf-8"});
    res.end(err.message);
  }
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Relax Fix running");
});