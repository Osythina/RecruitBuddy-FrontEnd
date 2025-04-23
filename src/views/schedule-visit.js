import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // for calendar styling
import '../styles/schedule-visit.css';

function ScheduleVisit() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    department: ''
  });
  const [confirmation, setConfirmation] = useState(null);

  // This Handle calendar date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactInfo({
      ...contactInfo,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (selectedDate && contactInfo.name && contactInfo.email && contactInfo.department) {
      setConfirmation({
        message: 'Your visit request has been successfully submitted!',
        details: {
          date: selectedDate.toDateString(),
          department: contactInfo.department
        }
      });
    } else {
      setConfirmation({
        message: 'Please fill in all the details and select a date.',
        details: null
      });
    }
  };

  return (
    <div className="scheduleVisit">
      <h1>Schedule Your Visit</h1>

      {/* Calendar for date selection */}
      <div className="calendarContainer">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          minDate={new Date()} // Disable past dates
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
            </div>

            <div className="formField">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={contactInfo.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="formField">
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={contactInfo.department}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit">Submit Request</button>
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