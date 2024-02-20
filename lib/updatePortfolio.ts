import { $ } from "bun";
import dotenv from "dotenv";

dotenv.config();

export default async function updatePortfolio() {
  try {
    await $`cp ~/code/self/res-down/resume.pdf ~/code/self/milind.live/public`;
    await $`cd ~/code/self/milind.live && git add . && git commit -m "[UPDATE] resume.pdf" && git push`;
    console.log("Portfolio updated successfully.");
  } catch (error) {
    console.error("Error updating portfolio:", error);
  }
}
