package com.deliverme.server.web;

import com.deliverme.server.domain.Customer;
import com.deliverme.server.domain.Driver;
import com.deliverme.server.domain.Parcel;
import com.deliverme.server.services.CustomerService;
import com.deliverme.server.services.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class CustomerController {
    @Autowired
    private DriverService driverService;

    @Autowired
    private CustomerService customerService;


    @GetMapping("/drivers")
    public Iterable<Driver> getAllDrivers(){
        return driverService.findAllDrivers();
    }

    @GetMapping("/customers")
    public Iterable<Customer> getAllCustomers() {
        return customerService.findAllCustomers();
    }


    @DeleteMapping("/customers/{id}")
    public ResponseEntity<?> deleteCustomerById(@PathVariable Long id){
        customerService.deleteCustomerById(id);
        return new ResponseEntity<String>("User with id "+id +" is deleted", HttpStatus.OK);
    }

    //status change of a customer made public temporary should be done by admin only
    @PutMapping(value = "/customer/{id}", produces = "application/json")
    public ResponseEntity<Customer> updateUserStatus(
            @PathVariable(value = "id") Long id, @RequestBody Customer customer) {

        int status = customer.getStatus();
        System.out.println("status"+status);
        return new ResponseEntity<>(customerService.updateCustomerStatus(id, status), HttpStatus.OK);
    }


    //status change of a driver made public temporary should be done by admin only
    @PutMapping(value = "/driver/{id}", produces = "application/json")
    public ResponseEntity<Driver> updateDriverStatus(
            @PathVariable(value = "id") Long id, @RequestBody Driver driver) {

        int status = driver.getStatus();
        System.out.println("status"+status);
        return new ResponseEntity<>(driverService.updateDriverStatus(id, status), HttpStatus.OK);
    }

    @DeleteMapping("/drivers/{id}")
    public ResponseEntity<?> deleteDriverById(@PathVariable Long id){
        driverService.deleteDriverById(id);
        return new ResponseEntity<String>("User with id "+id +" is deleted", HttpStatus.OK);
    }


    }
