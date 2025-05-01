# RecruitmentBuddy

RecruitmentBuddy is a web application that allows prospective students to explore, search, compare, and inquire about university programs and scholarships. It also provides a way to schedule campus visits.

## Features

### Frontend
- Built with React.js
- Search and filter university programs by department, type, and duration
- Search and filter scholarships by eligibility, amount, and type
- Compare selected programs side-by-side
- Schedule a visit through a form interface

### Backend
- Node.js and Express server
- Two data access modes:
  - **Primary**: Uses MySQL database for program, scholarship, and visit data
  - **Fallback**: Reads from CSV files if database is unavailable
    
## Getting Started

### Prerequisites
- Node.js & npm
- MySQL Server
- React.js
- react-router-dom
- react-calendar

### Backend Setup

1. Install dependencies:
   ```bash
   npm install
2. Set up MySQL:
- Create a database (e.g., recruitmentbuddy)
- Create the necessary tables: programs, scholarships, visits
- Import data from the CSVs into the database using the provided files (import-programs.js, import-scholarships.js, import-visits.js)
- Add your own database info (host, user, password, database) to the server file (mysql-server.js)
4. Navigate in your directory to backend folder
5. Start the server
- (if using MySQL database)
  ```bash
  node mysql-server.js
- (if using CSVs files)
  ```bash
  node server.js 
### Frontend Setup

1. Navigate out of the backend folder.
2. Install dependencies
   ```bash
   npm install
4. run
   ```bash
   npm start
