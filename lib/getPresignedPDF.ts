import { $ } from "bun";
import dotenv from "dotenv";

dotenv.config();

const outputFilePath = process.env.OUTPUT_FILE_PATH as string;
const s3BucketName = process.env.AWS_S3_BUCKET_NAME as string;

export default async function getPresignedPDF() {
  console.log(`Accessing S3 bucket`);
  await $`aws s3 presign s3://${s3BucketName}/${outputFilePath}`;
  console.log(`Copy the URL and share it with the recruiter.`);
}
