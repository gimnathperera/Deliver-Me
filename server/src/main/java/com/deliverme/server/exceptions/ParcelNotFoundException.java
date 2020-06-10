package com.deliverme.server.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ParcelNotFoundException extends RuntimeException{

    public ParcelNotFoundException(String message) {
        super(message);
    }

}
