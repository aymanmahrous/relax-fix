<!DOCTYPE html>
<html lang="ar">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Relax Fix | صيانة تكييف في الإمارات</title>

<style>
body {
  margin:0;
  font-family:Arial;
  background:#0a0f1c;
  color:#fff;
}
header {
  padding:20px;
  text-align:center;
  background:#111827;
}
h1 {color:#00e5ff;}
.container {
  padding:20px;
}
.box {
  background:#111827;
  padding:15px;
  margin:10px 0;
  border-radius:10px;
}
.btn {
  display:block;
  text-align:center;
  padding:12px;
  margin-top:10px;
  background:#00e5ff;
  color:#000;
  border-radius:8px;
  text-decoration:none;
  font-weight:bold;
}
input, textarea {
  width:100%;
  padding:10px;
  margin-top:10px;
  border-radius:8px;
  border:none;
}
.fixed {
  position:fixed;
  bottom:15px;
  right:15px;
}
.whatsapp {
  background:#25D366;
  padding:15px;
  border-radius:50%;
}
</style>

</head>

<body>

<header>
<h1>RELAX FIX ❄️🔥</h1>
<p>AC Repair & Maintenance in UAE</p>
</header>

<div class="container">

<div class="box">
<h2>🔥 خدماتنا</h2>
<p>✔️ صيانة تكييف</p>
<p>✔️ تنظيف التكييف</p>
<p>✔️ تعبئة فريون</p>
<p>✔️ مكافحة حشرات</p>
<p>✔️ تنظيف خزانات</p>
</div>

<div class="box">
<h2>💰 عرض خاص</h2>
<p>تنظيف التكييف يبدأ من 99 درهم فقط</p>
</div>

<div class="box">
<h2>📍 نخدم جميع الإمارات</h2>
<p>أبوظبي - دبي - الشارقة - عجمان</p>
</div>

<div class="box">
<h2>📩 احجز الآن</h2>

<input id="name" placeholder="اسمك">
<input id="phone" placeholder="رقم الهاتف">
<textarea id="msg" placeholder="اكتب طلبك"></textarea>

<a class="btn" onclick="sendWhats()">📲 إرسال عبر واتساب</a>

</div>

</div>

<a class="fixed whatsapp" href="https://wa.me/971XXXXXXXXX">💬</a>

<script>
function sendWhats(){
let name = document.getElementById("name").value;
let phone = document.getElementById("phone").value;
let msg = document.getElementById("msg").value;

let text = `طلب جديد%0Aالاسم: ${name}%0Aالهاتف: ${phone}%0Aالتفاصيل: ${msg}`;
window.open(`https://wa.me/971XXXXXXXXX?text=${text}`);
}
</script>

</body>
</html>