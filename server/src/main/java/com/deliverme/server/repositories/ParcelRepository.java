package com.deliverme.server.repositories;

import com.deliverme.server.domain.Driver;
import com.deliverme.server.domain.Parcel;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParcelRepository extends CrudRepository<Parcel, Long> {

    Parcel findParcelById(Long id);



    @Override
    Iterable<Parcel> findAll();

    Iterable<Parcel> findAllByParcelOwner(String username);
    Iterable<Parcel> findAllByDriver_Id(Long driver_id);


    @Override
    void delete(Parcel parcel);
}
