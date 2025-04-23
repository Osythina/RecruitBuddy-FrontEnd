import React, { useState } from 'react';
import '../styles/scholar-info.css';

function Scholarship() {
  // Step 1: Set up state for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [scholarships, setScholarships] = useState([]);
  const [scholarshipType, setScholarshipType] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [amount, setAmount] = useState('');

  // Example scholarship data (replace with actual data or fetch from API)
  const allScholarships = [
    { name: 'STEM Excellence Scholarship', type: 'Merit-based', eligibility: 'STEM Students', amount: '$10,000' },
    { name: 'Business Leadership Grant', type: 'Need-based', eligibility: 'Business Students', amount: '$5,000' },
    { name: 'Diversity & Inclusion Fellowship', type: 'Merit-based', eligibility: 'All Students', amount: '$7,500' },
    { name: 'Academic Achievement Scholarship', type: 'Merit-based', eligibility: 'All Students', amount: '$3,000' },
    { name: 'International Student Grant', type: 'Need-based', eligibility: 'International Students', amount: '$4,000' },
    // More scholarships...
  ];

  // Step 2: Handle search and filter changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTypeChange = (e) => {
    setScholarshipType(e.target.value);
  };

  const handleEligibilityChange = (e) => {
    setEligibility(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  // Step 3: Filter the scholarships based on search term and filters
  const filteredScholarships = allScholarships.filter((scholarship) => {
    return (
      scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (scholarshipType ? scholarship.type === scholarshipType : true) &&
      (eligibility ? scholarship.eligibility === eligibility : true) &&
      (amount ? scholarship.amount === amount : true)
    );
  });

  // Step 4: Render the filtered scholarships in a table
  return (
    <div className="scholarships">
      <div className="searchContainer">
        <h1>Search Scholarships</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search Scholarships"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        {/* Drop-down Filters */}
        <div className="filters">
          <select value={scholarshipType} onChange={handleTypeChange}>
            <option value="">All Types</option>
            <option value="Merit-based">Merit-based</option>
            <option value="Need-based">Need-based</option>
          </select>

          <select value={eligibility} onChange={handleEligibilityChange}>
            <option value="">All Eligibility</option>
            <option value="STEM Students">STEM Students</option>
            <option value="Business Students">Business Students</option>
            <option value="International Students">International Students</option>
            <option value="All Students">All Students</option>
            {/* Add more eligibility options as needed */}
          </select>

          <select value={amount} onChange={handleAmountChange}>
            <option value="">All Amounts</option>
            <option value="$3,000">$3,000</option>
            <option value="$5,000">$5,000</option>
            <option value="$7,500">$7,500</option>
            <option value="$10,000">$10,000</option>
            {/* Add more scholarship amounts as needed */}
          </select>
        </div>
      </div>

      {/* Scholarship Table */}
      <div className="scholarshipTable">
        <table>
          <thead>
            <tr>
              <th>Scholarship Name</th>
              <th>Type</th>
              <th>Eligibility</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredScholarships.length > 0 ? (
              filteredScholarships.map((scholarship, index) => (
                <tr key={index}>
                  <td>{scholarship.name}</td>
                  <td>{scholarship.type}</td>
                  <td>{scholarship.eligibility}</td>
                  <td>{scholarship.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No scholarships found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Scholarship;