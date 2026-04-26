const http = require("http");
const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://nmzxrjdxvmmzzmajrskm.supabase.co";
const SUPABASE_KEY = "sb_publishable_qXOPVaD5_f60qf1UbYrm2A_sH9c0lW5";

const WHATSAPP = "971588259848";
const ADMIN_PASS = "123456";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const server = http.createServer(async (req, res) => {

  // الصفحة الرئيسية
  if (req.url === "/" && req.method === "GET") {
    res.end(`
      <h1>Relax Fix 2026 ❄️🔥</h1>
      <form method="POST" action="/send">
        <input name="name" placeholder="الاسم" required><br>
        <input name="phone" placeholder="رقم الهاتف" required><br>
        <select name="service">
          <option>صيانة مكيفات</option>
          <option>تنظيف مكيفات</option>
          <option>فيديو AI</option>
        </select><br>
        <textarea name="notes"></textarea><br>
        <button>إرسال</button>
      </form>
      <br>
      <a href="/admin">Dashboard</a>
    `);
  }

  // لوحة التحكم
  else if (req.url === "/admin") {
    res.end(`
      <h1>Dashboard</h1>
      <input id="pass"><button onclick="load()">فتح</button>
      <div id="data"></div>

      <script>
      async function load(){
        let pass = document.getElementById("pass").value;
        let res = await fetch("/data?pass="+pass);
        let data = await res.json();

        if(data.error){ alert("غلط"); return; }

        let html="";
        data.forEach(x=>{
          html += "<div>"+x.name+" - "+x.phone+"</div>";
        });

        document.getElementById("data").innerHTML=html;
      }
      </script>
    `);
  }

  // البيانات
  else if (req.url.startsWith("/data")) {
    const url = new URL(req.url, "http://localhost");
    const pass = url.searchParams.get("pass");

    if (pass !== ADMIN_PASS) {
      return res.end(JSON.stringify({ error: true }));
    }

    const { data } = await supabase.from("requests").select("*");
    res.end(JSON.stringify(data));
  }

  // إرسال الطلب
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

      const text = `طلب جديد:
${name}
${phone}
${service}`;

      const link = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(text);

      res.end(`<h1>تم ✅</h1><a href="${link}">واتساب</a>`);
    });
  }

});

server.listen(process.env.PORT || 3000);