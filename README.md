# Cloud Tailor
Cloud Tailor is a full-stack web application that connects customers with a tailoring service. Customers can browse available designs, submit tailoring requests, provide measurements and cloth details, track order progress, and receive completed garments.

This project is being developed as part of a technical mentorship program

## To Run the Backend:
```bash
cd backend
```
- Install the dependencies:
```bash
npm install
```
- Create a PostgreSQL database named `cloud_tailor`.

- Copy `.env.example` and create `.env` 

- Update `.env` with your PostgreSQL credentials (user and password)

- Run the database schema:
``` bash
psql -h localhost -U postgres -d cloud_tailor -f database/schema.sql
```

- Run this to seed with mock data for users:
```bash
node database/seed.js
```
then for other tables:
```bash
psql -h localhost -U postgres -d cloud_tailor -f database/seed.sql
```
- Start the backend server:
```bash
npm run devState
```

- The backend will start at `http://localhost:3000`

## To Run the Frontend:
```bash
cd frontend
npm install
npm run dev
```
The page will open at `http://localhost:5173/login`