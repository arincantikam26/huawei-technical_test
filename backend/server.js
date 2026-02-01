const express = require("express");
const cors = require("cors");

const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const employeeRoutes = require("./routes/employeeRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/employees", employeeRoutes);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("Employee API Running 🚀");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger Docs at http://localhost:${PORT}/api-docs`);
});
