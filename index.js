// ===== BASIC SERVER + STRIPE =====
const http = require("http");
const url = require("url");

// ⚠️ حط مفاتيحك من Stripe (اختبر بـ sk_test ثم بدّل لـ sk_live)
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "sk_test_xxx";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "whsec_xxx";

const stripe = require("stripe")(STRIPE_SECRET_KEY);

// تخزين بسيط (للتجربة فقط)
let users = [];

// ===== HELPERS =====
function readBody(req) {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(data || "{}"));
  });
}

function json(res, data, code = 200) {
  res.writeHead(code, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

// ===== SERVER =====
const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;

  // ===== HOME =====
  if (req.method === "GET" && pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    return res.end(`
      <html>
      <body style="background:#0b1220;color:white;text-align:center;padding-top:100px;font-family:sans-serif;">
        <h1>Relax Fix AI 🚀</h1>
        <p>منصة SaaS ذكية</p>
        <a href="/pay-page" style="padding:15px 30px;background:#00c853;color:white;border-radius:10px;text-decoration:none;">
          اشتراك PRO 💰
        </a>
      </body>
      </html>
    `);
  }

  // ===== PAY PAGE =====
  if (req.method === "GET" && pathname === "/pay-page") {
    res.writeHead(200, { "Content-Type": "text/html" });
    return res.end(`
      <html>
      <body style="background:#0b1220;color:white;text-align:center;padding-top:100px;font-family:sans-serif;">
        <h1>اشتراك Relax Fix PRO</h1>
        <button onclick="buy()" style="padding:15px 30px;font-size:20px;border:none;border-radius:10px;background:#00c853;color:white;">
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

  // ===== CREATE CHECKOUT SESSION =====
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
              product_data: { name: "Relax Fix PRO" },
              unit_amount: 2900, // 29 درهم
            },
            quantity: 1,
          },
        ],
        success_url: "https://relax-fix.onrender.com/?success=1",
        cancel_url: "https://relax-fix.onrender.com/?canceled=1",
        customer_email: email,
      });

      return json(res, { url: session.url });
    } catch (e) {
      console.error(e.message);
      return json(res, { error: "payment error" }, 500);
    }
  }

  // ===== STRIPE WEBHOOK =====
  if (req.method === "POST" && pathname === "/webhook") {
    try {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      const rawBody = Buffer.concat(chunks);

      const sig = req.headers["stripe-signature"];

      let event;
      try {
        event = stripe.webhooks.constructEvent(
          rawBody,
          sig,
          STRIPE_WEBHOOK_SECRET
        );
      } catch (err) {
        console.error("❌ Signature failed");
        res.writeHead(400);
        return res.end("bad");
      }

      if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const email = session.customer_details?.email;

        let user = users.find((u) => u.email === email);

        if (!user) {
          user = { email, coins: 0, plan: "FREE" };
          users.push(user);
        }

        user.plan = "PRO";
        user.coins += 100;

        console.log("✅ Paid:", email);
      }

      res.writeHead(200);
      return res.end("ok");
    } catch (e) {
      res.writeHead(500);
      res.end("error");
    }
  }

  // ===== FALLBACK =====
  res.writeHead(200);
  res.end("OK");
});

// ===== START =====
server.listen(3000, () => {
  console.log("Server running 🚀");
}); 