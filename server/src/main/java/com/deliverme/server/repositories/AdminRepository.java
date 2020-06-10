package com.deliverme.server.repositories;

import com.deliverme.server.domain.Admin;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AdminRepository extends CrudRepository<Admin, Long> {

    Admin findByUsername(String username);
    Admin getById(Long id);

    //we can use
    //Optional<User> findById(Long id) instead of getById
}
