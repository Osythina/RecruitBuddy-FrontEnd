import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/schedule-visit.css';

function ScheduleVisit() {

  const [selectedDate, setSelectedDate] = useState(null);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    department: ''
  });
  const [confirmation, setConfirmation] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactInfo({...contactInfo, [name]: value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!contactInfo.name || !contactInfo.email || !contactInfo.department || !selectedDate) {
      alert('Please fill in all the fields.');
      return;
    }

    const visitData = {
      name: contactInfo.name,
      email: contactInfo.email,
      date: selectedDate,
      department: contactInfo.department,
    };

    try {

      const response = await fetch('http://localhost:5000/save-visit', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(visitData),
      });

      const data = await response.json();

      if (response.ok) {
        setConfirmation({
          message: 'Your visit request has been successfully submitted!',
          details: {
            date: selectedDate.toDateString(),
            department: contactInfo.department
          }
        });
      } else {
        alert(data.message);
      }
    }catch (error) {
      alert('There was an error submitting your visit request.');
    } 
  };

  const tileDisabled = ({ date, view}) => {
    const formattedDate = date.toDateString(); 
    return bookedDates.includes(formattedDate) || date.getDay() === 6 || date.getDay() === 0;
  };

  return (
    <div className="scheduleVisit">
      <h1>Schedule Your Visit</h1>

      <div className="calendarContainer">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          minDate={new Date()} 
          tileDisabled={tileDisabled} //
        />
      </div>

      {selectedDate && (
        <div className="formContainer">
          <h3>Contact Information</h3>
          <form onSubmit={handleSubmit}>
            <div className="formField">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={contactInfo.name}
                onChange={handleInputChange}
                required
              />
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={contactInfo.email}
                onChange={handleInputChange}
                required
              />
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={contactInfo.department}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit">Submit Visit Request</button>
          </form>
        </div>
      )}

      {confirmation && (
        <div className="confirmationMessage">
          <h3>{confirmation.message}</h3>
          {confirmation.details && (
            <div>
              <p><strong>Selected Date:</strong> {confirmation.details.date}</p>
              <p><strong>Department:</strong> {confirmation.details.department}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ScheduleVisit;