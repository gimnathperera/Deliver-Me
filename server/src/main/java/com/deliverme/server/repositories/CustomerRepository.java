package com.deliverme.server.repositories;

import com.deliverme.server.domain.Customer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends CrudRepository<Customer, Long> {

    Customer findByUsername(String username);
    Customer getById(Long id);

    Customer findCustomerById(Long id);
    //we can use
    //Optional<User> findById(Long id) instead of getById

}
