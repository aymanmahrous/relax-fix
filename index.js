// ===== Dashboard Page =====
if (req.method === "GET" && req.url === "/admin") {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

  res.end(`
  <html>
  <head>
    <title>Dashboard - Relax Fix</title>
    <meta charset="UTF-8">
    <style>
      body { font-family: Arial; background:#0b1324; color:white; padding:20px }
      h1 { color:#00ff88 }
      table { width:100%; border-collapse:collapse; margin-top:20px }
      th,td { padding:10px; border:1px solid #333 }
      th { background:#111 }
      tr:nth-child(even){background:#0f172a}
      .btn { padding:5px 10px; border-radius:5px; text-decoration:none }
      .call { background:#1fc6ff; color:white }
      .wa { background:#25D366; color:white }
    </style>
  </head>
  <body>

    <h1>📊 Relax Fix Dashboard</h1>
    <p>All Requests</p>

    <table id="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Service</th>
          <th>Message</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>

    <script>
      fetch("/api/requests")
        .then(res => res.json())
        .then(data => {
          const tbody = document.querySelector("tbody");

          data.forEach(item => {
            const wa = "https://wa.me/" + item.phone;

            tbody.innerHTML += \`
              <tr>
                <td>\${item.name}</td>
                <td>\${item.phone}</td>
                <td>\${item.service}</td>
                <td>\${item.notes || ""}</td>
                <td>
                  <a class="btn call" href="tel:\${item.phone}">Call</a>
                  <a class="btn wa" target="_blank" href="\${wa}">WhatsApp</a>
                </td>
              </tr>
            \`;
          });
        });
    </script>

  </body>
  </html>
  `);

  return;
}
