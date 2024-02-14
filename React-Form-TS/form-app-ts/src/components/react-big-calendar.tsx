import { FC, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

interface MyEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

interface MyCalendarProps {
    events: MyEvent[];
    onSelectDate: (date: Date) => void;
    onAddEvent: (event: MyEvent) => void;
    onUpdateEvent: (event: MyEvent) => void;
  }
const DragAndDropCalendar = withDragAndDrop(Calendar);

const MyCalendar: FC<MyCalendarProps> = (props) => {
  const localizer = momentLocalizer(moment);
  const [isAddingEvent, setIsAddingEvent] = useState<boolean>(false);
  const [newEventDate, setNewEventDate] = useState<Date | null>(null);
  const [newEventTitle, setNewEventTitle] = useState<string>("");

  const handleSelectSlot = (slotInfo: any) => {
    if (slotInfo.action === "click") {
      props.onSelectDate(slotInfo.start);
      setIsAddingEvent(true);
      setNewEventDate(slotInfo.start);
    }
  };

  const handleAddEvent = (newEvent: MyEvent) => {
    if (newEventDate && newEventTitle.trim() !== "") {
      props.onAddEvent({
        ...newEvent,
        id: Math.random().toString(36).substr(2, 9),
      });
      setIsAddingEvent(false);
      setNewEventDate(null);
      setNewEventTitle("");
    }
  };

  const handleEventDrop = (event: MyEvent, slotInfo: any) => {
    const updatedEvent: MyEvent = {
      ...event,
      start: slotInfo.start,
      end: slotInfo.end,
    };
    props.onUpdateEvent(updatedEvent);
  };
  return (
    <div>
      <DragAndDropCalendar
        events={props.events}
        startAccessor={(event: object) => (event as MyEvent).start}
endAccessor={(event: object) => (event as MyEvent).end}
        localizer={localizer}
        style={{ height: 500 }}
        selectable={true}
        onSelectSlot={handleSelectSlot}
        onEventDrop={handleEventDrop}
      />
      {isAddingEvent && (
        <div>
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
      )}
    </div>
  );
};

export default MyCalendar;
