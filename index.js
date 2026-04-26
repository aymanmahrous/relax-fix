const http = require("http");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://nmzxrjdxvmmzzmajrskm.supabase.co",
  "sb_publishable_qXOPVaD5_f60qf1UbYrm2A_sH9c0lW5"
);

const PHONE = "971588259848";
const DISPLAY_PHONE = "0588259848";
const ADMIN_PASS = "123456";

function layout(content, title = "RELAX FIX PRO 2026") {
  return `<!DOCTYPE html>
<html lang="ar">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<style>
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;font-family:Arial,Tahoma,sans-serif;background:#050914;color:#fff}
a{text-decoration:none;color:inherit}
.wrap{width:min(1180px,92%);margin:auto}
header{position:sticky;top:0;z-index:50;background:#020617ee;border-bottom:1px solid #1e293b}
nav{min-height:74px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}
.logo{font-size:24px;font-weight:900}
.btn{display:inline-block;padding:13px 20px;border-radius:15px;font-weight:900;margin:5px;border:0;cursor:pointer}
.green{background:#22c55e;color:#fff}.blue{background:#0ea5e9;color:#fff}.gold{background:#facc15;color:#111}.red{background:#ef4444;color:#fff}.dark{background:#111827;color:#fff}
.hero{padding:85px 0;background:radial-gradient(circle at top right,#22c55e55,transparent 35%),radial-gradient(circle at top left,#0ea5e955,transparent 35%),#07111f}
.grid{display:grid;grid-template-columns:1.1fr .9fr;gap