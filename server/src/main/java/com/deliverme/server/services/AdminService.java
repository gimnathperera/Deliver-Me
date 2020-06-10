package com.deliverme.server.services;

import com.deliverme.server.domain.Admin;
import com.deliverme.server.exceptions.UsernameAlreadyExistsException;
import com.deliverme.server.repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;


    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;



    public Admin saveUser(Admin newAdmin) {

        try {
            newAdmin.setPassword(bCryptPasswordEncoder.encode(newAdmin.getPassword()));
            newAdmin.setUsername((newAdmin.getUsername()));
            //username has to be unique (exception)
            //make sure that password and confirm password match
            //we don't persist or show the confirm password
            newAdmin.setConfirmPassword("");
            newAdmin.setType(newAdmin.getType());
            return adminRepository.save(newAdmin);
        } catch (Exception ex) {
            throw new UsernameAlreadyExistsException(("Username "+ newAdmin.getUsername()+" is already exists"));
        }

    }
}
