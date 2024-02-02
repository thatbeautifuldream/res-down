import { $ } from "bun";
import fs from "fs";
import dotenv from "dotenv";
import puppeteer from "puppeteer";

dotenv.config();

type PrintPDF = { url: string };

async function printPDF({ url }: PrintPDF) {
  console.log(`Launching Puppeteer and navigating to: ${url}`);
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  console.log(`Opening page and waiting for network idle`);
  await page.goto(url, { waitUntil: "networkidle0" });
  console.log(`Generating PDF with A4 format`);
  const pdf = await page.pdf({ format: "A4" });
  console.log(`PDF generation completed`);
  await browser.close();
  return pdf;
}

const outputFilePath = process.env.OUTPUT_FILE_PATH as string;

// just to be extra sure lets first delete the file if it exists already
if (fs.existsSync(outputFilePath)) {
  fs.unlinkSync(outputFilePath); // delete file
}

const pdf = await printPDF({
  url: process.env.GOOGLE_DOCS_PREVIEW_URL as string,
});

fs.writeFileSync(outputFilePath, pdf);

console.log(`PDF saved to: ${__dirname}/${outputFilePath}`);

const s3BucketName = process.env.AWS_S3_BUCKET_NAME as string;

// aws s3 operations
(async () => {
  console.log(`Uploading PDF to S3`);
  await $`aws s3 rm s3://${s3BucketName}/${outputFilePath}`;
  await $`aws s3 cp ./${outputFilePath} s3://${s3BucketName}/${outputFilePath}`;
  await $`aws s3 presign s3://${s3BucketName}/${outputFilePath}`;
  console.log(`PDF uploaded to S3`);
})();
