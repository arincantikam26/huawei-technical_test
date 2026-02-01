# EMPLOYEE FORM APPLICATION + AUTOMATION CRON JOB

Project ini dibuat untuk memenuhi tugas technical assessment yang mencakup:

- Backend API menggunakan **Node.js + Express**
- Dokumentasi API menggunakan **Swagger**
- Frontend Form menggunakan **React JS (Vite)**
- Automation menggunakan **Cron Job + Node.js Script**
- Data disimpan sementara menggunakan **in-memory array**
- Data automation disimpan dalam bentuk file **CSV**
- Data cleansing otomatis untuk menghapus file lama (**> 30 hari**)

---

## PROJECT STRUCTURE

Project terdiri dari 3 bagian utama:

- Backend (Express + Swagger)
- Frontend (React + Vite)
- Automation Script (Cron Job + Node.js)

---

## BACKEND SETUP (Node.js + Express + Swagger)

Masuk ke folder backend dan jalankan server:

```bash
cd backend
npm install
node server.js
```

Backend akan berjalan di:

- API Server:  
  http://localhost:5000

- Swagger Documentation:  
  http://localhost:5000/api-docs

---

## FRONTEND SETUP (React JS + Vite)

Masuk ke folder frontend dan jalankan development server:

```bash
cd frontend
npm install
npm run dev
```

Frontend akan berjalan di:

http://localhost:5173

---

## AUTOMATION SCRIPT (Cron Job + Node.js)

Automation digunakan untuk:

- Collect data employee dari backend secara otomatis
- Menyimpan data ke file CSV dengan format tertentu
- Menghapus file lama lebih dari 30 hari (data cleansing)

---

### Install Cron Service (WSL Ubuntu)

Jalankan perintah berikut di WSL Ubuntu:

```bash
sudo apt update
sudo apt install cron -y
sudo service cron start
```

---

## CRON SCHEDULING (AUTOMATIC RUNNING)

Untuk menjalankan automation secara otomatis sesuai jadwal:

- 08:00 WIB  
- 12:00 WIB  
- 15:00 WIB  

Gunakan cron table dengan langkah berikut:

### 1. Edit cron job schedule

```bash
crontab -e
```

### 2. Copy isi jadwal dari file `crontabset.sh`

Paste ke dalam editor crontab. Contoh jadwal:

```cron
0 8  * * * node /home/automation/cron_collect.js
0 12 * * * node /home/automation/cron_collect.js
0 15 * * * node /home/automation/cron_collect.js

0 0  * * * node /home/automation/cron_cleaning.js
```

### 3. Simpan dan keluar

Cron akan menjalankan script secara otomatis setiap hari sesuai jadwal tersebut.

---

## MANUAL TESTING

### 1. Manual Test Collect Script

Pastikan backend sudah running terlebih dahulu:

http://localhost:5000

Jalankan script collect secara manual:

```bash
node automation/cron_collect.js
```

---

### 2. Manual Test Clean Script (Data Cleansing)

Script cleansing akan menghapus file CSV yang berumur lebih dari **30 hari**.

Karena file yang baru dibuat belum cukup lama, untuk testing manual tanpa menunggu 30 hari, kamu dapat membuat file dummy lama dengan langkah berikut:

#### a. Buat file dummy di folder output

```bash
touch /home/cron/cron_old_test.csv
```

#### b. Ubah timestamp file menjadi 40 hari yang lalu

```bash
touch -d "40 days ago" /home/cron/cron_old_test.csv
```

#### c. Jalankan script cleansing manual

```bash
node automation/cron_clean.js
```

Jika berhasil, file dummy tersebut akan otomatis terhapus.
