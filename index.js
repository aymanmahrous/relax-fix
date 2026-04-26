const http = require("http");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://nmzxrjdxvmmzzmajrskm.supabase.co",
  "sb_publishable_qXOPVaD5_f60qf1UbYrm2A_sH9c0lW5"
);

const WHATSAPP_NUMBER = "971588259848";
const ADMIN_PASS = "123456";

function send(res, html) {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
}

function mainPage() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Relax Fix UAE | صيانة تكييف وتنظيف خزانات ومكافحة حشرات</title>
<meta name="description" content="Relax Fix UAE - AC maintenance, water tank cleaning, pest control and home maintenance services in UAE.">
<style>
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;font-family:Arial,sans-serif;background:#070b12;color:white}
a{text-decoration:none;color:inherit}
.container{width:min(1180px,calc(100% - 28px));margin:auto}
header{position:sticky;top:0;z-index:50;background:rgba(5,8,13,.88);backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,.08)}
.nav{min-height:76px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
.logo{font-size:24px;font-weight:900}
.navBtns{display:flex;gap:8px;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:13px 18px;border-radius:999px;font-weight:900;border:0;cursor:pointer}
.btnMain{background:linear-gradient(135deg,#00ff88,#00c8ff);color:#02140d}
.btnWa{background:#25D366;color:white}
.btnCall{background:#16b8ff;color:white}
.lang{background:#111827;color:white;border:1px solid #334155;padding:10px 12px;border-radius:999px;cursor:pointer;font-weight:900}
.hero{position:relative;overflow:hidden;padding:88px 0;background:
linear-gradient(120deg,rgba(0,0,