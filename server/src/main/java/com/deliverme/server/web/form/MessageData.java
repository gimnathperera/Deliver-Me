package com.deliverme.server.web.form;

import com.deliverme.server.domain.Message;
import com.deliverme.server.domain.Parcel;
import com.deliverme.server.services.ContactUsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.annotation.SessionScope;

import javax.annotation.ManagedBean;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;

@ManagedBean
@SessionScope
public class MessageData implements Serializable {

   @Autowired
    private ContactUsService contactUsService;

   public Collection<Message> messages = new ArrayList<>();

    public Collection<Message> getMessages(){
        contactUsService.findAllMessages().forEach(messages::add);
        return messages;
    }

}
