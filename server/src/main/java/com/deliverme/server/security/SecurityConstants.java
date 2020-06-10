package com.deliverme.server.security;

public class SecurityConstants {

    public static final String SIGN_UP_URLS = "/api/customers/**";
    public static final String H2_URL = "h2-console/**";
    public static final String SECRET = "secretKey";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final long EXPIRATION_TIME = 900_000;
}
