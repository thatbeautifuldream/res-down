import dotenv from "dotenv";
import fs from "fs";
import puppeteer, { Browser } from "puppeteer";

dotenv.config();

const outputFilePath = process.env.OUTPUT_FILE_PATH as string;
const url = process.env.GOOGLE_DOCS_PREVIEW_URL as string;

export default async function updatePDF() {
  let browser;
  try {
    console.log(`Launching Puppeteer and navigating to: ${url}`);
    browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle0" });
    const pdf = await page.pdf();
    await browser.close();
    console.log(`Saving PDF to: ${outputFilePath}`);
    fs.writeFileSync(outputFilePath, pdf);
  } catch (error) {
    if (browser) browser.close();
    throw error;
  }
}
