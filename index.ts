import fs from "fs";
import puppeteer from "puppeteer";

type PrintPDF = { url: string };

async function printPDF({ url }: PrintPDF) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });
  const pdf = await page.pdf({ format: "A4" });

  await browser.close();
  return pdf;
}

fs.writeFileSync(
  "milind-mishra.pdf",
  await printPDF({
    url: "https://docs.google.com/document/d/1ujYf9MIOEeH3UpaHKZmXm_9-W6XpSQ5LAcLUv0ue32k/preview",
  })
);
