// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AdminDashboard from './components/AdminDashboard';

function StudentFormPage() {
  const [form, setForm] = useState({
    name: '',
    college: '',
    branch: '',
    year: '',
    email: '',
    skills: '',
    gpa: '',
    city: ''
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const internships = [
    { title: "Python Developer Internship", company: "Signimus Technologies", location: "Bangalore", requiredSkills: ["Python"], minGPA: 7.0, applyLink: "https://in.prosple.com/apply-direct/415059" },
    { title: "TCS Internship Program", company: "TCS", location: "Bangalore, Pune, Delhi", requiredSkills: ["Java", "SQL"], minGPA: 7.5, applyLink: "https://www.tcs.com/careers/india/internship" },
    { title: "Reliance Summer Internship", company: "Reliance", location: "Online", requiredSkills: ["Excel", "Research"], minGPA: 7.0, applyLink: "https://careers.ril.com/rilcareers/frmrilcampusmain.aspx" },
    { title: "Software Engineering Intern", company: "Microsoft", location: "Hyderabad, Bangalore, Noida", requiredSkills: ["C++", "DSA"], minGPA: 8.0, applyLink: "https://jobs.careers.microsoft.com/global/en/job/1694046/" },
    { title: "Full Stack Developer", company: "Abstrabit Technologies", location: "Remote", requiredSkills: ["React", "Node.js", "HTML"], minGPA: 7.2, applyLink: "https://jobs.smartrecruiters.com/AbstrabitTechnologies/1234567890" },
    { title: "Frontend Internship", company: "TechBairn", location: "Bhopal", requiredSkills: ["React", "HTML", "CSS"], minGPA: 6.5, applyLink: "https://techbairn.com/internship" },
    { title: "IoT Internship", company: "TechSim+", location: "Indore", requiredSkills: ["Arduino", "C++"], minGPA: 6.8, applyLink: "https://techsimplus.in/internship" },
    { title: "Cybersecurity Internship", company: "Hackveda", location: "Gwalior", requiredSkills: ["Networking", "Linux"], minGPA: 7.0, applyLink: "https://hackveda.in/internship" },
    { title: "App Developer Intern", company: "Codemancers", location: "Bhopal", requiredSkills: ["Flutter", "Firebase"], minGPA: 7.5, applyLink: "https://codemancers.com/careers" },
    { title: "Web Developer", company: "PineStack", location: "Indore", requiredSkills: ["HTML", "JavaScript", "PHP"], minGPA: 6.5, applyLink: "https://pinestack.in/apply" },
    { title: "AI Intern", company: "Infosys", location: "Remote", requiredSkills: ["Python", "ML"], minGPA: 8.0, applyLink: "https://www.infosys.com/internship" },
    { title: "ML Intern", company: "IIT Madras", location: "Chennai", requiredSkills: ["Python", "Pandas"], minGPA: 8.5, applyLink: "https://internship.iitm.ac.in" },
    { title: "Backend Developer Intern", company: "Zoho", location: "Chennai", requiredSkills: ["Node.js", "MongoDB"], minGPA: 7.8, applyLink: "https://careers.zohocorp.com" },
    { title: "Data Analyst Intern", company: "Ernst & Young", location: "Delhi", requiredSkills: ["Excel", "SQL"], minGPA: 7.5, applyLink: "https://www.ey.com/en_in/careers" },
    { title: "Software Intern", company: "Amazon", location: "Hyderabad", requiredSkills: ["Java", "DSA"], minGPA: 8.0, applyLink: "https://www.amazon.jobs" },
    { title: "Cloud Engineering Intern", company: "Google", location: "Bangalore", requiredSkills: ["GCP", "Python"], minGPA: 8.0, applyLink: "https://careers.google.com/jobs/results/" },
    { title: "Cybersecurity Intern", company: "KPMG", location: "Pune", requiredSkills: ["Cybersecurity", "Linux"], minGPA: 7.5, applyLink: "https://kpmg.com/in/en/home/careers.html" },
    { title: "Marketing Intern", company: "Unacademy", location: "Remote", requiredSkills: ["Social Media", "Content"], minGPA: 6.0, applyLink: "https://unacademy.com/careers" },
    { title: "Data Science Intern", company: "Scaler", location: "Remote", requiredSkills: ["Python", "Data Science"], minGPA: 7.0, applyLink: "https://www.scaler.com/careers" },
    { title: "Java Intern", company: "Capgemini", location: "Bangalore", requiredSkills: ["Java", "Spring"], minGPA: 6.5, applyLink: "https://www.capgemini.com/careers/" },
    { title: "Salesforce Intern", company: "Salesforce", location: "Hyderabad", requiredSkills: ["CRM", "Apex"], minGPA: 7.0, applyLink: "https://www.salesforce.com/company/careers/" },
    { title: "Testing Intern", company: "Cognizant", location: "Kolkata", requiredSkills: ["Selenium", "Java"], minGPA: 7.2, applyLink: "https://careers.cognizant.com/" },
    { title: "Product Intern", company: "Razorpay", location: "Remote", requiredSkills: ["Product Management", "Figma"], minGPA: 7.5, applyLink: "https://razorpay.com/careers" },
    { title: "Blockchain Intern", company: "Polygon", location: "Remote", requiredSkills: ["Solidity", "Ethereum"], minGPA: 8.0, applyLink: "https://polygon.technology/careers" },
    { title: "Game Dev Intern", company: "Nazara", location: "Mumbai", requiredSkills: ["Unity", "C#"], minGPA: 6.5, applyLink: "https://nazara.com/careers" },
    { title: "Android Intern", company: "Swiggy", location: "Bangalore", requiredSkills: ["Kotlin", "Jetpack"], minGPA: 7.0, applyLink: "https://careers.swiggy.com" },
    { title: "iOS Intern", company: "Zomato", location: "Gurgaon", requiredSkills: ["Swift", "UI/UX"], minGPA: 7.2, applyLink: "https://www.zomato.com/careers" },
    { title: "DevOps Intern", company: "Paytm", location: "Noida", requiredSkills: ["Docker", "CI/CD"], minGPA: 7.5, applyLink: "https://paytm.com/careers" },
    { title: "Research Intern", company: "DRDO", location: "Hyderabad", requiredSkills: ["Research", "C++"], minGPA: 8.5, applyLink: "https://drdo.gov.in/careers" }
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const skillArray = form.skills.toLowerCase().split(',').map(s => s.trim());
    const gpa = parseFloat(form.gpa);

    const matched = internships.filter(job => {
      const hasSkill = job.requiredSkills.some(skill =>
        skillArray.includes(skill.toLowerCase())
      );
      const gpaOk = gpa >= job.minGPA;
      const locationOk = job.location.toLowerCase().includes(form.city.toLowerCase()) || job.location.toLowerCase().includes("remote") || job.location.toLowerCase().includes("online");
      return hasSkill && gpaOk && locationOk;
    });

    setResults(matched);

    const formWithArray = {
      ...form,
      skills: skillArray
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formWithArray)
      });

      await response.json();
      alert("🎉 Form submitted and saved to database!");
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h2 className="main-title">🎯 Internship Finder - InternSleuth</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <input type="text" name="name" placeholder="Student Name" onChange={handleChange} required />
        <input type="text" name="college" placeholder="College Name" onChange={handleChange} required />
        <input type="text" name="branch" placeholder="Branch" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
        <input type="text" name="year" placeholder="Year (e.g., 2nd, 3rd)" onChange={handleChange} required />
        <input type="text" name="skills" placeholder="Skills (e.g., React, Python)" onChange={handleChange} required />
        <input type="number" step="0.01" name="gpa" placeholder="GPA (e.g., 8.2)" onChange={handleChange} required />
        <input type="text" name="city" placeholder="Preferred City" onChange={handleChange} required />
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? '🔄 Searching...Please Wait' : 'Find Internships'}
        </button>
      </form>

      <div className="results">
        <h3 className="result-title">Wait!🔍 Matching Internships.:</h3>
        {loading ? (
          <p className="loading-text">Please wait, searching internships...</p>
        ) : results.length === 0 ? (
          <p className="no-results">No matches found for you.Try with other location or skill..</p>
        ) : (
          results.map((job, index) => (
            <div key={index} className="result-card">
              <strong>{job.title}</strong>
              <p>🏢 Company: {job.company}</p>
              <p>📍 Location: {job.location}</p>
              <p>🧠 Required Skills: {job.requiredSkills.join(', ')}</p>
              <p>📈 Minimum GPA: {job.minGPA}</p>
              <a href={job.applyLink} target="_blank" rel="noopener noreferrer">
                <button className="apply-btn">Apply Now</button>
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentFormPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
