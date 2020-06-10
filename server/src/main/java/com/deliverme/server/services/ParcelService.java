package com.deliverme.server.services;

import com.deliverme.server.domain.Customer;
import com.deliverme.server.domain.Driver;
import com.deliverme.server.domain.Parcel;
import com.deliverme.server.exceptions.ParcelNotFoundException;
import com.deliverme.server.repositories.CustomerRepository;
import com.deliverme.server.repositories.DriverRepository;
import com.deliverme.server.repositories.ParcelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


//we are using a service layer in order to prevent putting so much logic on the controller layer
@Service
public class ParcelService {
    @Autowired
    private ParcelRepository parcelRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private DriverRepository driverRepository;

    public Parcel saveOrUpdateParcel(Parcel parcel, String username) {

        Customer customer = customerRepository.findByUsername(username);
        parcel.setCustomer(customer);
        parcel.setParcelOwner(customer.getUsername());
        return parcelRepository.save(parcel);
    }

    //anyone with a valid token can use this
    public Parcel findParcelById(Long id) {

        Parcel parcel = parcelRepository.findParcelById(id);
        if (parcel == null) {
            throw new ParcelNotFoundException("Parcel ID " + id + " does not exists");
        }
        return parcel;
    }

    //only owner of the parcel can use this
    public Parcel findParcelByIdByOwner(Long id, String username) {

        Parcel parcel = parcelRepository.findParcelById(id);
        if (parcel == null) {
            throw new ParcelNotFoundException("Parcel ID " + id + " does not exists");
        }
        if(!parcel.getParcelOwner().equals(username)){
            throw new ParcelNotFoundException("You have not access to this parcel");
        }

        return parcel;
    }


    //get all the parcels available in the system
    public Iterable<Parcel> findAllParcels() {
        return parcelRepository.findAll();
    }

    public Iterable<Parcel> getAllDeliveriesForADriver(Long driver_id) {
        return parcelRepository.findAllByDriver_Id(driver_id);
    }

    //get all parcels belongs to a specific user
    public Iterable<Parcel> findAllParcelsByUser(String username) {
        return parcelRepository.findAllByParcelOwner(username);
    }


    public void deleteParcelById(Long id, String username) {

        Parcel parcel = findParcelByIdByOwner(id, username);
        if (parcel != null) {
            parcelRepository.delete(parcel);
        }
    }

    public void deleteParcelAdmin(Long id){
        Parcel parcel = findParcelById(id);
        if(parcel != null){
            parcelRepository.delete(parcel);
        }
    }

    //status change of a parcel-only can be update status by owner of the parcel
    public Parcel updateParcelStatus(Long id, int status, String username) {

        Parcel parcel = findParcelByIdByOwner(id, username);
        if (parcel != null) {
            parcel.setStatus(status);
            Parcel updatedParcel = parcelRepository.save(parcel);
            return updatedParcel;
        } else {
            return null;
        }
    }

    //should be changed- temporary public
    public Parcel updateParcelStatusDriver(Long id, int status) {

        Parcel parcel = findParcelById(id);
        if (parcel != null) {
            parcel.setStatus(status);
            Parcel updatedParcel = parcelRepository.save(parcel);
            return updatedParcel;
        } else {
            return null;
        }
    }

    public Parcel createDelivery(Long id, int status, String driver_name) {

        Parcel parcel = findParcelById(id);
        Driver driver = driverRepository.findByUsername(driver_name);

        if (parcel != null && driver != null) {

            parcel.setStatus(status);
            parcel.setDriver(driver);
            Parcel updatedParcel = parcelRepository.save(parcel);
            return updatedParcel;
        } else {
            return null;
        }
    }



}
