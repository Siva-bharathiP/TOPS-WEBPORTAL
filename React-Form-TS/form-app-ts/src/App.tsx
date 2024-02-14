import React, { useState } from "react";
import "./App.css";
// import FullCalendarComponent from "./components/FullCalendarComponent";
// import Calendar from "./components/React-Calendar";
import MyCalendar from "./components/react-big-calendar";

const App: React.FC = () => {
  const initialEvents = [
    {
      id: "1",
      title: "Meeting",
      start: new Date(),
      end: new Date(Date.now() + 60 * 60 * 1000), // 1 hour later
    },
  ];

  const handleSelectDate = (date: Date) => {
    console.log("Selected date:", date);
  };

  const handleAddEvent = (newEvent: any) => {
    setEvents([...events, newEvent]);
  };
  const handleUpdateEvent = (event: any) => {
    console.log("Updated event:", event);
  };

  return (
    <div>
      <h1>Calendar</h1>
      {/* <FullCalendarComponent initialEvents={initialEvents} /> */}
      {/* <Calendar /> */}
      <MyCalendar
        events={initialEvents}
        onSelectDate={handleSelectDate}
        onAddEvent={handleAddEvent}
        onUpdateEvent={handleUpdateEvent} // Make sure this function is defined
      />
    </div>
  );
};

export default App;
