    package com.SpringGoogle.Calendarspring;

    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.web.bind.annotation.GetMapping;
    import org.springframework.web.bind.annotation.RestController;
    import org.springframework.web.bind.annotation.PostMapping;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.RequestBody;
    import com.google.api.services.calendar.model.Event;
    import org.springframework.http.HttpStatus;
    import java.io.IOException;
    import java.security.GeneralSecurityException;
    import java.util.Collections;
    import java.util.List;
    import com.google.api.client.util.DateTime;
    import java.time.format.DateTimeFormatter;
    import org.springframework.web.bind.annotation.CrossOrigin;
    import com.google.api.services.calendar.model.EventDateTime;

    @CrossOrigin(origins = "http://localhost:5173")

    @RestController
    public class CalendarController {

        @Autowired
        private CalendarConfig config;

        @Autowired
        private CalendarService calendarService;

        private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @GetMapping("/calendar")
    public List<Event> getCalendarEvents() throws IOException {
        return calendarService.getUpcomingEvents();
    }

        @GetMapping("/Events")
        public List<Event> fetchCalendarEvents() throws IOException {
            return calendarService.fetchLatestEvents();
        }

        @PostMapping("/create-event")
        public ResponseEntity<String> createEvent(@RequestBody EventDTO eventDTO) {
            try {
                Event event = new Event();
                event.setSummary(eventDTO.getSummary());
                event.setLocation(eventDTO.getLocation());
                event.setDescription(eventDTO.getDescription());

                // Set start and end date times
                DateTime startDateTime = new DateTime(eventDTO.getStartDateTime());
                EventDateTime start = new EventDateTime().setDateTime(startDateTime);
                event.setStart(start);

                DateTime endDateTime = new DateTime(eventDTO.getEndDateTime());
                EventDateTime end = new EventDateTime().setDateTime(endDateTime);
                event.setEnd(end);

                // Set time zone
                event.setSummary(eventDTO.getTimeZone());

                // Set other properties as needed

                Event createdEvent = calendarService.createEvent(event);

                return ResponseEntity.ok("Event created successfully: " + createdEvent.getHtmlLink());
            } catch (IOException | GeneralSecurityException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create event");
            }
        }

    }   