package com.deliverme.server.web.action;

import com.deliverme.server.domain.Message;
import com.deliverme.server.services.ContactUsService;
import com.deliverme.server.web.form.ContactUsForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import javax.faces.context.Flash;
import java.io.IOException;
import java.io.Serializable;

@Component
@RequestScope
public class ContactUsAction implements Serializable {

    private final ContactUsService contactUsService;
    private final ContactUsForm contactUsForm;


    public ContactUsAction(@Autowired ContactUsService contactUsService,@Autowired ContactUsForm contactUsForm) {
        this.contactUsService = contactUsService;
        this.contactUsForm = contactUsForm;
    }

    public void saveMsg() throws IOException {

        String senderEmail = contactUsForm.getSenderEmail();
        String msg = contactUsForm.getMsg();
        System.out.println("===================================");
        System.out.println(senderEmail);
        System.out.println(msg);
        System.out.println("===================================");

        Message newMessage = contactUsService.createMessage(senderEmail, msg);

        contactUsForm.setMsg(null);
        contactUsForm.setSenderEmail(null);
        contactUsForm.setUsername(null);


        FacesContext facesContext = FacesContext.getCurrentInstance();
        Flash flash = facesContext.getExternalContext().getFlash();
        flash.setKeepMessages(true);
        flash.setRedirect(true);
        facesContext.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_INFO,"Sample info message", "PrimeFaces rocks!"));
        FacesContext.getCurrentInstance().getExternalContext().redirect("http://localhost:3000/");
    }

}
