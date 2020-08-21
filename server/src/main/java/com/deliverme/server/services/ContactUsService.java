package com.deliverme.server.services;

import com.deliverme.server.domain.Message;
import com.deliverme.server.repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactUsService {

    @Autowired
    MessageRepository messageRepository;

    public Message createMessage(String senderEmail, String message){
        Message newMessage = new Message(senderEmail, message);
        return messageRepository.save(newMessage);
    }


    public Iterable<Message> findAllMessages(){
        return messageRepository.findAll();
    }

}
