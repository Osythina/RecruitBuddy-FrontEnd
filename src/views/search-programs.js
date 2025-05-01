import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchData from '../components/useFetchData.js';
import '../styles/search-program.css';

function Programs() {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [type, setProgramType] = useState('');
  const [department, setDepartment] = useState('');
  const [duration, setDuration] = useState('');
  const [filterDepartments, setFilterDepartments] = useState([]);
  const [filterTypes, setFilterTypes] = useState([]);
  const [filterDurations, setFilterDurations] = useState([]);
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showApplicationInstructions, setShowApplicationInstructions] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  const fetchFilterOptions = async () => {
    try {
      const response = await fetch('http://localhost:5000/programs-filter-options');
      const data = await response.json();
      setFilterDepartments(data.departments);
      setFilterTypes(data.types);
      setFilterDurations(data.durations);
    } catch (error) {
      console.error('Error fetching filter options:', error);
    }
  };

  const params = {
    searchTerm,
    type,
    department,
    duration,
  };

  const { data: programs, loading, error } = useFetchData('http://localhost:5000/search-programs', params);

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
    setSearchTerm('');
    setProgramType('');
    setDepartment('');
    setDuration('');
  };

  const handleShowInstructions = () => {
    if (selectedPrograms.length === 1) {
      setShowApplicationInstructions(true);
    } else {
      alert("Please select only one program to see how to apply.");
    }
  };

  return (
    <div className="programs">
      <div className="searchProgramsContainer">
        <h1>Search University Programs</h1>
        <div className="searchProgramsBar">
          <input
            type="text"
            placeholder="Search Programs"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="programFilters">
          <select value={type} onChange={handleTypeChange}>
            <option value="">All Types</option>
            {filterTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>

          <select value={department} onChange={handleDepartmentChange}>
            <option value="">All Departments</option>
            {filterDepartments.map((dept, index) => (
              <option key={index} value={dept}>{dept}</option>
            ))}
          </select>

          <select value={duration} onChange={handleDurationChange}>
            <option value="">All Durations</option>
            {filterDurations.map((dur, index) => (
              <option key={index} value={dur}>{dur}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="Buttons">
        <button onClick={handleReset} className="resetButton">Reset</button>
        <button onClick={handleShowInstructions} className="instructions-button">Show how to apply</button>
      </div>

      <div className="tablesContainer">
        {loading ? <p>Loading programs...</p> : error ? <p>Error: {error}</p> : (
          <table className="programTable">
            <thead>
              <tr>
                <th>Select</th>
                <th>Name</th>
                <th>Type</th>
                <th>Department</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((program, index) => (
                <tr key={index}>
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
                  <td>{program.type}</td>
                  <td>{program.department}</td>
                  <td>{program.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {selectedPrograms.length > 0 && (
          <>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Duration</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {selectedPrograms.map((program, index) => (
                  <tr key={program.index}>
                    <td>{program.name}</td>
                    <td>{program.department}</td>
                    <td>{program.duration}</td>
                    <td>{program.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
        </div>
        {selectedPrograms.length === 1 && showApplicationInstructions && (
          <div className="applicationInstructions">
            <h3>How to Apply for {selectedPrograms[0].name}</h3>
            <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h4>
              <div className="facultyInfo">
              <h5>Faculty Contact</h5>
              <p><strong>Name:</strong> {selectedPrograms[0].faculty_name}</p>
              <p><strong>Title:</strong> {selectedPrograms[0].faculty_title}</p>
              <p><strong>Email:</strong> <a href={`mailto:${selectedPrograms[0].faculty_email}`}>{selectedPrograms[0].faculty_email}</a></p>
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