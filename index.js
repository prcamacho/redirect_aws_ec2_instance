const fs = require("fs");
const https = require("https");
const express = require("express");
const app = express();
const axios = require("axios"); // Asegúrate de importar axios

// Crea un agente HTTPS personalizado con la opción rejectUnauthorized establecida en false
const agent = new https.Agent({
  rejectUnauthorized: false,
});

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://server1.pablocamacho.com.ar", {
      httpsAgent: agent,
    });

    console.log("server1.pablocamacho.com.ar OK redirigiendo...");

    res.send(`<html>
    <body>
      <h1>Chequeando servidores</h1>
      <script>
        setTimeout(function() {
          window.location.href = "https://server1.pablocamacho.com.ar";
        }, 3000);
      </script>
    </body>
  </html>`);
  } catch (error) {
    console.log("server1.pablocamacho.com.ar NO OK redirigiendo...");
    res.redirect("https://prcamacho.github.io/pablocamacho.com.ar/");
  }
});

const httpsOptions = {
  key: fs.readFileSync(
    "../../../../xampp/apache/conf/ssl/pablocamacho.com.ar/private.key"
  ),
  cert: fs.readFileSync(
    "../../../../xampp/apache/conf/ssl/pablocamacho.com.ar/pablocamacho.com.ar.crt"
  ),
};

const server = https.createServer(httpsOptions, app).listen(443, () => {
  console.log("El servidor está corriendo en el puerto 443");
});
