package com.deliverme.server.web;

import com.deliverme.server.domain.Customer;
import com.deliverme.server.domain.Driver;
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
    @DeleteMapping("/drivers/{id}")
    public ResponseEntity<?> deleteDriverById(@PathVariable Long id){
        driverService.deleteDriverById(id);
        return new ResponseEntity<String>("User with id "+id +" is deleted", HttpStatus.OK);
    }


    }
