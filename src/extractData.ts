// extract data from the Wingspan excel sheet

import xlsx from "node-xlsx";

const workSheetsFromFile = xlsx.parse(
  `${__dirname}/../data/wingspan-20221201.xlsx`
);

const birds = workSheetsFromFile.find((sheet) => sheet.name === "Birds")?.[
  "data"
];

if (!birds) {
  console.error("No birds found");
  process.exit(1);
}

console.log(birds[0]);
console.log(birds[1]);
