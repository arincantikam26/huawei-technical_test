-- 1. Insert Personal : Albert
INSERT INTO employees (name, position, join_date, release_date, experience_years, salary)
VALUES ('Albert', 'Engineer', '2024-01-24', NULL, 2.5, 50);

-- 2. Update Engineer Salary to 85
UPDATE employees
SET salary = 85
WHERE position = 'Engineer';

-- 3. Total Salary Expenditure in Year 2021
SELECT SUM(salary) AS total_salary_2021
FROM employees
WHERE join_date <= '2021-12-31'
  AND (release_date IS NULL OR release_date >= '2021-01-01');

-- 4. Top 3 Most Experienced Employees
SELECT name, position, experience_years, salary
FROM employees
ORDER BY experience_years DESC
LIMIT 3;

-- 5. Subquery: Engineers with Experience <= 3 Years
SELECT *
FROM employees
WHERE id IN (
    SELECT id
    FROM employees
    WHERE position = 'Engineer'
      AND experience_years <= 3
);
