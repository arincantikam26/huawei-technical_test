const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "cron");
const DAYS_LIMIT = 30;

function cleanOldFiles() {
  console.log("=================================");
  console.log(" Running Data Cleansing Script");
  console.log("=================================");

  const files = fs.readdirSync(OUTPUT_DIR);

  files.forEach((file) => {
    if (!file.startsWith("cron_") || !file.endsWith(".csv")) return;

    const filePath = path.join(OUTPUT_DIR, file);

    const stats = fs.statSync(filePath);

    const ageInDays =
      (Date.now() - stats.mtime.getTime()) / (1000 * 60 * 60 * 24);

    if (ageInDays > DAYS_LIMIT) {
      fs.unlinkSync(filePath);
      console.log(`Deleted old file: ${file}`);
    }
  });

  console.log("Cleansing completed successfully!");
}

cleanOldFiles();
