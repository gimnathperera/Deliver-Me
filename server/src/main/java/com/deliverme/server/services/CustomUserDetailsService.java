package com.deliverme.server.services;

import com.deliverme.server.domain.Admin;
import com.deliverme.server.domain.Customer;
import com.deliverme.server.domain.Driver;
import com.deliverme.server.repositories.AdminRepository;
import com.deliverme.server.repositories.CustomerRepository;
import com.deliverme.server.repositories.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private CustomerRepository customerRepository;


    @Autowired
    private DriverRepository driverRepository;


    @Autowired
    private AdminRepository adminRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Customer customer = customerRepository.findByUsername(username);
        Driver driver = driverRepository.findByUsername(username);
        Admin admin = adminRepository.findByUsername(username);

        if (customer != null) {
            return customer;
        }
        if (driver != null) {
            return driver;
        }
        if (admin != null) {
            return admin;
        }
        if (driver == null && customer == null && admin == null) new UsernameNotFoundException("User not found");

        return null;
    }

    @Transactional
    public Customer loadUserById(Long id) {
        Customer customer = customerRepository.getById(id);
        if (customer == null) new UsernameNotFoundException("User not found");

        return customer;

    }
}
