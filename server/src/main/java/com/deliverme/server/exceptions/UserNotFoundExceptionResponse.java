package com.deliverme.server.exceptions;

public class UserNotFoundExceptionResponse {
    private String UserNotFound;
    public String getUserNotFound() {
        return UserNotFound;
    }

    public void setUserNotFound(String userNotFound) {
        UserNotFound = userNotFound;
    }

    public UserNotFoundExceptionResponse(String userNotFound) {
        UserNotFound = userNotFound;
    }
}
