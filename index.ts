import fs from "fs";
import puppeteer from "puppeteer";

type PrintPDF = { url: string };

async function printPDF({ url }: PrintPDF) {
  console.log(`Launching Puppeteer and navigating to: ${url}`);
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  console.log(`Opening page and waiting for network idle`);
  await page.goto(url, { waitUntil: "networkidle0" });

  console.log(`Generating PDF with A4 format`);
  const pdf = await page.pdf({ format: "A4" });

  console.log(`Closing Puppeteer browser`);
  await browser.close();

  console.log(`PDF generation completed`);
  return pdf;
}

const outputFilePath = "milind-mishra.pdf";

fs.writeFileSync(
  outputFilePath,
  await printPDF({
    url: "https://docs.google.com/document/d/1ujYf9MIOEeH3UpaHKZmXm_9-W6XpSQ5LAcLUv0ue32k/preview",
  })
);

console.log(`PDF saved to: ${__dirname}/${outputFilePath}`);
