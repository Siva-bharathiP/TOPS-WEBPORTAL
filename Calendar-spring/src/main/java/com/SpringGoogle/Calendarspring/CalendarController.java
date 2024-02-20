package com.SpringGoogle.Calendarspring;

import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.Events;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.google.api.services.calendar.model.Event;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;
import com.google.api.client.util.DateTime;
import java.time.format.DateTimeFormatter;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.SpringGoogle.Calendarspring.CalendarConfig;



@RestController
public class CalendarController {

    @Autowired
    private CalendarConfig config;

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @GetMapping("/calendar")
    public List<Event> getCalendarEvents() throws IOException, GeneralSecurityException {
        NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
        Calendar service = new Calendar.Builder(
                HTTP_TRANSPORT,
                CalendarConfig.JSON_FACTORY,
                config.getCredentials(HTTP_TRANSPORT))
                .setApplicationName(config.getApplicationName())
                .build();

        DateTime now = new DateTime(System.currentTimeMillis());
        Events events = service.events().list("primary")
                .setTimeMin(now)
                .setOrderBy("startTime")
                .setSingleEvents(true)
                .execute();
        return events.getItems();
    }


}
