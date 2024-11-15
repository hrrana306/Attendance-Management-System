document.addEventListener("DOMContentLoaded", function () {
  // Get the user type (Admin or User) from the current page
  const isAdminPage = window.location.href.includes("admin.html");

  // Function to mark attendance for the user
  function markAttendance() {
    const today = new Date().toDateString(); // Get today's date
    const username = prompt("Enter your username: "); // Prompt user for username
    if (!username) return alert("Username is required.");

    const userAttendanceKey = `user_${username}_attendance`;
    const attendance = JSON.parse(localStorage.getItem(userAttendanceKey)) || [];

    if (attendance.includes(today)) {
      alert("Attendance already marked for today!");
    } else {
      attendance.push(today);
      localStorage.setItem(userAttendanceKey, JSON.stringify(attendance));
      alert("Attendance marked successfully!");
      viewAttendance(username); // Update the log after marking attendance
    }
  }

  // Function to view the user's attendance
  function viewAttendance(username) {
    const userAttendanceKey = `user_${username}_attendance`;
    const attendance = JSON.parse(localStorage.getItem(userAttendanceKey)) || [];
    const attendanceLog = document.getElementById("attendance-log");

    if (attendanceLog) {
      if (attendance.length > 0) {
        attendanceLog.innerHTML = `<h3>Your Attendance Log:</h3><ul>${attendance
          .map((date) => `<li>${date}</li>`)
          .join("")}</ul>`;
      } else {
        attendanceLog.innerHTML = "<p>No attendance records found.</p>";
      }
    } else {
      console.error("Element with id 'attendance-log' not found.");
    }
  }

  // Function to request leave
  function requestLeave() {
    const leaveRequests = JSON.parse(localStorage.getItem("leaveRequests")) || 0;
    localStorage.setItem("leaveRequests", leaveRequests + 1);
    alert("Leave request submitted!");
  }

  // Function to view all students' attendance (for Admin Dashboard)
  function viewAllAttendance() {
    const allAttendance = JSON.parse(localStorage.getItem("all_attendance")) || [];
    const adminLog = document.getElementById("attendance-log");

    if (adminLog) {
      if (allAttendance.length > 0) {
        adminLog.innerHTML = `<h3>All Students' Attendance Log:</h3><ul>${allAttendance
          .map((attendance, index) => `<li>Student ${index + 1}: ${attendance.join(", ")}</li>`)
          .join("")}</ul>`;
      } else {
        adminLog.innerHTML = "<p>No attendance records found.</p>";
      }
    } else {
      console.error("Element with id 'attendance-log' not found on Admin Dashboard.");
    }
  }

  // Event listeners for the buttons based on user role (Admin or User)
  const markAttendanceButton = document.querySelector("button[onclick='markAttendance()']");
  const viewAttendanceButton = document.querySelector("button[onclick='viewAttendance()']");
  const requestLeaveButton = document.querySelector("button[onclick='requestLeave()']");
  const viewAllAttendanceButton = document.querySelector("button[onclick='viewAttendance()']");

  if (markAttendanceButton) markAttendanceButton.onclick = markAttendance;
  if (viewAttendanceButton) viewAttendanceButton.onclick = function () {
    const username = prompt("Enter your username: ");
    if (username) viewAttendance(username);
  };
  if (requestLeaveButton) requestLeaveButton.onclick = requestLeave;
  if (viewAllAttendanceButton && isAdminPage) viewAllAttendanceButton.onclick = viewAllAttendance;

  // Update all attendance in localStorage for Admin (if any attendance is marked)
  if (isAdminPage) {
    const allAttendance = JSON.parse(localStorage.getItem("all_attendance")) || [];
    const username = prompt("Enter the student's username for admin: ");
    const today = new Date().toDateString();

    if (username) {
      let studentAttendance = JSON.parse(localStorage.getItem(`user_${username}_attendance`)) || [];
      if (!studentAttendance.includes(today)) {
        studentAttendance.push(today);
        localStorage.setItem(`user_${username}_attendance`, JSON.stringify(studentAttendance));
        allAttendance.push(studentAttendance);
        localStorage.setItem("all_attendance", JSON.stringify(allAttendance));
      }
    }
  }

  // Initial load of attendance log for pages with the log element
  if (document.getElementById("attendance-log")) {
    if (isAdminPage) {
      viewAllAttendance(); // Load all students' attendance for Admin
    } else {
      const username = prompt("Enter your username: ");
      if (username) {
        viewAttendance(username); // Load user's attendance on their page
      }
    }
  }
});


document.addEventListener("DOMContentLoaded", function () {

  // Function to add attendance for a student
  function addAttendance(date, studentId) {
    const attendance = JSON.parse(localStorage.getItem("attendance")) || {};
    if (!attendance[studentId]) {
      attendance[studentId] = [];
    }
    attendance[studentId].push(date);
    localStorage.setItem("attendance", JSON.stringify(attendance));
    alert("Attendance added successfully!");
  }

  // Function to edit attendance (e.g., changing a date)
  function editAttendance(oldDate, newDate, studentId) {
    const attendance = JSON.parse(localStorage.getItem("attendance")) || {};
    if (attendance[studentId]) {
      const index = attendance[studentId].indexOf(oldDate);
      if (index !== -1) {
        attendance[studentId][index] = newDate;
        localStorage.setItem("attendance", JSON.stringify(attendance));
        alert("Attendance edited successfully!");
      } else {
        alert("Date not found for this student.");
      }
    }
  }

  // Function to delete attendance for a student on a specific date
  function deleteAttendance(date, studentId) {
    const attendance = JSON.parse(localStorage.getItem("attendance")) || {};
    if (attendance[studentId]) {
      attendance[studentId] = attendance[studentId].filter(attDate => attDate !== date);
      localStorage.setItem("attendance", JSON.stringify(attendance));
      alert("Attendance deleted successfully!");
    }
  }

  // Generate report for a specific user between two dates
  function generateReport(studentId, fromDate, toDate) {
    const attendance = JSON.parse(localStorage.getItem("attendance")) || {};
    const userAttendance = attendance[studentId] || [];
    const filteredAttendance = userAttendance.filter(date =>
      new Date(date) >= new Date(fromDate) && new Date(date) <= new Date(toDate)
    );

    document.getElementById("admin-report").innerHTML =
      `<h3>Attendance Report for User ${studentId}</h3><ul>${filteredAttendance
        .map(date => `<li>${date}</li>`).join('')}</ul>`;
  }

  // Generate a system-wide report between two dates
  function generateSystemReport(fromDate, toDate) {
    const attendance = JSON.parse(localStorage.getItem("attendance")) || {};
    let reportHtml = "<h3>System Attendance Report</h3>";

    for (const studentId in attendance) {
      const userAttendance = attendance[studentId];
      const filteredAttendance = userAttendance.filter(date =>
        new Date(date) >= new Date(fromDate) && new Date(date) <= new Date(toDate)
      );
      reportHtml += `<h4>User ${studentId}</h4><ul>${filteredAttendance
        .map(date => `<li>${date}</li>`).join('')}</ul>`;
    }

    document.getElementById("admin-report").innerHTML = reportHtml;
  }

  // Approve a leave request
  function approveLeave(studentId) {
    const leaveRequests = JSON.parse(localStorage.getItem("leaveRequests")) || {};
    if (leaveRequests[studentId] && leaveRequests[studentId] > 0) {
      leaveRequests[studentId] -= 1;
      localStorage.setItem("leaveRequests", JSON.stringify(leaveRequests));
      alert("Leave approved for User " + studentId);
    } else {
      alert("No leave requests found for this user.");
    }
  }

  // Assign grades based on attendance count
  function assignGrade(studentId) {
    const attendance = JSON.parse(localStorage.getItem("attendance")) || {};
    const userAttendance = attendance[studentId] || [];
    const attendanceCount = userAttendance.length;

    let grade;
    if (attendanceCount >= 26) {
      grade = 'A';
    } else if (attendanceCount >= 20) {
      grade = 'B';
    } else if (attendanceCount >= 15) {
      grade = 'C';
    } else if (attendanceCount >= 10) {
      grade = 'D';
    } else {
      grade = 'F';
    }

    alert(`User ${studentId} has an attendance grade of: ${grade}`);
  }

  // Example Usage
  document.getElementById("addAttendanceBtn").addEventListener("click", function () {
    const date = prompt("Enter date (e.g., 2024-11-14):");
    const studentId = prompt("Enter student name:");
    addAttendance(date, studentId);
  });

  document.getElementById("editAttendanceBtn").addEventListener("click", function () {
    const oldDate = prompt("Enter old date:");
    const newDate = prompt("Enter new date:");
    const studentId = prompt("Enter student name:");
    editAttendance(oldDate, newDate, studentId);
  });

  document.getElementById("deleteAttendanceBtn").addEventListener("click", function () {
    const date = prompt("Enter date to delete:");
    const studentId = prompt("Enter student name:");
    deleteAttendance(date, studentId);
  });

  document.getElementById("generateReportBtn").addEventListener("click", function () {
    const studentId = prompt("Enter student name:");
    const fromDate = prompt("Enter FROM date:");
    const toDate = prompt("Enter TO date:");
    generateReport(studentId, fromDate, toDate);
  });

  document.getElementById("approveLeaveBtn").addEventListener("click", function () {
    const studentId = prompt("Enter student name:");
    approveLeave(studentId);
  });

  document.getElementById("generateSystemReportBtn").addEventListener("click", function () {
    const fromDate = prompt("Enter FROM date:");
    const toDate = prompt("Enter TO date:");
    generateSystemReport(fromDate, toDate);
  });

  document.getElementById("assignGradeBtn").addEventListener("click", function () {
    const studentId = prompt("Enter student name:");
    assignGrade(studentId);
  });
});
