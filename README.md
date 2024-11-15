
# Attendance Management System - Admin and User Panel

This project is a web-based **Attendance Management System** designed to manage and monitor user attendance effectively. It includes both **User Panel** and **Admin Panel** functionalities, developed with **HTML**, **CSS**, and **JavaScript**.

## Features

### **User Panel**
- **Mark Attendance**: Users can mark their daily attendance. Once marked, it cannot be changed or deleted for the day.
- **View Attendance**: Users can view their complete attendance log.
- **Request Leave**: Users can send leave requests to the admin.
- **Profile Picture Update**: Option to update the profile picture (if integrated).

### **Admin Panel**
- **Manage Attendance**: 
  - Add attendance for any user.
  - Edit attendance records.
  - Delete attendance records.
- **Reports**:
  - Generate attendance reports for specific users between two dates.
  - Generate a system-wide attendance report between two dates.
- **Leave Approval**: View and approve leave requests from users.
- **Grading System**:
  - Assign grades based on attendance records.
  - Predefined grading criteria:
    - `A`: 26 days or more
    - `B`: 20–25 days
    - `C`: 15–19 days
    - `D`: 10–14 days
    - `F`: Less than 10 days

## Technologies Used
- **Frontend**: HTML, CSS
- **Logic & Functionality**: JavaScript
- **Storage**: LocalStorage (for demonstration purposes)

## Setup and Usage

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/attendance-management-system.git
cd attendance-management-system
```

### 2. Open in Browser
- Open `index.html` in any modern browser to test the functionality.

### 3. User Flow
#### User Panel:
1. Navigate to the **User Dashboard**.
2. Use buttons to mark attendance, view attendance, or request a leave.
3. Attendance is stored locally and displayed on the "View Attendance" page.

#### Admin Panel:
1. Navigate to the **Admin Dashboard**.
2. Use buttons to:
   - Add/Edit/Delete attendance records.
   - Generate user-specific or system-wide reports.
   - Approve or reject leave requests.
   - Assign grades based on attendance.

## Project Structure
```
attendance-management-system/
├── index.html          # User Panel HTML
├── admin.html          # Admin Panel HTML
├── styles.css          # Common CSS styles
├── script.js           # Admin panel functionalities
├── script.js           # User panel functionalities
└── README.md           # Project documentation
```

## Future Improvements
- Integration with a backend (e.g., Node.js, Python Flask/Django) for persistent storage.
- Add user authentication and authorization.
- Improve UI/UX with advanced CSS frameworks like Bootstrap or Tailwind CSS.
- Use a database (e.g., MySQL, MongoDB) for scalable data management.
- Enhance grading module with more configurable options.

## Contributing
Contributions are welcome! Feel free to submit a pull request or open an issue.

## Contact
For any questions or feedback, feel free to contact:
- **Name**:  Haseeb ur Rehman
- **Email**: haseebrehman3101@gmail.com
- **GitHub**: https://github.com/hrrana306
