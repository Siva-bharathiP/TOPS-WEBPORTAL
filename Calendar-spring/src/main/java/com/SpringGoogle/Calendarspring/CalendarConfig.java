    package com.SpringGoogle.Calendarspring;

    import org.springframework.context.annotation.Configuration;
    import org.springframework.context.annotation.Bean;
    import com.google.api.client.auth.oauth2.Credential;
    import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
    import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
    import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
    import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
    import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
    import com.google.api.client.http.javanet.NetHttpTransport;
    import com.google.api.client.json.JsonFactory;
    import com.google.api.client.json.gson.GsonFactory;
    import com.google.api.client.util.store.FileDataStoreFactory;
    import com.google.api.client.util.DateTime;
    import com.google.api.services.calendar.Calendar;
    import com.google.api.services.calendar.CalendarScopes;
    import java.io.FileNotFoundException;
    import java.io.IOException;
    import java.io.InputStream;
    import java.io.InputStreamReader;
    import java.security.GeneralSecurityException;
    import java.util.Arrays;
    import java.util.List;
    import java.time.format.DateTimeFormatter;
    @Configuration
    public class CalendarConfig {

        private static final String APPLICATION_NAME = "Google Calendar API Spring Boot";
        public static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
        private static final String CREDENTIALS_FILE_PATH = "/credentials.json";
        private static final String TOKENS_DIRECTORY_PATH = "tokens";
        private static final List<String> SCOPES = Arrays.asList(
                CalendarScopes.CALENDAR
        );
        @Bean
        public NetHttpTransport netHttpTransport() {
            try {
                return GoogleNetHttpTransport.newTrustedTransport();
            } catch (GeneralSecurityException | IOException e) {
                e.printStackTrace();
                throw new RuntimeException(e);
            }
        }
        @Bean
        public DateTimeFormatter dateTimeFormatter() {
            return DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        }
        @Bean
        public DateTime dateTime() {
            return new DateTime(System.currentTimeMillis());
        }

        @Bean
        public Calendar getCalendarService() throws IOException, GeneralSecurityException {
            NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
            Credential credential = getCredentials(HTTP_TRANSPORT);
            return new Calendar.Builder(
                    GoogleNetHttpTransport.newTrustedTransport(),
                    JSON_FACTORY,
                    credential)
                    .setApplicationName(APPLICATION_NAME)
                    .build();
        }


        @Bean
        public Credential getCredentials(final NetHttpTransport netHttpTransport) throws IOException, GeneralSecurityException {
            try {
                InputStream in = getClass().getResourceAsStream(CREDENTIALS_FILE_PATH);
                if (in == null) {
                    throw new FileNotFoundException("Resource not found: " + CREDENTIALS_FILE_PATH);
                }
                GoogleClientSecrets clientSecrets =
                        GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));

                // Build flow and trigger user authorization request.
                GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                        netHttpTransport, JSON_FACTORY, clientSecrets, SCOPES)
                        .setDataStoreFactory(new FileDataStoreFactory(new java.io.File(TOKENS_DIRECTORY_PATH)))
                        .setAccessType("offline")
                        .build();
                LocalServerReceiver receiver = new LocalServerReceiver.Builder().setPort(8888).build();
                Credential credential = new AuthorizationCodeInstalledApp(flow, receiver).authorize("user");
                // Returns an authorized Credential object.
                return credential;
            } catch (FileNotFoundException e) {
                System.err.println("FileNotFoundException: " + e.getMessage());
                throw new RuntimeException(e);
            } catch (IOException e) {
                System.err.println("IOException: " + e.getMessage());
                throw new RuntimeException(e);
            }
        }

        @Bean
        public static String getApplicationName() {
            return APPLICATION_NAME;
        }

    }