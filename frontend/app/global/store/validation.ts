// Mirrors the min/max constants from backend/utils/regex.py
// If you change a value in the backend, update it here too.

export const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const USER_FULLNAME_MIN = 2;
export const USER_FULLNAME_MAX = 255;

export const USER_ADDRESS_MIN = 2;
export const USER_ADDRESS_MAX = 255;

export const USER_PHONENUMBER_MIN = 4;
export const USER_PHONENUMBER_MAX = 16;

export const USER_PASSWORD_MIN = 8;
export const USER_PASSWORD_MAX = 50;

export const CAR_LICENSEPLATE_MIN = 2;
export const CAR_LICENSEPLATE_MAX = 10;
