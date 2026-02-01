const fs = require("fs");
const path = require("path");

async function collectData() {
  const API_URL = "http://localhost:5000/api/employees";

  const OUTPUT_DIR = path.join(__dirname, "cron");

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const now = new Date();

  const date =
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0") +
    now.getFullYear();

  const hour =
    String(now.getHours()).padStart(2, "0") +
    "." +
    String(now.getMinutes()).padStart(2, "0");

  const filename = `cron_${date}_${hour}.csv`;
  const filePath = path.join(OUTPUT_DIR, filename);

  console.log("=================================");
  console.log(" Employee Cron Collection Running");
  console.log(" API:", API_URL);
  console.log(" Output:", filePath);
  console.log("=================================");

  // Fetch API
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("API returned status " + response.status);
  }

  const result = await response.json();

  // Convert JSON → CSV
  let csv = "id,name,position,experience,salary\n";

  result.data.forEach((emp) => {
    csv += `${emp.id},${emp.name},${emp.position},${emp.experience},${emp.salary}\n`;
  });

  fs.writeFileSync(filePath, csv);

  console.log("Data collected successfully!");
}

collectData().catch((err) => {
  console.error("Collection failed:", err.message);
});
