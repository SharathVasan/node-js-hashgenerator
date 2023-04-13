const http = require("http");
const crypto = require("crypto");

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/hash") {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      try {
        const inputString = JSON.parse(data).string;
        const hash = crypto
          .createHash("sha512")
          .update(inputString)
          .digest("hex");
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ hash: hash }));
      } catch (error) {
        res.statusCode = 400;
        res.end(`Error: ${error.message}`);
      }
    });
  } else {
    res.statusCode = 404;
    res.end("Not found");
  }
});

server.listen(8000, () => {
  console.log("Server listening on port 8000");
});
