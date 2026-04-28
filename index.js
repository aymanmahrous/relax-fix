const http = require("http");
const url = require("url");

// 🔐 حط مفاتيحك هنا
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "sk_test_xxx";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "whsec_xxx";

const stripe = require("stripe")(STRIPE_SECRET_KEY);

// ===== Helpers =====
function readBody(req) {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(data || "{}"));
  });
}

function json(res, data, code = 200) {
  res.writeHead(code, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(data));
}

// ===== Server =====
const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;

  // ===== الصفحة الرئيسية =====
  if (req.method === "GET" && pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    return res.end(`
      <html>
      <body style="background:#0b1220;color:white;text-align:center;padding-top:100px;font-family:sans-serif;">
        <h1>Relax Fix AI 🚀</h1>
        <p>منصة SaaS ذكية</p>

        <a href="/pay-page" 
           style="padding:15px 30px;background:#00c853;color:white;border-radius:10px;text-decoration:none;">
           اشتراك PRO 💰
        </a>
      </body>
      </html>
    `);
  }

  // ===== صفحة الدفع =====
  if (req.method === "GET" && pathname === "/pay-page") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    return res.end(`
      <html>
      <body style="background:#0b1220;color:white;text-align:center;padding-top:100px;font-family:sans-serif;">
        <h1>اشتراك Relax Fix PRO</h1>

        <button onclick="buy()" 
          style="padding:15px 30px;font-size:20px;border:none;border-radius:10px;background:#00c853;color:white;">
          اشترك الآن 💰
        </button>

        <script>
        async function buy(){
          const email = prompt("اكتب ايميلك:");
          if(!email) return alert("مطلوب ايميل");

          const r = await fetch("/pay",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email})
          });

          const d = await r.json();
          window.location = d.url;
        }
        </script>
      </body>
      </html>
    `);
  }

  // ===== إنشاء الدفع =====
  if (req.method === "POST" && pathname === "/pay") {
    try {
      const body = JSON.parse(await readBody(req));
      const email = body.email;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "aed",
              product_data: {
                name: "Relax Fix PRO"
              },
              unit_amount: 2900 // 29 درهم
            },
            quantity: 1
          }
        ],
        success_url: "https://relax-fix.onrender.com/?success=1",
        cancel_url: "https://relax-fix.onrender.com/?canceled=1",
        customer_email: email
      });

      return json(res, { url: session.url });

    } catch (e) {
      console.log(e);
      return json(res, { error: "Payment error" }, 500);
    }
  }

  // ===== Webhook =====
  if (req.method === "POST" && pathname === "/webhook") {
    res.writeHead(200);
    return res.end("ok");
  }

  // ===== fallback =====
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("OK");
});

// ===== تشغيل السيرفر =====
server.listen(3000, () => {
  console.log("Server running 🚀");
});