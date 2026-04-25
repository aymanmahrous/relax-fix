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
<title>Relax Fix UAE | Premium Maintenance Services</title>
<meta name="description" content="Premium AC maintenance, water tank cleaning, pest control and home maintenance services in UAE. Fast WhatsApp booking.">
<style>
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;font-family:Arial,sans-serif;background:#050914;color:white}
a{text-decoration:none;color:inherit}
.container{width:min(1180px,calc(100% - 30px));margin:auto}
header{position:sticky;top:0;z-index:50;background:rgba(3,7,18,.88);backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,.08)}
.nav{min-height:74px;display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap}
.logo{font-weight:900;font-size:24px;letter-spacing:.3px}
.nav-actions{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:13px 19px;border-radius:14px;font-weight:800;border:0;cursor:pointer}
.btn-main{background:linear-gradient(135deg,#00ff88,#12d6ff);color:#03110b}
.btn-wa{background:#25D366;color:white}
.btn-call{background:#1fc6ff;color:white}
.lang{background:#111827;color:white;border:1px solid rgba(255,255,255,.15);padding:10px 12px;border-radius:12px;cursor:pointer;font-weight:800}
.hero{position:relative;overflow:hidden;padding:86px 0 55px;background:
radial-gradient(circle at 20% 20%,rgba(18,214,255,.18),transparent 35%),
radial-gradient(circle at 80% 0%,rgba(0,255,136,.18),transparent 35%),
linear-gradient(135deg,#07111f,#05101a)}
.hero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:36px;align-items:center}
.badge{display:inline-flex;gap:8px;align-items:center;background:rgba(0,255,136,.12);border:1px solid rgba(0,255,136,.25);color:#81ffc1;padding:10px 14px;border-radius:999px;font-weight:800;margin-bottom:18px}
h1{font-size:clamp(42px,7vw,76px);line-height:.98;margin:0 0 18px;letter-spacing:-2px}
h2{font-size:clamp(28px,4vw,42px);margin:0 0 14px}
p{line-height:1.7}
.muted{color:#b7c6d8}
.hero-text{font-size:19px;max-width:680px}
.hero-buttons{display:flex;gap:12px;flex-wrap:wrap;margin:24px 0}
.glass,.card{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);box-shadow:0 20px 60px rgba(0,0,0,.25);border-radius:28px}
.booking-card{padding:28px}
input,textarea,select{width:100%;padding:15px;margin:7px 0;border-radius:14px;border:1px solid rgba(255,255,255,.12);font-size:16px;background:white;color:#111}
textarea{min-height:105px}
button.submit{width:100%;padding:15px;border:0;border-radius:14px;background:linear-gradient(135deg,#00ff88,#12d6ff);color:#04130b;font-size:17px;font-weight:900;cursor:pointer}
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:28px}
.stat{padding:16px;border-radius:18px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);text-align:center}
.stat strong{display:block;font-size:22px;color:#00ff88}
section{padding:50px 0}
.section-head{text-align:center;max-width:780px;margin:0 auto 28px}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.service{padding:28px;border-radius:24px;background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.12);cursor:pointer;transition:.22s}
.service:hover{transform:translateY(-5px);border-color:rgba(0,255,136,.55)}
.icon{font-size:38px;margin-bottom:10px}
.feature,.review,.area{padding:24px;border-radius:22px;background:#0b1324;border:1px solid rgba(255,255,255,.09)}
.stars{color:#facc15;font-size:20px}
.cta{padding:42px;border-radius:30px;text-align:center;background:linear-gradient(135deg,rgba(0,255,136,.18),rgba(31,198,255,.18));border:1px solid rgba(255,255,255,.12)}
.float-wa,.float-call{position:fixed;right:18px;color:white;padding:14px 18px;border-radius:999px;font-weight:900;box-shadow:0 10px 30px rgba(0,0,0,.4);z-index:99}
.float-wa{bottom:18px;background:#25D366}
.float-call{bottom:78px;background:#1fc6ff}
footer{padding:38px 0;background:#030712;color:#a8bdd4;text-align:center;border-top:1px solid rgba(255,255,255,.08)}
@media(max-width:900px){
.hero-grid,.grid3,.grid4,.stats{grid-template-columns:1fr}
.nav{justify-content:center;text-align:center}
h1{letter-spacing:-1px}
.hero{text-align:center}
.hero-buttons{justify-content:center}
}
</style>
</head>

<body>
<header>
  <div class="container nav">
    <div class="logo">❄️ Relax Fix UAE</div>
    <div class="nav-actions">
      <button class="lang" onclick="setLang('en')">EN</button>
      <button class="lang" onclick="setLang('ar')">AR</button>
      <a class="btn btn-call" href="tel:+971588259848">📞 <span id="callTop">Call</span></a>
      <a class="btn btn-wa" id="topWa" target="_blank">💬 WhatsApp</a>
    </div>
  </div>
</header>

<main>
<section class="hero">
  <div class="container hero-grid">
    <div>
      <div class="badge" id="badge">⭐ Premium Maintenance Services</div>
      <h1 id="title">Fast, Clean & Trusted Home Maintenance in UAE</h1>
      <p class="muted hero-text" id="subtitle">AC maintenance, tank cleaning and pest control with fast WhatsApp booking and clear follow-up.</p>

      <div class="hero-buttons">
        <a class="btn btn-main" href="javascript:void(0)" onclick="scrollToBooking()" id="bookBtn">Book Service Now</a>
        <a class="btn btn-wa" id="heroWa" target="_blank">💬 WhatsApp</a>
      </div>

      <div class="stats">
        <div class="stat"><strong>24/7</strong><span id="stat1">Quick Contact</span></div>
        <div class="stat"><strong>UAE</strong><span id="stat2">Service Areas</span></div>
        <div class="stat"><strong>3+</strong><span id="stat3">Main Services</span></div>
        <div class="stat"><strong>Fast</strong><span id="stat4">Booking</span></div>
      </div>
    </div>

    <div class="glass booking-card">
      <h2 id="quickTitle">Quick Booking</h2>
      <p class="muted" id="quickText">Send your request. It will be saved and WhatsApp will open automatically.</p>
      <form method="POST" action="/">
        <input name="name" id="nameInput" placeholder="Name" required>
        <input name="phone" id="phoneInput" placeholder="Phone" required>
        <select name="service" id="quickService" required>
          <option value="">Select Service</option>
          <option>AC Maintenance</option>
          <option>Water Tank Cleaning</option>
          <option>Pest Control</option>
          <option>Other Maintenance</option>
        </select>
        <textarea name="message" id="messageInput" placeholder="Message"></textarea>
        <input type="hidden" name="lang" id="langInput" value="en">
        <button class="submit" type="submit" id="sendBtn">Send Request + Open WhatsApp</button>
      </form>
      <p class="muted">📞 +971 58 825 9848</p>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <div class="section-head">
      <h2 id="servicesTitle">Our Services</h2>
      <p class="muted" id="servicesText">Choose a service. The booking form will be filled automatically.</p>
    </div>

    <div class="grid3">
      <div class="service" onclick="selectService('AC Maintenance')">
        <div class="icon">❄️</div>
        <h3 id="acTitle">AC Maintenance</h3>
        <p class="muted" id="acText">Repair, cleaning, weak cooling, inspection and routine AC maintenance.</p>
      </div>
      <div class="service" onclick="selectService('Water Tank Cleaning')">
        <div class="icon">💧</div>
        <h3 id="tankTitle">Water Tank Cleaning</h3>
        <p class="muted" id="tankText">Clean, organized and hygienic water tank cleaning service.</p>
      </div>
      <div class="service" onclick="selectService('Pest Control')">
        <div class="icon">🐜</div>
        <h3 id="pestTitle">Pest Control</h3>
        <p class="muted" id="pestText">Pest control solutions for homes, villas and small businesses.</p>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <div class="section-head">
      <h2 id="whyTitle">Why Choose Relax Fix?</h2>
    </div>
    <div class="grid3">
      <div class="feature"><h3 id="why1">⚡ Fast Response</h3><p class="muted" id="why1Text">Direct WhatsApp and call buttons for quick booking.</p></div>
      <div class="feature"><h3 id="why2">🛡️ Professional Service</h3><p class="muted" id="why2Text">Clear request details saved in the system.</p></div>
      <div class="feature"><h3 id="why3">📍 UAE Coverage</h3><p class="muted" id="why3Text">Serving multiple areas across the UAE.</p></div>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <div class="section-head">
      <h2 id="reviewsTitle">Customer Reviews</h2>
    </div>
    <div class="grid3">
      <div class="review"><div class="stars">★★★★★</div><h3 id="rev1">Fast and clean work</h3><p class="muted" id="rev1Text">Good response and professional communication.</p></div>
      <div class="review"><div class="stars">★★★★★</div><h3 id="rev2">Easy booking</h3><p class="muted" id="rev2Text">The form and WhatsApp made booking simple.</p></div>
      <div class="review"><div class="stars">★★★★★</div><h3 id="rev3">Recommended</h3><p class="muted" id="rev3Text">Clear service and fast follow-up.</p></div>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <div class="section-head">
      <h2 id="areasTitle">Service Areas</h2>
    </div>
    <div class="grid4">
      <div class="area">Abu Dhabi</div>
      <div class="area">Dubai</div>
      <div class="area">Ajman</div>
      <div class="area">Sharjah</div>
      <div class="area">Al Ain</div>
      <div class="area">UAE Wide</div>
      <div class="area">Villas</div>
      <div class="area">Apartments</div>
    </div>
  </div>
</section>

<section id="booking">
  <div class="container">
    <div class="cta">
      <h2 id="formTitle">Book Your Service</h2>
      <p class="muted" id="formText">Fill the request and WhatsApp will open with your details.</p>
      <form method="POST" action="/">
        <input name="name" id="nameInput2" placeholder="Name" required>
        <input name="phone" id="phoneInput2" placeholder="Phone" required>
        <input id="serviceInput" name="service" placeholder="Service" required>
        <textarea name="message" id="messageInput2" placeholder="Tell us more about your request"></textarea>
        <input type="hidden" name="lang" id="langInput2" value="en">
        <button class="submit" type="submit" id="sendBtn2">Send Request + Open WhatsApp</button>
      </form>
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
    dir:"ltr", callTop:"Call", badge:"⭐ Premium Maintenance Services",
    title:"Fast, Clean & Trusted Home Maintenance in UAE",
    subtitle:"AC maintenance, tank cleaning and pest control with fast WhatsApp booking and clear follow-up.",
    bookBtn:"Book Service Now", stat1:"Quick Contact", stat2:"Service Areas", stat3:"Main Services", stat4:"Booking",
    quickTitle:"Quick Booking", quickText:"Send your request. It will be saved and WhatsApp will open automatically.",
    servicesTitle:"Our Services", servicesText:"Choose a service. The booking form will be filled automatically.",
    acTitle:"AC Maintenance", acText:"Repair, cleaning, weak cooling, inspection and routine AC maintenance.",
    tankTitle:"Water Tank Cleaning", tankText:"Clean, organized and hygienic water tank cleaning service.",
    pestTitle:"Pest Control", pestText:"Pest control solutions for homes, villas and small businesses.",
    whyTitle:"Why Choose Relax Fix?", why1:"⚡ Fast Response", why1Text:"Direct WhatsApp and call buttons for quick booking.",
    why2:"🛡️ Professional Service", why2Text:"Clear request details saved in the system.",
    why3:"📍 UAE Coverage", why3Text:"Serving multiple areas across the UAE.",
    reviewsTitle:"Customer Reviews", rev1:"Fast and clean work", rev1Text:"Good response and professional communication.",
    rev2:"Easy booking", rev2Text:"The form and WhatsApp made booking simple.",
    rev3:"Recommended", rev3Text:"Clear service and fast follow-up.",
    areasTitle:"Service Areas", formTitle:"Book Your Service", formText:"Fill the request and WhatsApp will open with your details.",
    name:"Name", phone:"Phone", service:"Service", message:"Tell us more about your request",
    send:"Send Request + Open WhatsApp", footer:"AC Maintenance • Water Tank Cleaning • Pest Control",
    wa:"Hello, I want to book AC / tank cleaning / pest control service from Relax Fix"
  },
  ar: {
    dir:"rtl", callTop:"اتصال", badge:"⭐ خدمات صيانة احترافية",
    title:"خدمات صيانة سريعة ونظيفة وموثوقة في الإمارات",
    subtitle:"صيانة تكييف، تنظيف خزانات، ومكافحة حشرات مع حجز سريع عبر واتساب ومتابعة واضحة.",
    bookBtn:"احجز الخدمة الآن", stat1:"تواصل سريع", stat2:"مناطق الخدمة", stat3:"خدمات رئيسية", stat4:"حجز سريع",
    quickTitle:"حجز سريع", quickText:"أرسل طلبك، سيتم حفظه وفتح واتساب تلقائيًا بالتفاصيل.",
    servicesTitle:"خدماتنا", servicesText:"اختر الخدمة وسيتم تعبئة نموذج الحجز تلقائيًا.",
    acTitle:"صيانة تكييف", acText:"إصلاح وتنظيف وفحص وضعف تبريد وصيانة دورية للمكيفات.",
    tankTitle:"تنظيف خزانات", tankText:"خدمة تنظيف خزانات منظمة ونظيفة.",
    pestTitle:"مكافحة حشرات", pestText:"حلول مكافحة حشرات للمنازل والفلل والأعمال الصغيرة.",
    whyTitle:"لماذا تختار Relax Fix؟", why1:"⚡ سرعة استجابة", why1Text:"أزرار اتصال وواتساب مباشرة للحجز السريع.",
    why2:"🛡️ خدمة احترافية", why2Text:"تفاصيل الطلب محفوظة بوضوح في النظام.",
    why3:"📍 تغطية داخل الإمارات", why3Text:"نخدم عدة مناطق داخل الإمارات.",
    reviewsTitle:"آراء العملاء", rev1:"شغل سريع ونظيف", rev1Text:"استجابة جيدة وتواصل احترافي.",
    rev2:"الحجز سهل", rev2Text:"النموذج والواتساب جعلوا الحجز بسيطًا.",
    rev3:"أنصح بهم", rev3Text:"خدمة واضحة ومتابعة سريعة.",
    areasTitle:"مناطق الخدمة", formTitle:"احجز خدمتك", formText:"املأ الطلب وسيتم فتح واتساب بتفاصيلك.",
    name:"الاسم", phone:"رقم الهاتف", service:"الخدمة", message:"اكتب تفاصيل طلبك",
    send:"إرسال الطلب + فتح واتساب", footer:"صيانة تكييف • تنظيف خزانات • مكافحة حشرات",
    wa:"السلام عليكم، أريد حجز خدمة تكييف / تنظيف خزانات / مكافحة حشرات من Relax Fix"
  }
};

function setLang(lang){
  localStorage.setItem("lang",lang);
  document.body.dir=text[lang].dir;
  document.documentElement.lang=lang;

  for(const key in text[lang]){
    const el=document.getElementById(key);
    if(el) el.innerText=text[lang][key];
  }

  ["nameInput","nameInput2"].forEach(id=>document.getElementById(id).placeholder=text[lang].name);
  ["phoneInput","phoneInput2"].forEach(id=>document.getElementById(id).placeholder=text[lang].phone);
  document.getElementById("serviceInput").placeholder=text[lang].service;
  document.getElementById("messageInput").placeholder=text[lang].message;
  document.getElementById("messageInput2").placeholder=text[lang].message;
  document.getElementById("sendBtn").innerText=text[lang].send;
  document.getElementById("sendBtn2").innerText=text[lang].send;
  document.getElementById("langInput").value=lang;
  document.getElementById("langInput2").value=lang;
  document.getElementById("footerText").innerText=text[lang].footer;

  const waLink="https://wa.me/"+WA+"?text="+encodeURIComponent(text[lang].wa);
  document.getElementById("topWa").href=waLink;
  document.getElementById("heroWa").href=waLink;
  document.getElementById("floatWa").href=waLink;
}

function selectService(service){
  const lang=localStorage.getItem("lang")||"en";
  const arMap={"AC Maintenance":"صيانة تكييف","Water Tank Cleaning":"تنظيف خزانات","Pest Control":"مكافحة حشرات"};
  document.getElementById("serviceInput").value=lang==="ar"?arMap[service]:service;
  scrollToBooking();
}

function scrollToBooking(){
  document.getElementById("booking").scrollIntoView({behavior:"smooth"});
}

const savedLang=localStorage.getItem("lang")||(navigator.language.startsWith("ar")?"ar":"en");
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
        res.end("<h1>Error saving data</h1><a href='/'>Back</a>");
        return;
      }

      const whatsappText = data.lang === "ar"
        ? encodeURIComponent("السلام عليكم Relax Fix\\nالاسم: " + data.name + "\\nالهاتف: " + data.phone + "\\nالخدمة: " + data.service + "\\nالرسالة: " + data.message)
        : encodeURIComponent("Hello Relax Fix\\nName: " + data.name + "\\nPhone: " + data.phone + "\\nService: " + data.service + "\\nMessage: " + data.message);

      const whatsappUrl = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + whatsappText;

      res.end(\`
<!DOCTYPE html>
<html lang="\${data.lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Success</title>
</head>
<body style="background:#07111f;color:white;text-align:center;padding:50px;font-family:Arial;" dir="\${data.lang === "ar" ? "rtl" : "ltr"}">
  <h1 style="color:#00ff88;">\${data.lang === "ar" ? "✅ تم حفظ الطلب بنجاح" : "✅ Request Saved Successfully"}</h1>
  <h2>\${data.lang === "ar" ? "سيتم فتح واتساب تلقائيًا" : "WhatsApp will open automatically"}</h2>
  <p style="color:#a8bdd4;">\${data.lang === "ar" ? "إذا لم يفتح واتساب، اضغط الزر." : "If WhatsApp does not open, press the button."}</p>

  <a href="\${whatsappUrl}" target="_blank" style="display:inline-block;background:#25D366;color:white;padding:14px 24px;border-radius:10px;font-weight:bold;text-decoration:none;">
    \${data.lang === "ar" ? "💬 فتح واتساب" : "💬 Open WhatsApp"}
  </a>

  <br><br>
  <a href="/" style="display:inline-block;background:#00ff88;color:black;padding:12px 20px;border-radius:10px;font-weight:bold;text-decoration:none;">
    \${data.lang === "ar" ? "رجوع" : "Back Home"}
  </a>

  <script>
    setTimeout(function(){ window.open("\${whatsappUrl}", "_blank"); }, 1000);
  </script>
</body>
</html>\`);
    });

    return;
  }

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(page());
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Server running...");
});
