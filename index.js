const http = require("http");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://nmzxrjdxvmmzzmajrskm.supabase.co",
  "sb_publishable_qXOPVaD5_f60qf1UbYrm2A_sH9c0lW5"
);

const WHATSAPP_NUMBER = "971588259848";

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
        console.log("ERROR:", error);
        res.end(`
          <html>
            <head><meta charset="UTF-8"><title>Error</title></head>
            <body style="background:black;color:white;text-align:center;padding:50px;font-family:Arial;">
              <h1 style="color:red;">❌ Error saving data</h1>
              <a href="/" style="color:#00ff88;">Back</a>
            </body>
          </html>
        `);
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
            <h1 style="color:#00ff88;">✅ Saved Successfully</h1>
            <h2>We will contact you soon</h2>

            <br>

            <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}" target="_blank"
              style="display:inline-block;background:#25D366;color:white;padding:12px 25px;text-decoration:none;border-radius:6px;font-weight:bold;">
              💬 Send Details on WhatsApp
            </a>

            <br><br>

            <a href="/" style="background:#00ff88;color:black;padding:10px 20px;text-decoration:none;border-radius:5px;font-weight:bold;">
              Back
            </a>
          </body>
        </html>
      `);
    });

    return;
  }

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

  res.end(`
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Relax Fix</title>
      </head>

      <body style="margin:0;background:black;color:white;text-align:center;font-family:Arial;">
        <section style="padding:70px 20px;">
          <h1 style="font-size:42px;margin-bottom:10px;">🔥 Relax Fix</h1>
          <h2 style="font-weight:400;">Best Maintenance Services in UAE</h2>
          <p>AC Maintenance • Water Tank Cleaning • Pest Control</p>

          <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello, I want to book a service from Relax Fix")}" target="_blank"
            style="display:inline-block;background:#25D366;color:white;padding:12px 25px;text-decoration:none;border-radius:6px;font-weight:bold;margin-top:15px;">
            💬 WhatsApp Now
          </a>
        </section>

        <section style="display:flex;flex-wrap:wrap;justify-content:center;gap:20px;padding:20px;">
          <div style="background:#111;padding:25px;border-radius:12px;width:220px;">❄️ AC Maintenance</div>
          <div style="background:#111;padding:25px;border-radius:12px;width:220px;">💧 Water Tank Cleaning</div>
          <div style="background:#111;padding:25px;border-radius:12px;width:220px;">🐜 Pest Control</div>
        </section>

        <section style="padding:40px 20px;">
          <h2>Book Service Now</h2>

          <form method="POST" action="/">
            <input name="name" placeholder="Name" required style="width:280px;padding:12px;margin:6px;border-radius:6px;border:none;"><br>
            <input name="phone" placeholder="Phone" required style="width:280px;padding:12px;margin:6px;border-radius:6px;border:none;"><br>
            <input name="service" placeholder="Service" required style="width:280px;padding:12px;margin:6px;border-radius:6px;border:none;"><br>
            <textarea name="message" placeholder="Message" style="width:280px;padding:12px;margin:6px;border-radius:6px;border:none;"></textarea><br>

            <button type="submit" style="background:#00ff88;color:black;border:none;padding:12px 25px;border-radius:6px;font-weight:bold;cursor:pointer;">
              Send Request
            </button>
          </form>
        </section>

        <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello, I want to book AC / tank cleaning / pest control service from Relax Fix")}"
          target="_blank"
          style="position:fixed;bottom:20px;right:20px;background:#25D366;color:white;padding:15px 20px;border-radius:50px;font-size:16px;text-decoration:none;box-shadow:0 0 15px rgba(0,0,0,0.3);z-index:999;font-weight:bold;">
          💬 WhatsApp
        </a>
      </body>
    </html>
  `);
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Server running...");
});
