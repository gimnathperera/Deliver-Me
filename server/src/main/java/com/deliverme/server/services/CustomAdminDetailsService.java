package com.deliverme.server.services;

import com.deliverme.server.domain.Admin;
import com.deliverme.server.repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomAdminDetailsService implements UserDetailsService {

    @Autowired
    private AdminRepository  adminRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Admin admin = adminRepository.findByUsername(username);
        if(admin == null) new UsernameNotFoundException("User not found");

        return  admin;
    }

    @Transactional
    public Admin loadUserById(Long id) {
        Admin admin = adminRepository.getById(id);
        if(admin == null) new UsernameNotFoundException("User not found");

        return admin;
    }
}
