package com.deliverme.server.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
public class Parcel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Location is required")
    private String location;
    @NotBlank(message = "Destination is required")
    private String destination;
    @Size(min = 3, max = 6, message = "Please use 3 to 6 characters")
    @NotBlank(message = "Weight is required")
    private String weight;
    @NotNull(message = "Status is required")
    private int status;
    @NotNull(message = "Qty is required")
    private int qty;

    private String parcelOwner;

    private Date created_At;

    private Date updated_At;


    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Customer customer;

    //ManyToOne with driver
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Driver driver;



    public Parcel() {
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getWeight() {
        return weight;
    }

    public void setWeight(String weight) {
        this.weight = weight;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getQty() {
        return qty;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }

    public Date getCreated_At() {
        return created_At;
    }

    public void setCreated_At(Date created_At) {
        this.created_At = created_At;
    }

    public Date getUpdated_At() {
        return updated_At;
    }

    public void setUpdated_At(Date updated_At) {
        this.updated_At = updated_At;
    }

    public String getParcelOwner() {
        return parcelOwner;
    }

    public void setParcelOwner(String parcelOwner) {
        this.parcelOwner = parcelOwner;
    }


    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Driver getDriver() {
        return driver;
    }

    public void setDriver(Driver driver) {
        this.driver = driver;
    }



    @PrePersist
    protected void onCreate(){
        this.created_At = new Date();
    }

    @PreUpdate
    protected void onUpdate(){
        this.updated_At = new Date();
    }

    @Override
    public String toString() {
        return "Parcel{" +
                "id=" + id +
                ", location='" + location + '\'' +
                ", destination='" + destination + '\'' +
                ", weight='" + weight + '\'' +
                ", status=" + status +
                ", qty=" + qty +
                ", created_At=" + created_At +
                ", updated_At=" + updated_At +
                '}';
    }
}
