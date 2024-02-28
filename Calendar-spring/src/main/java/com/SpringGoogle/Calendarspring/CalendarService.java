package com.SpringGoogle.Calendarspring;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.Events;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.calendar.model.Event;
import com.google.api.client.util.DateTime;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Collections;
import java.util.List;
import java.time.Instant;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Scheduled;
import java.time.format.DateTimeFormatter;

@Service
public class CalendarService {

    private final Calendar calendar;
    private final DateTimeFormatter dateTimeFormatter;

    public CalendarService(Credential credential, DateTimeFormatter dateTimeFormatter) throws GeneralSecurityException, IOException {
        this.dateTimeFormatter = dateTimeFormatter;
        try {
            this.calendar = new Calendar.Builder(
                    GoogleNetHttpTransport.newTrustedTransport(),
                    GsonFactory.getDefaultInstance(),
                    credential)
                    .setApplicationName("Google Calendar API Spring Boot")
                    .build();
        } catch (GeneralSecurityException | IOException e) {
            e.printStackTrace();
            throw e;
        }
    }

    public List<Event> getUpcomingEvents() throws IOException {
        DateTime now = new DateTime(System.currentTimeMillis());
        Events events = calendar.events().list("primary")
                .setMaxResults(10)
                .setTimeMin(now)
                .setOrderBy("startTime")
                .setSingleEvents(true)
                .execute();
        return events.getItems();
    }

    @Scheduled(fixedRate = 30000)
    public List<Event> fetchLatestEvents() {
        try {
            DateTime now = new DateTime(System.currentTimeMillis());
            Events events = calendar.events().list("primary")
                    .setMaxResults(1)
                    .setTimeMin(now)
                    .setOrderBy("startTime")
                    .setSingleEvents(true)
                    .execute();
            List<Event> latestEvents = events.getItems();
            return latestEvents;
        } catch (IOException e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }



    public String formatDateTime(DateTime dateTime) {
        Instant instant = Instant.ofEpochMilli(dateTime.getValue());
        LocalDateTime localDateTime = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
        return localDateTime.format(dateTimeFormatter);
    }
    public Event createEvent(Event event) throws IOException, GeneralSecurityException {

        return calendar.events().insert("primary", event).execute();
    }


}