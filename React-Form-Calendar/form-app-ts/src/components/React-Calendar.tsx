// import React, { useState } from 'react';
// import Calendar, { CalendarProps } from 'react-calendar';

// type ValuePiece = Date | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];

// function calendar() {
//   const [value, onChange] = useState<Value>(new Date());

//   return (
//     <div>
//       <Calendar onChange={onChange as (date: Value) => void} value={value as ValuePiece} />
//     </div>
//   );
// }

// export default calendar;


import { FC } from "react";

const EventDetails: FC<{ title: string }> = ({ title }) => {
  return (
    <div>
      <h3>Event Details</h3>
      <p>Title: {title}</p>
    </div>
  );
};

export default EventDetails;