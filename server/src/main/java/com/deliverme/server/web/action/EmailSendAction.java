package com.deliverme.server.web.action;

import com.deliverme.server.web.form.EmailForm;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

import javax.faces.context.FacesContext;
import javax.mail.*;
import javax.mail.internet.*;
import java.io.IOException;
import java.io.Serializable;
import java.util.Date;
import java.util.Properties;

@Component
@RequestScope
public class EmailSendAction implements Serializable {


    private final EmailForm emailForm;

    public EmailSendAction(EmailForm emailForm) {
        this.emailForm = emailForm;
    }

    public void sendmail() throws AddressException, MessagingException, IOException {


        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("dark123.splash@gmail.com", "darkdragonking");
            }
        });

        String receiverEmail = emailForm.getReceiverEmail();
        String subject = emailForm.getSubject();
        String msgContent = emailForm.getMsg();

        Message msg = new MimeMessage(session);
        msg.setFrom(new InternetAddress("dark123.splash@gmail.com", false));

        msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(receiverEmail));
        msg.setSubject(subject);
        msg.setContent(msgContent, "text/html");
        msg.setSentDate(new Date());

        MimeBodyPart messageBodyPart = new MimeBodyPart();
        messageBodyPart.setContent(msgContent, "text/html");

        Multipart multipart = new MimeMultipart();
        multipart.addBodyPart(messageBodyPart);
//        MimeBodyPart attachPart = new MimeBodyPart();

//        attachPart.attachFile("");
//        multipart.addBodyPart(attachPart);
        msg.setContent(multipart);
        Transport.send(msg);

        emailForm.setMsg(null);
        emailForm.setReceiverEmail(null);
        emailForm.setSubject(null);
        FacesContext.getCurrentInstance().getExternalContext().redirect("http://localhost:3000/admin-dashboard");
    }


}
