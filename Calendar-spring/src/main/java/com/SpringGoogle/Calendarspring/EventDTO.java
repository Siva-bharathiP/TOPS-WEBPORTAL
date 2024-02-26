package com.SpringGoogle.Calendarspring;

import com.google.api.services.calendar.model.EventReminder;
import org.springframework.stereotype.Component;

@Component
public class EventDTO {

    private String summary;
    private String location;
    private String description;
    private String startDateTime;
    private String endDateTime;
    private String timeZone;
    private String[] recurrence;
    private String[] attendees;
    private EventReminder[] reminderOverrides;

    // Getters and setters

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStartDateTime() {
        return startDateTime;
    }

    public void setStartDateTime(String startDateTime) {
        this.startDateTime = startDateTime;
    }

    public String getEndDateTime() {
        return endDateTime;
    }

    public void setEndDateTime(String endDateTime) {
        this.endDateTime = endDateTime;
    }

    public String getTimeZone() {
        return timeZone;
    }

    public void setTimeZone(String timeZone) {
        this.timeZone = timeZone;
    }

    public String[] getRecurrence() {
        return recurrence;
    }

    public void setRecurrence(String[] recurrence) {
        this.recurrence = recurrence;
    }

    public String[] getAttendees() {
        return attendees;
    }

    public void setAttendees(String[] attendees) {
        this.attendees = attendees;
    }

    public EventReminder[] getReminderOverrides() {
        return reminderOverrides;
    }

    public void setReminderOverrides(EventReminder[] reminderOverrides) {
        this.reminderOverrides = reminderOverrides;
    }
}
