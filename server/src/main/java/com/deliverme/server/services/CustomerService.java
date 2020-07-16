package com.deliverme.server.services;

import com.deliverme.server.domain.Customer;


import com.deliverme.server.exceptions.UserNotFoundException;
import com.deliverme.server.exceptions.UsernameAlreadyExistsException;
import com.deliverme.server.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;

import javax.xml.ws.Response;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public Customer saveUser(Customer newCustomer) {

        try {
            newCustomer.setPassword(bCryptPasswordEncoder.encode(newCustomer.getPassword()));
            newCustomer.setUsername((newCustomer.getUsername()));
            //username has to be unique (exception)
            //make sure that password and confirm password match
            //we don't persist or show the confirm password
            newCustomer.setConfirmPassword("");
            newCustomer.setType(newCustomer.getType());
            return customerRepository.save(newCustomer);
        } catch (Exception ex) {
            throw new UsernameAlreadyExistsException(("Username " + newCustomer.getUsername() + " is already exists"));
        }

    }

    public Iterable<Customer> findAllCustomers() {
        return customerRepository.findAll();
    }


    public Customer findCustomerById(Long id){
        Customer customer = customerRepository.findCustomerById(id);
        if(customer == null){
           throw new UserNotFoundException("User with ID "+ id+ " is not found");
        }
        return  customer;
    }


    public void deleteCustomerById(Long id){
        Customer customer = findCustomerById(id);
        customerRepository.deleteById(id);
    }

    public Customer updateCustomerStatus(Long id, int status) {

        Customer customer = findCustomerById(id);
        if (customer != null) {
            customer.setStatus(status);
            Customer updatedCustomer = customerRepository.save(customer);
            return updatedCustomer;
        } else {
            return null;
        }
    }


}
