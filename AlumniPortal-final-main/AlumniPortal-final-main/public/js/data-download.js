// $("#download-alumni").on("click", function (e) {
//   e.preventDefault();

// const ExcelJS = require("exceljs");
// var workbook = new ExcelJS.Workbook();
// workbook.creator = "Paul Leger";
// workbook.lastModifiedBy = "Paul Leger";
// workbook.created = new Date();
// workbook.modified = new Date();
// workbook.lastPrinted = new Date();
// var worksheet = workbook.addWorksheet("Publications");
// worksheet.views = [{ state: "frozen", xSplit: 0, ySplit: 1 }];
// worksheet.autoFilter = {
//   from: "A1",
//   to: "M1",
// };
// worksheet.columns = [
//   { header: "Index", key: "Index", width: 15 },
//   {
//     header: "Title",
//     key: "title",
//     width: 25,
//     style: { alignment: { wrapText: true } },
//   },
//   {
//     header: "Authors",
//     key: "authors",
//     width: 20,
//     style: { alignment: { wrapText: true } },
//   },
//   {
//     header: "Journal/Conference",
//     key: "jc",
//     width: 25,
//     style: { alignment: { wrapText: true } },
//   },
//   {
//     header: "Type",
//     key: "type",
//     width: 12,
//     style: { alignment: { wrapText: true } },
//   },
//   { header: "Year", key: "year", width: 12, style: { numFmt: "0000" } },
//   { header: "Month", key: "month", width: 12 },
//   { header: "volume", key: "volume", width: 12 },
//   { header: "number", key: "number", width: 12 },
//   { header: "Pages", key: "pages", width: 12 },
//   {
//     header: "Location",
//     key: "location",
//     width: 20,
//     style: { alignment: { wrapText: true } },
//   },
//   {
//     header: "doi",
//     key: "doi",
//     width: 22,
//     style: { alignment: { wrapText: true } },
//   },
//   {
//     header: "affiliation",
//     key: "affiliation",
//     width: 20,
//     style: { alignment: { wrapText: true } },
//   },
// ];
// var firstRow = worksheet.getRow(1);
// firstRow.font = {
//   name: "New Times Roman",
//   family: 4,
//   size: 10,
//   bold: true,
//   color: { argb: "80EF1C1C" },
// };
// firstRow.alignment = { vertical: "middle", horizontal: "center" };
// firstRow.height = 20;
// csv.shift();
// worksheet.addRows(csv);
// var buff = workbook.xlsx.writeBuffer().then(function (data) {
//   var blob = new Blob([data], {
//     type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//   });
//   FileSaver.saveAs(blob, "publications.xlsx");
// });
// });
// const http = require("http");

// const hostname = "127.0.0.1";
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hello, World!\n");
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

// var Excel = require("exceljs");
// var workbook = new Excel.Workbook();
// var worksheet = workbook.addWorksheet("My Sheet");
// worksheet.columns = [
//   { header: "Id", key: "id", width: 10 },
//   { header: "Name", key: "name", width: 32 },
//   { header: "D.O.B.", key: "DOB", width: 10 },
// ];
// worksheet.addRow({ id: 1, name: "John Doe", dob: new Date(1970, 1, 1) });
// worksheet.addRow({ id: 2, name: "Jane Doe", dob: new Date(1965, 1, 7) });
// workbook.xlsx.writeFile("./temp.xlsx").then(function () {
//   // done
//   console.log("file is written");
// });
$("#download-alumni").on("click", function (e) {
  TableToExcel.convert(document.getElementById("alu-tab-down"), {
    name: "alumni-data.xlsx",
    sheet: {
      name: "Sheet 1",
    },
  });
});
