import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/search-program.css';

function Programs() {
  // Step 1: Set up state for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [programs, setPrograms] = useState([]);
  const [programType, setProgramType] = useState('');
  const [department, setDepartment] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showApplicationInstructions, setShowApplicationInstructions] = useState(false);

  const navigate = useNavigate();

  
  // Example program data (replace with actual data or fetch from API)
  const allPrograms = [
    { name: 'Engineering', type: 'Undergraduate', department: 'Engineering', duration: '4 years', applicationInstructions: "Submit transcripts, personal statement, and recommendations...",
      faculty: {
        name: "Dr. Jane Smith",
        title: "Department Chair",
        email: "jane.smith@example.edu"
      } },
    { name: 'Computer Science', type: 'Graduate', department: 'Science', duration: '2 years', applicationInstructions: "Submit transcripts, personal statement, and recommendations...",
      faculty: {
        name: "Dr. Joe Doe",
        title: "Department Chair",
        email: "joe.doe@example.edu"
      }},
    { name: 'Business Administration', type: 'Undergraduate', department: 'Business', duration: '4 years', applicationInstructions: "Submit transcripts, personal statement, and recommendations...",
      faculty: {
        name: "Dr. Mary Anne",
        title: "Department Chair",
        email: "Mary.Anne@example.edu"
      }},
    { name: 'Physics', type: 'Undergraduate', department: 'Science', duration: '4 years', applicationInstructions: "Submit transcripts, personal statement, and recommendations...",
      faculty: {
        name: "Dr. Carl Headen",
        title: "Department Chair",
        email: "Carl.Headen@example.edu"
      }},
    { name: 'Software Engineering', type: 'Graduate', department: 'Engineering', duration: '2 years', applicationInstructions: "Submit transcripts, personal statement, and recommendations...",
      faculty: {
        name: "Dr. Anne Hathaway",
        title: "Department Chair",
        email: "Anne.Hathawat@example.edu"
      }},
    
  ];

  // This part handles search and filter changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTypeChange = (e) => {
    setProgramType(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  // This part is responsible for filtering the programs based on search term and filters
  const filteredPrograms = allPrograms.filter((program) => {
    return (
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (programType ? program.type === programType : true) &&
      (department ? program.department === department : true) &&
      (duration ? program.duration === duration : true)
    );
  });

  const handleSelection = (program) => {
    setSelectedPrograms((prev) =>
      prev.includes(program)
        ? prev.filter((item) => item !== program)
        : [...prev, program]
    );
  };
  
  const handleCompare = () => {
    setShowComparison(true);
  };

  const handleReset = () => {
    setSelectedPrograms([]);
  };

  const toggleSelection = (programName) => {
    setSelectedPrograms(prev => {
      if (prev.includes(programName)) {
        return prev.filter(name => name !== programName);
      } else {
        return [...prev, programName];
      }
    });
    setShowInstructions(false); 
  };

  const handleShowInstructions = () => {
    if (selectedPrograms.length === 1) {
      setShowInstructions(true);
    } else {
      alert("Please select only one program to see how to apply.");
    }
  };

  return (
    <div className="programs">
      <div className="searchContainer">
        <h1>Search University Programs</h1>
        <input
          type="text"
          placeholder="Search Programs"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        {/* Drop-down Filters */}
        <div className="filters">
          <select value={programType} onChange={handleTypeChange}>
            <option value="">All Types</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Graduate">Graduate</option>
          </select>

          <select value={department} onChange={handleDepartmentChange}>
            <option value="">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Science">Science</option>
            <option value="Business">Business</option>
          </select>

          <select value={duration} onChange={handleDurationChange}>
            <option value="">All Durations</option>
            <option value="2 years">2 years</option>
            <option value="4 years">4 years</option>
            {/* Add more durations as needed */}
          </select>
        </div>
      </div>

      {filteredPrograms.length > 0 && (
  <>
    <table className="programTable">
      <thead>
        <tr>
          <th>Select</th>
          <th>Name</th>
          <th>Department</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>
        {filteredPrograms.map((program) => (
          <tr key={program.id}>
            <td>
            <label>
              <input
                type="checkbox"
                checked={selectedPrograms.includes(program)}
                onChange={() => handleSelection(program)}
              />
            </label>
            </td>
            <td>{program.name}</td>
            <td>{program.department}</td>
            <td>{program.duration}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <button
      className="compareButton"
      onClick={handleCompare}
      disabled={selectedPrograms.length < 2}
    >
      Compare Selected
    </button>
  </>
)}
{selectedPrograms.length > 0 && (
        <>
          <h3>Compare Selected Programs</h3>
          <button onClick={handleReset} style={{ marginBottom: "10px" }}>
            Reset
          </button>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Duration</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {selectedPrograms.map((program) => (
                <tr key={program.name}>
                  <td>{program.name}</td>
                  <td>{program.department}</td>
                  <td>{program.duration}</td>
                  <td>{program.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <button
          onClick={() => setShowApplicationInstructions(true)}
          className="instructions-button">
            Show how to apply
      </button>

      {selectedPrograms.length === 1 && showApplicationInstructions && (
  <div className="application-instructions">
    <h3>How to Apply for {selectedPrograms[0].name}</h3>
    <p>{selectedPrograms[0].applicationInstructions}</p>
    
    <div className="faculty-info">
      <h4>Faculty Contact</h4>
      <p><strong>Name:</strong> {selectedPrograms[0].faculty.name}</p>
      <p><strong>Title:</strong> {selectedPrograms[0].faculty.title}</p>
      <p><strong>Email:</strong> <a href={`mailto:${selectedPrograms[0].faculty.email}`}>{selectedPrograms[0].faculty.email}</a></p>
    </div>

    <button onClick={() => navigate('/visit')} className="visit-button">
      Schedule a Visit
    </button>
  </div>
)}
    </div>
  );
}

export default Programs;