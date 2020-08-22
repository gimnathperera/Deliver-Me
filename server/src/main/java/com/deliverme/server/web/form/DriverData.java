package com.deliverme.server.web.form;

import com.deliverme.server.domain.Driver;
import com.deliverme.server.domain.Parcel;
import com.deliverme.server.services.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.annotation.SessionScope;

import javax.annotation.ManagedBean;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@ManagedBean
@SessionScope
public class DriverData {

    @Autowired
    private DriverService driverService;

    private Collection<Driver> drivers = new ArrayList<>();


    public Collection<Driver> getDrivers() {
        driverService.findAllDrivers().forEach(drivers::add);

        return drivers;
    }




}
