const http = require("http");

const routes = require("./routes1");
const server = http.createServer((req, res) => {
  const { url, method } = req;
  console.log(req);
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Homework 1</title></head>");
    res.write("<body><h1>Greeting from server</h1>");
    res.write(
      "<form action='/create-user' method='POST'><input type='text' name='username'/><input type='submit' value='Create user name'/></form>"
    );

    res.write("</body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/user") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Homework 1</title></head>");
    res.write("<body><h1>List users routes</h1>");
    res.write("<ul><li>User 1</li><li>User 2</li><li>User 3</li></ul>");

    res.write("</body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parseData = Buffer.concat(body).toString();
      console.log(parseData); // username=dataFromClient
      const message = parseData.split("=")[1];
      console.log(message);

      res.statusCode = 302;
      res.setHeader("Location", "/");
      res.end();
    });
  }
});

server.listen(3000);
