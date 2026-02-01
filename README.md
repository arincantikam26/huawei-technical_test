# TECHNICAL TEST HUAWEI - SOFTWARE ENGINEER

This project for technical assessment, including : 

- Backend API using **Node.js + Express**
- API Documentation using **Swagger**
- Frontend Form Application using**React JS (Vite)**
- Automation using **Cron Job + Node.js Script**
- Temporary data storage using an **in-memory array**
- Automation output stored as **CSV**
- Automatic data cleansing to delete files older than (**> 30 days**)

---

## PROJECT STRUCTURE

The project consists of three main parts:

- Backend (Express + Swagger)
- Frontend (React + Vite)
- Automation Script (Cron Job + Node.js)

---

## BACKEND SETUP (Node.js + Express + Swagger)

Navigate to the backend folder and start the server:

```bash
cd backend
npm install
node server.js
```

Backend will run at:

- API Server:  
  http://localhost:5000

- Swagger Documentation:  
  http://localhost:5000/api-docs

---

## FRONTEND SETUP (React JS + Vite)

Navigate to the frontend folder and start the development server:

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at:

http://localhost:5173

---

## AUTOMATION SCRIPT (Cron Job + Node.js)

Automation is used to collect employee data automatically, save it into CSV files, and perform data cleansing by deleting files older than 30 days.

---

### Install Cron Service (WSL Ubuntu)

Run the following commands in WSL Ubuntu:

```bash
sudo apt update
sudo apt install cron -y
sudo service cron start
```

---

## CRON SCHEDULING (AUTOMATIC RUNNING)

To run automation scripts automatically at scheduled times (08:00, 12:00, 15:00 WIB), use the cron table.

### 1. Edit cron job schedule

```bash
crontab -e
```

### 2. Copy from file `crontabset.sh`

Paste into crontab editor. Example Schedule:

```cron
0 8  * * * node /home/automation/cron_collect.js
0 12 * * * node /home/automation/cron_collect.js
0 15 * * * node /home/automation/cron_collect.js

0 0  * * * node /home/automation/cron_cleaning.js
```

### 3. Save and Exit

Cron will run the scripts automatically every day according to the schedule.

---

## MANUAL TESTING

### 1. Manual Test Collect Script

Make sure the backend server is running first:

http://localhost:5000

Run the collect script manually:

```bash
node automation/cron_collect.js
```

---

### 2. Manual Test Clean Script (Data Cleansing)

The cleansing script deletes CSV files older than 30 days. To test it manually without waiting 30 days, you can create a dummy old file:

#### a. Create a dummy file in the output folder:

```bash
touch /home/cron/cron_old_test.csv
```

#### b. . Change the timestamp to 40 days ago:

```bash
touch -d "40 days ago" /home/cron/cron_old_test.csv
```

#### c. Run the cleansing script manually:

```bash
node automation/cron_clean.js
```

If successful, the dummy file will be deleted automatically.
