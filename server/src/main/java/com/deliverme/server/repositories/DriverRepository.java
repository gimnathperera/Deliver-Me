package com.deliverme.server.repositories;

import com.deliverme.server.domain.Driver;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DriverRepository extends CrudRepository<Driver, Long> {
    Driver findByUsername(String username);
    Driver getById(Long id);

    Driver findDriverById(Long id);
    @Override
    Iterable<Driver> findAll();

    //we can use
    //Optional<User> findById(Long id) instead of getById
}
