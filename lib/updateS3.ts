import fs from "fs";
import { $ } from "bun";
import dotenv from "dotenv";

dotenv.config();

const outputFilePath = process.env.OUTPUT_FILE_PATH as string;
const s3BucketName = process.env.AWS_S3_BUCKET_NAME as string;

export default async function updateS3() {
  console.log(`Uploading PDF to S3`);
  await $`aws s3 rm s3://${s3BucketName}/${outputFilePath}`;
  await $`aws s3 cp ./${outputFilePath} s3://${s3BucketName}/${outputFilePath}`;
  const presignedUrl =
    await $`aws s3 presign s3://${s3BucketName}/${outputFilePath}`.text();
  console.log(`PDF uploaded to S3, here is the presigned URL: ${presignedUrl}`);
  fs.writeFileSync("./presignedURL.txt", presignedUrl);
  console.log(`Presigned URL saved to: ./presignedURL.txt`);
}
