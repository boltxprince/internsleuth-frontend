// src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';

function AdminDashboard() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/students`)
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error("❌ Fetch error:", err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📊 Admin Dashboard</h2>
      {students.length === 0 ? (
        <p>No student submissions yet.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Name</th>
              <th>College</th>
              <th>Branch</th>
              <th>Year</th>
              <th>Skills</th>
              <th>GPA</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {students.map((stu, i) => (
              <tr key={i}>
                <td>{stu.name}</td>
                <td>{stu.college}</td>
                <td>{stu.branch}</td>
                <td>{stu.year}</td>
                <td>{stu.skills}</td>
                <td>{stu.gpa}</td>
                <td>{stu.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminDashboard;
