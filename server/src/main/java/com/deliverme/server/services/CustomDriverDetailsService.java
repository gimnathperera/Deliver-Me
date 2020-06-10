package com.deliverme.server.services;
import com.deliverme.server.domain.Driver;
import com.deliverme.server.repositories.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomDriverDetailsService implements UserDetailsService {
    @Autowired
    private DriverRepository driverRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Driver driver = driverRepository.findByUsername(username);
        if (driver == null) new UsernameNotFoundException("User not found");

        return driver;
    }

    @Transactional
    public Driver loadUserById(Long id) {
        Driver driver = driverRepository.getById(id);
        if (driver == null) new UsernameNotFoundException("User not found");

        return driver;

    }

}
