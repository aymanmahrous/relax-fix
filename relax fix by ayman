const http = require("http");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://nmzxrjdxvmmzzmajrskm.supabase.co",
  "sb_publishable_qXOPVaD5_f60qf1UbYrm2A_sH9c0lW5"
);

const PHONE = "971588259848";
const ADMIN_PASS = "123456";

// ============================================
// PREMIUM LAYOUT TEMPLATE
// ============================================

function premiumLayout(content, title = "Relaxfix2026 UAE") {
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="Relaxfix2026 - خدمات صيانة متخصصة في الإمارات: صيانة التكييف، تنظيف خزانات المياه، مكافحة الآفات">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;700;900&family=Sora:wght@400;600;700&display=swap" rel="stylesheet">
  
  <style>
    /* ===== CSS VARIABLES & THEME ===== */
    :root {
      --primary: #22c55e;
      --secondary: #0ea5e9;
      --accent: #facc15;
      --dark: #020814;
      --card-bg: #0f172a;
      --border-color: #1e293b;
      --text-primary: #f8fafc;
      --text-secondary: #cbd5e1;
      --radius-sm: 12px;
      --radius-md: 18px;
      --radius-lg: 28px;
      --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* ===== GLOBAL STYLES ===== */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      font-family: 'Sora', -apple-system, BlinkMacSystemFont, sans-serif;
      background: linear-gradient(135deg, var(--dark) 0%, #0a1628 100%);
      background-attachment: fixed;
      color: var(--text-primary);
      line-height: 1.6;
      overflow-x: hidden;
    }

    /* ===== HEADER ===== */
    header {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: rgba(2, 8, 20, 0.7);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(34, 197, 94, 0.1);
      animation: slideDown 0.6s ease-out;
    }

    @keyframes slideDown {
      from {
        transform: translateY(-100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .wrap {
      width: min(1280px, 95%);
      margin: 0 auto;
    }

    nav {
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
    }

    .logo {
      font-family: 'Geist', monospace;
      font-size: 28px;
      font-weight: 900;
      letter-spacing: -0.5px;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .nav-right {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    /* ===== BUTTONS ===== */
    .btn {
      display: inline-block;
      padding: 12px 24px;
      border-radius: var(--radius-md);
      font-weight: 700;
      border: none;
      cursor: pointer;
      transition: var(--transition);
      position: relative;
      overflow: hidden;
      font-size: 15px;
      text-decoration: none;
    }

    .btn::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      transform: translate(-50%, -50%);
      transition: width 0.6s, height 0.6s;
    }

    .btn:hover::before {
      width: 300px;
      height: 300px;
    }

    .btn-primary {
      background: linear-gradient(135deg, var(--primary), #16a34a);
      color: white;
    }

    .btn-secondary {
      background: linear-gradient(135deg, var(--secondary), #0284c7);
      color: white;
    }

    .btn-accent {
      background: var(--accent);
      color: #111;
    }

    .btn-outline {
      border: 2px solid var(--primary);
      color: var(--primary);
      background: transparent;
    }

    .btn-outline:hover {
      background: rgba(34, 197, 94, 0.1);
    }

    /* ===== HERO SECTION ===== */
    .hero {
      position: relative;
      padding: 120px 0 80px;
      overflow: hidden;
    }

    .hero::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -10%;
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, transparent 70%);
      border-radius: 50%;
      animation: float 20s ease-in-out infinite;
    }

    .hero::after {
      content: '';
      position: absolute;
      bottom: -20%;
      left: -5%;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, transparent 70%);
      border-radius: 50%;
      animation: float 25s ease-in-out infinite reverse;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(30px); }
    }

    .hero-grid {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 50px;
      align-items: center;
      position: relative;
      z-index: 10;
    }

    .hero-content h1 {
      font-family: 'Geist', monospace;
      font-size: clamp(42px, 8vw, 72px);
      font-weight: 900;
      line-height: 1.1;
      margin-bottom: 24px;
      letter-spacing: -1px;
      background: linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-content .lead {
      font-size: 18px;
      color: var(--text-secondary);
      margin-bottom: 32px;
      line-height: 1.8;
    }

    .badge {
      display: inline-block;
      background: rgba(34, 197, 94, 0.1);
      border: 1px solid rgba(34, 197, 94, 0.3);
      color: #86efac;
      padding: 10px 18px;
      border-radius: 50px;
      font-weight: 700;
      margin-bottom: 20px;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .btn-group {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
      margin-top: 32px;
    }

    /* ===== FORM CARD ===== */
    .form-card {
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid rgba(34, 197, 94, 0.2);
      border-radius: var(--radius-lg);
      padding: 40px;
      backdrop-filter: blur(10px);
      animation: slideInUp 0.8s ease-out 0.3s both;
    }

    @keyframes slideInUp {
      from {
        transform: translateY(40px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .form-card h2 {
      font-family: 'Geist', monospace;
      font-size: 28px;
      margin-bottom: 24px;
      font-weight: 700;
    }

    .form-group {
      margin-bottom: 18px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      font-size: 14px;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    input, textarea, select {
      width: 100%;
      padding: 14px 16px;
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      background: rgba(15, 23, 42, 0.6);
      color: var(--text-primary);
      font-family: inherit;
      font-size: 15px;
      transition: var(--transition);
      border-color: rgba(34, 197, 94, 0.3);
    }

    input:focus, textarea:focus, select:focus {
      outline: none;
      border-color: var(--primary);
      background: rgba(15, 23, 42, 0.9);
      box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
    }

    textarea {
      min-height: 120px;
      resize: vertical;
    }

    .submit-btn {
      width: 100%;
      padding: 16px;
      border: none;
      border-radius: var(--radius-md);
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: white;
      font-weight: 700;
      font-size: 16px;
      cursor: pointer;
      transition: var(--transition);
      position: relative;
      overflow: hidden;
      margin-top: 24px;
    }

    .submit-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 20px 40px rgba(34, 197, 94, 0.2);
    }

    .submit-btn:active {
      transform: translateY(0);
    }

    /* ===== SECTIONS ===== */
    section {
      padding: 80px 0;
      position: relative;
    }

    section h2 {
      font-family: 'Geist', monospace;
      font-size: clamp(28px, 5vw, 48px);
      margin-bottom: 48px;
      font-weight: 900;
      letter-spacing: -0.5px;
    }

    /* ===== SERVICES GRID ===== */
    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 28px;
      margin-top: 40px;
    }

    .service-card {
      background: linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.4));
      border: 1px solid rgba(34, 197, 94, 0.2);
      border-radius: var(--radius-lg);
      padding: 40px 30px;
      cursor: pointer;
      transition: var(--transition);
      position: relative;
      overflow: hidden;
      group: service;
    }

    .service-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), transparent);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .service-card:hover {
      transform: translateY(-8px);
      border-color: var(--primary);
      background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(15, 23, 42, 0.6));
    }

    .service-card:hover::before {
      opacity: 1;
    }

    .service-icon {
      font-size: 48px;
      margin-bottom: 20px;
      display: block;
    }

    .service-card h3 {
      font-size: 22px;
      margin-bottom: 12px;
      font-weight: 700;
    }

    .service-card p {
      color: var(--text-secondary);
      font-size: 14px;
      line-height: 1.6;
    }

    /* ===== OFFER BANNER ===== */
    .offer-banner {
      background: linear-gradient(135deg, rgba(34, 197, 94, 0.12), rgba(14, 165, 233, 0.08));
      border: 1px solid rgba(34, 197, 94, 0.2);
      border-radius: var(--radius-lg);
      padding: 60px 40px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .offer-banner::before {
      content: '';
      position: absolute;
      inset: 0;
      background: 
        radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(14, 165, 233, 0.1) 0%, transparent 50%);
      pointer-events: none;
    }

    .offer-banner h2 {
      margin-bottom: 16px;
      font-size: 32px;
    }

    .offer-banner p {
      color: var(--text-secondary);
      margin-bottom: 28px;
      font-size: 16px;
    }

    /* ===== FEATURES GRID ===== */
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      margin-top: 40px;
    }

    .feature-card {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 28px;
      transition: var(--transition);
    }

    .feature-card:hover {
      border-color: var(--primary);
      background: rgba(34, 197, 94, 0.05);
      transform: translateY(-4px);
    }

    .feature-card h3 {
      font-size: 18px;
      margin-bottom: 12px;
      font-weight: 700;
    }

    .feature-card p {
      color: var(--text-secondary);
      font-size: 14px;
      line-height: 1.6;
    }

    /* ===== TESTIMONIALS ===== */
    .testimonials {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-top: 40px;
    }

    .testimonial-card {
      background: linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(14, 165, 233, 0.05));
      border: 1px solid rgba(34, 197, 94, 0.15);
      border-radius: var(--radius-md);
      padding: 28px;
      position: relative;
    }

    .testimonial-card::before {
      content: '"';
      position: absolute;
      top: 0;
      left: 20px;
      font-size: 60px;
      color: var(--primary);
      opacity: 0.1;
      font-weight: 900;
    }

    .stars {
      color: var(--accent);
      margin-bottom: 12px;
      font-size: 14px;
      letter-spacing: 2px;
    }

    .testimonial-card p {
      color: var(--text-secondary);
      font-size: 14px;
      line-height: 1.8;
      margin-bottom: 16px;
    }

    .testimonial-author {
      font-weight: 700;
      font-size: 13px;
      color: var(--text-primary);
    }

    /* ===== FLOATING BUTTONS ===== */
    .float-buttons {
      position: fixed;
      right: 20px;
      bottom: 20px;
      z-index: 999;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .float-btn {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      position: relative;
      overflow: hidden;
    }

    .float-call {
      background: var(--secondary);
      color: white;
    }

    .float-whatsapp {
      background: #25D366;
      color: white;
    }

    .float-btn:hover {
      transform: scale(1.1);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
    }

    .float-btn::before {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(255, 255, 255, 0.2);
      clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
      animation: shimmer 2s ease-in-out infinite;
    }

    @keyframes shimmer {
      0%, 100% { clip-path: polygon(0 0, 100% 0, 100% 0, 0 0); }
      50% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
    }

    /* ===== FOOTER ===== */
    footer {
      background: rgba(2, 8, 20, 0.95);
      border-top: 1px solid rgba(34, 197, 94, 0.1);
      padding: 60px 0 30px;
      color: var(--text-secondary);
      font-size: 14px;
    }

    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 40px;
      margin-bottom: 40px;
    }

    .footer-section h4 {
      color: var(--text-primary);
      margin-bottom: 16px;
      font-weight: 700;
    }

    .footer-section ul {
      list-style: none;
    }

    .footer-section ul li {
      margin-bottom: 10px;
    }

    .footer-section a {
      color: var(--text-secondary);
      transition: var(--transition);
    }

    .footer-section a:hover {
      color: var(--primary);
    }

    .footer-bottom {
      border-top: 1px solid var(--border-color);
      padding-top: 30px;
      text-align: center;
    }

    /* ===== RESPONSIVE ===== */
    @media (max-width: 768px) {
      .hero-grid {
        grid-template-columns: 1fr;
        gap: 30px;
      }

      .nav-right {
        gap: 8px;
      }

      .btn {
        padding: 10px 16px;
        font-size: 13px;
      }

      .form-card {
        padding: 24px;
      }

      section {
        padding: 60px 0;
      }

      .services-grid {
        grid-template-columns: 1fr;
      }

      .float-buttons {
        right: 12px;
        bottom: 12px;
      }

      .float-btn {
        width: 48px;
        height: 48px;
        font-size: 20px;
      }
    }
  </style>
</head>
<body>

<header>
  <div class="wrap">
    <nav>
      <div class="logo">⚡ Relaxfix</div>
      <div class="nav-right">
        <a href="tel:+${PHONE}" class="btn btn-secondary">📞 اتصل</a>
        <a href="https://wa.me/${PHONE}" target="_blank" class="btn btn-primary">💬 واتس اب</a>
      </div>
    </nav>
  </div>
</header>

${content}

<div class="float-buttons">
  <a href="tel:+${PHONE}" class="float-btn float-call" title="اتصل بنا">📞</a>
  <a href="https://wa.me/${PHONE}" target="_blank" class="float-btn float-whatsapp" title="تحدث عبر واتس اب">💬</a>
</div>

<footer>
  <div class="wrap">
    <div class="footer-content">
      <div class="footer-section">
        <h4>عن Relaxfix</h4>
        <p>خدمات صيانة متخصصة في الإمارات العربية المتحدة منذ 2026</p>
      </div>
      <div class="footer-section">
        <h4>الخدمات</h4>
        <ul>
          <li><a href="#services">صيانة التكييف</a></li>
          <li><a href="#services">تنظيف خزانات</a></li>
          <li><a href="#services">مكافحة الآفات</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>تواصل معنا</h4>
        <ul>
          <li>☎️ +971 58 825 9848</li>
          <li>📧 contact@relaxfix.ae</li>
          <li>⏰ متاح 24/7</li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>متابعة سريعة</h4>
        <ul>
          <li><a href="https://wa.me/${PHONE}">واتس اب</a></li>
          <li><a href="tel:+${PHONE}">اتصال مباشر</a></li>
          <li><a href="#booking">حجز الآن</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 Relaxfix UAE. جميع الحقوق محفوظة.</p>
    </div>
  </div>
</footer>

</body>
</html>`;
}

// ============================================
// HOME PAGE
// ============================================

function homePage() {
  const servicesContent = `
    <section id="services">
      <div class="wrap">
        <h2>خدماتنا المتخصصة</h2>
        <div class="services-grid">
          <div class="service-card" onclick="scrollToBooking('صيانة التكييف')">
            <span class="service-icon">❄️</span>
            <h3>صيانة التكييف</h3>
            <p>تنظيف شامل وإصلاح وفحص دوري لأنظمة التكييف السكنية والتجارية</p>
          </div>
          <div class="service-card" onclick="scrollToBooking('تنظيف خزانات')">
            <span class="service-icon">💧</span>
            <h3>تنظيف خزانات المياه</h3>
            <p>تنظيف احترافي وتعقيم كامل للخزانات بمعايير صحية عالية</p>
          </div>
          <div class="service-card" onclick="scrollToBooking('مكافحة الآفات')">
            <span class="service-icon">🐜</span>
            <h3>مكافحة الآفات</h3>
            <p>حلول آمنة وفعالة لمكافحة الحشرات والآفات بضمانة النتيجة</p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="wrap offer-banner">
        <h2>🚀 هل تحتاج خدمة عاجلة؟</h2>
        <p>أرسل موقعك ونوع الخدمة الآن - نصل إليك خلال ساعات</p>
        <a href="https://wa.me/${PHONE}?text=أحتاج%20خدمة%20عاجلة" target="_blank" class="btn btn-accent">احجز الآن</a>
      </div>
    </section>

    <section>
      <div class="wrap">
        <h2>لماذا Relaxfix؟</h2>
        <div class="features-grid">
          <div class="feature-card">
            <h3>⚡ استجابة سريعة</h3>
            <p>رد فوري على طلبك عبر واتس اب والهاتف في أي وقت</p>
          </div>
          <div class="feature-card">
            <h3>📊 لوحة تحكم ذكية</h3>
            <p>تتبع طلباتك والتواصل مع الفريق بسهولة كاملة</p>
          </div>
          <div class="feature-card">
            <h3>💼 خبرة عالية</h3>
            <p>فنيون مدربون وذوو خبرة في الصيانة الشاملة</p>
          </div>
          <div class="feature-card">
            <h3>🛡️ ضمان الخدمة</h3>
            <p>ضمان على جودة العمل والمواد المستخدمة</p>
          </div>
          <div class="feature-card">
            <h3>📱 تطبيق ذكي</h3>
            <p>تطبيق محمول لسهولة الحجز والتتبع</p>
          </div>
          <div class="feature-card">
            <h3>💰 أسعار عادلة</h3>
            <p>أسعار منافسة بدون رسوم خفية أو مفاجآت</p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="wrap">
        <h2>آراء عملائنا</h2>
        <div class="testimonials">
          <div class="testimonial-card">
            <div class="stars">★★★★★</div>
            <p>"خدمة ممتازة وسريعة جداً، الفنيون محترفون جداً وأسعار عادلة"</p>
            <div class="testimonial-author">- محمد علي</div>
          </div>
          <div class="testimonial-card">
            <div class="stars">★★★★★</div>
            <p>"حجزت عبر واتس اب والخدمة جاءت في نفس اليوم، ممتاز جداً"</p>
            <div class="testimonial-author">- فاطمة محمد</div>
          </div>
          <div class="testimonial-card">
            <div class="stars">★★★★★</div>
            <p>"تعامل احترافي وآدمي، سأطلب منهم مرة أخرى بكل تأكيد"</p>
            <div class="testimonial-author">- عبدالرحمن حسن</div>
          </div>
        </div>
      </div>
    </section>

    <section id="booking">
      <div class="wrap">
        <div class="form-card">
          <h2>احجز خدمتك الآن</h2>
          <form method="POST" onsubmit="handleBooking(event)">
            <div class="form-group">
              <label>الاسم الكامل</label>
              <input type="text" name="name" required placeholder="أدخل اسمك">
            </div>
            <div class="form-group">
              <label>رقم الهاتف</label>
              <input type="tel" name="phone" required placeholder="أدخل رقم الهاتف">
            </div>
            <div class="form-group">
              <label>الخدمة المطلوبة</label>
              <select name="service" id="serviceSelect" required>
                <option value="">اختر الخدمة</option>
                <option>صيانة التكييف</option>
                <option>تنظيف خزانات</option>
                <option>مكافحة الآفات</option>
                <option>صيانة أخرى</option>
              </select>
            </div>
            <div class="form-group">
              <label>وصف المشكلة والموقع</label>
              <textarea name="message" required placeholder="أخبرنا عن المشكلة والموقع والوقت المفضل..."></textarea>
            </div>
            <button type="submit" class="submit-btn">احجز الخدمة + فتح واتس اب</button>
          </form>
        </div>
      </div>
    </section>

    <script>
      function scrollToBooking(service) {
        document.getElementById('serviceSelect').value = service;
        document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
      }

      function handleBooking(e) {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const phone = form.phone.value;
        const service = form.service.value;
        const message = form.message.value;

        // Submit to server
        form.submit();
      }
    </script>
  `;

  return premiumLayout(`
    <section class="hero">
      <div class="wrap hero-grid">
        <div class="hero-content">
          <span class="badge">🔥 الخدمات المتخصصة</span>
          <h1>خدمات صيانة احترافية في الإمارات</h1>
          <p class="lead">صيانة التكييف • تنظيف الخزانات • مكافحة الآفات — حجز سريع وردود فورية وخدمة موثوقة</p>
          <div class="btn-group">
            <a href="#booking" class="btn btn-accent">احجز الآن</a>
            <a href="https://wa.me/${PHONE}?text=أحتاج%20استفسار%20عن%20الخدمات" target="_blank" class="btn btn-secondary">استفسر الآن</a>
          </div>
        </div>
        <div class="form-card">
          <h2>حجز سريع</h2>
          <form method="POST">
            <div class="form-group">
              <input type="text" name="name" placeholder="اسمك" required>
            </div>
            <div class="form-group">
              <input type="tel" name="phone" placeholder="رقم الهاتف" required>
            </div>
            <div class="form-group">
              <select name="service" required>
                <option value="">اختر الخدمة</option>
                <option>صيانة التكييف</option>
                <option>تنظيف خزانات</option>
                <option>مكافحة الآفات</option>
                <option>صيانة أخرى</option>
              </select>
            </div>
            <div class="form-group">
              <textarea name="message" placeholder="وصف المشكلة والموقع" required></textarea>
            </div>
            <button type="submit" class="submit-btn">أرسل الطلب</button>
          </form>
        </div>
      </div>
    </section>

    ${servicesContent}
  `);
}

// ============================================
// ADMIN DASHBOARD (PREMIUM)
// ============================================

function adminPage() {
  return premiumLayout(`
    <div class="wrap" style="padding: 60px 0;">
      <h1 style="margin-bottom: 10px;">🎛️ لوحة التحكم الذكية</h1>
      <p class="lead" style="margin-bottom: 40px;">إدارة الطلبات والعملاء والعمليات من مكان واحد</p>

      <div class="form-card" style="max-width: 500px; margin-bottom: 40px;">
        <div class="form-group">
          <label>كلمة المرور</label>
          <input id="pass" type="password" placeholder="أدخل كلمة المرور الآمنة">
        </div>
        <button class="submit-btn" onclick="loadData()">فتح اللوحة</button>
      </div>

      <div class="panel" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 40px;">
        <div class="stat">
          <strong id="total">0</strong><br>
          <span style="color: var(--text-secondary);">إجمالي الطلبات</span>
        </div>
        <div class="stat">
          <strong id="newCount" style="color: var(--accent);">0</strong><br>
          <span style="color: var(--text-secondary);">طلبات جديدة</span>
        </div>
        <div class="stat">
          <strong id="doneCount" style="color: var(--primary);">0</strong><br>
          <span style="color: var(--text-secondary);">مكتملة</span>
        </div>
        <div class="stat">
          <strong id="todayCount" style="color: var(--secondary);">0</strong><br>
          <span style="color: var(--text-secondary);">اليوم</span>
        </div>
      </div>

      <div style="margin-bottom: 30px; display: flex; gap: 12px; flex-wrap: wrap;">
        <input id="search" type="text" placeholder="ابحث عن اسم أو هاتف أو خدمة..." style="flex: 1; min-width: 250px;" oninput="renderRows()">
        <select id="filter" onchange="renderRows()" style="min-width: 150px;">
          <option value="all">كل الحالات</option>
          <option value="new">جديدة فقط</option>
          <option value="done">مكتملة فقط</option>
        </select>
      </div>

      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; background: var(--card-bg); border-radius: var(--radius-lg); overflow: hidden;">
          <thead>
            <tr style="background: rgba(34, 197, 94, 0.1);">
              <th style="padding: 16px; text-align: right; border: 1px solid var(--border-color);">الاسم</th>
              <th style="padding: 16px; text-align: right; border: 1px solid var(--border-color);">الهاتف</th>
              <th style="padding: 16px; text-align: right; border: 1px solid var(--border-color);">الخدمة</th>
              <th style="padding: 16px; text-align: right; border: 1px solid var(--border-color);">الملاحظات</th>
              <th style="padding: 16px; text-align: right; border: 1px solid var(--border-color);">الحالة</th>
              <th style="padding: 16px; text-align: right; border: 1px solid var(--border-color);">الإجراءات</th>
            </tr>
          </thead>
          <tbody id="rows"></tbody>
        </table>
      </div>
    </div>

    <script>
      let allData = [];

      async function loadData(){
        const pass = document.getElementById("pass").value;
        if(!pass) { alert("أدخل كلمة المرور"); return; }
        
        const res = await fetch("/api/requests?pass=" + encodeURIComponent(pass));
        const data = await res.json();
        if(data.error){ alert("خطأ: " + data.error); return; }
        allData = data || [];
        renderRows();
      }

      function renderRows(){
        const rows = document.getElementById("rows");
        const q = (document.getElementById("search").value || "").toLowerCase();
        const f = document.getElementById("filter").value;

        let list = allData.filter(x => {
          const text = ((x.name||"") + " " + (x.phone||"") + " " + (x.service||"") + " " + (x.notes||"")).toLowerCase();
          const statusOk = f === "all" || (x.status || "new") === f;
          return text.includes(q) && statusOk;
        });

        const today = new Date().toDateString();
        document.getElementById("total").innerText = allData.length;
        document.getElementById("newCount").innerText = allData.filter(x => (x.status || "new") === "new").length;
        document.getElementById("doneCount").innerText = allData.filter(x => x.status === "done").length;
        document.getElementById("todayCount").innerText = allData.filter(x => x.created_at && new Date(x.created_at).toDateString() === today).length;

        rows.innerHTML = "";
        list.forEach(x => {
          const tr = document.createElement("tr");
          const statusColor = (x.status || "new") === "done" ? "color: var(--primary)" : "color: var(--accent)";
          
          tr.style = "border: 1px solid var(--border-color);";
          tr.innerHTML =
            "<td style='padding: 12px 16px; border: 1px solid var(--border-color);'>" + (x.name || "") + "</td>" +
            "<td style='padding: 12px 16px; border: 1px solid var(--border-color);'><a href='tel:" + (x.phone || "") + "' style='color: var(--secondary);'>" + (x.phone || "") + "</a></td>" +
            "<td style='padding: 12px 16px; border: 1px solid var(--border-color);'>" + (x.service || "") + "</td>" +
            "<td style='padding: 12px 16px; border: 1px solid var(--border-color); max-width: 150px; overflow: hidden; text-overflow: ellipsis;'>" + (x.notes || "") + "</td>" +
            "<td style='padding: 12px 16px; border: 1px solid var(--border-color); " + statusColor + ";'>" + (x.status || "new") + "</td>" +
            "<td style='padding: 12px 16px; border: 1px solid var(--border-color);'>" +
            "<button class='smallbtn blue' onclick=\\"window.open('tel:" + (x.phone || "") + "')\\">📞</button> " +
            "<button class='smallbtn green' onclick=\\"window.open('https://wa.me/" + (x.phone || "") + "', '_blank')\\">💬</button> " +
            "<button class='smallbtn yellow' onclick=\\"setStatus('" + x.id + "','new')\\">جديدة</button> " +
            "<button class='smallbtn green' onclick=\\"setStatus('" + x.id + "','done')\\">مكتملة</button> " +
            "<button class='smallbtn red' onclick=\\"delRow('" + x.id + "')\\">حذف</button>" +
            "</td>";
          rows.appendChild(tr);
        });
      }

      async function setStatus(id,status){
        const pass = document.getElementById("pass").value;
        await fetch("/api/status?pass=" + encodeURIComponent(pass), {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({id,status})
        });
        await loadData();
      }

      async function delRow(id){
        if(!confirm("هل تريد حذف هذا الطلب؟")) return;
        const pass = document.getElementById("pass").value;
        await fetch("/api/delete?pass=" + encodeURIComponent(pass), {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({id})
        });
        await loadData();
      }

      // Add button styles
      const style = document.createElement('style');
      style.textContent = \`
        .smallbtn {
          padding: 6px 10px;
          border-radius: 6px;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          transition: all 0.2s;
          margin: 2px;
        }
        .smallbtn:hover { transform: translateY(-2px); }
        .blue { background: var(--secondary); }
        .green { background: var(--primary); }
        .yellow { background: var(--accent); color: #111; }
        .red { background: #ef4444; }
      \`;
      document.head.appendChild(style);
    </script>
  `, "Relaxfix - لوحة التحكم");
}

// ============================================
// SERVER ROUTES
// ============================================

const server = http.createServer(async (req, res) => {
  try {
    // Admin page
    if (req.method === "GET" && req.url.startsWith("/admin")) {
      res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
      res.end(adminPage());
      return;
    }

    // Get requests API
    if (req.method === "GET" && req.url.startsWith("/api/requests")) {
      const url = new URL(req.url, "http://localhost");
      if (url.searchParams.get("pass") !== ADMIN_PASS) {
        res.writeHead(401, {"Content-Type":"application/json"});
        res.end(JSON.stringify({error:"كلمة المرور غير صحيحة"}));
        return;
      }

      const { data, error } = await supabase
        .from("requests")
        .select("*")
        .order("created_at", { ascending: false });

      res.writeHead(200, {"Content-Type":"application/json"});
      res.end(JSON.stringify(error ? {error: error.message} : data || []));
      return;
    }

    // Update status API
    if (req.method === "POST" && req.url.startsWith("/api/status")) {
      let body = "";
      req.on("data", c => body += c.toString());
      req.on("end", async () => {
        const url = new URL(req.url, "http://localhost");
        if (url.searchParams.get("pass") !== ADMIN_PASS) {
          res.writeHead(401);
          res.end(JSON.stringify({error: "غير مصرح"}));
          return;
        }
        const p = JSON.parse(body || "{}");
        const { error } = await supabase.from("requests").update({status: p.status}).eq("id", p.id);
        res.writeHead(200, {"Content-Type":"application/json"});
        res.end(JSON.stringify({success: !error}));
      });
      return;
    }

    // Delete request API
    if (req.method === "POST" && req.url.startsWith("/api/delete")) {
      let body = "";
      req.on("data", c => body += c.toString());
      req.on("end", async () => {
        const url = new URL(req.url, "http://localhost");
        if (url.searchParams.get("pass") !== ADMIN_PASS) {
          res.writeHead(401);
          res.end(JSON.stringify({error: "غير مصرح"}));
          return;
        }
        const p = JSON.parse(body || "{}");
        const { error } = await supabase.from("requests").delete().eq("id", p.id);
        res.writeHead(200, {"Content-Type":"application/json"});
        res.end(JSON.stringify({success: !error}));
      });
      return;
    }

    // Handle form submission
    if (req.method === "POST") {
      let body = "";
      req.on("data", c => body += c.toString());
      req.on("end", async () => {
        const p = new URLSearchParams(body);
        const order = {
          name: p.get("name") || "",
          phone: p.get("phone") || "",
          service: p.get("service") || "",
          notes: p.get("message") || ""
        };

        const { data, error } = await supabase.from("requests").insert([order]).select();

        if (error) {
          res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
          res.end(premiumLayout(`
            <section style="padding: 120px 0; text-align: center;">
              <div class="wrap">
                <h1 style="color: #ef4444; margin-bottom: 20px;">❌ حدث خطأ</h1>
                <p class="lead" style="margin-bottom: 30px;">${error.message}</p>
                <a href="/" class="btn btn-accent">العودة للرئيسية</a>
              </div>
            </section>
          `));
          return;
        }

        const msg = encodeURIComponent(
          "مرحباً Relaxfix\\n" +
          "الاسم: " + order.name + "\\n" +
          "الهاتف: " + order.phone + "\\n" +
          "الخدمة: " + order.service + "\\n" +
          "التفاصيل: " + order.notes
        );

        const wa = "https://wa.me/" + PHONE + "?text=" + msg;

        res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
        res.end(premiumLayout(`
          <section style="padding: 120px 0; text-align: center;">
            <div class="wrap">
              <h1 style="color: var(--primary); margin-bottom: 20px; font-size: 48px;">✅ تم حفظ طلبك</h1>
              <p class="lead" style="margin-bottom: 30px;">شكراً لاختيارك Relaxfix - سيتم فتح واتس اب الآن</p>
              <a href="${wa}" target="_blank" class="btn btn-primary" style="font-size: 18px; padding: 16px 32px;">📱 فتح واتس اب</a>
              <br><br>
              <a href="/" class="btn btn-accent">العودة للرئيسية</a>
              <script>setTimeout(() => window.open("${wa}", "_blank"), 800)</script>
            </div>
          </section>
        `));
      });
      return;
    }

    // Home page
    res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
    res.end(homePage());
  } catch (err) {
    res.writeHead(500, {"Content-Type":"text/plain;charset=utf-8"});
    res.end("Error: " + err.message);
  }
});

server.listen(process.env.PORT || 3000, () => {
  console.log("🚀 Relaxfix2026 Premium Edition متشغل على المنفذ " + (process.env.PORT || 3000));
  console.log("👉 https://localhost:3000");
  console.log("🎛️ لوحة التحكم: https://localhost:3000/admin");
});
