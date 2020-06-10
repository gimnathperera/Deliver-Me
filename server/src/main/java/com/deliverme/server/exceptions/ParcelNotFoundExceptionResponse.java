package com.deliverme.server.exceptions;

public class ParcelNotFoundExceptionResponse {
    private String ParcelNotFound;
    public String getParcelNotFoundFound() {
        return ParcelNotFound;
    }
    public void setParcelNotFound(String parcelNotFound) {
        ParcelNotFound = parcelNotFound;
    }

    public ParcelNotFoundExceptionResponse(String parcelNotFound){
        ParcelNotFound = parcelNotFound;
    }

}
