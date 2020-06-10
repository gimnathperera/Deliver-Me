package com.deliverme.server.validator;

import com.deliverme.server.domain.Admin;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class AdminValidator implements Validator {

    @Override
    public boolean supports(Class<?> aClass) {
      return Admin.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {
        Admin admin = (Admin) object;
        if (admin.getPassword().length() < 6) {
            errors.rejectValue("password", "Length", "Password must be at least 6 characters");
        }
        if (!admin.getPassword().equals(admin.getConfirmPassword())) {
            errors.rejectValue("confirmPassword", "Match", "Passwords must match");
        }

    }
}
