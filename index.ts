import inquirer from "inquirer";
import getPresignedPDF from "./lib/getPresignedPDF.ts";
import updatePDF from "./lib/updatePDF.ts";
import updateS3 from "./lib/updateS3.ts";
import updatePortfolio from "./lib/updatePortfolio.ts";

const answer = await inquirer.prompt([
  {
    type: "list",
    name: "updatePDF",
    message: "Do you want you resume updated locally?",
    choices: ["Yes", "No"],
  },
  {
    when: (answers) => answers.updatePDF === "Yes",
    type: "list",
    name: "updatePortfolio",
    message: "Do you want to update the portfolio with the new resume?",
    choices: ["Yes", "No"],
  },
  {
    when: (answers) => answers.updatePDF === "Yes",
    type: "list",
    name: "updateS3",
    message: "Do you want to sync it with S3 bucket and get a presigned URL?",
    choices: ["Yes", "No"],
  },
  {
    when: (answers) => answers.updatePDF === "No",
    type: "list",
    name: "getPresignedPDF",
    message: "Do you want to get a presigned URL for the last updated resume?",
    choices: ["Yes", "No"],
  },
]);

if (answer.updatePDF === "Yes") {
  await updatePDF();
  if (answer.updatePortfolio === "Yes") {
    await updatePortfolio();
  }
  if (answer.updateS3 === "Yes") {
    await updateS3();
  }
}
if (answer.getPresignedPDF === "Yes") {
  await getPresignedPDF();
}
