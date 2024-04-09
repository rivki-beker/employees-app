# Employee Management Application

This repository contains both the backend API and the frontend application for an Employee Management System.

## Access the Application Online

The Employee Management Application is hosted online and can be accessed through the following link: [View Application](https://employees-app-kkdt.onrender.com/)

## Backend API (ASP.NET)

The `Backend` directory contains the backend API project developed using ASP.NET. To run the API locally, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/rivki-beker/employees-app.git
   ```

2. **Navigate to the API Directory:**

   ```bash
   cd Backend
   ```

3. **Update the database connection string:**

   - Open the `appsettings.json` file.
   - Locate the `"MyDatabaseConnection"` key under `"ConnectionStrings"`.
   - Update the `"Server"`, `"Database"`, `"Username"`, and `"Password"` fields with your MySQL server details.
   - Save the `appsettings.json` file.

4. **Run the API:**
   - Open the solution in Visual Studio.
   - Open Package Manager Console and run the command `update-database`.
   - Build and run the project (F5).

## Frontend Application (React + Vite)

The `Frontend` directory contains the frontend project developed using React with Vite. To run the frontend application locally, follow these steps:

1. **Navigate to the Frontend Directory:**

   ```bash
   cd Frontend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Run the Development Server:**

   ```bash
   npm run dev
   ```

4. **Access the Application:**
   - Open a web browser and navigate to [http://localhost:5173](http://localhost:5173).

## Technologies Used

### Backend (ASP.NET)

- C#
- ASP.NET Core
- Entity Framework Core

### Frontend (React + Vite)

- React
- React Router
- Material-UI
- MobX
- Axios
- React Hook Form

## Features

- **Authentication:**

  - Login functionality to access the application.

- **Employee Management:**

  - View, add, update, and delete employee records.

- **Role Management:**
  - View and add role names.

## Directory Structure

- `Backend/`: Contains the backend API project.
- `Frontend/`: Contains the frontend application project.

## Usage

### Setup

1. **Clone the repository to your local machine.**

### Run Backend API

1. **Navigate to `Backend/` directory.**
2. **Locate the `"MyDatabaseConnection"` in the `appsettings.json` file and update the fields with your MySQL server details.**
3. **Open Package Manager Console and run the command `update-database`.**
4. **Run the ASP.NET project.**

### Run Frontend Application

1. **Navigate to `Frontend/` directory.**
2. **Install dependencies using `npm install`.**
3. **Run the development server using `npm run dev`.**

### Access the Application

- Open a web browser and navigate to [http://localhost:5173](http://localhost:5173).

Feel free to explore and utilize this Employee Management Application for managing employee data and roles efficiently!
