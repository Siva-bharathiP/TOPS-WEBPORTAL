import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventDetails from "./React-Calendar";
import "bootstrap/dist/css/bootstrap.min.css";

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

const MyCalendar: React.FC = () => {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Event 1",
      start: new Date(),
      end: moment().add(1, "hour").toDate(),
    },
    {
      id: "2",
      title: "Event 2",
      start: moment().add(2, "hours").toDate(),
      end: moment().add(3, "hours").toDate(),
    },
  ]);
  const [isAddingEvent, setIsAddingEvent] = useState<boolean>(false);
  const [isEditingEvent, setIsEditingEvent] = useState<boolean>(false);
  const [newEventDate, setNewEventDate] = useState<Date | null>(null);
  const [newEventTitle, setNewEventTitle] = useState<string>("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleSelectSlot = ({
    start,
    end,
    action,
  }: {
    start: Date;
    end: Date;
    action: string;
  }) => {
    if (action === "click") {
      setIsAddingEvent(true);
      setNewEventDate(start);
    }
  };

  const handleAddEvent = async () => {
    if (newEventDate && newEventTitle.trim() !== "") {
      const startDateTime = newEventDate.toISOString(); // Convert Date to ISO String
      const endDateTime = moment(newEventDate).add(1, "hour").toISOString(); // Add 1 hour for end time

      const newEventPayload = {
        summary: newEventTitle.trim(),
        startDateTime: startDateTime,
        endDateTime: endDateTime,
      };

      // Make a POST request to the /create-event endpoint
      const response = await fetch("http://localhost:8080/create-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEventPayload), // Send the payload
      });

      if (response.ok) {
        // Construct the new event object
        const newEvent: Event = {
          id: Math.random().toString(36).substr(2, 9),
          title: newEventTitle.trim(),
          start: newEventDate,
          end: moment(newEventDate).add(1, "hour").toDate(),
        };

        // Update the events state
        setEvents([...events, newEvent]);
        setIsAddingEvent(false);
        setNewEventDate(null);
        setNewEventTitle("");
      } else {
        console.error("Failed to create event in Google Calendar");
      }
    }
  };

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsEditingEvent(true);
  };

  const handleEditEvent = () => {
    setIsEditingEvent(false);
    setSelectedEvent(null);
  };

  const handleUpdateEvent = (updatedEvent: Event) => {
    if (selectedEvent) {
      setEvents(
        events.map((e) => (e.id === selectedEvent.id ? updatedEvent : e))
      );
      setIsEditingEvent(false);
      setSelectedEvent(null);
    }
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(events.filter((e) => e.id !== selectedEvent.id));
      setIsEditingEvent(false);
      setSelectedEvent(null);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Calendar
            events={events}
            startAccessor="start"
            endAccessor="end"
            localizer={localizer}
            style={{ height: 500 }}
            selectable={true}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            onDoubleClickEvent={(event) => {
              console.log("Double clicked event:", event);
            }}
          />
        </div>
      </div>
      {isAddingEvent && (
        <div className="row mt-3">
          <div className="col">
            <h3>Add Event</h3>
            <input
              type="text"
              placeholder="Enter event title"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
            />
            <button onClick={handleAddEvent}>Add Event</button>
            <button onClick={() => setIsAddingEvent(false)}>Cancel</button>
          </div>
        </div>
      )}
      {selectedEvent && isEditingEvent && (
        <div className="row mt-3">
          <div className="col">
            <h3>Edit Event</h3>
            <input
              type="text"
              placeholder="Enter event title"
              value={selectedEvent.title}
              onChange={(e) =>
                setSelectedEvent({ ...selectedEvent, title: e.target.value })
              }
            />
            <button onClick={() => handleUpdateEvent(selectedEvent)}>
              Update Event
            </button>
            <button onClick={handleEditEvent}>Cancel</button>
            <button onClick={handleDeleteEvent}>Delete Event</button>
          </div>
        </div>
      )}
      {newEventTitle && <EventDetails title={newEventTitle} />}
    </div>
  );
};

export default MyCalendar;
