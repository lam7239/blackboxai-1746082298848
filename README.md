
Built by https://www.blackbox.ai

---

```markdown
# Dental Laboratory Management

## Project Overview
Dental Laboratory Management is a desktop application designed to manage orders for dental laboratories. The application provides a user-friendly interface for managing user roles, handling orders, and enhancing operational efficiency within the dental industry.

## Installation
To set up the project locally, please follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd dental-labo-management
   ```

2. **Install the dependencies:**
   Make sure you have [Node.js](https://nodejs.org/) installed. Then run:
   ```bash
   npm install
   ```

3. **Start the application:**
   You can start the application using:
   ```bash
   npm start
   ```

## Usage
After starting the application, the login screen will appear. You can log in using one of the following hardcoded credentials:

- **Manager:** 
  - Username: `admin`
  - Password: `admin123`
  
- **Coordinator:**
  - Username: `dieuphoi`
  - Password: `dp123`
  
- **Production Staff:**
  - Username: `nhanvien`
  - Password: `nv123`

Once logged in, you'll be able to manage orders, view order details, and create new orders depending on your role.

## Features
- **User authentication**: Secure login with role-based access.
- **Order management**: Create, view, and delete orders based on user roles.
- **Responsive design**: Utilizes Tailwind CSS for a modern and responsive UI.
- **Dynamic order list**: Orders are dynamically loaded and can be interacted with based on user permissions.

## Dependencies
The project includes the following main dependency:
- **Electron**: A framework for building cross-platform desktop applications with JavaScript, HTML, and CSS. 
  - **Electron version**: `^25.3.1`

## Project Structure
The project directory consists of the following key files:
- `package.json`: Contains metadata about the project, including dependencies and scripts necessary for running the application.
- `main.js`: The main entry point for the Electron application. This file creates the application window and handles application lifecycle events.
- `renderer.js`: The JavaScript responsible for the interaction on the front end, handling user inputs, displaying orders, and managing the login process.
- `index.html`: The main HTML file that serves as the user interface, including the login and order management sections.

### Project Files Breakdown
```
dental-labo-management/
├── package.json         # Dependencies and scripts
├── package-lock.json    # Exact versions of installed dependencies
├── main.js              # Main entry for Electron application
├── renderer.js          # Handles user interactions
└── index.html           # User interface layout
```

For any other queries or issues, please feel free to contribute to the project or open an issue on the repository.
```