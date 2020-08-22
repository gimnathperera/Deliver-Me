package com.deliverme.server.services;

import com.deliverme.server.domain.Customer;
import com.deliverme.server.domain.Driver;
import com.deliverme.server.exceptions.UserNotFoundException;
import com.deliverme.server.exceptions.UsernameAlreadyExistsException;
import com.deliverme.server.repositories.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class DriverService {

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public Driver saveUser(Driver newDriver) {

        try {
            newDriver.setPassword(bCryptPasswordEncoder.encode(newDriver.getPassword()));
            newDriver.setUsername((newDriver.getUsername()));
            //username has to be unique (exception)
            //make sure that password and confirm password match
            //we don't persist or show the confirm password
            newDriver.setConfirmPassword("");
            newDriver.setType(newDriver.getType());
            return driverRepository.save(newDriver);
        } catch (Exception ex) {
            throw new UsernameAlreadyExistsException(("Username " + newDriver.getUsername() + " is already exists"));
        }

    }

    public Driver createAdminDriver(String username, String fullName, String password, String mobile, String confirmPassword, String type, int status) {
        try {
            String encryptedPassword = bCryptPasswordEncoder.encode(password);

            Driver newDriver = new Driver(username, fullName, encryptedPassword, mobile, confirmPassword, type, status);
            return driverRepository.save(newDriver);
        } catch (Exception ex) {
            throw new UsernameAlreadyExistsException(("Username " + username + " is already exists"));

        }
    }


    //get all drivers
    public Iterable<Driver> findAllDrivers() {
        return driverRepository.findAll();
    }

// public Customer findCustomerById(Long id){
//        Customer customer = customerRepository.findCustomerById(id);
//        if(customer == null){
//           throw new UserNotFoundException("User with ID "+ id+ " is not found");
//        }
//        return  customer;
//    }
//
//
//    public void deleteCustomerById(Long id){
//        Customer customer = findCustomerById(id);
//        customerRepository.deleteById(id);
//    }

    public Driver findDriverById(Long id) {
        Driver driver = driverRepository.findDriverById(id);
        if (driver == null) {
            throw new UserNotFoundException("User with ID " + id + " is not found");
        }
        return driver;
    }


    public Driver updateDriverStatus(Long id, int status) {

        Driver driver = findDriverById(id);
        if (driver != null) {
            driver.setStatus(status);
            Driver updatedDriver = driverRepository.save(driver);
            return updatedDriver;
        } else {
            return null;
        }
    }


    public void deleteDriverById(Long id) {
        findDriverById(id);
        driverRepository.deleteById(id);
    }
}
