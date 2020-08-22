package com.deliverme.server.web.form;
import com.deliverme.server.domain.Customer;
import com.deliverme.server.domain.Driver;
import com.deliverme.server.domain.Parcel;
import com.deliverme.server.services.CustomerService;
import com.deliverme.server.services.DriverService;
import com.deliverme.server.services.ParcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.annotation.SessionScope;
import javax.annotation.ManagedBean;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;


@ManagedBean
@SessionScope
public class ReportData implements Serializable {

    private final  DriverService driverService;
    private final   CustomerService customerService;
    private final ParcelService parcelService;


    public int customer_count;
    public int driver_count;
    public int pending_count;
    public int success_count;
    public int total_count;
    public int submitted_count;

    public ReportData(@Autowired DriverService driverService, @Autowired CustomerService customerService, @Autowired ParcelService parcelService) {
        this.driverService = driverService;
        this.customerService = customerService;
        this.parcelService = parcelService;
    }

    public int getCustomer_count() {
        Collection<Customer> customers = new ArrayList<>();
        customerService.findAllCustomers().forEach(customers:: add);
        customer_count = customers.size();
        return customer_count;
    }

    public int getDriver_count() {
        Collection<Driver> drivers = new ArrayList<>();
        driverService.findAllDrivers().forEach(drivers:: add);
        driver_count = drivers.size();
        return driver_count;
    }

    public int getPending_count() {
        Collection<Parcel> parcels = new ArrayList<>();
        Collection<Parcel> pendings = new ArrayList<>();

        parcelService.findAllParcels().forEach(parcels::add);
        for(Parcel parcel : parcels){

            if(parcel.getStatus() == 2){
                pendings.add(parcel);
            }
        }
        pending_count = pendings.size();
        return pending_count;
    }

    public int getSuccess_count() {
        Collection<Parcel> parcels = new ArrayList<>();
        Collection<Parcel> completes = new ArrayList<>();
        parcelService.findAllParcels().forEach(parcels::add);
        for(Parcel parcel : parcels){

            if(parcel.getStatus() == 3){
                completes.add(parcel);
            }
        }
        success_count = completes.size();
        return success_count;
    }

    public int getSubmitted_count() {
        Collection<Parcel> parcels = new ArrayList<>();
        Collection<Parcel> submits = new ArrayList<>();
        parcelService.findAllParcels().forEach(parcels::add);
        for(Parcel parcel: parcels){

            if(parcel.getStatus() ==1){
                submits.add(parcel);
            }
        }
        submitted_count = submits.size();
        return submitted_count;
    }

    public int getTotal_count() {

        Collection<Parcel> parcels = new ArrayList<>();
        parcelService.findAllParcels().forEach(parcels::add);
        total_count = parcels.size();
        return total_count;
    }


}
