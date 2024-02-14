// import React, { useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import { EventInput } from '@fullcalendar/core';

// interface FullCalendarProps {
//   initialEvents: EventInput[];
// }

// const FullCalendarComponent: React.FC<FullCalendarProps> = ({ initialEvents }) => {
//   const [events, setEvents] = useState<EventInput[]>(initialEvents);

//   const handleDateSelect = (selectInfo: any) => {
//     const title = prompt('Please enter a new title for your event');
//     if (title) {
//       const newEvent: EventInput = {
//         id: createEventId(),
//         title: title,
//         start: selectInfo.startStr,
//         end: selectInfo.endStr,
//         allDay: selectInfo.allDay,
//       };
//       setEvents([...events, newEvent]);
//     }
//   };

//   const handleEventClick = (clickInfo: any) => {
//     if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'?`)) {
//       const updatedEvents = events.filter((event) => event.id !== clickInfo.event.id);
//       setEvents(updatedEvents);
//     }
//   };

//   return (
//     <FullCalendar
//       plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//       headerToolbar={{
//         left: 'prev,next today',
//         center: 'title',
//         right: 'dayGridMonth,timeGridWeek,timeGridDay',
//       }}
//       initialView='dayGridMonth'
//       editable={true}
//       selectable={true}
//       selectMirror={true}
//       dayMaxEvents={true}
//       events={events}
//       select={handleDateSelect}
//       eventClick={handleEventClick}
//     />
//   );
// };

// function createEventId() {
//   return String(Date.now());
// }

// export default FullCalendarComponent;
