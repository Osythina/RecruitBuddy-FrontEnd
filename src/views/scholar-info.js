import React, { useState, useEffect} from 'react';
import useFetchData from '../components/useFetchData.js';
import '../styles/scholar-info.css';

function Scholarship() {

  const [searchTerm, setSearchTerm] = useState('');
  const [type, setScholarshipType] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [amount, setAmount] = useState('');
  const [filterEligibility, setFilterEligibility] = useState([]);
  const [filterTypes, setFilterTypes] = useState([]);
  const [filterAmounts, setFilterAmounts] = useState([]);

  useEffect(() => {
      fetchFilterOptions();
    }, []);

  const fetchFilterOptions = async () => {
    try {
      const response = await fetch('http://localhost:5000/scholarships-filter-options');
      const data = await response.json();
      setFilterEligibility(data.eligibilities);
      setFilterTypes(data.types);
      setFilterAmounts(data.amounts);
    } catch (error) {
      console.error('Error fetching filter options:', error);
    }
  };

  const params = {
    searchTerm,
    type,
    amount,
    eligibility,
  };

  const { data: scholarships, loading, error } = useFetchData('http://localhost:5000/search-scholarships', params);

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

  return (
    <div className="scholarships">
      <div className="searchScholarshipContainer">
        <h1>Search Scholarships</h1>
        <div className="scholarshipSearchBar">
          <input
            type="text"
            placeholder="Search Scholarships"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="scholarshipFilters">

          <select value={type} onChange={handleTypeChange}>
            <option value="">All Types</option>
            {filterTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>

          <select value={eligibility} onChange={handleEligibilityChange}>
            <option value="">All Eligibility</option>
            {filterEligibility.map((elig, index) => (
              <option key={index} value={elig}>{elig}</option>
            ))}
          </select>

          <select value={amount} onChange={handleAmountChange}>
            <option value="">All Amounts</option>
            {filterAmounts.map((am, index) => (
              <option key={index} value={am}>{am}</option>
            ))}
          </select>
        </div>
      </div>

    <div className="tableContainer">
      {loading ? <p>Loading programs...</p> : error ? <p>Error: {error}</p> : (
       <table className="scholarshipTable">
          <thead>
            <tr>
              <th>Scholarship Name</th>
              <th>Type</th>
              <th>Eligibility</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.map((scholarship, index) => (
                <tr key={index}>
                  <td>{scholarship.name}</td>
                  <td>{scholarship.type}</td>
                  <td>{scholarship.eligibility}</td>
                  <td>{scholarship.amount}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      </div>
    </div>
  );
}

export default Scholarship;