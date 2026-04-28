<!-- ===== RADAR + LOGIC ===== -->

<button onclick="openRadar()" style="
position:fixed;
left:20px;
bottom:20px;
z-index:9999;
background:linear-gradient(135deg,#22c55e,#0ea5e9);
color:white;
padding:14px 18px;
border-radius:50px;
border:none;
font-weight:bold;">
📡 Radar
</button>

<div id="radar" style="
display:none;
position:fixed;
inset:0;
background:#020617;
z-index:10000;
color:white;
padding:20px;
overflow:auto">

<button onclick="closeRadar()" style="
background:red;
padding:10px;
border:none;
border-radius:10px;">✖</button>

<h1>📡 العملاء</h1>

<input id="search" placeholder="بحث..." 
style="width:100%;padding:12px;border-radius:10px;border:none;margin:10px 0">

<div id="list"></div>

</div>

<script>

// ===== STATE =====
let DATA = [];

// ===== OPEN =====
function openRadar(){
 document.getElementById("radar").style.display="block";
 load();
}
function closeRadar(){
 document.getElementById("radar").style.display="none";
}

// ===== LOAD =====
async function load(){
 try{
   const r = await fetch("/admin");
   const html = await r.text();

   // استخراج البيانات من الصفحة (بسيط)
   DATA = html.split("<div>").slice(1).map(x=>{
     return {text:x.replace("</div>","")};
   });

   render();

 }catch(e){
   list.innerHTML="خطأ";
 }
}

// ===== RENDER =====
function render(){
 const q = search.value || "";

 list.innerHTML = DATA.filter(x=>x.text.includes(q)).map((x,i)=>`
  <div style="
  background:#111827;
  padding:15px;
  margin:10px 0;
  border-radius:15px">

  <p>${x.text}</p>

  <a target="_blank" href="https://wa.me/971XXXXXXXXX"
  style="background:#22c55e;padding:8px 10px;border-radius:8px;color:white;text-decoration:none">
  WhatsApp
  </a>

  </div>
 `).join("");
}

// ===== SEARCH =====
search.oninput = render;

// ===== CALC BUTTON =====
document.querySelectorAll("button").forEach(b=>{
 if(b.innerText.includes("احسب")){
   b.onclick = async ()=>{
     const s = document.querySelector("#service")?.value || "";
     const a = document.querySelector("#area")?.value || "";

     const r = await fetch("/calc",{
       method:"POST",
       headers:{"Content-Type":"application/json"},
       body:JSON.stringify({service:s,area:a})
     });

     const d = await r.json();
     alert("السعر: "+d.price);
   };
 }
});

// ===== AI BUTTON =====
document.querySelectorAll("button").forEach(b=>{
 if(b.innerText.includes("AI") || b.innerText.includes("اسأل")){
   b.onclick = async ()=>{
     const q = document.querySelector("#question")?.value || "";

     const r = await fetch("/ai",{
       method:"POST",
       headers:{"Content-Type":"application/json"},
       body:JSON.stringify({q})
     });

     const d = await r.json();
     alert(d.reply);
   };
 }
});

// ===== REQUEST BUTTON =====
document.querySelectorAll("button").forEach(b=>{
 if(b.innerText.includes("ارسال")){
   b.onclick = async ()=>{
     const name = document.querySelector("#name")?.value || "";
     const phone = document.querySelector("#phone")?.value || "";
     const service = document.querySelector("#service")?.value || "";

     await fetch("/request",{
       method:"POST",
       headers:{"Content-Type":"application/json"},
       body:JSON.stringify({name,phone,service})
     });

     const msg = "عميل: "+name+" "+phone+" "+service;
     window.open("https://wa.me/971XXXXXXXXX?text="+encodeURIComponent(msg));

     alert("تم");
   };
 }
});

</script>