package com.deliverme.server.validator;
import com.deliverme.server.domain.Driver;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class DriverValidator implements Validator {
    @Override
    public boolean supports(Class<?> aClass) {
        return Driver.class.equals(aClass);
    }
    @Override
    public void validate(Object object, Errors errors) {
        Driver driver = (Driver) object;

        if (driver.getPassword().length() < 6) {
            errors.rejectValue("password", "Length", "Password must be at least 6 characters");
        }
        if (!driver.getPassword().equals(driver.getConfirmPassword())) {
            errors.rejectValue("confirmPassword", "Match", "Passwords must match");
        }

    }
}
