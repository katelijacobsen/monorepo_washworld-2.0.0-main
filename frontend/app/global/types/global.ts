// Session
export type User = {
  user_pk: string;
  user_fullname: string;
  user_email: string;
  user_phonenumber: string;
  user_address: string;
  user_created_at: number;
  user_img_key?: string;
};
// Define the types for Signup
export type Signup = {
  user_fullname: string;
  user_password: string;
  user_phonenumber: string;
  user_email: string;
  user_address: string;
};
// Define the types for the Login
export type Login = {
  user_email: string;
  user_password: string;
};

// Opdatere User
export type UpdateUser = {
  user_fullname: string;
  user_email: string;
  user_phonenumber: string;
  user_address: string;
};
// Define for resetting the password
export type ForgotPassword = {
  user_email: string;
};
// Define for resetting the password
export type ResetPassword = {
  user_password: string;
  confirm_password: string;
  key: string;
};

// Define for adding the car
export type AddCar = {
  car_licenseplate: string;
  car_image: File | null;
}
// Define for adding the car
export type Car = {
  car_pk: string;
  car_licenseplate: string;
  car_image: string;
  car_most_recent_wash: number;
};