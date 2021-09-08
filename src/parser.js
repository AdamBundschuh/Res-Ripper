const https = require("https");
const pdfreader = require("pdfreader");

let rows = {};

function printRows() {
  Object.keys(rows)
    .sort((y1, y2) => parseFloat(y1) - parseFloat(y2))
    .forEach((y) => console.log((rows[y] || []).join("")));
}

function testParser() {
  new pdfreader.PdfReader().parseFileItems(
    "Jeff-Salisbury-Resume-2021.pdf",
    function (err, item) {
      if (!item || item.page) {
        // end of file, or page
        printRows();
        console.log("Page: " + item.page);
        rows = {}; //clear rows for next page
      } else if (item.text) {
        // accumulate text items into rows object, per line
        (rows[item.y] = rows[item.y] || []).push(item.text);
      }
    }
  );
}
