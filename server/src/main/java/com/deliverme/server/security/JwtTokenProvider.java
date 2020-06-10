package com.deliverme.server.security;

import com.deliverme.server.domain.Customer;

import io.jsonwebtoken.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.deliverme.server.security.SecurityConstants.EXPIRATION_TIME;
import static com.deliverme.server.security.SecurityConstants.SECRET;


@Component
public class JwtTokenProvider {

    public String generateToken(Authentication authentication) {

        Customer customer = (Customer) authentication.getPrincipal();
        Date now = new Date(System.currentTimeMillis());

        Date expDate = new Date(now.getTime() + EXPIRATION_TIME);

        String userId = Long.toString(customer.getId());

        //things we are including in the token
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", (Long.toString(customer.getId())));
        claims.put("username", customer.getUsername());
        claims.put("fullName", customer.getFullName());
        claims.put("type", customer.getType());

        return Jwts.builder()
                .setSubject(userId)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expDate)
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token);
            return true;
        } catch (SignatureException ex) {
            System.out.printf("Invalid Signature");
        } catch (MalformedJwtException ex) {
            System.out.printf("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            System.out.println("Token is expired");
        } catch (UnsupportedJwtException ex) {
            System.out.println("Unsupported JTW token");
        } catch (IllegalArgumentException ex) {
            System.out.println("JWT claims string is empty");
        }
        return false;
    }


    public Long getUserIdFromJwt(String token) {
        Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
        String id = (String) claims.get("id");

        return Long.parseLong(id);
    }

    public  String getUserTypeFromJwt(String token){
        Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
        String type = (String) claims.get("type");

        return type;
    }
}
