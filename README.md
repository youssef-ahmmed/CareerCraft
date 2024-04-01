# CareerCraft
Welcome to the CareerCraft API! This project aims to provide a comprehensive backend solution for a job board where companies can post tech job openings, and users can search and apply for positions.

## Features
### User Features

- **User Profiles:** Users can create profiles filled with relevant information such as their names, bio, skills, etc.
- **User Authentication:** Users can log in securely to access their profiles and job application features.
- **Job Application Tracking:** Users can track the jobs they've applied for through their profiles.
- **Job Search:** Users can search for job openings based on skill names.
- **Job Recommendations:** Relevant job recommendations are provided to users based on their skills.
- **Feedback System:** Users can rate and review companies they've applied to or worked for.

### Company Features
- **Company Profiles:** Companies can create profiles with information about their organization.
- **Company Authentication:** Companies can log in securely to post job applications and track their postings.
- **Job Posting:** Companies can post job applications through their authenticated profiles.
- **Job Posting Tracking:** Companies can track the jobs they've posted through their profiles.
- **Application Tracking:** Companies can view the number of applications they've received for a job posting.

### Password Management
- **Password Creation:** Users and companies can create secure passwords during account creation.
- **Password Change:** Users and companies have the option to change their passwords securely through their profiles.
- **Password Reset:** Users and companies can reset their passwords in case they forget them.

## Technologies Used
- Node.ts
- Express.ts
- Prisma ORM using MySQL

## API Endpoints
Detailed documentation for API endpoints and their functionalities, including authentication endpoints, password management, job posting, and tracking, is available through Swagger UI. To access the API documentation, follow the steps mentioned in the [installation section](#installation).

## Getting Started
### Prerequisites
- Node.js and npm installed on your machine.
- MySQL server installed and running.

### Installation
1. **Clone the Repository**
```bash
git clone https://github.com/youssef-ahmmed/CareerCraft.git
```
2. **Navigate to Project Directory**
```bash
cd CareerCraft
```
3. **Install Dependencies**
```bash
npm install
```
4. **Create Database**
```bash
cat dev_setup_mysql.sql | mysql -u root -p
```
5. **Run Prisma migrations to create database schema**
```bash
npx prisma migrate dev
```
6. **Start the Server**
```bash
npm run dev
```
7. **Access API Documentation**
    - Once the server is running, you can access the Swagger UI documentation by navigating to the specified endpoint in your browser `http://localhost:5000/docs`.

## Usage
### Authentication

Before using the API endpoints, users and companies must authenticate themselves using Bearer JWT tokens.

#### User Authentication
To authenticate as a user, send a POST request to the `/api/v1/users/login` endpoint with the user's credentials (email and password). Upon successful authentication, the server will respond with a JWT token in the response body.

#### Company Authentication
Similarly, companies can authenticate themselves by sending a POST request to the `/api/v1/companies/login` endpoint with their credentials (email and password). Upon successful authentication, the server will respond with a JWT token in the response body.

### Authorization

Once authenticated, users and companies can access authorized endpoints by including the JWT token in the `Authorization` header of their requests using the Bearer scheme. For example: 
```bash 
Authorization: Bearer <JWT_TOKEN>
```

### Job Posting and Tracking

Companies can post job applications and track their job postings using the appropriate endpoints provided in the API documentation.

### Password Management

Users and companies can change their passwords or reset them if forgotten using the respective endpoints provided in the API documentation.
