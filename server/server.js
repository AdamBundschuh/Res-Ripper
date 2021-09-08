var http = require("http"); // Import Node.js core module

const pdfreader = require("pdfreader");

let rows = {};

let fileName = "Resume-Jeffery-Salisbury.pdf";

function printRows() {
  Object.keys(rows)
    .sort((y1, y2) => parseFloat(y1) - parseFloat(y2))
    .forEach((y) => console.log("Row: ", (rows[y] || []).join("")));
}

function testParser() {
  new pdfreader.PdfReader().parseFileItems(fileName, function (err, item) {
    if (!item || item.page) {
      // end of file, or page
      printRows();
      // console.log("Page: " + item.page);
      rows = {}; //clear rows for next page
    } else if (item.text) {
      // accumulate text items into rows object, per line
      (rows[item.y] = rows[item.y] || []).push(item.text);
    }
  });
}

var server = http.createServer(function (req, res) {
  if (req.url == "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    testParser();
    // set response content
    res.write("<html><body><p>This is home Page.</p></body></html>");
    res.end();
  } else if (req.url == "/student") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<html><body><p>This is student Page.</p></body></html>");
    res.end();
  } else if (req.url == "/admin") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<html><body><p>This is admin Page.</p></body></html>");
    res.end();
  } else res.end("Invalid Request!");
});

server.listen(5000); //6 - listen for any incoming requests

console.log("Node.js web server at port http://localhost:5000 is running..");
