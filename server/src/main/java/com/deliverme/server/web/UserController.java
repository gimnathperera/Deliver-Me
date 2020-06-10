package com.deliverme.server.web;


import com.deliverme.server.domain.Admin;
import com.deliverme.server.domain.Customer;
import com.deliverme.server.domain.Driver;
import com.deliverme.server.payload.JWTLoginSucessResponse;
import com.deliverme.server.payload.LoginRequest;
import com.deliverme.server.security.JwtTokenProvider;
import com.deliverme.server.security.JwtTokenProviderAdmin;
import com.deliverme.server.security.JwtTokenProviderDriver;
import com.deliverme.server.services.AdminService;
import com.deliverme.server.services.DriverService;
import com.deliverme.server.services.MapValidationErrorService;
import com.deliverme.server.services.CustomerService;
import com.deliverme.server.validator.AdminValidator;
import com.deliverme.server.validator.DriverValidator;
import com.deliverme.server.validator.CustomerValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.security.Principal;

import static com.deliverme.server.security.SecurityConstants.TOKEN_PREFIX;


@CrossOrigin
@RestController
@RequestMapping("/api/customers")
public class UserController {


    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private DriverService driverService;

    @Autowired
    private AdminService adminService;

    @Autowired
    private CustomerValidator customerValidator;

    @Autowired
    private DriverValidator driverValidator;

    @Autowired
    private AdminValidator adminValidator;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private JwtTokenProviderDriver jwtTokenProviderDriver;

    @Autowired
    private JwtTokenProviderAdmin jwtTokenProviderAdmin;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login-customer")
    public ResponseEntity<?> authenticateCustomer(@Valid @RequestBody LoginRequest loginRequest, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX + jwtTokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JWTLoginSucessResponse(true, jwt));
    }

    @PostMapping("/login-driver")
    public ResponseEntity<?> authenticateDriver(@Valid @RequestBody LoginRequest loginRequest, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX + jwtTokenProviderDriver.generateToken(authentication);

        return ResponseEntity.ok(new JWTLoginSucessResponse(true, jwt));
    }


    @PostMapping("/login-admin")
    public  ResponseEntity<?> authenticateAdmin(@Valid @RequestBody LoginRequest loginRequest, BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return  errorMap;

        Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX + jwtTokenProviderAdmin.generateToken(authentication);

        return ResponseEntity.ok(new JWTLoginSucessResponse(true, jwt));
    }




    @PostMapping("/register-customer")
    public ResponseEntity<?> registerCustomer(@Valid @RequestBody Customer customer, BindingResult result) {
        //validate password match
        customerValidator.validate(customer, result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        Customer newCustomer = customerService.saveUser(customer);
        return new ResponseEntity<Customer>(newCustomer, HttpStatus.CREATED);
    }


    @PostMapping("/register-driver")
    public ResponseEntity<?> registerDriver(@Valid @RequestBody Driver driver, BindingResult result) {
        //validate password match
        driverValidator.validate(driver, result);
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        Driver newDriver = driverService.saveUser(driver);
        return new ResponseEntity<Driver>(newDriver, HttpStatus.CREATED);
    }


    @PostMapping("/register-admin")
    public ResponseEntity<?> registerAdmin(@Valid @RequestBody Admin admin, BindingResult result){
        //validate password match
        adminValidator.validate(admin, result);
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        Admin newAdmin = adminService.saveUser(admin);
        return new ResponseEntity<Admin>(newAdmin, HttpStatus.CREATED);

    }



}
