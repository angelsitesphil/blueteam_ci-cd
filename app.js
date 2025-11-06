const http = require("http");
const port = 4000;

http.createServer((req, res) => {
  res.end("Hello from BlueTeam CI/CD!");
}).listen(port, () => {
  console.log("Server running on port " + port);
});
