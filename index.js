const http = require("http");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://nmzxrjdxvmmzzmajrskm.supabase.co",
  "sb_publishable_qXOPVaD5_f60qf1UbYrm2A_sH9c0lW5"
);

const WHATSAPP_NUMBER = "971588259848";

function page() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Relax Fix UAE | صيانة في الإمارات</title>
<meta name="description" content="Relax Fix UAE provides AC maintenance, water tank cleaning, pest control and home maintenance services in UAE.">
<style>
*{box-sizing:border-box}
body{margin:0;font-family:Arial,sans-serif;background:#07111f;color:white}
a{text-decoration:none}
.container{width:min(1100px,calc(100% - 30px));margin:auto}
header{position:sticky;top:0;z-index:10;background:rgba(0,0,0,.85);border-bottom:1px solid rgba(255,255,255,.1)}
.nav{min-height:72px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}
.brand{font-size:22px;font-weight:bold}
.btn{display:inline-block;padding:12px 18px;border-radius:10px;font-weight:bold;border:none;cursor:pointer}
.btn-main{background:#00ff88;color:black}
.btn-wa{background:#25D366;color:white}
.btn-call{background:#1fc6ff;color:white}
.lang{background:#333;color:white;padding:8px 12px;border-radius:8px;cursor:pointer;margin:3px}
.hero{padding:70px 0 35px;text-align:center;background:radial-gradient(circle at top right,rgba(37,211,102,.18),transparent 30%),radial-gradient(circle at top left,rgba(31,198,255,.16),transparent 30%)}
h1{font-size:clamp(36px,6vw,62px);line-height:1.05;margin:0 0 15px}
h2{font-size:32px}
.muted{color:#a8bdd4}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:15px}
.card,.service-btn{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:25px}
.service-btn{display:block;color:white;cursor:pointer}
.service-btn:hover{background:#132a47}
section{padding:35px 0}
input,textarea,select{width:100%;padding:14px;margin:7px 0;border-radius:10px;border:none;font-size:16px}
textarea{min-height:95px}
button{width:100%;padding:14px;border:none;border-radius:10px;background:#00ff88;font-size:16px;font-weight:bold;cursor:pointer}
.float-wa,.float-call{position:fixed;right:18px;color:white;padding:14px 18px;border-radius:999px;font-weight:bold;box-shadow:0 10px 30px rgba(0,0,0,.35);z-index:99}
.float-wa{bottom:18px;background:#25D366}
.float-call{bottom:78px;background:#1fc6ff}
footer{padding:35px 0;background:#030712;color:#a8bdd4;text-align:center}
@media(max-width:850px){.grid3{grid-template-columns:1fr}.nav{flex-direction:column;padding:12px 0}}
</style>
</head>

<body>

<header>
  <div class="container nav">
    <div class="brand">❄️ Relax Fix UAE</div>
    <div>
      <button class="lang" onclick="setLang('en')">EN</button>
      <button class="lang" onclick="setLang('ar')">AR</button>
      <a class="btn btn-call" href="tel:+971588259848">📞 Call</a>
      <a class="btn btn-wa" id="topWa" target="_blank">💬 WhatsApp</a>
    </div>
  </div>
</header>

<main>
  <section class="hero">
    <div class="container">
      <h1 id="title">Fast & Trusted Home Maintenance in UAE ⚡</h1>
      <p class="muted" id="subtitle">AC Maintenance • Water Tank Cleaning • Pest Control</p>
      <p class="muted" id="trust">Same Day Service • Trusted Technicians • Affordable Prices</p>

      <a class="btn btn-main" href="javascript:void(0)" onclick="scrollToBooking()" id="bookBtn">Book Service</a>
      <a class="btn btn-wa" id="heroWa" target="_blank">WhatsApp</a>
    </div>
  </section>

  <section>
    <div class="container">
      <h2 id="servicesTitle">Our Services</h2>
      <p class="muted" id="servicesText">Click a service. It will fill the booking form automatically.</p>

      <div class="grid3">
        <a class="service-btn" href="javascript:void(0)" onclick="selectService('AC Maintenance')">
          <h3 id="acTitle">❄️ AC Maintenance</h3>
          <p class="muted" id="acText">AC repair, cleaning, weak cooling, and regular maintenance.</p>
        </a>

        <a class="service-btn" href="javascript:void(0)" onclick="selectService('Water Tank Cleaning')">
          <h3 id="tankTitle">💧 Water Tank Cleaning</h3>
          <p class="muted" id="tankText">Clean and hygienic tank cleaning service.</p>
        </a>

        <a class="service-btn" href="javascript:void(0)" onclick="selectService('Pest Control')">
          <h3 id="pestTitle">🐜 Pest Control</h3>
          <p class="muted" id="pestText">Pest control for homes and small businesses.</p>
        </a>
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <h2 id="whyTitle">Why Choose Us?</h2>
      <div class="grid3">
        <div class="card"><h3 id="why1">⏱️ Same-Day Options</h3><p class="muted" id="why1Text">Available for selected areas depending on schedule.</p></div>
        <div class="card"><h3 id="why2">📞 Direct Contact</h3><p class="muted" id="why2Text">Call or WhatsApp instantly without waiting.</p></div>
        <div class="card"><h3 id="why3">✅ Clear Booking</h3><p class="muted" id="why3Text">Every request is saved and followed up.</p></div>
      </div>
    </div>
  </section>

  <section id="booking">
    <div class="container">
      <div class="card">
        <h2 id="formTitle">Book Your Service</h2>

        <form method="POST" action="/">
          <input name="name" id="nameInput" placeholder="Name" required>
          <input name="phone" id="phoneInput" placeholder="Phone" required>
          <input id="serviceInput" name="service" placeholder="Service" required>
          <textarea name="message" id="messageInput" placeholder="Tell us more about your request"></textarea>
          <input type="hidden" name="lang" id="langInput" value="en">
          <button type="submit" id="sendBtn">Send Request + Open WhatsApp</button>
        </form>

        <p style="margin-top:12px;color:#a8bdd4;">📞 +971 58 825 9848</p>
      </div>
    </div>
  </section>
</main>

<a class="float-call" href="tel:+971588259848">📞 Call</a>
<a class="float-wa" id="floatWa" target="_blank">💬 WhatsApp</a>

<footer>
  <div class="container">
    <strong>Relax Fix UAE</strong><br>
    <span id="footerText">AC Maintenance • Water Tank Cleaning • Pest Control</span><br>
    WhatsApp: +971 58 825 9848
  </div>
</footer>

<script>
const WA = "971588259848";

const text = {
  en: {
    dir: "ltr",
    title: "Fast & Trusted Home Maintenance in UAE ⚡",
    subtitle: "AC Maintenance • Water Tank Cleaning • Pest Control",
    trust: "Same Day Service • Trusted Technicians • Affordable Prices",
    bookBtn: "Book Service",
    servicesTitle: "Our Services",
    servicesText: "Click a service. It will fill the booking form automatically.",
    acTitle: "❄️ AC Maintenance",
    acText: "AC repair, cleaning, weak cooling, and regular maintenance.",
    tankTitle: "💧 Water Tank Cleaning",
    tankText: "Clean and hygienic tank cleaning service.",
    pestTitle: "🐜 Pest Control",
    pestText: "Pest control for homes and small businesses.",
    whyTitle: "Why Choose Us?",
    why1: "⏱️ Same-Day Options",
    why1Text: "Available for selected areas depending on schedule.",
    why2: "📞 Direct Contact",
    why2Text: "Call or WhatsApp instantly without waiting.",
    why3: "✅ Clear Booking",
    why3Text: "Every request is saved and followed up.",
    formTitle: "Book Your Service",
    name: "Name",
    phone: "Phone",
    service: "Service",
    message: "Tell us more about your request",
    send: "Send Request + Open WhatsApp",
    wa: "Hello, I want to book AC / tank cleaning / pest control service from Relax Fix",
    footer: "AC Maintenance • Water Tank Cleaning • Pest Control"
  },
  ar: {
    dir: "rtl",
    title: "خدمات صيانة سريعة وموثوقة في الإمارات ⚡",
    subtitle: "صيانة تكييف • تنظيف خزانات • مكافحة حشرات",
    trust: "خدمة سريعة • فنيين موثوقين • أسعار مناسبة",
    bookBtn: "احجز الخدمة",
    servicesTitle: "خدماتنا",
    servicesText: "اضغط على الخدمة وسيتم اختيارها تلقائيًا في نموذج الحجز.",
    acTitle: "❄️ صيانة تكييف",
    acText: "إصلاح وتنظيف المكيفات وضعف التبريد والصيانة الدورية.",
    tankTitle: "💧 تنظيف خزانات",
    tankText: "تنظيف خزانات بطريقة منظمة ونظيفة.",
    pestTitle: "🐜 مكافحة حشرات",
    pestText: "مكافحة حشرات للمنازل وبعض الأعمال الصغيرة.",
    whyTitle: "لماذا تختار Relax Fix؟",
    why1: "⏱️ خيارات خدمة نفس اليوم",
    why1Text: "متاحة لبعض المناطق حسب جدول العمل.",
    why2: "📞 تواصل مباشر",
    why2Text: "اتصال أو واتساب فورًا بدون انتظار.",
    why3: "✅ حجز واضح",
    why3Text: "كل طلب يتم حفظه ومتابعته.",
    formTitle: "احجز خدمتك",
    name: "الاسم",
    phone: "رقم الهاتف",
    service: "الخدمة",
    message: "اكتب تفاصيل طلبك",
    send: "إرسال الطلب + فتح واتساب",
    wa: "السلام عليكم، أريد حجز خدمة تكييف / تنظيف خزانات / مكافحة حشرات من Relax Fix",
    footer: "صيانة تكييف • تنظيف خزانات • مكافحة حشرات"
  }
};

function setLang(lang) {
  localStorage.setItem("lang", lang);
  document.body.dir = text[lang].dir;
  document.documentElement.lang = lang;

  for (const key in text[lang]) {
    const el = document.getElementById(key);
    if (el) el.innerText = text[lang][key];
  }

  document.getElementById("nameInput").placeholder = text[lang].name;
  document.getElementById("phoneInput").placeholder = text[lang].phone;
  document.getElementById("serviceInput").placeholder = text[lang].service;
  document.getElementById("messageInput").placeholder = text[lang].message;
  document.getElementById("sendBtn").innerText = text[lang].send;
  document.getElementById("langInput").value = lang;
  document.getElementById("footerText").innerText = text[lang].footer;

  const waLink = "https://wa.me/" + WA + "?text=" + encodeURIComponent(text[lang].wa);
  document.getElementById("topWa").href = waLink;
  document.getElementById("heroWa").href = waLink;
  document.getElementById("floatWa").href = waLink;
}

function selectService(service) {
  const lang = localStorage.getItem("lang") || "en";

  const arMap = {
    "AC Maintenance": "صيانة تكييف",
    "Water Tank Cleaning": "تنظيف خزانات",
    "Pest Control": "مكافحة حشرات"
  };

  document.getElementById("serviceInput").value = lang === "ar" ? arMap[service] : service;
  scrollToBooking();
}

function scrollToBooking() {
  document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
}

const savedLang = localStorage.getItem("lang") || (navigator.language.startsWith("ar") ? "ar" : "en");
setLang(savedLang);
</script>

</body>
</html>
`;
}

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
        message: params.get("message"),
        lang: params.get("lang") || "en"
      };

      const { error } = await supabase.from("leads").insert([{
        name: data.name,
        phone: data.phone,
        service: data.service,
        message: data.message
      }]);

      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

      if (error) {
        console.log("ERROR:", error);
        res.end(`
          <h1>Error saving data</h1>
          <a href="/">Back</a>
        `);
        return;
      }

      const whatsappText =
        data.lang === "ar"
          ? encodeURIComponent(
`السلام عليكم Relax Fix
الاسم: ${data.name}
الهاتف: ${data.phone}
الخدمة: ${data.service}
الرسالة: ${data.message}`
            )
          : encodeURIComponent(
`Hello Relax Fix
Name: ${data.name}
Phone: ${data.phone}
Service: ${data.service}
Message: ${data.message}`
            );

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`;

      res.end(`
<!DOCTYPE html>
<html lang="${data.lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Success</title>
</head>
<body style="background:#07111f;color:white;text-align:center;padding:50px;font-family:Arial;" dir="${data.lang === "ar" ? "rtl" : "ltr"}">
  <h1 style="color:#00ff88;">${data.lang === "ar" ? "✅ تم حفظ الطلب بنجاح" : "✅ Request Saved Successfully"}</h1>
  <h2>${data.lang === "ar" ? "سيتم فتح واتساب بالرسالة تلقائيًا" : "WhatsApp will open automatically"}</h2>
  <p style="color:#a8bdd4;">${data.lang === "ar" ? "إذا لم يفتح واتساب، اضغط الزر بالأسفل." : "If WhatsApp does not open, press the button below."}</p>

  <a href="${whatsappUrl}" target="_blank" style="display:inline-block;background:#25D366;color:white;padding:14px 24px;border-radius:10px;font-weight:bold;text-decoration:none;">
    ${data.lang === "ar" ? "💬 فتح واتساب" : "💬 Open WhatsApp"}
  </a>

  <br><br>

  <a href="/" style="display:inline-block;background:#00ff88;color:black;padding:12px 20px;border-radius:10px;font-weight:bold;text-decoration:none;">
    ${data.lang === "ar" ? "رجوع" : "Back Home"}
  </a>

  <script>
    setTimeout(function() {
      window.open("${whatsappUrl}", "_blank");
    }, 1200);
  </script>
</body>
</html>
`);
    });

    return;
  }

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(page());
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Server running...");
});
