const http = require("http");
const { createClient } = require("@supabase/supabase-js");

// 🔑 بياناتك (موجودة جاهزة)
const SUPABASE_URL = "https://nmzxrjdxvmmzzmajrskm.supabase.co";
const SUPABASE_KEY = "sb_publishable_qXOPVaD5_f60qf1UbYrm2A_sH9c0lW5";

// 📱 رقمك
const WHATSAPP = "971588259848";

// 🔐 باسورد لوحة التحكم
const ADMIN_PASS = "123456";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ---------- HTML الصفحة الرئيسية ----------
function homePage() {
  return `
  <html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8">
    <title>Relax Fix 2026</title>
    <style>
      body {font-family: Arial; background:#07111f; color:#fff; text-align:center; padding:30px}
      input,select,textarea {width:90%; padding:10px; margin:8px; border-radius:8px}
      button {padding:12px 20px; background:#25D366; color:#000; font-weight:bold; border:none; border-radius:8px}
    </style>
  </head>
  <body>

    <h1>Relax Fix 2026 ❄️🔥</h1>
    <p>صيانة + دعاية AI</p>

    <form method="POST" action="/send">
      <input name="name" placeholder="الاسم" required><br>
      <input name="phone" placeholder="رقم الهاتف" required><br>

      <select name="service">
        <option>صيانة مكيفات</option>
        <option>تنظيف مكيفات</option>
        <option>تنظيف خزانات</option>
        <option>مكافحة حشرات</option>
        <option>فيديو AI</option>
      </select><br>

      <textarea name="notes" placeholder="التفاصيل"></textarea><br>

      <button type="submit">إرسال الطلب</button>
    </form>

    <br>
    <a href="/admin" style="color:#0ff">Dashboard</a>

  </body>
  </html>
  `;
}

// ---------- Dashboard ----------
function adminPage() {
  return `
  <html>
  <body style="background:#111;color:white;text-align:center;padding:20px">
    <h1>Dashboard</h1>

    <input id="pass" placeholder="كلمة المرور">
    <button onclick="load()">فتح</button>

    <div id="data"></div>

    <script>
      async function load(){
        let pass = document.getElementById("pass").value;

        let res = await fetch("/data?pass=" + pass);
        let data = await res.json();

        if(data.error){
          alert("كلمة المرور غلط");
          return;
        }

        let html = "";

        data.forEach(x=>{
          html += "<div style='border:1px solid #444;margin:10px;padding:10px'>";
          html += "<b>" + x.name + "</b><br>";
          html += x.phone + "<br>";
          html += x.service + "<br>";
          html += x.notes + "<br>";
          html += "</div>";
        });

        document.getElementById("data").innerHTML = html;
      }
    </script>

  </body>
  </html>
  `;
}

// ---------- السيرفر ----------
const server = http.createServer(async (req, res) => {

  // الصفحة الرئيسية
  if (req.url === "/" && req.method === "GET") {
    res.end(homePage());
  }

  // Dashboard
  else if (req.url === "/admin") {
    res.end(adminPage());
  }

  // جلب البيانات
  else if (req.url.startsWith("/data")) {
    const url = new URL(req.url, "http://localhost");
    const pass = url.searchParams.get("pass");

    if (pass !== ADMIN_PASS) {
      return res.end(JSON.stringify({ error: true }));
    }

    const { data } = await supabase.from("requests").select("*");

    res.end(JSON.stringify(data));
  }

  // استقبال الطلب
  else if (req.url === "/send" && req.method === "POST") {

    let body = "";
    req.on("data", chunk => body += chunk.toString());

    req.on("end", async () => {
      const params = new URLSearchParams(body);

      const name = params.get("name");
      const phone = params.get("phone");
      const service = params.get("service");
      const notes = params.get("notes");

      await supabase.from("requests").insert([
        { name, phone, service, notes }
      ]);

      const text = \`طلب جديد:
\${name}
\${phone}
\${service}
\${notes}\`;

      const link = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(text);

      res.end(\`
        <h1>تم الإرسال ✅</h1>
        <a href="\${link}">فتح واتساب</a>
      \`);
    });
  }

});

// تشغيل السيرفر
server.listen(3000, () => {
  console.log("Server running on port 3000");
});