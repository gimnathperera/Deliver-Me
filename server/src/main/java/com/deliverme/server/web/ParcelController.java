package com.deliverme.server.web;

import com.deliverme.server.domain.Deliver;
import com.deliverme.server.domain.Driver;
import com.deliverme.server.domain.Parcel;
import com.deliverme.server.services.MapValidationErrorService;
import com.deliverme.server.services.ParcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@CrossOrigin
@RestController
@RequestMapping("/api/parcels")
public class ParcelController {

    @Autowired
    private ParcelService parcelService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createParcel(@Valid @RequestBody Parcel parcel, BindingResult result, Principal principal) {

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;
        Parcel parcel1 = parcelService.saveOrUpdateParcel(parcel, principal.getName());
        return new ResponseEntity<Parcel>(parcel, HttpStatus.CREATED);
    }

 //anyone with a valid token can just view any parcel- if needed
    @GetMapping("/{id}")
    public ResponseEntity<?> findParcelById(@PathVariable Long id) {

        Parcel parcel = parcelService.findParcelById(id);
        return new ResponseEntity<Parcel>(parcel, HttpStatus.FOUND);
    }


// only owner of a parcel can view the specific parcel
    @GetMapping("/parcel/{id}")
    public ResponseEntity<?> findParcelByIdByOwner(@PathVariable Long id, Principal principal) {

        Parcel parcel = parcelService.findParcelByIdByOwner(id, principal.getName());
        return new ResponseEntity<Parcel>(parcel, HttpStatus.FOUND);
    }


// get all parcels in the system
    @GetMapping("")
    public Iterable<Parcel> getAllParcels() {
        return parcelService.findAllParcels();
    }


//get all the parcels are owned by specific owner
    @GetMapping("/all")
    public Iterable<Parcel> getAllParcelsByUser(Principal principal) {
        return parcelService.findAllParcelsByUser(principal.getName());
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteParcelById(@PathVariable Long id, Principal principal) {
        parcelService.deleteParcelById(id, principal.getName());
        return new ResponseEntity<String>("Parcel with id " + id + " was deleted", HttpStatus.OK);
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<?> deleteParcelAdmin(@PathVariable Long id) {
        parcelService.deleteParcelAdmin(id);
        return new ResponseEntity<String>("Parcel with id " + id + " was deleted", HttpStatus.OK);
    }


//status change of a parcel-only can be update status by owner of the parcel
    @PutMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<Parcel> updateParcelStatus(
            @PathVariable(value = "id") Long id, @RequestBody Parcel parcel, Principal principal) {
        int status = parcel.getStatus();
        return new ResponseEntity<>(parcelService.updateParcelStatus(id, status, principal.getName()), HttpStatus.OK);
    }


//status change of a parcel made public temporary should be done by drivers only
    @PutMapping(value = "/parcel/{id}", produces = "application/json")
    public ResponseEntity<Parcel> updateParcelStatusDriver(
            @PathVariable(value = "id") Long id, @RequestBody Parcel parcel) {

        int status = parcel.getStatus();
        System.out.println("status"+status);
        return new ResponseEntity<>(parcelService.updateParcelStatusDriver(id, status), HttpStatus.OK);
    }


    @PutMapping(value = "/delivery/{id}", produces = "application/json")
    public ResponseEntity<Parcel> createDelivery(
            @PathVariable(value = "id") Long id, @RequestBody Deliver deliver) {

        System.out.println(deliver);
        String driver_name = deliver.getDriver_name();
        int status = deliver.getStatus();
        return new ResponseEntity<>(parcelService.createDelivery(id, status, driver_name), HttpStatus.OK);
    }

    // get all deliveries for a specific driver
    @GetMapping("/delivery/{driver_id}")
    public Iterable<Parcel> getAllDeliveriesForADriver(@PathVariable Long driver_id) {

        return parcelService.getAllDeliveriesForADriver(driver_id);
    }

}
