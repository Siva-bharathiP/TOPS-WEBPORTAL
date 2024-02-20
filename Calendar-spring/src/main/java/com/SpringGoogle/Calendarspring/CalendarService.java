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
import com.SpringGoogle.Calendarspring.CalendarController;
import java.time.format.DateTimeFormatter;

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


    public String formatDateTime(DateTime dateTime) {
        Instant instant = Instant.ofEpochMilli(dateTime.getValue());

        LocalDateTime localDateTime = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());

        return localDateTime.format(dateTimeFormatter);
    }

}