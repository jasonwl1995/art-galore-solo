/* Import Libraries */
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

// Function that displays a calendar for users 
// to select a day to place into an input field
const choseDate = () => {
  const [startDate, setStartDate] = useState(new Date());
  return(
    <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
  );
};

export default choseDate;