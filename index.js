const http = require("http");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://nmzxrjdxvmmzzmajrskm.supabase.co",
  "sb_publishable_qXOPVaD5_f60qf1UbYrm2A_sH9c0lW5"
);

const server = http.createServer((req, res) => {

  if (req.method === "POST") {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const params = new URLSearchParams(body);

      const data = {
        name: params.get("name"),
        phone: params.get("phone"),
        service: params.get("service"),
        message: params.get("message")
      };

      const { error } = await supabase.from("leads").insert([data]);

      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

      if (error) {
        res.end("<h1>Error saving data</h1>");
        return;
      }

      const whatsappText = encodeURIComponent(
        `Hello Relax Fix
Name: ${data.name}
Phone: ${data.phone}
Service: ${data.service}
Message: ${data.message}`
      );

      res.end(`
        <html>
        <head>
        <meta charset="UTF-8">
        <title>Success</title>
        </head>

        <body style="background:black;color:white;text-align:center;padding:50px;font-family:Arial;">
        <h1 style="color:#00ff88;">✅ تم إرسال طلبك بنجاح</h1>
        <h2>هنكلمك قريب 💪</h2>

        <br>

        <a href="https://wa.me/971588259848?text=${whatsappText}" target="_blank"
        style="background:#25D366;color:white;padding:12px 25px;border-radius:6px;text-decoration:none;">
        💬 واتساب الآن
        </a>

        <br><br>

        <a href="/" style="background:#00ff88;color:black;padding:10px 20px;border-radius:5px;text-decoration:none;">
        رجوع
        </a>

        </body>
        </html>
      `);
    });

    return;
  }

  // الصفحة الرئيسية
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

  res.end(`
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Relax Fix</title>

    <style>
      body {
        margin:0;
        font-family:Arial;
        background:black;
        color:white;
        text-align:center;
      }

      .hero {
        padding:60px 20px;
      }

      .services {
        display:flex;
        flex-wrap:wrap;
        justify-content:center;
        gap:20px;
        padding:30px;
      }

      .card {
        background:#111;
        padding:20px;
        border-radius:10px;
        width:200px;
      }

      input, textarea {
        width:250px;
        padding:10px;
        margin:5px;
        border-radius:5px;
        border:none;
      }

      button {
        background:#00ff88;
        border:none;
        padding:10px 20px;
        border-radius:5px;
        font-weight:bold;
        cursor:pointer;
      }

      .whatsapp {
        background:#25D366;
        color:white;
        padding:10px 20px;
        border-radius:5px;
        text-decoration:none;
        display:inline-block;
        margin-top:10px;
      }

    </style>
  </head>

  <body>

    <div class="hero">
      <h1>🔥 Relax Fix</h1>
      <h2>أفضل خدمات الصيانة في الإمارات</h2>

      <a class="whatsapp" href="https://wa.me/971588259848" target="_blank">
      💬 تواصل واتساب
      </a>
    </div>

    <div class="services">
      <div class="card">❄️ صيانة تكييف</div>
      <div class="card">💧 تنظيف خزانات</div>
      <div class="card">🐜 مكافحة حشرات</div>
    </div>

    <h2>احجز الخدمة الآن</h2>

    <form method="POST" action="/">
      <input name="name" placeholder="الاسم" required><br>
      <input name="phone" placeholder="رقم الهاتف" required><br>
      <input name="service" placeholder="نوع الخدمة" required><br>
      <textarea name="message" placeholder="تفاصيل"></textarea><br>
      <button type="submit">إرسال</button>
    </form>

    <br><br>

  </body>
  </html>
  `);

});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});