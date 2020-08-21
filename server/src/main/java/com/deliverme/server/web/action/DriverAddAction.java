package com.deliverme.server.web.action;


import com.deliverme.server.domain.Driver;
import com.deliverme.server.services.DriverService;
import com.deliverme.server.web.form.DriverForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

import javax.faces.context.FacesContext;
import java.io.IOException;
import java.io.Serializable;

@Component
@RequestScope
public class DriverAddAction implements Serializable {
    //    private final Driver driver;
    private final DriverService driverService;
    private final DriverForm driverForm;


    public DriverAddAction(@Autowired DriverService driverService, @Autowired DriverForm driverForm) {

        this.driverService = driverService;
        this.driverForm = driverForm;
    }

    public void saveDriverData() throws IOException {

        String fullName = driverForm.getFullname();
        String mobile = driverForm.getMobile();
        String password = driverForm.getPassword();
        String email = driverForm.getEmail();

        driverService.createAdminDriver(email, fullName, password, mobile, password, "driver", 1);

        driverForm.setEmail(null);
        driverForm.setFullname(null);
        driverForm.setMobile(null);
        driverForm.setPassword(null);
        FacesContext.getCurrentInstance().getExternalContext().redirect("http://localhost:3000/admin-drivers");

    }


}
