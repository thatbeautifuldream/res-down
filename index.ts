import inquirer from "inquirer";
import updatePDF from "./lib/updatepdf";
import updateS3 from "./lib/updates3";

const answer = await inquirer.prompt([
  {
    type: "list",
    name: "pdfUpdate",
    message: "Do you want you resume updated locally?",
    choices: ["Yes", "No"],
  },
  {
    when: (answers) => answers.pdfUpdate === "Yes",
    type: "list",
    name: "s3Update",
    message: "Do you want to sync it with S3 bucket and get a presigned URL?",
    choices: ["Yes", "No"],
  },
]);

if (answer.pdfUpdate === "Yes") {
  await updatePDF();
  if (answer.s3Update === "Yes") {
    await updateS3();
  }
}
