package co.com.sofka.questions.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import reactor.core.publisher.Mono;

@Service
@Validated
public class EmailService {

    private static final String NOREPLY_ADDRESS = "wiltonhm@hotmail.com";

    @Autowired
    private JavaMailSender javaMailSender;

    public EmailService(){}

    public Mono<String> sendEmailMessage(String to, String subject, String text) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(NOREPLY_ADDRESS);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);

            javaMailSender.send(message);

            return Mono.just("Message succesfully sent");
        } catch (MailException exception) {
            System.out.println(exception.getMessage());
            return Mono.just(exception.getMessage());
        }
    }
}
