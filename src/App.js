import React, { useState } from 'react';
import './App.css';

const internships = [
  {
    title: "Frontend Intern at StartupX",
    location: "Bangalore",
    requiredSkills: ["React", "HTML", "CSS"],
    minGPA: 7.5
  },
  {
    title: "Data Analyst Intern at DataDive",
    location: "Pune",
    requiredSkills: ["Python", "Excel", "SQL"],
    minGPA: 8.0
  },
  {
    title: "Backend Developer Intern at BuildIt",
    location: "Remote",
    requiredSkills: ["Node.js", "MongoDB"],
    minGPA: 7.0
  },
  {
    title: "App Developer Intern at Appify",
    location: "Hyderabad",
    requiredSkills: ["Flutter", "Dart"],
    minGPA: 7.8
  },
  {
    title: "Cybersecurity Intern at SafeNet",
    location: "Delhi",
    requiredSkills: ["Linux", "Networking", "Python"],
    minGPA: 8.2
  },
  {
    title: "AI/ML Intern at BrainTech",
    location: "Chennai",
    requiredSkills: ["Python", "TensorFlow", "Machine Learning"],
    minGPA: 8.0
  },
  {
    title: "Web Dev Intern at CreativeBeans",
    location: "Mumbai",
    requiredSkills: ["HTML", "CSS", "JavaScript"],
    minGPA: 6.5
  },
  {
    title: "Cloud Intern at SkyCore",
    location: "Remote",
    requiredSkills: ["AWS", "Docker", "Linux"],
    minGPA: 7.5
  },
  {
    title: "Blockchain Intern at ChainLabs",
    location: "Pune",
    requiredSkills: ["Solidity", "Ethereum", "JavaScript"],
    minGPA: 7.2
  },
  {
    title: "UI/UX Designer at DesignHive",
    location: "Bangalore",
    requiredSkills: ["Figma", "Adobe XD", "Creativity"],
    minGPA: 7.0
  },
  {
    title: "DevOps Intern at BuildMaster",
    location: "Kolkata",
    requiredSkills: ["CI/CD", "Docker", "GitHub Actions"],
    minGPA: 7.9
  },
  {
    title: "Data Science Intern at StatStack",
    location: "Ahmedabad",
    requiredSkills: ["Python", "Pandas", "Scikit-learn"],
    minGPA: 8.1
  }
];

function App() {
  const [form, setForm] = useState({
    name: '',
    college: '',
    branch: '',
    year: '',
    skills: '',
    gpa: '',
    city: ''
  });

  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const skillArray = form.skills.toLowerCase().split(',').map(s => s.trim());
    const gpa = parseFloat(form.gpa);

    const matched = internships.filter(job => {
      const hasSkill = job.requiredSkills.some(skill =>
        skillArray.includes(skill.toLowerCase())
      );
      const gpaOk = gpa >= job.minGPA;
      const locationOk = job.location.toLowerCase().includes(form.city.toLowerCase()) || job.location === "Remote";
      return hasSkill && gpaOk && locationOk;
    });

    setResults(matched);

    try {
      const response = await fetch('https://internsleuth-backend.onrender.com/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const result = await response.json();
      console.log("✅ Backend Response:", result.message || result);
      alert("🎉 Form submitted and saved to database!");
    } catch (error) {
      console.error("❌ Submission Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="App">
      <h2>🎯 Internship Finder - InternSleuth</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Student Name" onChange={handleChange} required />
        <input type="text" name="college" placeholder="College Name" onChange={handleChange} required />
        <input type="text" name="branch" placeholder="Branch" onChange={handleChange} required />
        <input type="text" name="year" placeholder="Year (e.g., 2nd, 3rd)" onChange={handleChange} required />
        <input type="text" name="skills" placeholder="Skills (e.g., React, Python)" onChange={handleChange} required />
        <input type="number" step="0.01" name="gpa" placeholder="GPA (e.g., 8.2)" onChange={handleChange} required />
        <input type="text" name="city" placeholder="Preferred City" onChange={handleChange} required />
        <button type="submit">Find Internships</button>
      </form>

      <div className="results">
        <h3>🔍 Matching Internships:</h3>
        {results.length === 0 ? (
          <p>No matches found yet. Submit the form to see suggestions.</p>
        ) : (
          results.map((job, index) => (
            <div key={index} className="result-card">
              <strong>{job.title}</strong>
              <p>📍 Location: {job.location}</p>
              <p>🧠 Required Skills: {job.requiredSkills.join(', ')}</p>
              <p>📈 Minimum GPA: {job.minGPA}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;