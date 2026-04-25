const http = require("http");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://nmzxrjdxvmmzzmajrskm.supabase.co",
  "sb_publishable_qXOPVaD5_f60qf1UbYrm2A_sH9c0lW5"
);

const WHATSAPP_NUMBER = "971588259848";

function page(html) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relax Fix UAE | AC Maintenance, Tank Cleaning, Pest Control</title>
    <meta name="description" content="Relax Fix provides AC maintenance, water tank cleaning, pest control and home maintenance services in UAE. Fast booking by WhatsApp.">
    <style>
      * { box-sizing: border-box; }
      body { margin:0; font-family:Arial,sans-serif; background:#07111f; color:white; }
      a { text-decoration:none; }
      .container { width:min(1100px, calc(100% - 30px)); margin:auto; }
      header { position:sticky; top:0; z-index:10; background:rgba(0,0,0,.82); border-bottom:1px solid rgba(255,255,255,.1); }
      .nav { min-height:72px; display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; }
      .brand { font-size:22px; font-weight:bold; }
      .btn { display:inline-block; padding:12px 18px; border-radius:10px; font-weight:bold; }
      .btn-main { background:#00ff88; color:black; }
      .btn-wa { background:#25D366; color:white; }
      .btn-call { background:#1fc6ff; color:white; }
      .hero { padding:70px 0 35px; background:radial-gradient(circle at top right,rgba(37,211,102,.18),transparent 30%),radial-gradient(circle at top left,rgba(31,198,255,.16),transparent 30%); }
      .hero-grid { display:grid; grid-template-columns:1.1fr .9fr; gap:25px; align-items:center; }
      h1 { font-size:clamp(36px,6vw,62px); line-height:1.05; margin:0 0 15px; }
      h2 { font-size:34px; margin-bottom:12px; }
      .muted { color:#a8bdd4; }
      .card { background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1); border-radius:20px; padding:25px; }
      .grid3 { display:grid; grid-template-columns:repeat(3,1fr); gap:15px; }
      .service-btn { background:#101d31; color:white; padding:25px; border-radius:18px; display:block; border:1px solid rgba(255,255,255,.1); transition:.2s; }
      .service-btn:hover { transform:translateY(-3px); background:#132a47; }
      section { padding:35px 0; }
      input, textarea, select { width:100%; padding:14px; margin:7px 0; border-radius:10px; border:none; font-size:16px; }
      textarea { min-height:95px; }
      button { width:100%; padding:14px; border:none; border-radius:10px; background:#00ff88; font-size:16px; font-weight:bold; cursor:pointer; }
      .trustbar { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-top:22px; }
      .trustitem { background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1); border-radius:15px; padding:14px; text-align:center; }
      .stars { color:#facc15; }
      footer { padding:35px 0; background:#030712; color:#a8bdd4; text-align:center; }
      .float-wa, .float-call {
        position:fixed; right:18px; color:white; padding:14px 18px; border-radius:999px; font-weight:bold;
        box-shadow:0 10px 30px rgba(0,0,0,.35); z-index:99;
      }
      .float-wa { bottom:18px; background:#25D366; }
      .float-call { bottom:78px; background:#1fc6ff; }
      @media (max-width:850px) {
        .hero-grid, .grid3, .trustbar { grid-template-columns:1fr; }
        .nav { flex-direction:column; padding:12px 0; }
      }
    </style>
  </head>
  <body>${html}</body>
  </html>`;
}

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    let body = "";

    req.on("data", chunk => { body += chunk.toString(); });

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
        res.end(page(`
          <div class="container" style="padding:60px 0;text-align:center;">
            <h1 style="color:#ff5c5c;">Error saving data</h1>
            <p>Please try again.</p>
            <a class="btn btn-main" href="/">Back</a>
          </div>
        `));
        return;
      }

      const whatsappText = encodeURIComponent(
        `Hello Relax Fix
Name: ${data.name}
Phone: ${data.phone}
Service: ${data.service}
Message: ${data.message}`
      );

      res.end(page(`
        <div class="container" style="padding:60px 0;text-align:center;">
          <h1 style="color:#00ff88;">✅ Request Saved Successfully</h1>
          <h2>We will contact you soon</h2>
          <p class="muted">Your request was saved in our system.</p>
          <br>
          <a class="btn btn-wa" href="https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}" target="_blank">💬 Send Details on WhatsApp</a>
          <br><br>
          <a class="btn btn-main" href="/">Back Home</a>
        </div>
      `));
    });

    return;
  }

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

  res.end(page(`
    <header>
      <div class="container nav">
        <div class="brand">❄️ Relax Fix UAE</div>
        <div>
          <a class="btn btn-call" href="tel:+971588259848">📞 Call Now</a>
          <a class="btn btn-wa" href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello, I want to book a service from Relax Fix")}" target="_blank">💬 WhatsApp</a>
        </div>
      </div>
    </header>

    <main>
      <section class="hero">
        <div class="container hero-grid">
          <div>
            <h1>Reliable Home Maintenance Services in UAE</h1>
            <p class="muted">AC Maintenance • Water Tank Cleaning • Pest Control • Fast WhatsApp Booking</p>
            <a class="btn btn-main" href="#booking">Book Service</a>
            <a class="btn btn-wa" href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello, I want service from Relax Fix")}" target="_blank">WhatsApp</a>

            <div class="trustbar">
              <div class="trustitem">⚡ Fast Response</div>
              <div class="trustitem">🛡️ Trusted Service</div>
              <div class="trustitem">📍 UAE Coverage</div>
              <div class="trustitem">💬 Easy Booking</div>
            </div>
          </div>

          <div class="card">
            <h2>Quick Booking</h2>
            <p class="muted">Send your request and we will contact you fast.</p>
            <form method="POST" action="/">
              <input name="name" placeholder="Name" required>
              <input name="phone" placeholder="Phone" required>
              <select name="service" required>
                <option value="">Select Service</option>
                <option>AC Maintenance</option>
                <option>Water Tank Cleaning</option>
                <option>Pest Control</option>
                <option>Other Maintenance</option>
              </select>
              <textarea name="message" placeholder="Message"></textarea>
              <button type="submit">Send Request</button>
            </form>
          </div>
        </div>
      </section>

      <section>
        <div class="container">
          <h2>Our Services</h2>
          <p class="muted">Choose a service and the booking form will be ready.</p>

          <div class="grid3">
            <a class="service-btn" href="#booking" onclick="document.getElementById('serviceInput').value='AC Maintenance'">
              <h3>❄️ AC Maintenance</h3>
              <p class="muted">AC repair, cleaning, weak cooling, and regular maintenance.</p>
            </a>
            <a class="service-btn" href="#booking" onclick="document.getElementById('serviceInput').value='Water Tank Cleaning'">
              <h3>💧 Water Tank Cleaning</h3>
              <p class="muted">Clean and hygienic tank cleaning service.</p>
            </a>
            <a class="service-btn" href="#booking" onclick="document.getElementById('serviceInput').value='Pest Control'">
              <h3>🐜 Pest Control</h3>
              <p class="muted">Pest control for homes and small businesses.</p>
            </a>
          </div>
        </div>
      </section>

      <section>
        <div class="container">
          <h2>Why Choose Us?</h2>
          <div class="grid3">
            <div class="card"><h3>⏱️ Same-Day Options</h3><p class="muted">Available for selected areas depending on schedule.</p></div>
            <div class="card"><h3>📞 Direct Contact</h3><p class="muted">Call or WhatsApp instantly without waiting.</p></div>
            <div class="card"><h3>✅ Clear Booking</h3><p class="muted">Every request is saved and followed up.</p></div>
          </div>
        </div>
      </section>

      <section>
        <div class="container">
          <h2>Customer Reviews</h2>
          <div class="grid3">
            <div class="card"><div class="stars">★★★★★</div><h3>Fast and clean work</h3><p class="muted">Good response and professional service.</p></div>
            <div class="card"><div class="stars">★★★★★</div><h3>Easy booking</h3><p class="muted">I sent a request and got contacted quickly.</p></div>
            <div class="card"><div class="stars">★★★★★</div><h3>Recommended</h3><p class="muted">Simple process and clear communication.</p></div>
          </div>
        </div>
      </section>

      <section>
        <div class="container">
          <h2>Service Areas</h2>
          <div class="grid3">
            <div class="card">Abu Dhabi</div>
            <div class="card">Dubai</div>
            <div class="card">Ajman</div>
            <div class="card">Sharjah</div>
            <div class="card">Al Ain</div>
            <div class="card">UAE Wide</div>
          </div>
        </div>
      </section>

      <section id="booking">
        <div class="container">
          <div class="card">
            <h2>Book Your Service</h2>
            <form method="POST" action="/">
              <input name="name" placeholder="Name" required>
              <input name="phone" placeholder="Phone" required>
              <input id="serviceInput" name="service" placeholder="Service" required>
              <textarea name="message" placeholder="Tell us more about your request"></textarea>
              <button type="submit">Send Request</button>
            </form>
          </div>
        </div>
      </section>
    </main>

    <a class="float-call" href="tel:+971588259848">📞 Call</a>
    <a class="float-wa" href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello, I want to book AC / tank cleaning / pest control service from Relax Fix")}" target="_blank">💬 WhatsApp</a>

    <footer>
      <div class="container">
        <strong>Relax Fix UAE</strong><br>
        AC Maintenance • Water Tank Cleaning • Pest Control<br>
        WhatsApp: +971 58 825 9848
      </div>
    </footer>
  `));
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Server running...");
});
