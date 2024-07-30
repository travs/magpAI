import * as xlsx from "node-xlsx";
import * as fs from "fs";
import { BirdCard } from "./birdCard";

const dataDir = `${__dirname}/../data`;
const workSheetsFromFile = xlsx.parse(`${dataDir}/wingspan-20221201.xlsx`);
const sheet = workSheetsFromFile[0].data;

const [headers, ...dataRows] = sheet;

const birds: BirdCard[] = dataRows
  .map((row: any) => {
    const data: any = {};
    headers.forEach((header: string, index: number) => {
      data[header] = row[index];
    });
    return new BirdCard(data);
  })
  .filter((bird: BirdCard) => bird.set === "core");

fs.writeFileSync(`${dataDir}/birds.json`, JSON.stringify(birds, null, 2));

console.log(`Saved ${birds.length} birds to ${dataDir}/birds.json`);
