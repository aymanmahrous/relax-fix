const http = require("http");

const PORT = process.env.PORT || 10000;

const html = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Relax Fix SaaS</title>

<style>
body{
  margin:0;
  font-family:system-ui;
  background:#0b0f2a;
  color:white;
  text-align:center;
}

/* Container */
.container{
  max-width:900px;
  margin:auto;
  padding:20px;
}

/* Cards */
.card{
  background:#11183a;
  padding:20px;
  margin:20px 0;
  border-radius:20px;
  box-shadow:0 10px 30px rgba(0,0,0,.4);
}

/* Buttons */
button{
  padding:12px 18px;
  margin:10px;
  border:none;
  border-radius:12px;
  cursor:pointer;
  font-size:16px;
}

.btn1{background:#ff9800;color:black}
.btn2{background:#00c2ff}
.btn3{background:#00d084}

/* Inputs */
input{
  padding:12px;
  margin:8px;
  border-radius:10px;
  border:none;
  width:80%;
  max-width:300px;
}

/* Fix text breaking */
p, h1, h2 {
  word-wrap: break-word;
  line-height:1.6;
}
</style>

</head>

<body>

<div class="container">

<h1>🚀 Relax Fix SaaS</h1>

<div class="card">
<h2>🔐 تسجيل / دخول</h2>
<input placeholder="Email">
<input placeholder="Password"><br>
<button class="btn1" onclick="alert('قريبًا')">Register</button>
<button class="btn2" onclick="alert('قريبًا')">Login</button>
</div>

<div class="card">
<h2>🎨 AI Ads</h2>
<input id="ad" placeholder="اكتب إعلانك">
<button class="btn1" onclick="genAd()">Generate</button>
<p id="adResult"></p>
</div>

<div class="card">
<h2>🎬 Video Generator</h2>
<input id="vid" placeholder="فكرة الفيديو">
<button class="btn2" onclick="genVid()">Generate</button>
<p id="vidResult"></p>
</div>

<div class="card">
<h2>📩 طلب خدمة</h2>
<input placeholder="اسمك">
<input placeholder="رقمك">
<input placeholder="نوع الخدمة"><br>
<button class="btn3" onclick="alert('تم الإرسال')">Send</button>
</div>

</div>

<script>
function genAd(){
  const text=document.getElementById("ad").value;
  document.getElementById("adResult").innerText=
  "🔥 إعلان احترافي:\\n"+text+"\\n📞 احجز الآن";
}

function genVid(){
  const text=document.getElementById("vid").value;
  document.getElementById("vidResult").innerText=
  "🎬 فيديو:\\n"+text+"\\n🚀 Relax Fix";
}
</script>

</body>
</html>
`;

const server = http.createServer((req,res)=>{
  res.writeHead(200,{"Content-Type":"text/html"});
  res.end(html);
});

server.listen(PORT,"0.0.0.0",()=>{
  console.log("Running on "+PORT);
});
