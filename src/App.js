import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { Document, Page, Outline } from "react-pdf/dist/esm/entry.webpack";
import fileImport from "./Jeff-Salisbury-Resume-2021.pdf";
// import fs from "fs";
import { PDFParser } from "pdf2json";
let fs = require("fs");TypeError: fs.readFileSync is not a function

function App() {
  let pdfParser = new PDFParser();

  pdfParser.on("pdfParser_dataError", (errData) =>
    console.error(errData.parserError)
  );
  pdfParser.on("pdfParser_dataReady", (pdfData) => {
    fs.writeFile("./pdf2json/test/F1040EZ.json", JSON.stringify(pdfData));
  });

  pdfParser.loadPDF(fileImport);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const local = "http:localhost:3000/";
  const fileName = "Jeff-Salisbury-Resume-2021.pdf";
  const localFileName = local + fileName;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Document file={fileImport} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={numPages} />
        </Document>
      </header>
    </div>
  );
}

export default App;
