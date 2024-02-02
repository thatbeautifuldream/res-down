import dotenv from "dotenv";
import fs from "fs";
import puppeteer from "puppeteer";

dotenv.config();

const outputFilePath = process.env.OUTPUT_FILE_PATH as string;
const url = process.env.GOOGLE_DOCS_PREVIEW_URL as string;

export default async function updatePDF() {
  console.log(`Launching Puppeteer and navigating to: ${url}`);
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  console.log(`Opening page and waiting for network idle`);
  await page.goto(url, { waitUntil: "networkidle0" });
  console.log(`Generating PDF with A4 format`);
  const pdf = await page.pdf({ format: "A4" });
  console.log(`PDF generation completed`);
  await browser.close();

  if (fs.existsSync(outputFilePath)) {
    fs.unlinkSync(outputFilePath);
  }
  fs.writeFileSync(outputFilePath, pdf);
  console.log(`PDF saved to: ${__dirname}/${outputFilePath}`);
}
