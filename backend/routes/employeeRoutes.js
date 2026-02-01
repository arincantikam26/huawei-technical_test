const express = require("express");
const router = express.Router();

const employees = require("../data/employeeStore");

/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Get all employees
 *     responses:
 *       200:
 *         description: Employee list retrieved successfully
 */
router.get("/", (req, res) => {
  res.json({
    message: "Employee list retrieved successfully",
    total: employees.length,
    data: employees,
  });
});

/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Add new employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               position:
 *                 type: string
 *               joinDate:
 *                 type: string
 *               releaseDate:
 *                 type: string
 *               experience:
 *                 type: integer
 *               salary:
 *                 type: number
 *     responses:
 *       201:
 *         description: Employee saved successfully
 */
router.post("/", (req, res) => {
  let { name, position, joinDate, releaseDate, experience, salary } = req.body;

  if (!name || !position) {
    return res.status(400).json({
      error: "Name and Position are required",
    });
  }

  experience = Number(experience);
  salary = Number(salary);

  if (isNaN(experience) || experience < 0) {
    return res.status(400).json({
      error: "Experience must be a valid positive number",
    });
  }

  if (isNaN(salary) || salary < 0) {
    return res.status(400).json({
      error: "Salary must be a valid positive number",
    });
  }

  const parsedJoinDate = joinDate ? new Date(joinDate) : null;
  const parsedReleaseDate = releaseDate ? new Date(releaseDate) : null;

  if (joinDate && isNaN(parsedJoinDate.getTime())) {
    return res.status(400).json({
      error: "Join Date must be a valid date format (YYYY-MM-DD)",
    });
  }

  if (releaseDate && isNaN(parsedReleaseDate.getTime())) {
    return res.status(400).json({
      error: "Release Date must be a valid date format (YYYY-MM-DD)",
    });
  }

  if (parsedJoinDate && parsedReleaseDate && parsedReleaseDate < parsedJoinDate) {
    return res.status(400).json({
      error: "Release Date cannot be earlier than Join Date",
    });
  }

  const newEmployee = {
    id: employees.length + 1,
    name,
    position,
    joinDate: parsedJoinDate,
    releaseDate: parsedReleaseDate,
    experience,
    salary,
    createdAt: new Date(),
  };

  employees.push(newEmployee);

  res.status(201).json({
    message: "Employee saved successfully",
    data: newEmployee,
  });
});

module.exports = router;
