const http = require("http");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://nmzxrjdxvmmzzmajrskm.supabase.co",
  "sb_publishable_qXOPVaD5_f60qf1UbYrm2A_sH9c0lW5"
);

const PHONE = "971588259848";
const ADMIN_PASS = "123456";

// ================== MAIN PAGE ==================
function home() {
  return `<!DOCTYPE html>
<html lang="ar">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>RELAX FIX 2026</title>

<style>
body{margin:0;font-family:Arial;background:#050914;color:white}
.wrap{width:90%;margin:auto;padding:20px}
.btn{padding:12px 18px;border-radius:12px;background:#22c55e;color:white;text-decoration:none;display:inline-block;margin:5px}
.card{background:#0f172a;padding:20px;border-radius:20px;margin:10px 0}
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
@media(max-width:800px){.cards{grid-template-columns:1fr}}
</style>

</head>
<body>

<div class="wrap">

<h1>🔥 RELAX FIX</h1>
<p>صيانة تكييف وخدمات منزلية في أبوظبي</p>

<a class="btn" href="https://wa.me/${PHONE}" target="_blank">💬 واتساب</a>
<a class="btn" href="tel:+${PHONE}">📞 اتصال</a>

<!-- PRICING -->
<h2>💰 الأسعار</h2>
<div class="cards">
<div class="card">
<h3>❄️ صيانة التكييف</h3>
<p>100 - 200 درهم</p>
<a class="btn" href="https://wa.me/${PHONE}?text=أريد صيانة تكييف">احجز</a>
</div>

<div class="card">
<h3>🧼 تنظيف المكيفات</h3>
<p>80 - 150 درهم</p>
<a class="btn" href="https://wa.me/${PHONE}?text=أريد تنظيف مكيف">اطلب</a>
</div>

<div class="card">
<h3>🔍 زيارة فنية</h3>
<p>50 درهم</p>
<a class="btn" href="https://wa.me/${PHONE}?text=أريد زيارة فنية">احجز</a>
</div>
</div>

<!-- FREE TRIAL -->
<div class="card">
<h2>🎁 تجربة مجانية</h2>
<p>استشارة مجانية عبر واتساب</p>
<a class="btn" href="https://wa.me/${PHONE}?text=أريد استشارة مجانية">جرب الآن</a>
</div>

<!-- BOOKING -->
<div class="card">
<h2>📋 احجز الآن</h2>

<form method="POST">
<input name="name" placeholder="الاسم" required>
<input name="phone" placeholder="رقم الهاتف" required>
<input name="service" placeholder="الخدمة" required>
<button class="btn">إرسال</button>
</form>

</div>

</div>

</body>
</html>`;
}

// ================== ADMIN ==================
function admin() {
  return `
<h1>Admin Panel</h1>

<input id="pass" placeholder="Password">
<button onclick="load()">Login</button>

<pre id="data"></pre>

<script>
async function load(){
const p=document.getElementById("pass").value;

const res=await fetch("/api?pass="+p);
const data=await res.json();

document.getElementById("data").innerText=JSON.stringify(data,null,2);
}
</script>
`;
}

// ================== SERVER ==================
const server = http.createServer(async (req, res) => {

  // ADMIN PAGE
  if (req.url === "/admin") {
    res.end(admin());
    return;
  }

  // GET DATA
  if (req.url.startsWith("/api")) {
    const url = new URL(req.url, "http://x");

    if (url.searchParams.get("pass") !== ADMIN_PASS) {
      res.end("Unauthorized");
      return;
    }

    const { data } = await supabase.from("requests").select("*");
    res.end(JSON.stringify(data));
    return;
  }

  // SAVE ORDER
  if (req.method === "POST") {
    let body = "";

    req.on("data", c => body += c);
    req.on("end", async () => {

      const p = new URLSearchParams(body);

      const order = {
        name: p.get("name"),
        phone: p.get("phone"),
        service: p.get("service")
      };

      await supabase.from("requests").insert([order]);

      const msg = encodeURIComponent(
        "طلب جديد RELAX FIX\n" +
        "الاسم: " + order.name + "\n" +
        "الهاتف: " + order.phone + "\n" +
        "الخدمة: " + order.service
      );

      res.end(`
<h1>تم الإرسال ✅</h1>
<a href="https://wa.me/${PHONE}?text=${msg}" target="_blank">فتح واتساب</a>
`);
    });

    return;
  }

  res.end(home());
});

server.listen(process.env.PORT || 3000, () => {
  console.log("RUNNING");
});